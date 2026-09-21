---
layout: post
lang: zh
language: zh-CN
translation_url: /2026-09-21-linux-desktop-ai-agents/
permalink: /zh/2026-09-21-linux-desktop-ai-agents/
title: 为什么我越来越愿意在 Linux 上办公
subtitle: 从 Tibo 的一条推文，想到与 AI Agent 共用电脑的日常
tags: [Linux, Agent Workflows]
readtime: true
share-img: /assets/img/linux-desktop-ai-agents/tibo-post.jpg
---

刷 X 的时候，看到 [Tibo 发了一句话](https://x.com/thsottiaux/status/2101431497437950458)。

> 2026 is the year of linux desktop

“Linux 桌面之年”这个说法，熟悉 Linux 的人大概都听过。每年都很有希望，每年也都能接着聊。评论里 [Vitaly 的一句调侃](https://x.com/VitalyGod/status/2101450868566433977)很传神。

> I've heard this enough times that my spare SSD looks tired.

![Tibo 关于 2026 年是 Linux 桌面之年的推文截图](/assets/img/linux-desktop-ai-agents/tibo-post.jpg)

我看到这条推文，倒是很有共鸣。身边同学在工位上基本用 Windows，我平时一直用 Linux。做机器人训练当然是一个原因，但用到现在，让我愿意把日常办公也留在上面的理由越来越多，其中很大一部分来自 AI Agent。

## 我的电脑多了一个使用者

看我的使用习惯就能发现，Agent 已经参与了不少具体工作。写博客时，它可以直接改 Markdown，运行构建，再打开浏览器检查结果。遇到软件或环境问题，我会让它先读配置和日志，拿出实际证据再动手。最近接入 [BrowserSkill](/zh/2026-09-21-browserskill-codex-browser-workflow/)以后，它还能沿用已有的浏览器登录状态完成网页任务。

这些事情串起来，电脑的用法就变了。我会把目标交给 Agent，让它在文件和工具之间完成一段工作，再回来检查结果。复制报错、找设置入口、把一段修改搬到另一个地方，这类零碎操作可以少做一些。

Linux 对这种用法很友好。大量工具有命令行入口，配置经常就是文本文件，程序也能把状态写进日志。Agent 可以读取这些信息，调用命令，然后检查输出。它有机会在一个连续的流程里把事情做完。

我说 Linux 对 Agent 有一种“原生的亲近感”，指的就是这些现成接口。Linux 并没有从设计之初就认识大模型，但为脚本和自动化准备的能力，恰好也让今天的 Agent 容易上手。

Windows 有 PowerShell 和 WSL，macOS 也有成熟的终端工具。我没有做过三个系统的严格对比，更无意劝所有人换系统。对我这套已经围绕本地文件、代码和浏览器组织起来的工作方式，Linux 用起来很顺。

## 能让它做，也得能看见它做了什么

用得多了，我反而更在意能不能检查结果。

Agent 说文件改好了，我想看改了哪里。说服务启动了，就应该能读到进程和端口。网页上点过一个按钮，也要检查页面最终变成了什么。Linux 上这些状态通常有比较直接的读取方式，出错以后也更容易沿着日志继续查。

当然，驱动兼容和桌面软件的问题不会因为接入 Agent 就消失。我也不希望它随手改掉训练环境，更不希望它执行网页任务时一直抢走我的焦点。能用命令和 API 的地方先用它们，需要浏览器再进入浏览器，真正依赖 GUI 的工作才交给桌面工具。这种分工让我更愿意把实际任务交出去。

所以，当大家继续讨论 Linux 桌面什么时候普及时，我已经有了一个很个人的留下来的理由。它能让我和 Agent 在同一台电脑上分担工作，而且许多操作都能留下可核对的结果。

## 再往前，会不会有 Agent 原生的操作系统

我也会想，如果把这套用法从一开始就放进系统设计里，会是什么样子？

之前听说过一个名字以“oma”开头的 Linux 发行版，查了一下，是 DHH 发起的 [Omarchy](https://omarchy.org/)。它基于 Arch，采用 Hyprland 等桌面组件。官方现在已经把 Agent 当成产品重点，[Quattro 版本说明](https://github.com/omacom/omarchy/releases/tag/v4.0.0)里提到了选择默认 coding agent，以及从程序崩溃通知进入 Agent 诊断的流程。

**我还没有亲自体验 Omarchy，暂时只把它当成一个值得观察的方向。** 这些集成至少说明，已经有人开始把 Agent 放进操作系统的日常交互，而不只是在安装清单里多放一个聊天客户端。

我期待的 Agent 原生系统，会给任务自己的工作空间，也会让授权、执行记录和撤销操作变得清楚。某个应用出错时，系统可以把相关上下文交给 Agent，先让它解释和准备修改，再由我决定是否应用。做事方便，出了问题也有地方查、有办法退。

至于 2026 最后会不会被记作 Linux 桌面之年，我没有把握。至少在我的工位上，Linux 已经成了每天认真办公的系统。接下来我更想看看，Agent 能让这台电脑的哪些日常操作变得省心。
