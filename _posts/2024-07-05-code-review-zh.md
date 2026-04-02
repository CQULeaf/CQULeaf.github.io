---
layout: post
lang: zh
language: zh-CN
translation_url: /2024-07-05-code-review/
permalink: /zh/2024-07-05-code-review/
title: 学会做好 Code Review
subtitle: 让软件开发流程更高效
tags: [Software Development]
readtime: true
---

Code review 是软件开发流程中的重要环节，它通过**检查源代码**来帮助我们在早期发现 bug。通常，一次 code review 会发生在代码合并进主代码库之前。

高质量的 code review 能够在开发早期就**阻止 bug 和错误进入项目**，并通过**提升代码质量**让整个开发流程更稳定、更高效。

## 什么是 Code Review 流程？

我认为主要有三个方面值得关注：

1. 提前根据团队或项目的标准，检查新增代码中是否存在 bug、错误或质量问题。
   - code review 不应该只是单向输出意见。它带来的一个重要隐性收益，是**整个团队编码能力的共同提升**。
2. 明确 code review 请求的时间节奏、轮次以及最低要求。
3. 设计反馈应该如何给出。
   - 在指出问题时，也要记得肯定代码中的优点，并在不足之处给出可行的替代建议。

## 为什么 Code Review 很重要？

1. 尽可能保证代码里没有明显 bug。
2. 降低后续出现问题的概率。
3. 确保新代码符合既定规范。
4. 提升新增代码的整体效率和可维护性。

除此之外，code review 还能够促进团队成员能力成长。通常 senior developer 会承担更多 review 工作，而 junior developer 也能从这些反馈中不断改进自己的编码习惯。

## 怎样进行 Code Review？

这里介绍两种常见方式。

### Over-the-Shoulder Code Review

这种方式通常直接在开发者的工作站旁进行，由更有经验的成员一起过代码，边看边讨论、边给建议。它是最直接、最轻量的 review 方式，也不一定需要特别严格的流程。

### Tool-Assisted Code Review

借助工具的 code review，会使用专门的平台或服务来辅助整个流程。一个成熟的 review 工具通常会帮助我们完成这些事：

- 组织并展示一次改动中更新过的文件；
- 帮助 reviewer 和 developer 之间进行讨论；
- 用指标评估 code review 流程本身的效率。

## 为什么要使用 Code Review 工具？

Code review 的核心目标之一就是**提高效率**。传统的 review 方式在很多时候当然也能工作，但如果迟迟没有切换到更合适的工具，你很可能已经在无形中损失了效率。

一个 code review 工具可以把流程里重复、机械的部分自动化，让 reviewer 更专注于代码本身，同时也能更自然地融入我们的开发流程，在代码合并前自动触发 review。

在软件开发中，代码检测大致可以分成两类：

1. **动态检测**：动态分析通常是检查代码是否遵守某些规则，并执行单元测试，这一部分往往由**预先写好的脚本**完成。
2. **静态检测**：静态代码检测则发生在开发者写完新代码、准备合并之后。

## 把 GitHub 当作强大的 Code Review 工具

GitHub 的 Pull Request 本身就内置了相当实用的 code review 能力，而且它是 GitHub 核心服务的一部分。对于开发者来说，免费方案已经能覆盖不少场景，而付费方案也能进一步支持更复杂的团队协作。

在 GitHub 中，拥有仓库权限的 **reviewer** 可以给某个 pull request 分配 review，并完成审查。提交 PR 的 **developer** 也可以主动向管理员或团队成员请求 review。

除了整体层面的讨论之外，我们还可以：

- 逐行查看 diff；
- 进行 inline comment；
- 回顾改动历史；
- 甚至在网页界面里直接处理一些简单的 Git 冲突。

GitHub 还支持通过 marketplace 集成更多 review 工具，从而进一步构建更完整的 review 流程。
