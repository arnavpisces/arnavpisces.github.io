---
title: "Uncovering the 1 Billion Row Challenge: A Naive Approach Comparison Between Various Concurrency Frameworks in Python"
date: "2024-11-14"
---

Recently, I've been working on an algorithmic trading project that involves processing tick data from thousands of stock market instruments in real-time from multiple sources. The task involves running algorithms on each tick and storing the data in a database for further analysis. I soon realized that Python was not well-suited for this task due to its Global Interpreter Lock (GIL) and single-threaded nature. However, since most of the codebase was written in Python, and completing the task took priority over optimizing the language, I decided to stick with Python. I soon realized I'll have to use one of the concurrency frameworks that Python offers to utilize the compute efficiently and offload any heavy lifting to the background (like DB read/writes)

I also wondered what would happen if we use a naive approach to solve the [`1 Billion Row Challenge`](https://1brc.dev/) whilst using the difference concurrency frameworks and here we are.

Python offers multiple approaches to handle concurrent operations, each with its own strengths and trade-offs. Let's check out the three main concurrency frameworks: Threading, Multiprocessing, and AsyncIO, by implementing a simple yet challenging task: processing a large dataset of temperature measurements.

### The Challenge

The `1 Billion Row Challenge` is a famous problem where the goal is to process a large dataset of temperature measurements and calculate the minimum, maximum, and mean temperature for each location. Ideally, this should be done in the shortest time possible, but we are more interested in the differences in performance between the various concurrency frameworks.

We'll work with a dataset from the [1brc](https://github.com/gunnarmorling/1brc/blob/main/data/weather_stations.csv) repo on Github containing temperature measurements, where each line follows this format:

```
<string:station>;<double:temperature>
```

Our task is to calculate the min, max, and mean temperature for each location. Simple enough? Let's see how different concurrency approaches handle this.

The system I used for this blog was a MacBook Air M2 with 16 GB RAM and Apple's M2 chip (8-core CPU).

### Threading: The I/O Specialist (concurrent.futures.ThreadPoolExecutor)

Python's threading is often misunderstood as a concept. Due to the Global Interpreter Lock (GIL), threads can't execute Python code truly in parallel. However, they're excellent for I/O-bound operations which is exactly the case here.

We'll be using the `ThreadPoolExecutor` from the `concurrent.futures` module to run the threads instead of the `threading` module for simplicity and because of some features that `Executor` provides right out of the gate, which we don't get with the lower-level `threading` module.

We'll be `mmap`-ing the file onto memory so that the read operations are efficient and then chunk-ify the file for each thread to process its chunk.

The number of threads in the system is 8, one for each core, and hence there will be 8 chunks.

```python
def calculate_boundaries(mm, num_chunks):
    file_size = len(mm)
    approximate_chunk_size = file_size // num_chunks
    boundaries = []
    current_pos = 0
    for i in range(num_chunks):
        chunk_start = current_pos
        if i == num_chunks - 1:
            boundaries.append((chunk_start, file_size))
            break
        next_pos = min(chunk_start + approximate_chunk_size, file_size)
        while next_pos < file_size and mm[next_pos:next_pos+1] != b'\n':
            next_pos += 1
        next_pos += 1
        boundaries.append((chunk_start, next_pos))
        current_pos = next_pos
    return boundaries
```

Once we have the chunk boundaries, we are going to calculate the min, max, and mean temperature for each location.

```python
def process_chunk(mm, start, end, chunk_id):
    print(f"[{datetime.now()}] Starting chunk {chunk_id}, processing {(end-start)/(1024):.2f} KB")
    start_time = time.time()
    results = defaultdict(lambda: {'min': float('inf'), 'max': float('-inf'), 'sum': 0, 'count': 0})
    chunk = mm[start:end].decode('utf-8')
    for line in chunk.split('\n'):
        if not line or line.startswith('#'):
            continue
        try:
            station, temp = line.split(';')
            temp = float(temp)
            results[station]['min'] = min(results[station]['min'], temp)
            results[station]['max'] = max(results[station]['max'], temp)
            results[station]['sum'] += temp
            results[station]['count'] += 1
        except (ValueError, IndexError) as e:
            print(f"[{datetime.now()}] Warning: Skipping malformed line in chunk {chunk_id}")
            continue
    processing_time = time.time() - start_time
    print(f"[{datetime.now()}] Finished chunk {chunk_id} in {processing_time:.4f} seconds")
    return dict(results)
```
Once all the `futures` are done processing, we can merge the results from all the chunks.

```python
def merge_results(chunk_results):
    final_results = defaultdict(lambda: {'min': float('inf'), 'max': float('-inf'), 'sum': 0, 'count': 0})
    for chunk_result in chunk_results:
        for station, stats in chunk_result.items():
            final_results[station]['min'] = min(final_results[station]['min'], stats['min'])
            final_results[station]['max'] = max(final_results[station]['max'], stats['max'])
            final_results[station]['sum'] += stats['sum']
            final_results[station]['count'] += stats['count']
    return dict(final_results)
```

We then use `ThreadPoolExecutor` to run the threads.
```python
def process_file(filename, num_threads=os.cpu_count()):
    print(f"\n[{datetime.now()}] Starting processing with {num_threads} threads")
    start_time = time.time()
    mm = open_mmap(filename)
    boundaries = calculate_boundaries(mm, num_threads)
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [executor.submit(process_chunk, mm, start, end, i)
                  for i, (start, end) in enumerate(boundaries)]

        print(f"[{datetime.now()}] Processing chunks...")
        chunk_results = [future.result() for future in futures]
    final_results = merge_results(chunk_results)
    mm.close()
    total_time = time.time() - start_time
    process = psutil.Process()
    memory_info = process.memory_info()
    print(f"[{datetime.now()}] Total processing time: {total_time:.4f} seconds")
    print(f"[{datetime.now()}] Memory usage: {memory_info.rss / (1024 * 1024):.2f} MB")
    file_size = get_file_size(filename)
    processing_speed = (file_size / (1024 * 1024)) / total_time  # MB/second
    print(f"[{datetime.now()}] Processing speed: {processing_speed:.2f} MB/second")
    return final_results
```

Once everything is assembled, we get the following result:
```
[2024-11-26 01:46:19.813633] Starting weather station data processing...

[2024-11-26 01:46:19.813655] Starting processing with 8 threads
[2024-11-26 01:46:19.818932] Starting chunk 0, processing 100.64 KB
[2024-11-26 01:46:19.823863] Finished chunk 0 in 0.0049 seconds
[2024-11-26 01:46:19.823899] Starting chunk 1, processing 100.64 KB
[2024-11-26 01:46:19.824042] Starting chunk 2, processing 100.63 KB
[2024-11-26 01:46:19.824061] Starting chunk 3, processing 100.63 KB
[2024-11-26 01:46:19.834151] Finished chunk 2 in 0.0051 seconds
[2024-11-26 01:46:19.828790] Finished chunk 1 in 0.0047 seconds
[2024-11-26 01:46:19.838665] Finished chunk 3 in 0.0044 seconds
[2024-11-26 01:46:19.834199] Starting chunk 4, processing 100.64 KB
[2024-11-26 01:46:19.838944] Processing chunks...
[2024-11-26 01:46:19.839058] Starting chunk 7, processing 100.57 KB
[2024-11-26 01:46:19.834296] Starting chunk 5, processing 100.64 KB
[2024-11-26 01:46:19.843717] Finished chunk 4 in 0.0046 seconds
[2024-11-26 01:46:19.838746] Starting chunk 6, processing 100.63 KB
[2024-11-26 01:46:19.848424] Finished chunk 7 in 0.0046 seconds
[2024-11-26 01:46:19.852507] Finished chunk 5 in 0.0041 seconds
[2024-11-26 01:46:19.856724] Finished chunk 6 in 0.0041 seconds
[2024-11-26 01:46:19.886240] Total processing time: 0.0725 seconds
[2024-11-26 01:46:19.886260] Memory usage: 43.39 MB
[2024-11-26 01:46:19.886283] Processing speed: 10.85 MB/second
```
### Multiprocessing: The Compute Specialist (concurrent.futures.ProcessPoolExecutor)

Multiprocessing bypasses the GIL by spawning multiple Python processes and using all the CPU cores to execute the spawned processes(based on how you've configured it). It's ideal for CPU-bound tasks but comes with overhead from inter-process communication. As this problem does not require much compute power, there won't be much benefit in using multiprocessing over threading in this case.

We'll be using the `ProcessPoolExecutor` from the `concurrent.futures` module to run the processes versus the `multiprocessing` module for simplicity and because of some right out the gate features with `Executor` that we don't get with lower level `multiprocessing` module.

The code is almost the same as the one we used in the threading section, but instead of `ThreadPoolExecutor`, we'll be using `ProcessPoolExecutor` and we'll be using `cpu_count()` to get the number of CPU cores available on the system.

```python
def process_file(filename, num_processes=os.cpu_count()):
    print(f"\n[{datetime.now()}] Starting processing with {num_processes} processes")
    start_time = time.time()

    boundaries = calculate_boundaries(open_mmap(filename), num_processes)  # Open mmap only for boundaries

    with ProcessPoolExecutor(max_workers=num_processes) as executor:
        futures = [executor.submit(process_chunk, filename, start, end, i)
                  for i, (start, end) in enumerate(boundaries)]

        print(f"[{datetime.now()}] Processing chunks...")
        chunk_results = [future.result() for future in futures]

    final_results = merge_results(chunk_results)
    total_time = time.time() - start_time
    print(f"[{datetime.now()}] Total processing time: {total_time:.4f} seconds")
    file_size = get_file_size(filename)
    processing_speed = (file_size / (1024 * 1024)) / total_time  # MB/second
    print(f"[{datetime.now()}] Processing speed: {processing_speed:.2f} MB/second")
    return final_results
```
Using `multiprocessing`, we get the following result-
```
[2024-11-26 01:45:53.377859] Starting weather station data processing...

[2024-11-26 01:45:53.377880] Starting processing with 8 processes
[2024-11-26 01:45:53.398071] Processing chunks...
[2024-11-26 01:45:53.440935] Starting chunk 0, processing 100.64 KB
[2024-11-26 01:45:53.451718] Starting chunk 1, processing 100.64 KB
[2024-11-26 01:45:53.453374] Starting chunk 2, processing 100.63 KB
[2024-11-26 01:45:53.455376] Finished chunk 0 in 0.0144 seconds
[2024-11-26 01:45:53.458929] Starting chunk 3, processing 100.63 KB
[2024-11-26 01:45:53.459244] Starting chunk 4, processing 100.64 KB
[2024-11-26 01:45:53.464057] Starting chunk 5, processing 100.64 KB
[2024-11-26 01:45:53.464292] Starting chunk 6, processing 100.63 KB
[2024-11-26 01:45:53.467697] Finished chunk 2 in 0.0143 seconds
[2024-11-26 01:45:53.467865] Finished chunk 3 in 0.0089 seconds
[2024-11-26 01:45:53.469094] Finished chunk 5 in 0.0050 seconds
[2024-11-26 01:45:53.469647] Finished chunk 1 in 0.0179 seconds
[2024-11-26 01:45:53.470049] Finished chunk 6 in 0.0057 seconds
[2024-11-26 01:45:53.470683] Starting chunk 7, processing 100.57 KB
[2024-11-26 01:45:53.470916] Finished chunk 4 in 0.0117 seconds
[2024-11-26 01:45:53.476174] Finished chunk 7 in 0.0055 seconds
[2024-11-26 01:45:53.529482] Total processing time: 0.1515 seconds
[2024-11-26 01:45:53.529519] Memory usage: 48.16 MB
[2024-11-26 01:45:53.529546] Processing speed: 5.19 MB/second
```
The processing speed is approximately half of what we observed with multithreading. This can be attributed to the fact that most of the time in this problem is spent dividing and reading chunks of the file rather than performing heavy computations, as operations like min/max/mean are relatively lightweight. Multiprocessing adds overhead by pickling data and creating copies for each process, which contributes to the reduced efficiency compared to multithreading in this case.

### AsyncIO: Multitasking with Coroutines

AsyncIO in Python is a powerful way to handle multiple tasks at once, but there's a catch! The tasks will still run on a single thread. Instead of juggling tasks like a traditional multithreading approach, AsyncIO is more like a coordinated system where you put tasks in and it handles when to switch to another task, especially when you're dealing with stuff like making network calls or reading/writing files.

What makes AsyncIO particularly effective is how it handles task switching. Rather than randomly jumping between tasks, it lets them decide when it's a good time to pause(yield) and let another task take over. This is super efficient because you're not wasting resources constantly switching between tasks(the event loop handles that). If you're building something that needs to handle tons of simultaneous connections (like a chat app or a web scraper), AsyncIO might just be answer!

In the code, the event loop begins by using `asyncio.run()` to start the main coroutine. Using a `tasks` list to store each task that will process their respective chunk and then gathering all of them up

```python
async def process_file(filename, num_chunks=os.cpu_count()):
    print(f"\n[{datetime.now()}] Starting processing with {num_chunks} chunks")
    start_time = time.time()
    mm = await open_mmap(filename)
    boundaries = calculate_boundaries(mm, num_chunks)
    tasks = [process_chunk(mm, start, end, i) for i, (start, end) in enumerate(boundaries)]
    chunk_results = await asyncio.gather(*tasks)
    final_results = merge_results(chunk_results)
    mm.close()
    total_time = time.time() - start_time
    process = psutil.Process()
    memory_info = process.memory_info()
    print(f"[{datetime.now()}] Total processing time: {total_time:.4f} seconds")
    print(f"[{datetime.now()}] Memory usage: {memory_info.rss / (1024 * 1024):.2f} MB")
    file_size = await get_file_size(filename)
    processing_speed = (file_size / (1024 * 1024)) / total_time  # MB/second
    print(f"[{datetime.now()}] Processing speed: {processing_speed:.2f} MB/second")
```
Using AsyncIO, we get the following result:
```
[2024-11-26 01:44:49.565130] Starting weather station data processing...

[2024-11-26 01:44:49.565309] Starting processing with 8 chunks
[2024-11-26 01:44:49.568495] Starting chunk 0, processing 100.64 KB
[2024-11-26 01:44:49.573645] Finished chunk 0 in 0.0051 seconds
[2024-11-26 01:44:49.573817] Starting chunk 1, processing 100.64 KB
[2024-11-26 01:44:49.578438] Finished chunk 1 in 0.0046 seconds
[2024-11-26 01:44:49.578500] Starting chunk 2, processing 100.63 KB
[2024-11-26 01:44:49.583211] Finished chunk 2 in 0.0047 seconds
[2024-11-26 01:44:49.583296] Starting chunk 3, processing 100.63 KB
[2024-11-26 01:44:49.587893] Finished chunk 3 in 0.0046 seconds
[2024-11-26 01:44:49.587964] Starting chunk 4, processing 100.64 KB
[2024-11-26 01:44:49.592638] Finished chunk 4 in 0.0047 seconds
[2024-11-26 01:44:49.592709] Starting chunk 5, processing 100.64 KB
[2024-11-26 01:44:49.597871] Finished chunk 5 in 0.0052 seconds
[2024-11-26 01:44:49.597924] Starting chunk 6, processing 100.63 KB
[2024-11-26 01:44:49.602060] Finished chunk 6 in 0.0041 seconds
[2024-11-26 01:44:49.602100] Starting chunk 7, processing 100.57 KB
[2024-11-26 01:44:49.606170] Finished chunk 7 in 0.0041 seconds
[2024-11-26 01:44:49.636362] Total processing time: 0.0709 seconds
[2024-11-26 01:44:49.636381] Memory usage: 47.70 MB
[2024-11-26 01:44:49.636405] Processing speed: 11.08 MB/second
```

This method appears to be the fastest among the three, which makes sense because AsyncIO is designed to efficiently handle tasks involving significant I/O, as is the case in our scenario.

### Performance Showdown

Running these implementations on my MacBook Air M2 with 16 GB RAM and Apple's M2 chip (8-core CPU):

1. **Threading**
   - Processing Time: 0.0725s
   - Processing Speed: 10.85 MB/second
   - Memory Usage: 43.39 MB

2. **Multiprocessing**
   - Processing Time:  0.1515s
   - Processing Speed: 10.85 MB/second
   - Memory Usage: 48.16 MB

3. **AsyncIO**
   - Processing Time: 0.0709s
   - Processing Speed: 11.08 MB/second
   - Memory Usage: 47.70 MB

### When to Use Which?

- **Use Threading When:**
  - Your task is I/O bound (file operations, network calls)
  - You need to share memory between threads
  - You want simple implementation over maximum efficiency

- **Use Multiprocessing When:**
  - Your task is CPU bound (e.g., computationally intensive operations like data processing or image rendering)
  - You have lots of RAM to spare
  - You need true parallelism to utilize multiple cores

- **Use AsyncIO When:**
  - You’re managing many concurrent I/O-bound tasks (e.g., web scraping, chat servers)
  - Tasks involve frequent waiting or latency (e.g., network responses, database queries)
  - You want a single-threaded, cooperative multitasking model to handle tasks efficiently

### The Verdict

The performance metrics tell a clear story that both multithreading and AsyncIO are suitable options for tackling the `1 Billion Row Challenge`. Both methods leveraged the I/O-bound nature of the task to achieve significant performance boosts. AsyncIO, in particular, demonstrated the fastest processing time and highest processing speed, making it an attractive choice for tasks involving concurrent I/O operations. Although Multithreading did offer a simpler implementation and competitive performance, making it a viable alternative.

Stay tuned for more performance-tuning adventures!

---

*The complete code and dataset are available in my [GitHub repository](https://github.com/arnavpisces/blogs/tree/main/1-billion-row).*
