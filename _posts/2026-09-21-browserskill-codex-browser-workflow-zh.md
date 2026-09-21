---
layout: post
lang: zh
language: zh-CN
translation_url: /2026-09-21-browserskill-codex-browser-workflow/
permalink: /zh/2026-09-21-browserskill-codex-browser-workflow/
title: 推荐 BrowserSkill，让 AI Agent 使用已登录的浏览器
subtitle: 沿用现有账号和扩展，在独立 Agent Window 中完成网页任务
tags: [Codex, Agent Workflows]
readtime: true
share-img: /assets/img/browserskill-codex-browser-workflow/todo-test.png
---

如果你已经在用 Codex、Claude Code 这类 Agent，又希望它能帮忙操作日常使用的网页，我推荐试试腾讯开源的 [BrowserSkill](https://github.com/Tencent/BrowserSkill)。

它连接你正在使用的浏览器，沿用已有的登录状态和扩展，再给 Agent 一个单独的工作窗口。你不必为了做一件网页任务，先在另一套浏览器里重新登录。

我最近用 Codex 跑了一轮实际测试。中文输入、勾选待办和截图都成功了，打开 GitHub 时直接沿用了已有登录态，普通网页的借用和归还也通过了验证。对我来说，这些已经足够让它进入日常工具清单。

## 最吸引我的是现成的浏览器环境

很多网页任务，麻烦从登录之前就开始了。网站在你平时的浏览器里明明能用，Agent 新开的窗口却需要重新处理账号、二次验证和浏览器设置。

BrowserSkill 通过扩展连接现有的 Chrome 或 Edge。Agent 使用同一浏览器配置中的登录状态，也能保留已有扩展带来的功能。对于已经登录的网站，这能省掉一段准备工作。

任务默认在独立的 **Agent Window** 中进行。需要接着操作你正在看的页面时，它可以借用那个标签页，完成后归还。你可以看到它在做什么，遇到需要人工处理的步骤时，工具也提供了请求接管的入口。

这里要分清工作窗口和账号权限。Agent Window 给任务分出了操作区域，登录状态仍然共享。它在网页上执行的操作，依然可能影响你的账号；付款、发布或删除内容这类事情，仍需要明确任务范围。

## 它可以接到你已经在用的 Agent 上

BrowserSkill 提供 `bsk` 命令行工具和配套 Skill。只要 Agent 能调用 Shell，就能通过这套入口读取页面、填写表单和点击控件。项目列出的客户端包括 Codex、Claude Code、Cursor 等，不需要为了浏览器操作再换一套聊天工具。

它的基本流程很容易理解。

```text
Agent → bsk 命令 → 本地服务 → 浏览器扩展 → 网页
```

Agent 先读取页面中的文字和控件，取得按钮、输入框等元素的引用，再执行操作。页面变化后重新读取，确认结果。截图用于检查布局、图片等需要视觉判断的内容。

官方提供 macOS、Linux 和 Windows 的 CLI，并支持 Chrome、Microsoft Edge。安装时需要把 CLI、配套 Skill 和浏览器扩展接好。按[官方安装说明](https://github.com/Tencent/BrowserSkill/blob/main/AGENT_INSTALL.md)完成以后，用 `bsk doctor` 检查连接，再跑一次小任务，比只看“安装成功”更可靠。CLI 与扩展的版本也需要匹配。

## 一次简单实测，看得见的效果

我用的是 BrowserSkill 0.3.0，测试从 [TodoMVC 演示页](https://demo.playwright.dev/todomvc/)开始。

Codex 输入“BrowserSkill 中文输入实测”，按回车添加待办，再点击复选框。随后读回的页面状态显示任务已经完成，剩余数量变成零。最后，它清除了自己创建的测试条目。

![BrowserSkill 在 TodoMVC 中添加并完成中文待办](/assets/img/browserskill-codex-browser-workflow/todo-test.png)

*本次测试截图，中文输入和勾选结果都能从页面中确认。*

接着打开 GitHub 公共仓库页，Agent Window 直接显示已登录界面，没有要求重新登录。已有的页面扩展也在运行。这一步最能体现 BrowserSkill 的用途，网页任务可以接着现有环境往下做。

我还测试了它是否打断当前窗口。单独复测时，我们在后台开窗、导航、读取页面、截图和结束会话的每一步前后，都检查了系统活动窗口，焦点始终留在 Codex。普通测试网页经确认借出以后，也成功回到了原来的窗口和位置。

这是一轮基础功能验证，还没有覆盖复杂编辑器、文件上传下载或多任务并行，也没有与其他工具做同条件测速。它在这些小任务里的表现已经很顺畅，但不能据此保证所有网站都能无人值守地完成。

## 哪些情况下值得用

我会优先把 BrowserSkill 用在需要现有登录态的网页任务上，例如读取只有登录后才能看到的页面，或填写需要人工检查后再提交的表单。让熟悉的 Agent 接着使用日常浏览器，是它最值得尝试的地方。

如果主要需求是独立浏览器测试、重复执行固定流程，Playwright 或 agent-browser 仍然值得保留。这些工具也有复用会话的方式；选择 BrowserSkill，主要看你是否需要它围绕现有浏览器设计的 Agent Window 和标签借还流程。

刚开始可以只给它一个小任务，打开网页、读取内容，再做一个容易撤销的操作。确认登录态、输入和结果读回都正常以后，再交给它更长的流程。

**对已经在用 AI Agent、又经常处理登录网页的人，BrowserSkill 值得装来试一试。** 我会先用它做日常网页任务，观察它在真实使用中还有哪些需要接管的地方。
