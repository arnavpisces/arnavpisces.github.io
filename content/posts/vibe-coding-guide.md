---
title: "Vibe Coding Stack for Dummies"
date: "2025-09-05"
---
## What is "Vibe Coding"?

Vibe coding is writing code using AI. You focus on the **what** while AI handles the **how**. Perfect to build small but real projects without getting stuck on syntax or dependency hell(remember the times you spent 1.2 hours trying to install npm dependencies and setting up node). I was not too fond of the term when I first heard it but now it sounds completely apt. Agentic coding tools (Claude Code basically) made me realize that a lot of the times, AI coding is just vibes.

## The Tools I Use

### AI Development Tools

**Claude Code** - Bread and butter, you ask, it will deliver. The delivery may not be hot everytime, but it's so much better than the other agentic coding tools I've used(Warp, Codex, Gemini-cli). The only IDE that came closer was Kiro which is Amazon's 'new' IDE but I'm 95% sure it uses claude code at the backend with some frills added.

**Cursor** - It is nice when I am writing small snippets of code cause it's autocomplete is quite useful. I certainly use the chat panel less now because of Claude Code but it still is useful sometimes.

### Tech Stack

**React + Next.js** – My go-to for frontend. Componentized, opinionated enough to keep me sane, and the built-in routing/optimizations save a ton of boilerplate. It’s not magic, but it’s been the most reliable.

**Tailwind CSS** – Styling without touching raw CSS hell. Utility classes everywhere, responsive out of the box, and my designs actually look consistent without me obsessing over pixels. CSS but civilized which is kinda perfect for vibe coding.

**React Bits** – For those little beautiful UI sprinkles. Instead of reinventing the wheel (and failing), I can drop in pre-built bits that just work and look good.

### Deployment

**Vercel** – The easiest way to get something live. Free plan, gives you a domain instantly, and hooks into GitHub so every push auto-magically deploys. Great for spinning up projects without touching configs.

**GitHub** – The gold standard for storing code. Version control, backups, and integrations with basically everything. Plus, Vercel won’t even talk to you without it.

### Database (when you need a backend)

**Supabase** – The developer friendly Firebase alternative. Gives you a Postgres DB, real-time updates, and smooth auth integrations (Google, GitHub, email, etc.) without much setup. Great for saving user accounts, form submissions, or anything you’d normally shove into a backend. Free tier is generous enough for side projects, so you can build fast without worrying about cost.

## The Vibe Coding Process

1. **Start simple** - What's the main thing your site does?
   <br>"I want a site that downloads GitHub repos"*

2. **Describe to AI** - Tell it what you want, not how to build it
   <br>"Build a form that validates GitHub URLs and shows if the repo exists"*

3. **Let AI code** - Don't worry about the implementation details
   <br>[This is my GitHub downloader site which I aptly named GitSnack](https://gitsnack.vercel.app) with working validation*

4. **Deploy and test** - See it work in the real world
   <br>*"Connected to Vercel, live in minutes"* 

5. **Ask AI to improve** - Iterate based on what you see, keep repeating this process until you like what you're making! The better the context and the prompt, the lesser time it'll take you to ship
   <br>*"Make this responsive on mobile; Add navbar; Integrate Auth with Supabase; Add a hero section etc."*

<p align="center">
  <img src="/images/gitsnack.gif" alt="Final Site Screenshot" />
  <em>
    Demo: <a href="https://gitsnack.vercel.app/" target="_blank" rel="noopener">GitSnack</a> – see the finished site in action!
  </em>
</p>

The goal is shipping your first real project, not writing perfect code.

---

## Links
- [Andrej Karpathy on Vibe Coding](https://x.com/karpathy/status/1886192184808149383)
- [Claude Code](https://claude.ai/code) - AI coding assistant
- [Cursor](https://cursor.sh) - AI code editor
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Vercel](https://vercel.com) - Free hosting
- [Supabase](https://supabase.com) - Postgres alternative in cloud