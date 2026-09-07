---
layout: post
lang: en
language: en
translation_url: /zh/2024-07-05-code-review/
title: An Introduction to Code Review
subtitle: Review goals, feedback practices, and the role of GitHub pull requests
tags: [Code Review, GitHub]
readtime: true
share-title: An Introduction to Code Review
share-description: An introduction to review goals, feedback practices, and how GitHub pull requests support code review.
share-img: /assets/img/project-logos/yxh-website.png
---

Code review involves **reading and discussing source code** to identify bugs and maintainability issues. It typically happens before a change is merged into the main codebase.

An effective code review ***prevents bugs and errors*** from getting into our project by ***improving code quality*** at an early stage of the software development process.

## What Is the Code Review Process?

There are three aspects we should consider:

1. Assess any new code for bugs, errors, and quality standards set by the team or group in ahead.
   - The code review process should not just consist of ***one-sided feedback***. Therefore, an intangible benefit of the code review process is ***the collective team’s improved coding skills***.
2. Decide on ***timelines, rounds, and minimal requirements*** for submitting code review requests.
3. How feedback should be given.
    - Make sure we highlignt the positive aspects of the code while suggesting alternatives for drawbacks.

## Why Is Code Review Critical?

1. Catch defects that the reviewer can identify; a review cannot guarantee bug-free code.
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

Review tools keep diffs, comments, and decisions together. They can make feedback easier to follow and integrate automated checks into a pull request, while reviewers still need to judge the code and its intent.

Two kinds of automated analysis can complement human review.

1. **Static analysis** examines code without executing it, for example through a linter or type checker.
2. **Dynamic analysis** examines a running program, for example by checking its behavior during tests.

The distinction is whether the program is executed, not whether the check happens before or after a merge.

## Use GitHub as a Powerful Code Review Tool

GitHub provides [code review within pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews). Reviewers can comment, approve changes, or request changes. Available enforcement features depend on the repository and plan.

A pull request author with write access to the repository can request a review from an eligible collaborator. People with read access can inspect the changes and submit their feedback.

In addition to the discussion on the overall pull request, we are able to **analyze the diff, comment inline, and check the history of changes**. The code review tool also allows us to resolve simple Git conflicts through the web interface. GitHub even allows us to integrate with additional review tools through its marketplace to create a more robust process.
