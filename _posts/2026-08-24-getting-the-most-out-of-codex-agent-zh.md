---
layout: post
lang: zh
language: zh-CN
translation_url: /2026-08-24-getting-the-most-out-of-codex-agent/
permalink: /zh/2026-08-24-getting-the-most-out-of-codex-agent/
title: 我怎样把 Codex 的 Agent 能力真正用起来
subtitle: 从 AGENTS.md、Memory 到 Plugins、MCP、Hooks 与 CLI
tags: [Ideas and Insights, Software Development]
readtime: true
share-title: 我怎样把 Codex 的 Agent 能力真正用起来
share-description: 一次真实工作流复盘，看看 AGENTS.md、Memory、Skills、Plugins、MCP、Hooks 与 CLI 怎样配合，让 Codex 从会做事变成能把事情做完。
share-img: /assets/img/project-logos/yxh-website.png
---

在上一篇[我目前推荐使用的 Codex Skills](/zh/2026-04-02-codex-skills-i-recommend/)里，我把自己的 Codex 环境分成了三层。

第一层是 Codex 本身、项目规则和长期上下文。第二层是 Skills。第三层是 Plugins 和外部服务。写着写着，文章几乎把篇幅都给了中间那层。Skills 容易讲清楚，一个名字对应一类任务，读者也能很快找到自己想装的东西。

剩下两层更难写，因为它们很少单独产生一个漂亮的结果。`AGENTS.md` 不会替我写完文章，Memory 也不会自己修好 Bug。MCP、Hooks 和 CLI 分开看，都像某种基础设置。等它们在一次任务里接上以后，差别才会出现。

刚才我在这个博客里就经历了一次。英文文章的阅读时长显示成了 `6 minute read`，中文同一篇文章却显示“少于 1 分钟阅读”。最后的修改只有一个 Liquid 模板、两条翻译和一个很小的检查脚本。完成这点修改，用到的东西却横跨了三层。

这件小事正好说明了我现在怎样理解 Codex 的 Agent 能力。

## 第一层处理不同持续时间的上下文

我现在会先判断一条信息需要存在多久。

当前任务里的临时要求放在对话里。每次进入仓库都要遵守的约定放进 `AGENTS.md`。过去工作里可能再次有用的经验交给 Memory。再往下，模型、权限、插件开关、MCP 和 Hooks 的状态由 `config.toml` 等配置管理。

这些位置会一起影响 Agent，但职责差得很远。

### AGENTS.md 负责确定的项目规则

OpenAI 的 [AGENTS.md 文档](https://learn.chatgpt.com/docs/agent-configuration/agents-md)说明，Codex 会在开始工作前读取这些文件。全局规则先加载，随后从项目根目录一路走到当前目录，离当前工作位置更近的规则拥有更高优先级。

这让 `AGENTS.md` 很适合保存确定的项目事实。这个博客要求新文章默认同时写中文和英文，两个版本要保持结构和链接配对。仓库还规定了构建脚本、生成目录和编辑边界。于是我只说“再写一篇新博客”，Agent 已经知道要创建两份文章，也知道不能直接改 `_site/`。

这类文件应该短一些。它需要告诉 Agent 项目怎样工作、哪里容易出问题，以及完成以后怎样验证。某一类任务的详细步骤继续交给 Skill，仓库里已经存在的确定动作则交给脚本。规则、流程和命令各有自己的位置，`AGENTS.md` 也就不用越写越长。

### Memory 保存可以复用的过去

Memory 适合保存用户偏好、以前做过的判断和踩过的坑。OpenAI 的 [Memories 文档](https://learn.chatgpt.com/docs/customization/memories)也明确提醒，必须执行的团队规则仍然要留在 `AGENTS.md` 或版本库文档里。本地 Codex Memory 和 ChatGPT 网页里的 Memory 还是两套分开的存储。

这次更新文章时，Memory 找回了上一篇文章的双语文件、链接关系和过去使用的构建方式。它还记得此前直接读取 OpenAI 文档时遇到过 TLS 问题，提醒我需要保留查证边界。这些内容省去了重新翻旧对话的时间。

我不会让 Memory 直接决定当前产品事实。它在后台生成，可能延迟，也可能跳过某次对话。软件版本、插件状态和官方能力仍然要现场检查。这次我重新读取了官方文档，也运行了 `codex plugin list --json`，确认哪些插件已经安装并启用。

对我来说，`AGENTS.md` 提供确定性，Memory 提供连续性。两者放在一起，Agent 既知道眼前这个仓库有哪些规矩，也不会每次都像第一次见到我。

## Skills 放在中间刚好

上一篇已经详细写过 Skills，这里只补一件事。

Skill 主要回答一类任务应该怎样完成。它可以带说明、参考资料和脚本，Codex 会先看到名称与描述，任务命中以后再读取完整内容。这种渐进加载很适合较长的流程，因为无关任务不用支付整份说明的上下文成本。

这次的 `diagnosing-bugs` Skill 要求先做出一个能稳定失败的检查，再讨论原因。`human-writing` 负责材料边界和文章节奏。它们规定了做事的方法，外部账号、浏览器控制和 Git 权限仍由其他层提供。

## Plugin 是可安装的能力组合

Skill 和 Plugin 经常放在一起出现，二者的粒度不同。

按照 OpenAI 的 [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)，Skill 是工作流的创作格式，Plugin 是供人发现、安装、共享和发布的包。一个 Plugin 可以只带 Skills，也可以带 MCP server，还能把两者放在一起。可选 UI、Hooks 和其他资源也可以随包提供。

我当前启用的插件很多，实际高频的只有几组。

Browser 和 Chrome 插件负责网页操作。前者适合打开本地页面和应用内浏览器，后者可以利用我已有的 Chrome 标签页与登录状态。这个博客每次构建以后，我会让 Browser 打开文章页，读取标题、更新时间和页面结构。构建成功只能证明 Jekyll 生成了文件，浏览器里的结果才是读者会看到的东西。

GitHub 插件适合处理 PR、Issue、review comment 和 CI。普通 `git` 命令仍然负责本地提交、分支和推送。刚才推送文章时，HTTPS 凭据读取失败，终端很快确认 SSH 已经认证，随后用现有 SSH 身份完成推送。Plugin 提供仓库协作语义，CLI 保留了最直接的诊断路径。

Documents、PDF、Spreadsheets 和 Presentations 这一组，则把文件运行时和对应工作流一起交给 Codex。Ponytail 更能说明 Plugin 和 Skill 的关系。它包含一组偏向最小实现的 Skills，也带有生命周期 Hooks。安装一次以后，任务流程和启动行为可以同时进入环境。

插件列表很长并不会自动提高效率。安装、启用、完成授权和当前对话里可调用，仍然是几个不同状态。我更愿意按工作流保留插件，确认它能在哪一步提供真实能力。

## MCP、Hooks 和 CLI 接住不同的动作

第三层里最容易混在一起的，是 MCP、Hooks 和 CLI。它们都能让 Agent 做出动作，触发方式和适用范围并不相同。

### MCP 提供结构化的外部能力

[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp) 把工具和上下文用统一协议暴露给模型。Server 可以提供 tools、resources 和 prompts。Codex 目前支持本地 STDIO server，也支持 Streamable HTTP 与对应的认证方式。

Skill 会说明什么时候调用工具、按什么顺序处理结果。MCP server 决定有哪些工具可用、输入输出长什么样，以及谁有权限执行。两者一起出现时，Agent 既有方法，也有经过约束的行动入口。

我的环境里，`node_repl` 以 MCP server 的形式注册。Browser 插件的 Skill 规定怎样选择浏览器、怎样检查页面和何时把标签页交给用户，对应工具负责打开页面、读取 DOM 和查看控制台。GitHub 插件也采用类似组合，Skills 负责 PR 与 CI 工作流，连接器和 MCP 工具负责读取远端状态。

### Hooks 在固定时点运行

[Codex Hooks](https://learn.chatgpt.com/docs/hooks) 可以在会话开始、用户提交提示、工具调用前后和任务停止等节点执行脚本。它适合放那些不应依赖模型临场想起的动作，比如检查命令、扫描敏感内容或在停止前运行验证。

我安装的 Ponytail 插件就带了 Hooks。它会在会话开始时加载当前模式，在用户提交提示时跟踪模式变化，也会把同一套约束传给子 Agent。这些 Hook 已按当前内容的哈希完成信任确认，文件一旦变化就需要重新审核。

Hooks 很有用，权限控制仍然要由 sandbox、approval、Rules 和服务端鉴权共同负责。工具调用完成以后再运行的 Hook 也无法撤销已经发生的副作用。需要拦截的动作必须放在执行之前，危险写操作还要保留明确的批准边界。

### CLI 保留可重复的本地执行路径

CLI 是这套组合里最朴素的一部分，也是我最常依赖的一部分。

这个仓库把构建、清理和阅读时长检查做成了脚本。Agent 不需要每次重新拼一串 Ruby 与 Bundler 参数，只要运行仓库已经认可的命令。命令有退出码，输出可以保存，失败以后也容易缩小范围。

Codex 自身还能通过 [`codex exec`](https://learn.chatgpt.com/docs/non-interactive-mode) 进入脚本、CI 和管道。它可以接收标准输入、输出 JSONL，也能显式指定 sandbox。交互式任务适合桌面应用和 TUI，重复执行的检查则更适合 CLI。

MCP 适合结构化发现和远程鉴权，CLI 适合本地开发链和已经成熟的命令。Hook 决定某个固定节点要不要自动运行脚本，Skill 再决定整项任务怎样使用这些能力。

## 一次小修复怎样走过整套系统

回到开头的阅读时长问题。

我的提示先指出两个可见症状。仓库里的 `AGENTS.md` 规定共享模板改动要检查全站影响，也规定使用项目脚本构建。Memory 提供上一篇文章和过去验证流程的上下文。

`diagnosing-bugs` Skill 随后要求建立一个会失败的检查。检查在英文出现 `6 minute read` 或中文仍显示“少于 1 分钟阅读”时退出失败。Ponytail 的工作流又把实现压到共享模板，避免在每篇文章里加特殊值。

终端查到 Jekyll 3.9.5 的 `number_of_words` 只按空格分词。这对英文成立，面对中文时却会把一整段压成很少的单词。模板最终给英文补上单复数分支，中文改按渲染后的字符估算，并留下一个可重复运行的检查脚本。

Jekyll 构建通过以后，Browser 插件刷新中英文页面，确认实际 DOM 分别出现 `6 minutes read` 和 `7 分钟阅读`。最后，Git 把文章更新和站点修复拆成两个提交，分别推送。

这里没有哪一个组件独自完成了任务。项目规则先缩小改动范围，Memory 省去了回头找资料的时间。Skill 让诊断按次序进行，页面验证由 Plugin 与 MCP 完成。Hooks 负责长期生效的工作方式，CLI 则留下可以重复运行的检查。

我感受到的生产力提升就来自这里。需要重新解释的背景少了，完成标准更清楚，Agent 也更少停在“文件已经改完”这个过早的终点。

## 我现在怎样看待最大化 Agent 能力

我已经不把“最大化”理解成打开所有权限，或者装下尽可能多的插件。

一个成熟的 Agent 环境会让信息待在合适的位置。项目规则每次进入仓库都会加载，过去的经验也可以重新找回。复杂流程只在需要时展开，外部工具则保留清楚的认证和批准边界。检查结束以后，还要留下别人能够复现的结果。

这样做以后，模型能力当然仍然重要，但日常体验不再只由模型决定。同一个模型进入一个规则清楚、有历史上下文、能调用真实工具并且会验证结果的环境，表现会稳定很多。

我想继续优化的也是这套组合。重复出现的错误会进入项目规则，跑顺的任务再慢慢整理成 Skill。等到流程需要分享给别人，或者要连接外部服务时，我才会考虑 Plugin。现有 CLI 已经做得可靠的事情继续沿用原命令，远程系统需要结构化接入时再配置 MCP。那些必须在固定节点发生的检查，最后才交给 Hooks。

结果很朴素。Codex 进入仓库时知道该遵守什么，也能找到我们以前做过的事。具体方法按任务加载，完成以后再把结果交给真实工具验证。

## 参考资料

- [Codex customization](https://learn.chatgpt.com/docs/customization/overview)
- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex Memories](https://learn.chatgpt.com/docs/customization/memories)
- [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)
- [Codex Skills](https://developers.openai.com/plugins/concepts/skills)
- [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- [Codex Hooks](https://learn.chatgpt.com/docs/hooks)
- [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
