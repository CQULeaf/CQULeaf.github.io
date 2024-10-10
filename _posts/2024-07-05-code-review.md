---
layout: post
title: Learn to Perform a good Code Review
subtitle: Make the software development process more efficient
tags: [Software Development]
---

- [What Is the Code Review Process?](#what-is-the-code-review-process)
- [Why Is Code Review Critical?](#why-is-code-review-critical)
- [How to Perform a Code Review?](#how-to-perform-a-code-review)
  - [Over-the-Shoulder Code Reviews](#over-the-shoulder-code-reviews)
  - [Tool-Assisted Code Reviews](#tool-assisted-code-reviews)
- [Why Using Code Review Tools?](#why-using-code-review-tools)
- [Use GitHub as a Powerful Code Review Tool](#use-github-as-a-powerful-code-review-tool)

Code review is a part of the software development process which involves ***testing the source code*** to identify bugs at an early stage. A code review process is typically conducted before merging with the codebase.

An effective code review ***prevents bugs and errors*** from getting into our project by ***improving code quality*** at an early stage of the software development process.

## What Is the Code Review Process?

There are three aspects we should consider:

1. Assess any new code for bugs, errors, and quality standards set by the team or group in ahead.
   - The code review process should not just consist of ***one-sided feedback***. Therefore, an intangible benefit of the code review process is ***the collective team’s improved coding skills***.
2. Decide on ***timelines, rounds, and minimal requirements*** for submitting code review requests.
3. How feedback should be given.
    - Make sure we highlignt the positive aspects of the code while suggesting alternatives for drawbacks.

## Why Is Code Review Critical?

1. Ensure that we have no bugs in code.
2. Minimize our chances of having issues.
3. Confirm new code adheres to guidelines.
4. Increase the efficiency of new code.

Code reviews further lead to improving ***other team members’ expertise***. As a senior developer typically conducts a code review, a junior developer may use this feedback to improve their own coding.

## How to Perform a Code Review?

Here I will introduce two possible ways.

### Over-the-Shoulder Code Reviews

Over-the-shoulder code reviews are done on the developer’s workstation, where an experienced team member walks through the new code, providing suggestions through a conversation/comment. It is the easiest approach to code reviews and does not require a pre-defined structure.

### Tool-Assisted Code Reviews

A tool-assisted code review process involves the use of a specialized tool to facilitate the process of code review. A tool generally helps us with the following tasks:

- Organize and display the updated files in a change.
- Facilitate a conversation between reviewers and developers.
- Assess the efficacy of the code review process with metrics.

## Why Using Code Review Tools?

The main outcome of a code review process is to ***increase efficiency***. While these traditional methods of code review have worked in the past, **you may be losing efficiency if you haven’t switched to a code review tool**.

A code review tool automates the process of code review so that a reviewer solely focuses on the code and it can integrate with our development cycle to initiate a code review before new code is merged into the main codebase.

There are two types of code testing in software development:

1. **Dynamic**: Dynamic analysis involves checking if the code follows a set of rules and running unit tests, typically performed by a ***predefined script***.
2. **Static**: Static code testing is done *after* a developer creates a new code to be merged into the current code.

## Use GitHub as a Powerful Code Review Tool

GitHub has an **inbuilt code review tool** in its pull requests. The code review tool is bundled with GitHub’s core service, which provides a free plan for developers. GitHub’s free plan limits the number of users to three in private repositories. Paid plans start at $7 per month.

GitHub allows a **reviewer** with access to the code repository to assign themselves to the pull request and complete a review. A **developer** who has submitted the pull request may also request a review from an administrator.

In addition to the discussion on the overall pull request, we are able to **analyze the diff, comment inline, and check the history of changes**. The code review tool also allows us to resolve simple Git conflicts through the web interface. GitHub even allows us to integrate with additional review tools through its marketplace to create a more robust process.
