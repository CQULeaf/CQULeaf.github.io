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

For most tasks, start by reading these files or directories:

- `README.md`
- `_config.yml`
- `_data/site-text.yml`
- `index.html`
- `_posts/`
- `aboutme.html`
- `now.html`
- `projects.html`
- `resume.html`
- `start-here.html`
- `scripts/dev.sh`
- `scripts/clean.sh`

Use these entry points to understand whether the task is mainly about content, page structure, shared layout behavior, or local environment workflow.

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
- top-level pages such as `index.html`, `aboutme.html`, `now.html`, `projects.html`, `resume.html`, `archive.html`, `popular.html`, `tags.html`, `start-here.html`
- localized page counterparts under `zh/`
- `_data/`
- `assets/`
- `_includes/`
- `_layouts/`
- `README.md`
- `AGENTS.md`
- `scripts/`

Caution required:

- `_config.yml`
- shared layout and include behavior
- navbar or other global site navigation settings
- analytics, comments, and third-party integrations

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
- Verify the page builds and the media paths resolve. If deeper codec/browser playback debugging starts to expand, pause and report the concrete finding instead of spinning into multiple speculative transcode attempts.

### Writing Rules

- When asked to write or update a blog post, produce both English and Chinese versions by default unless the user explicitly asks for a single-language draft.
- Keep the English and Chinese posts aligned in structure, core ideas, and examples, but do not force a rigid sentence-by-sentence translation.
- Match the existing blog voice: personal, direct, reflective, practical, and easy to follow.
- Avoid overly academic wording, inflated marketing language, or obvious AI-style phrasing.
- Keep articles readable: short to medium paragraphs, clear section titles, concrete examples, and no unnecessary length.
- Prefer complete but compact posts. The goal is to say enough, not to say everything.
- When online research is requested, prefer first-party or primary sources and weave them into the article naturally with links where useful.
- For new bilingual posts, make sure `translation_url`, language metadata, and permalink behavior stay correctly paired.

## 7. Reporting Expectations

When reporting completed work, include:

- what changed
- whether the change affects only content or also shared site structure
- whether local preview should be rerun
- whether anything was left unverified

If validation was not performed, say so explicitly.
