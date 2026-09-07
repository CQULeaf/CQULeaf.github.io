---
layout: post
lang: zh
language: zh-CN
translation_url: /2024-07-05-code-review/
permalink: /zh/2024-07-05-code-review/
title: Code Review 入门
subtitle: 审查的目标与反馈流程，以及 GitHub Pull Request 的辅助作用
tags: [Code Review, GitHub]
readtime: true
share-title: Code Review 入门
share-description: 介绍代码审查的目标与反馈流程，以及 GitHub Pull Request 如何辅助审查。
share-img: /assets/img/project-logos/yxh-website.png
---

Code review 通过**阅读和讨论源代码**来发现 bug 和可维护性问题。通常，一次 code review 会发生在代码合并进主代码库之前。

高质量的 code review 能够在开发早期就**阻止 bug 和错误进入项目**，并通过**提升代码质量**让整个开发流程更稳定、更高效。

## 什么是 Code Review 流程？

我认为主要有三个方面值得关注：

1. 提前根据团队或项目的标准，检查新增代码中是否存在 bug、错误或质量问题。
   - code review 不应该只是单向输出意见。它带来的一个重要隐性收益，是**整个团队编码能力的共同提升**。
2. 明确 code review 请求的时间节奏、轮次以及最低要求。
3. 设计反馈应该如何给出。
   - 在指出问题时，也要记得肯定代码中的优点，并在不足之处给出可行的替代建议。

## 为什么 Code Review 很重要？

1. 发现审查者能够识别的缺陷，但不能保证代码完全没有 bug。
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

审查工具把 diff、评论和处理结果放在一起，方便跟进反馈，也可以把自动检查接入 Pull Request。代码是否符合需求、设计是否合理，仍然需要审查者判断。

两类自动分析可以辅助人工审查。

1. **静态分析**在不运行程序的情况下检查代码，例如 lint 和类型检查。
2. **动态分析**通过运行程序观察行为，例如测试运行期间的行为检查。

两者按是否执行程序区分，与检查发生在合并前还是合并后无关。

## 把 GitHub 当作强大的 Code Review 工具

GitHub 在 Pull Request 中提供[代码审查功能](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)，支持评论、批准改动或请求修改。能够强制执行哪些审查规则，取决于仓库和套餐。

拥有仓库写权限的 PR 作者可以向符合条件的协作者请求审查。拥有读权限的人可以查看改动并提交反馈。

除了整体层面的讨论之外，我们还可以：

- 逐行查看 diff；
- 进行 inline comment；
- 回顾改动历史；
- 甚至在网页界面里直接处理一些简单的 Git 冲突。

GitHub 还支持通过 marketplace 集成更多 review 工具，从而进一步构建更完整的 review 流程。
