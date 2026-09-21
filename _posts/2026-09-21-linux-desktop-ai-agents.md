---
layout: post
lang: en
language: en
translation_url: /zh/2026-09-21-linux-desktop-ai-agents/
permalink: /2026-09-21-linux-desktop-ai-agents/
title: Why I Increasingly Prefer Working on Linux
subtitle: A post from Tibo got me thinking about sharing a computer with AI agents
tags: [Linux, Agent Workflows]
readtime: true
share-img: /assets/img/linux-desktop-ai-agents/tibo-post.jpg
---

While scrolling through X, I came across [a short post from Tibo](https://x.com/thsottiaux/status/2101431497437950458).

> 2026 is the year of linux desktop

The “year of the Linux desktop” is a familiar promise. Every year looks promising, and every year leaves room for another discussion. [Vitaly had a good reply](https://x.com/VitalyGod/status/2101450868566433977).

> I've heard this enough times that my spare SSD looks tired.

![Tibo's post calling 2026 the year of the Linux desktop](/assets/img/linux-desktop-ai-agents/tibo-post.jpg)

The post resonated with me. Most of the students around me use Windows at their desks. I keep working on Linux. Robotics training is one reason, but over time I have found more reasons to keep everyday work there too. AI agents account for a substantial part of that.

## My computer has another user now

You can see it in the way I work. When writing a blog post, the agent can edit Markdown, run the site build, and open a browser to check the result. For software or environment problems, I ask it to inspect configuration and logs before making changes. After adding [BrowserSkill](/2026-09-21-browserskill-codex-browser-workflow/), it can also use an existing browser login for website tasks.

Taken together, these capabilities change how I use the computer. I give the agent a goal, let it complete a stretch of work across files and tools, and then review the result. Some of the small chores disappear, including copying error messages, finding settings, and moving a change from one place to another.

Linux suits this well. Many tools expose command-line interfaces. Configuration often lives in text files, and programs write useful state to logs. An agent can read that information, run a command, and check the output. It has a practical way to keep a task moving.

That is what I mean when I say Linux feels naturally welcoming to agents. Linux was not designed around large language models. Its existing support for scripts and automation happens to give today's agents useful ways to work.

Windows has PowerShell and WSL, and macOS has a mature terminal environment. I have not run a rigorous comparison of all three, and I am not trying to persuade everyone to switch. Linux fits the workflow I have already built around local files, code, and the browser.

## I want to see what the agent did

The more I use agents, the more I care about checking their work.

If an agent says it changed a file, I want to see the diff. If it says a service started, its process and listening port should be observable. Clicking a website button should be followed by checking the resulting page. Linux often gives me direct ways to inspect this state, and logs provide a useful starting point when something fails.

Agents do not make driver compatibility or desktop application problems disappear. I also do not want one casually changing a training environment or repeatedly taking focus while working on a website. Commands and APIs come first where they fit; browser tasks use browser tools, and work that genuinely depends on a GUI goes to desktop tools. That division makes me more comfortable handing over real tasks.

While the wider discussion continues about when Linux will become a mainstream desktop, I already have a personal reason to stay. It lets me share work with an agent on the same machine, with results I can often inspect directly.

## Could the next step be an agent-native operating system?

I wonder what would happen if an operating system were designed around this way of working from the beginning.

I had heard about a Linux distribution whose name began with “oma.” Looking it up led me to [Omarchy](https://omarchy.org/), started by DHH and built on Arch with desktop components including Hyprland. Its official materials now put agents prominently in the product. The [Quattro release notes](https://github.com/omacom/omarchy/releases/tag/v4.0.0) describe choosing a default coding agent and opening an agent diagnosis from an application crash notification.

**I have not tried Omarchy myself. For now, it is a direction I want to watch.** Those integrations show an effort to make agents part of everyday system interaction, extending beyond adding a chat application to the installation.

The agent-native system I would like to use would give tasks their own working spaces and make permissions, execution history, and undo clear. When an application fails, the system could hand relevant context to an agent, let it explain the issue and prepare a change, and leave me to decide whether to apply it. Convenience should come with a way to inspect and recover.

I do not know whether 2026 will eventually be remembered as the year of the Linux desktop. At my desk, Linux is already the system I use for everyday work. What interests me next is which ordinary tasks an agent can make less troublesome.
