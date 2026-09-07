# AGENTS.md

## 1. Repository Purpose

This repository is a personal website, blog, and portfolio built with Jekyll.

Treat it as a site-maintenance workspace, not as an upstream Beautiful Jekyll theme development repository.

Archived upstream theme materials that are no longer part of day-to-day maintenance live under `docs/archive/upstream-theme/`.

## 2. Default Priorities

When working in this repository, use the following default priority order:

1. Content updates and post/page editing
2. Page maintenance and small UI/style adjustments
3. Local preview and cleanup workflows
4. Larger theme, layout, or configuration refactors

Unless the task explicitly asks for a larger redesign, prefer targeted edits over broad structural changes.

## 3. Recommended Entry Points

Read the target and the context needed for the requested change:

- Post editing: the target post, its translation, and a comparable post only if conventions are unclear.
- Page editing: the target page and its localized counterpart under `zh/`, plus the layouts/includes it uses when relevant.
- Shared labels or navigation: `_data/site-text.yml`, relevant `_config.yml` settings, and their consumers.
- Local build or preview problems: `README.md` and the relevant script under `scripts/`.
- Site-wide layout changes: affected `_layouts/`, `_includes/`, styles, and representative pages.

A typo fix does not require reading the full post archive or unrelated pages. Archived upstream theme materials are reference only when the task needs them.

## 4. Common Commands

Use the repository scripts by default instead of rebuilding commands from scratch.

Start a local preview server:

```bash
./scripts/dev.sh
```

Build the site without serving:

```bash
./scripts/build.sh
```

Clean generated site output and stale failed bundle artifacts:

```bash
./scripts/clean.sh
```

Current local workflow notes:

- `scripts/dev.sh` and `scripts/build.sh` auto-detect Ruby from `RUBY_BIN`, `RUBY_DIR`, Linux local Ruby paths, `/mnt/c/Ruby34-x64/bin/ruby.exe`, then `ruby` on `PATH`
- Linux Ruby runs use the repository-local bundle path by default
- Windows Ruby runs use the installed Ruby environment by default; set `USE_REPO_BUNDLE=1` to force `.gem32` and `vendor/bundle`
- local environment artifacts may include `.bundle/`, `.gem32/`, and `vendor/bundle/`

## 5. Edit Boundaries

Safe by default:

- `_posts/`
- top-level pages such as `index.html`, `aboutme.html`, `projects.html`, `resume.html`, `archive.html`, `popular.html`, `tags.html`
- localized page counterparts under `zh/`
- `_data/`
- `assets/`
- `_includes/`
- `_layouts/`
- `README.md`
- `AGENTS.md`
- `scripts/`

Check affected consumers and site-wide impact when changing:

- `_config.yml`
- shared layout and include behavior
- navbar or other global site navigation settings
- analytics, comments, and third-party integrations

These shared source files are not an automatic approval gate for a requested fix. Complete authorized local edits and validation; obtain authorization before publishing, pushing, or changing external service state. Do not infer publication permission from a request to draft or preview.

Avoid by default:

- `_site/`
- `vendor/bundle/`
- `.bundle/`
- `.gem32/`
- archived upstream files under `docs/archive/upstream-theme/`

Do not treat generated files or dependency directories as source content.

## 6. Working Rules

- Preserve the existing English-first site voice unless the task explicitly asks for a different tone.
- Preserve the current visual direction unless the task explicitly asks for a redesign.
- Prefer small, targeted edits over broad theme rewrites.
- Reuse `scripts/dev.sh` and `scripts/clean.sh` for local workflow whenever possible.
- If a change touches shared layout, configuration, or integrations, check its site-wide impact before editing.
- If a task is mainly content-related, avoid unnecessary infrastructure or theme refactors.

### Robot Project Page Rules

- For LEAP Hand project pages, reuse the existing `leap-hand-inhand-rotation` presentation pattern unless the user explicitly asks for a different interaction model.
- Keep robot project media as normal `<video>` playback entries under `assets/projects/<slug>/videos/`; do not introduce image/GIF/WebP fallbacks or alternate media structures unless requested.
- When a related project has fewer demos than `rotation`, adapt the data shape minimally, such as a compact `featured_videos` list, while preserving the same visual and playback language.
- Avoid putting process explanations into the public project page. The page should read as a finished standalone project, not as an explanation of why certain assets are missing.
- Verify the page builds and the media paths resolve; when playback changes, check a representative affected video in the browser. Continue bounded diagnosis within the requested task. Before replacing original media, bulk transcoding, or expanding the task, report the concrete evidence and obtain authorization for the additional operation.

### Writing Rules

- When asked to write or update a blog post, produce both English and Chinese versions by default unless the user explicitly asks for a single-language draft.
- Keep the English and Chinese posts aligned in structure, core ideas, and examples, but do not force a rigid sentence-by-sentence translation.
- Match the existing blog voice: personal, direct, reflective, practical, and easy to follow.
- Avoid overly academic wording, inflated marketing language, or obvious AI-style phrasing.
- Keep articles readable: short to medium paragraphs, clear section titles, concrete examples, and no unnecessary length.
- Prefer complete but compact posts. The goal is to say enough, not to say everything.
- When online research is requested, prefer first-party or primary sources and weave them into the article naturally with links where useful.
- For new bilingual posts, make sure `translation_url`, language metadata, and permalink behavior stay correctly paired.
- When the user supplies a revised Chinese draft as the baseline, align the English version with that draft. Preserve an explicit instruction to keep `last-updated` unchanged.

### Blog Titles, Subtitles, and Tags

- Read the full post and its translation before judging metadata. Identify the central subject, what the post actually explains, and its scope; do not infer these from the existing title or keyword frequency alone.
- All three fields must be strongly supported by substantive body content. Do not promote incidental tools, examples, background context, or aspirational benefits into the main subject. If the body does not support a claim, narrow the metadata or report the content gap instead of inventing coverage.

#### Tags

- Use tags as reusable topic labels for readers seeking related posts. Prefer a concrete subject, technology, or method at a useful middle level of specificity, such as `Code Review`, `SSH`, or `Codex`.
- Avoid catch-all labels such as `Ideas and Insights`, `Trivial Tech Knowledge`, or `Software Development` when a specific topic describes the post. Avoid the opposite extreme of tagging individual commands, filenames, versions, or every tool mentioned.
- Start with one to three distinct, well-supported tags; add another only for an independently substantial topic. One accurate tag is enough. Do not pad a count, duplicate a concept with synonyms, or reject a useful topic merely because only one current post covers it.
- Judge tags as a set: each must add useful information, and together they must identify the central subject. A platform or environment tag is appropriate only when it materially shapes the content, not merely because it was used to write or run an example.
- Reuse canonical names and capitalization across posts. Paired English and Chinese posts use identical tag keys; localized display names belong in `_data/site-text.yml`. When changing keys, check the affected tag pages and links.

#### Titles

- Make the main subject and the post's specific question, action, or viewpoint clear when the title appears alone in an archive or search result. Expand ambiguous abbreviations such as BDD when their intended meaning is not otherwise clear.
- Match the promise to the actual depth and genre. A short introduction or personal experience must not promise mastery, a complete guide, universal best practices, or measured improvement without supporting material.
- Include a tool or platform limitation when omitting it would mislead readers about applicability; move secondary details into the subtitle. Prefer natural, compact phrasing over keyword lists, forced templates, or rigid character counts.
- Preserve a personal voice where the post is reflective or experiential. Keep an already accurate title; do not rename it solely for novelty or stylistic uniformity.

#### Subtitles

- Add information the title does not supply: the approach, applicable environment, concrete scope, or distinguishing example. Use one concise phrase or sentence, not a paraphrase of the title, a slogan, or an inventory of every section.
- Avoid generic promises such as "make development more efficient" and unsupported assurances about security or ease. Describe what the reader will actually find in the body.
- A subtitle is optional when it adds nothing useful. Dates or versions belong here only when they clarify the scope or currency of the content; metadata editing alone does not justify a new freshness claim or `last-updated` change.

#### Metadata Review

- Review the three fields together and across both languages: title identifies the focus, subtitle adds scope or approach, and tags group the actual topics. Match meaning and strength of claims without forcing literal translation.
- A metadata review should identify what to retain as well as what to change, with a body-based reason and a concrete replacement for each proposed change. For an audit-only request, report recommendations without bulk-editing posts.
- When applying changes, preserve filenames, permalinks, translation links, and unrelated body content. Check explicit `share-title` and `share-description` overrides and title-bearing internal links so readers do not receive conflicting descriptions. Report factual or translation gaps separately instead of silently expanding into a body rewrite.

## 7. Verification Scope

- Instructions-only or README-only changes: inspect the diff and run `git diff --check`; a Jekyll build is unnecessary.
- Post/page content changes: check frontmatter, paired links, and changed local asset paths; build with `bash scripts/build.sh` when generated output could be affected.
- Layout, styling, navigation, or configuration changes: build and inspect representative affected English and Chinese pages. Visual changes need browser verification at relevant desktop/mobile sizes.
- After the appropriate checks pass, stop testing unless a new change, failure, or concrete unresolved concern warrants more. Report build/tool blockers accurately and continue independent authorized work.

## 8. Reporting Expectations

When reporting completed work, include:

- what changed
- whether the change affects only content or also shared site structure
- whether local preview should be rerun
- whether anything was left unverified

If validation was not performed, say so explicitly.
