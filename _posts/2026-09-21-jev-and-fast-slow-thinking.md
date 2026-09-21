---
layout: post
lang: en
language: en
translation_url: /zh/2026-09-21-jev-and-fast-slow-thinking/
permalink: /2026-09-21-jev-and-fast-slow-thinking/
title: Jev and Fast and Slow Thinking
subtitle: Why I am interested in the System One idea, but still waiting before using it
tags: [AI, Agent Workflows]
readtime: true
share-title: Jev and Fast and Slow Thinking
---

Jev appeared on September 15, and within a few days it was everywhere in the developer conversations I follow. TypeSafe AI describes it as the first public System One model. It receives a state and a set of typed questions, then returns choices, scores, or yes-and-no probabilities that software can use directly. It does not write an answer for a person to read.

That description is interesting, but it is not the part that stayed with me. I keep returning to the architectural idea behind the name. System One points back to Daniel Kahneman’s *Thinking, Fast and Slow*. I first read the book as a popular psychology bestseller, and I did not expect it to lead into architectural ideas for large language models and embodied intelligence. The book describes how fast, automatic judgments interact with slower, deliberate reasoning. Jev is not a model of human cognition, but the analogy still gives us a useful question. What should an AI system do quickly and repeatedly, and what should it stop to think through carefully?

## A model for decisions inside a workflow

Most software has plenty of small decisions. A browser agent chooses the next button. A coding agent decides whether a tool result matters. A support system routes a message. An evaluator checks whether an agent really finished its task.

Today, all of these decisions are often handed to a general language model. The model reads the state, reasons in tokens, and produces a string that the surrounding code must parse. Jev changes the shape of that exchange. The application defines the possible answers first, and Jev returns a typed answer with probabilities.

The appeal is easy to understand. A model can choose one item from a list without composing a paragraph about the choice. Independent questions can be sent together. Confidence can become a rule in ordinary code. A sufficiently reliable result can proceed automatically, while an uncertain result can go to a stronger model or a person.

This is also where the claims need to stay in their lane. TypeSafe publishes a price of $0.042 per million input tokens and free output tokens. It reports end-to-end latency in the tens or hundreds of milliseconds for System One shaped queries. Its larger speed and cost comparisons come from selected workflows, with structured wrappers around the comparison models. Jev’s own documentation also lists literal reading, numeric precision, date comparison, indirection, irrelevant context, and adversarial content as known weak spots.

Typed output removes one class of interface failure, but it cannot guarantee a correct judgment. A model can choose the wrong item from a perfectly valid list.

## The early examples are more interesting than the slogan

The projects around Jev make the System One idea easier to see.

In [jev-ultrafast](https://github.com/browser-use/jev-ultrafast), a browser harness turns a page into numbered controls. Jev chooses the next action and target, while another model supplies text when a form needs writing. The demo makes sense because the action space is already bounded. The reported seven-second flight search is a narrow demonstration with several timing exclusions, so it does not establish a general speedup over Codex.

The [jev-browser-use](https://github.com/wy-coliney/jev-browser-use) project is closer to the way I use browser tools. Codex gives the goal and the boundary, then Jev runs a small loop of observation, selection, and execution inside an existing browser connection. Low confidence, no progress, stale state, or a need for visual interpretation returns control to Codex. The possible saving comes from reducing slow-model turns. Adding one Jev request before every Codex action would be a different calculation.

There is a similar split in [Foreman](https://github.com/thruwire/foreman). A Codex worker keeps its broad coding loop while a second loop watches bounded evidence such as output, diffs, tests, and elapsed time. Jev estimates whether the worker is stuck, drifting, or ready for verification. Ordinary code decides whether to continue, steer, stop, retry, or verify. The project calls itself an architectural experiment, which is the right level of confidence for now.

The robotics examples make the distinction sharper. Figure’s [Helix report](https://www.figure.ai/news/helix) describes two asynchronous systems. A slow vision-language system updates a semantic latent 7 to 9 times per second, while a fast visuomotor policy reads the latest observation and recent latent and outputs continuous actions at 200 Hz. The fast system does not have to wait for a new interpretation before adjusting to a changing world. The [GR00T N1 paper](https://arxiv.org/html/2503.14734v2) also connects this two-system design to Kahneman and lets its vision-language module and action model cooperate through learned features.

These cases do not prove that Jev belongs in every control loop. They show a broader working pattern. Fast behavior needs fresh observations and a small action space. Slow reasoning changes the goal, representation, or policy when the current routine stops being enough.

## Why I am waiting

Jev has been public for less than a week. The release is early access, the service is young, and the surrounding ecosystem is still producing quick demos. That is exactly when a new idea is easiest to overread.

I want to see what remains after the first wave of enthusiasm. How often do low-confidence results actually reach a useful fallback? Do the thresholds stay stable on messy inputs, long context, non-English text, and changing web pages? How much of the apparent speed comes from avoiding a slow-model round trip, and how much disappears into observation, OCR, network delay, retries, and final verification?

The first Codex benchmark I found is a good example of the evidence I want to see more of. A small project reports lower Codex input and elapsed time for several 64-record synthetic labelling tasks. Its own report also preserves negative earlier runs, warns that the data is clean and templated, and says the added TypeSafe inference must be included in cost discussions. That kind of disclosure makes the result more useful, even when it does not settle the question.

So my current position is simple. I am interested in the architecture, but I am not ready to put it in my daily workflow. I will let the bullets keep flying for a while.

## What I will watch

For Codex, I want to see whether a fast model can take over a whole bounded stretch of work, such as batch classification or a repetitive evidence pass. A skill that merely explains how to call an API is useful documentation. A real System One layer would need to reduce slow-model work while preserving reviewable evidence and a safe fallback path.

For browser and desktop use, the browser looks like the easier place to test the idea. DOM or accessibility trees can provide a candidate action space. General desktop work still depends heavily on screenshots, OCR, accessibility coverage, and visual interpretation. Replacing the decision model alone will not solve those parts.

Jev has made me look again at a question that predates the model. **An intelligent system does not have to use its most expensive form of reasoning for every step, but it does need to know when a quick judgment is enough, when the state has gone stale, and when it should slow down.**

For now, I would rather understand that division before deciding whether to install and use it.

### Sources

- [TypeSafe AI, Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe AI, Jev 1.13 known limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
- [LangChain, Jev as a Judge for Agent Evals](https://www.langchain.com/blog/jev-agent-evals-langsmith)
- [Macmillan, Thinking, Fast and Slow](https://us.macmillan.com/books/9780374533557/thinkingfastandslow/)
