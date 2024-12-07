---
title: "Poetry to uv: How I Slashed Python Build Times by 90% with One Switch"
date: "2024-12-06"
---
Amongst the huge number of Python packages available on [PyPI](https://pypistats.org/) (598,432 as of 6th Dec, 2024), `pip` does a neat job of installing your selected dependency. Behind the scenes, it creates a depedency graph and goes backwards to figure out what dependencies are required for e.g.- to install Package A, it needs to install Package B, which in turn needs Package C, and so on. This process is called dependency resolution and it can get quite complex when you're dealing with a large number of packages. Sometimes, you might get stuck in what is called a `Dependency Hell` where different packages require different versions of the same package leading to sleepless nights.

## What went wrong with Poetry?
When I was dealing with bioinformatics tools and libraries I was using `poetry` to manage my dependencies which is a great tool and kinda the de-facto standard everywhere. However, when I was working on containerizing my bio tools, I realized that `poetry` is dead slow for some of the obscure packages I had to install. As an infrastructure engineer, I believe in having a fast test setup to iterate on my solutions quickly because the whole arch depends on it. And yet I was stuck with this slow dependency resolution process.

I had heard about [`uv`](https://docs.astral.sh/uv/), which is this new Python package manager written in Rust and is known to be really fast. This was the best opportunity for me to try `uv` as I was already working on creating docker images so I wouldn't have to migrate everything at once and still deliver on my work.

Installing `uv` is as simple as running `curl -LsSf https://astral.sh/uv/install.sh | sh` and voila! You can check the version installed by runnig `uv -V`.

I was so impressed with the speed of `uv` that I decided to run a quick benchmark b/w `poetry` and `uv`.

## A Real-World Test b/w Poetry and uv Which Blew My Mind
I selected a good list of 80 packages taken from PyPI's list of most downloaded packages, a few packages from CNCF(eg-Kubernetes;Terraform) and some ML libraries(eg-Torch;Tensorflow). This gave me a substantial `requirements.txt` that I used to benchmark the performance of both `poetry` and `uv`.

I created two separete virtual environments (`python3 -m venv <venv-poetry/venv-uv>`) for each tool.

To generate lock files and install via-

<b>Poetry</b>
```bash
poetry lock
poetry install
```
<b>uv</b>
```bash
uv pip compile requirements.txt -o requirements.lock
uv pip sync requirements.lock
# You can also run the below command to install packages directly without generating a separate lock file
uv pip install -r requirements.txt
```

### Performance Comparison
I used the `time` command to benchmark the performance of both tools.
```plaintext
Task               Poetry    uv
----------------------------------
Lock file update   365.51s   3.702s
Clean install      17.502s   33.783s
Total time         383.012s  37.485s
```
That's a <b>90% improvement</b> in performance! My jaw was dropped and I knew that shipping new images and reducing build times in CI/CD pipelines are gonna be a breeze with this new tool.

## Why uv is Life-Saver for CI/CD Pipelines
- Faster dependency resolution..much much faster
- Reduced resource usage and platform costs(this adds up when you have hundreds of builds running everyday)
- Faster installation time of the tool itself (just one command to install)
- A much better developer experience

## Verdict
[Astral](https://astral.sh/) is the creator of `uv` and they have been working really well at trying to make `uv` the standard for Python package management. Personally, I try to use `uv` whenever I can and the difference in performance w.r.t. Poetry never fails to surprise me. 
The speed, simplicity, and compatibility of `uv` does make it a compelling choice for any sort of project.