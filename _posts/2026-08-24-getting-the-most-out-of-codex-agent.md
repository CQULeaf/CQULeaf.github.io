---
layout: post
lang: en
language: en
translation_url: /zh/2026-08-24-getting-the-most-out-of-codex-agent/
permalink: /2026-08-24-getting-the-most-out-of-codex-agent/
title: How I Get the Most Out of Codex as an Agent
subtitle: How AGENTS.md, memory, plugins, MCP, hooks, and the CLI work together
tags: [Ideas and Insights, Software Development]
readtime: true
share-title: How I Get the Most Out of Codex as an Agent
share-description: A real workflow showing how AGENTS.md, memory, skills, plugins, MCP, hooks, and the CLI work together to turn Codex into a more capable agent.
share-img: /assets/img/project-logos/yxh-website.png
---

In my previous post, [The Codex Skills I Recommend Right Now](/2026-04-02-codex-skills-i-recommend/), I divided my Codex environment into three layers.

The first was Codex itself, project guidance, and long-lived context. The second was Skills. The third was Plugins and external services. Most of that post ended up being about the middle layer. Skills are easy to discuss because each name maps neatly to a recognizable kind of work.

The other two layers are harder to see in isolation. An `AGENTS.md` file does not write an article for me, and memory does not fix a bug on its own. MCP, hooks, and the CLI can all look like setup details until they participate in the same task.

I ran into a good example while working on this blog. The English version of a post displayed `6 minute read`, while the Chinese version of the same post claimed it took less than one minute. The final fix touched one Liquid template, two translation strings, and a small regression script. The workflow that produced and verified that fix crossed all three layers.

That small repair captures how I now think about getting the most out of Codex as an agent.

## The first layer manages context with different lifetimes

I now start by asking how long a piece of information needs to remain useful.

A temporary requirement stays in the current conversation. A convention that should apply every time Codex enters a repository belongs in `AGENTS.md`. Experience from earlier work that may be useful again can go into memory. Below that, settings such as models, permissions, plugin state, MCP servers, and hooks live in configuration such as `config.toml`.

All of these affect the agent, but they solve different problems.

### AGENTS.md holds deterministic project guidance

According to OpenAI's [AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md), Codex reads these files before it starts working. Global guidance loads first, followed by project files from the repository root down to the current directory. Guidance closer to the working directory takes precedence.

That makes `AGENTS.md` a good home for stable project facts. This blog expects new posts to have English and Chinese versions with paired links and aligned structure. The repository also records its build commands, generated directories, and editing boundaries. When I ask Codex to write another post, I do not have to repeat all of that in the prompt.

A useful `AGENTS.md` stays compact. It tells the agent how the project works, where mistakes are expensive, and how completion should be verified. The detailed procedure for one kind of task can live in a skill, while deterministic actions already supported by the repository can remain scripts. Rules, workflows, and commands do not need to compete for space in one large file.

### Memory carries reusable experience forward

Memory is useful for preferences, earlier decisions, and problems that have already been investigated. OpenAI's [Memories documentation](https://learn.chatgpt.com/docs/customization/memories) explicitly says that required team guidance should remain in `AGENTS.md` or checked-in documentation. Local Codex memory is also separate from ChatGPT memory on the web.

For this post, memory recovered the paired files and permalinks from the earlier article, along with the build workflow used last time. It also recalled that a previous attempt to fetch OpenAI documentation directly had hit a TLS problem, which was useful context for handling source verification carefully.

I do not treat memory as a source of current product truth. It is generated in the background and may arrive late or skip a conversation. Versions, installed plugins, and official product behavior still need to be checked live. This time I fetched current official documentation and ran `codex plugin list --json` to distinguish what was actually installed and enabled from what merely existed in a cache.

For me, `AGENTS.md` provides certainty and memory provides continuity. Together, they let the agent enter a repository with clear rules without treating every conversation as our first meeting.

## Skills fit naturally in the middle

The previous post covered Skills in detail, so I only want to add one distinction here.

A skill mainly answers how a class of task should be completed. It can include instructions, references, and scripts. Codex initially sees its name and description, then loads the full instructions when the task matches. This progressive disclosure makes longer procedures available without placing all of them into the context of every task.

In the reading-time fix, the `diagnosing-bugs` skill required a deterministic failing check before discussing possible causes. The `human-writing` skill manages evidence boundaries and prose when I work on a post. Those skills define methods. Browser control, remote accounts, and Git permissions still come from other layers.

## A plugin is an installable combination of capabilities

Skills and plugins often appear together, but they operate at different scales.

OpenAI's [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins) describes a skill as a workflow authoring format and a plugin as the package people discover, install, share, and publish. A plugin can contain skills, an MCP server, or both. It may also carry optional UI, hooks, and supporting resources.

I currently have quite a few plugins enabled, but only a few groups appear regularly in my work.

The Browser and Chrome plugins cover web interaction. Browser is a good fit for local pages and the in-app browser, while Chrome can work with tabs and authenticated state I already have open. After building this blog, I use Browser to open the actual post and inspect its title, update date, and page structure. A successful Jekyll build proves that files were generated. The browser shows what a reader will receive.

The GitHub plugin covers pull requests, issues, review comments, and CI. Ordinary `git` commands still handle local commits, branches, and pushes. When I pushed the article update that preceded this post, HTTPS credential lookup failed. The terminal quickly confirmed that SSH authentication already worked, and the push completed through that existing route. The plugin provides repository-level workflow semantics, while the CLI preserves a transparent diagnostic path.

The Documents, PDF, Spreadsheets, and Presentations plugins combine file-oriented workflows with the runtimes needed to inspect and verify their outputs. Ponytail is an even clearer example of how plugins and skills relate. It packages several skills that favor the smallest correct implementation and also includes lifecycle hooks. One installation can therefore add both a way of working and behavior that activates at defined points in a session.

A long plugin list does not automatically make an agent more productive. Installed, enabled, authenticated, and callable in the current conversation are still different states. I prefer to keep plugins around a real workflow and know exactly where each one contributes.

## MCP, hooks, and the CLI handle different kinds of action

MCP, hooks, and the CLI can all make an agent do something outside the model. Their triggers and boundaries are different.

### MCP exposes structured external capabilities

[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp) provides a standard way to expose tools and context to a model. A server can provide tools, resources, and prompts. Codex currently supports local STDIO servers as well as Streamable HTTP servers with corresponding authentication options.

A skill can explain when to call a tool and how to combine its results. The MCP server defines which tools exist, the shape of their inputs and outputs, and the authorization behind them. Together, the agent gets both a method and a controlled path to act.

In my current setup, `node_repl` is registered as an MCP server. The Browser plugin's skill explains how to choose a browser, inspect a page, and hand a tab back to the user. The underlying tools perform the actual navigation, DOM inspection, and console checks. The GitHub plugin follows a similar pattern, with skills for PR and CI workflows and connected tools for remote state.

### Hooks run at fixed lifecycle points

[Codex Hooks](https://learn.chatgpt.com/docs/hooks) can execute scripts when a session begins, a user submits a prompt, a tool runs, or a task stops. They are useful for actions that should not depend on the model remembering to perform them, such as checking a command, scanning for secrets, or running validation before stopping.

The Ponytail plugin in my environment includes hooks. They load the active mode at session start, track mode changes when a prompt is submitted, and pass the same constraints to subagents. I reviewed and trusted the current hook definitions by hash, so a changed file will require another review.

Hooks are useful guardrails, while sandboxing, approvals, rules, and server-side authorization still define the wider security boundary. A hook that runs after a tool call cannot undo an action that already happened. Checks that must block an operation belong before execution, and risky writes still need an explicit approval policy.

### The CLI keeps local execution repeatable

The CLI is the least glamorous part of this setup and one of the parts I rely on most.

This repository has scripts for building, cleaning, and checking reading-time output. The agent does not need to reconstruct the Ruby and Bundler environment on every run. It invokes a project-approved command, receives an exit code, and gets output that can be inspected or saved.

Codex itself can also enter scripts, CI, and Unix pipelines through [`codex exec`](https://learn.chatgpt.com/docs/non-interactive-mode). It can consume standard input, emit JSONL events, and run with an explicit sandbox. Interactive work fits the desktop app or TUI, while repeated checks are often better expressed through the CLI.

MCP is a good fit for structured discovery and authenticated remote services. The CLI works well for local development chains and mature existing commands. A hook can decide that a script must run at a lifecycle boundary, while a skill explains how that check fits into the larger task.

## How one small fix moved through the whole system

The reading-time problem started with two visible symptoms in my prompt. The repository's `AGENTS.md` required a site-wide check for shared template changes and pointed to the project's build scripts. Memory supplied context from the previous article and its earlier validation workflow.

The `diagnosing-bugs` skill then required a check that would fail while the English page still contained `6 minute read` or the Chinese page still claimed less than one minute. Ponytail pushed the implementation toward one shared fix instead of per-post overrides.

The terminal revealed that Jekyll 3.9.5 counted words by splitting on whitespace. That works reasonably for English and badly undercounts Chinese paragraphs. The final template selected singular or plural English labels, estimated Chinese reading time from rendered character count, and left behind a small runnable regression check.

After the Jekyll build passed, the Browser plugin refreshed both pages and verified that the actual DOM contained `6 minutes read` and `7 分钟阅读`. Git then kept the article update and the site-wide bug fix in separate commits and pushed them independently.

No single component completed that task. Project guidance reduced accidental changes, memory shortened the return trip, skills preserved diagnostic discipline, the plugin and MCP supplied browser capability, hooks kept a working style active, and the CLI made the result repeatable.

That is where I feel the productivity gain. I repeat less background, the definition of done is clearer, and the agent is less likely to stop at the premature milestone of having changed some files.

## What maximizing agent capability means to me now

I no longer associate “maximum capability” with enabling every permission or installing every plugin I can find.

A mature agent environment keeps information in the place that matches its lifetime. Project rules load deterministically. Personal experience can be retrieved. Detailed workflows appear only when needed. External tools have clear authentication and approval boundaries, and mechanical checks leave visible evidence.

The model still matters, but it no longer determines the entire experience. The same model behaves much more reliably when it enters an environment with clear rules, useful history, real tools, and a habit of verifying outcomes.

That is the combination I want to keep improving. Repeated mistakes can become project guidance. Stable procedures can become skills. A workflow becomes a plugin when it needs distribution or connected services. Existing CLI tools remain in place when they already solve the problem well. MCP enters when structured remote capability is useful, and hooks take care of checks that must happen at fixed moments.

The result is fairly practical. Codex knows where it is, can recover what we learned before, has a method for the task, and can hand its work to real tools for verification.

## Sources

- [Codex customization](https://learn.chatgpt.com/docs/customization/overview)
- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex Memories](https://learn.chatgpt.com/docs/customization/memories)
- [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)
- [Codex Skills](https://developers.openai.com/plugins/concepts/skills)
- [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- [Codex Hooks](https://learn.chatgpt.com/docs/hooks)
- [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
