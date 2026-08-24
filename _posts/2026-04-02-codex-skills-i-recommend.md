---
layout: post
lang: en
language: en
translation_url: /zh/2026-04-02-codex-skills-i-recommend/
permalink: /2026-04-02-codex-skills-i-recommend/
title: The Codex Skills I Recommend Right Now
subtitle: Updated in August 2026, chosen by workflow rather than collection size
tags: [Ideas and Insights, Software Development]
readtime: true
last-updated: 2026-08-18
share-title: The Codex Skills I Recommend Right Now
share-description: An August 2026 update to my Codex Skills shortlist, organized around research, browser verification, engineering feedback, and content work.
share-img: /assets/img/project-logos/yxh-website.png
---

Four months ago, I wrote down a list of Codex Skills I recommended. Back then, I was still choosing them mostly by name, and when I was getting started, I cared a lot about how many I had collected. Names like `web-access`, `mem-search`, and `humanizer` looked like permanent keepers. In practice, they were still a long way from improving my efficiency or working well with the agent itself.

Looking back, that article aged faster than I expected. Skills get renamed, updated, repackaged into plugins, and moved from a local cache into a more formal marketplace. There is also a boundary that is easy to miss: seeing a skill in a catalog does not mean it is installed, enabled, registered, or ready with all of its dependencies.

So I no longer want to offer a static collection of names. I would rather record the workflows I have repeatedly reached for in the past few months, along with the skills that have proved worth keeping in each one.

## Start with three layers

I now think about a Codex environment in three layers.

The first layer is Codex itself and the project's `AGENTS.md`. They define the model, repository boundaries, stable conventions, and safety rules. **Long-lived project rules** belong here.

The second layer is Skills. A skill usually starts with a `SKILL.md` and may include scripts, references, templates, and examples. It is a good place for a **specific workflow** that will be repeated.

The third layer is Plugins and external services. They can add skills, app connectors, commands, or account dependencies. Installation only means that an entry point exists. Whether it can actually run depends on registration, permissions, and dependencies in the current environment.

Once these layers are separate, several decisions become easier. Keep repository rules out of a giant skill, do not package a one-off command too early, and do not assume that a name in a catalog means an active capability.

## First: skills that help me establish the facts

I now reach for `research` and `openai-docs` first.

`research` fits tasks that require source gathering, option comparison, or checking the current state of a product. Its useful output is a research note with sources that can support a later article, decision, or follow-up check. It also encourages a clean separation between official statements, source code, and my own judgment.

When the topic is Codex, the OpenAI API, models, pricing, or product behavior, I use `openai-docs`. Those details change quickly. Writing from an old memory can produce a polished explanation that is already wrong. The official docs answer how the product is supposed to work; a local test still answers what an ordinary user will actually experience.

The common thread is simple. These skills turn “I think it works this way” into “I checked it, and here is the source.” That matters in a blog post because one stale product detail can move the time coordinate of the whole argument.

## Second: skills that tell me whether the page really works

In the original article, I recommended `vercel:agent-browser` and `vercel:agent-browser-verify`. They are still useful, but I would describe the recommendation more precisely now.

When I need to control an already open, already authenticated page, I use `browser:control-in-app-browser`. When I need to start a local server, fill a form, capture screenshots, or run a repeatable browser check from the terminal, I use `playwright`. They solve related but different problems. One acts on the current browser state; the other makes verification part of the engineering workflow.

This is now one of the capabilities I value most. A successful build only proves that the code passed one stage. It does not prove that the page renders correctly, that the mobile layout holds together, or that a button completes its action. On this blog, I prefer the result I can see in a browser to a sentence saying that the build passed.

For a website or UI project, I also use `frontend-design` when the task genuinely includes visual work. It brings hierarchy, readability, responsive states, and layout into the same conversation, while I still decide the brand direction. When the task does not need that, I do not enable it just to make the output sound more professional.

## Third: skills that close the engineering feedback loop

I use `diagnosing-bugs`, `tdd`, and `code-review` as a connected set.

When something throws, behaves incorrectly, or becomes slow, `diagnosing-bugs` pulls the task back toward reproduction, isolation, verification, and regression checks. That is a better fit for cases where the first explanation sounds like a cache problem but the real cause is configuration or state.

For shared logic, I use `tdd` to write the failing case before deciding how wide the implementation should be. Small edits can stay lightweight. When a change crosses module boundaries, affects a user flow, or has a history of regressions, starting with a failing test makes the rest of the work much clearer.

`code-review` is the pass I run after the change looks finished. It focuses on behavior regressions, edge cases, missing tests, and project standards. It often catches a change that is internally reasonable but still misses the original request.

For GitHub work, I keep `github:github`, `github:gh-address-comments`, and `github:gh-fix-ci` nearby. They cover repository and pull request context, review feedback, and failing GitHub Actions. I still follow one rule around them: read the current state before changing it. A resolved comment, a passing check, and a local file are three different facts.

## Fourth: skills for work that is not just code

I still keep `human-writing` and `technical-writer`, but I use them for different jobs.

`human-writing` is better for blog posts, essays, Chinese long-form writing, and any piece that needs to keep a personal point of view. It helps me control tone, evidence boundaries, and paragraph rhythm instead of turning experience into a generic answer.

`technical-writer` is better for README files, tutorials, migration notes, API documentation, and knowledge bases meant for collaborators. The goal is that another person can complete a task from the document. Structure, prerequisites, and verification matter more than literary polish.

For concrete files, `pdf`, `docx`, `pptx`, and `xlsx` are still worth keeping. They let Codex read and edit the files that real projects already contain, which makes it much easier to involve the agent in work beyond code. With spreadsheets and slide decks in particular, correct content is only the beginning. The final rendering still needs a visual check.

When I need a bitmap asset, I use `imagegen`. That is a better boundary for image generation and editing, while `frontend-design` is about how those assets are presented in a page.

## Fifth: skills that turn repeated work into a reusable process

`skill-creator` is one I have become increasingly willing to recommend.

I first check whether a task has stable inputs, steps, and visible results. For example, a bilingual post on this site needs front matter, translation links, source checks, and a prose pass every time. After repeating that workflow a few times, packaging it as a skill makes sense. A one-off command is usually clearer as a project script.

If I am building a complete Codex plugin, I also look at `plugin-creator`, `skill-installer`, and `plugin-management`. They cover directory structure, installation and updates, discovery, permissions, and connection management. For a personal setup, their most important benefit is a clear boundary between cached, installed, enabled, and actually usable.

This has also changed how I read `AGENTS.md`. It should explain how the project works and what boundaries matter. The detailed procedure can live in a skill. Keep the rules short, keep the workflow concrete, and maintenance gets easier.

## Final thought

I care less about how many skills are in an environment now. I care whether the right one appears at the right time, whether its prerequisites are clear, and whether it leaves behind a result that can be checked.

For me, a comfortable Codex setup should do four things well: provide sources for research, feedback for code changes, a personal voice for writing, and a reusable path for repeated work.

The catalog will keep changing, and the names will keep changing with it. The skills worth keeping are the ones that sit close to daily work and still get called again after the novelty is gone.

## Sources

- [Codex CLI repository](https://github.com/openai/codex)
- [Codex Skills documentation](https://developers.openai.com/codex/skills)
- [AGENTS.md guidance](https://developers.openai.com/codex/guides/agents-md)
- [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
