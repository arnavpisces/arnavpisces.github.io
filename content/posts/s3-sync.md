---
title: "Why do I almost always choose s3 sync over s3 cp? tldr; it's much easier"
date: "2024-12-24"
---
While dumping real-time stock market tick data for thousands of instruments(representation of financial assets), I found myself dealing with a complex folder structure as each instrument had its own nested directories(based on date), and archiving this data to s3 efficiently was crucial for the analytics engine. I've known the hassle of crafting a s3 url for each file dynamically and then uploading the file but I thought there needs to be an easier way for bulk uploads (believe me, you don't want to get stuck in figuring out why your read method which tries to recursively read a directory is not working).

There was a lot of data in my DB which needed to be archived as well. I strongly believe that in order for your application to run smoothly, and to make sure the database is not over-burdened, a good archiving policy is a must.

## Enter s3 sync
With s3 sync, as long as your local file structure matches what you want on S3, the process is seamless:
`aws s3 sync ./local-folder s3://my-bucket/`
No need to manually recreate the folder hierarchy. Just sync, and you’re done. With `sync` you even save bandwidth by not copying files that already exist on s3, it will just copy the files that were newly created or modified. 


