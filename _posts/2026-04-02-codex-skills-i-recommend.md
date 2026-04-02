---
layout: post
lang: en
language: en
translation_url: /zh/2026-04-02-codex-skills-i-recommend/
title: The Codex Skills I Actually Recommend Right Now
subtitle: A practical shortlist after building, debugging, and writing with it for real
tags: [Ideas and Insights, Software Development]
readtime: true
---

For quite a while, I treated skills as something optional in Codex. I thought the model itself was already the main thing, so extra skills were probably just nice-to-have decorations.

After using Codex more seriously, I changed my mind.

The difference between "a smart coding model" and "a useful working partner" is often not just the model. It is the surrounding workflow. That is also close to how OpenAI describes it in their recent [Codex page](https://openai.com/codex/) and [Codex app post](https://openai.com/index/introducing-the-codex-app/): skills help Codex go beyond raw code generation and make it more reliable at real work such as documentation, prototyping, code understanding, and tool-driven workflows.

OpenAI also mentioned that they have already built **hundreds of skills internally**. I do not find that surprising anymore. Once you start using Codex across writing, debugging, browsing, reviewing, and verification, a good skill stops feeling like a bonus. It starts feeling like part of the working environment.

So this article is not a full catalog. It is just a practical list of the Codex skills in my current setup that I honestly think are worth keeping.

## First: the skills that make Codex more grounded

If I had to explain the value of skills in one sentence, I would say this: they reduce ambiguity.

That is why I would put `web-access` near the top of the list.

When a task involves live information, dynamic pages, or anything that should be checked from the web instead of guessed, this skill matters a lot. It pushes Codex to treat browsing as real work rather than as an afterthought. For technical writing, tool comparison, or fact-checking, that makes a very visible difference.

I would pair it with `multi-search-engine`.

I like this one because real search is messy. Some topics are easier to find on English search engines, some on Chinese ones, and some only show up properly when you switch engines or operators. A skill like this does not make Codex "smarter" in theory, but it does make research more practical in daily use.

Then there is `mem-search`.

This one is easy to underestimate until you have already used Codex for a while. Once past sessions start piling up, memory search becomes the difference between repeating old work and actually building on top of it. If I ask "how did we solve this last time?", I want retrieval, not improvisation.

## Second: the skills that help me produce cleaner output

I do not only use Codex for code. I also use it for writing, organizing, polishing, and turning rough thoughts into something publishable.

For that kind of work, `technical-writer` is one of the most useful skills I have.

It is especially helpful when the task is documentation-heavy: README updates, usage guides, setup notes, or structured explanations. What I like about it is not that it makes the writing bigger. It usually does the opposite. It keeps the writing clearer, more task-oriented, and less chaotic.

Then comes `humanizer`.

I genuinely like this one. AI-generated text often fails in a very predictable way: it becomes too smooth, too symmetrical, and too obviously "written by a system trying to sound polished." The `humanizer` skill is useful because it pushes the writing back toward normal human rhythm. That matters a lot for blog posts. I do not want my articles to read like product copy or generic generated summaries.

Another one I would keep nearby is `frontend-design`.

Even when I do not need a dramatic redesign, this skill is useful because it nudges Codex away from safe, forgettable interface work. If I ask for a page improvement or a new section, I want it to feel designed, not merely assembled.

## Third: the skills that save engineering time directly

This is the group I appreciate most when I am already in the middle of building something.

For repository and review work, the GitHub skills are extremely practical: `github:github`, `github:gh-address-comments`, and `github:gh-fix-ci`.

These are not flashy skills, but they are high-leverage. They help Codex move from "I changed some files" to "I can understand the repo state, inspect pull request context, address review comments, and debug failing checks without wasting motion."

That shift matters.

In the same way, `vercel:agent-browser` and `vercel:agent-browser-verify` are worth recommending to anyone who works on websites or UI-heavy projects. A page that builds successfully is not always a page that actually works. Being able to start a local server and then verify what really shows up in the browser is one of the easiest ways to avoid fake progress.

I have felt this very directly on this site. It is one thing to say "the build passed." It is another thing to open the page, check the actual content, and notice that the interaction, layout, or copy still feels wrong.

## Fourth: the skills that look boring until you need them

Some skills are easy to ignore because they do not sound exciting at first glance.

I am talking about things like `pdf`, `docx`, `pptx`, and `xlsx`.

These skills are not the first ones I would show in a demo, but they are exactly the kind of tools that make Codex more useful outside pure coding tasks. The moment you need to edit a Word document, extract content from a PDF, clean a spreadsheet, or update a slide deck, these stop being "extra" and start being the shortest path to getting real work done.

I would put `skill-creator` in this category too, although for a different reason.

OpenAI recently wrote that skills bundle instructions, resources, and scripts so Codex can run workflows more reliably. That is the part I find most important. Once a workflow repeats often enough, it is worth packaging. A custom skill is not just a convenience feature. It is a way to turn experience into reusable infrastructure.

That also connects nicely with another recent OpenAI article, [Harness engineering](https://openai.com/index/harness-engineering/), which argues that a good `AGENTS.md` should act more like a map than an encyclopedia. I agree with that. Put stable guidance in the repo, keep it short, and move specific workflows into modular places. Skills fit that idea very well.

## If I could only keep five

If I had to keep only a small set from my current setup, I would probably choose these:

1. `web-access`
2. `technical-writer`
3. `humanizer`
4. `vercel:agent-browser`
5. `github:github`

This is not because they are the most advanced in some abstract sense. It is because together they cover the kind of work I actually do most often: research, writing, verification, and repository workflow.

## Final thought

My current feeling is simple: the best Codex setup is probably not the one with the most skills. It is the one with the smallest set of skills that reliably match your real habits.

For me, that means I want skills that help Codex do four things well:

- find trustworthy information
- write clearly
- verify reality instead of assuming success
- fit into an actual development workflow

If a skill helps with one of those, I am happy to keep it. If not, I would rather have a shorter list and a cleaner working environment.

That is probably how I will keep growing this setup too: not by collecting everything, but by keeping the ones I truly reach for.
