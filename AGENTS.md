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
- `index.html`
- `_posts/`
- `aboutme.html`
- `projects.html`
- `resume.html`
- `scripts/dev.sh`
- `scripts/clean.sh`

Use these entry points to understand whether the task is mainly about content, page structure, shared layout behavior, or local environment workflow.

## 4. Common Commands

Use the repository scripts by default instead of rebuilding commands from scratch.

Start a local preview server:

```bash
./scripts/dev.sh
```

Clean generated site output and stale failed bundle artifacts:

```bash
./scripts/clean.sh
```

Current local workflow notes:

- `scripts/dev.sh` expects the local Ruby installation at `/home/yxh/.rubies/ruby-3.2.4`
- gems are installed into the repository-local bundle path
- local environment artifacts include `.bundle/`, `.gem32/`, and `vendor/bundle/`

## 5. Edit Boundaries

Safe by default:

- `_posts/`
- top-level pages such as `index.html`, `aboutme.html`, `projects.html`, `resume.html`, `archive.html`, `popular.html`, `tags.html`
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

## 7. Reporting Expectations

When reporting completed work, include:

- what changed
- whether the change affects only content or also shared site structure
- whether local preview should be rerun
- whether anything was left unverified

If validation was not performed, say so explicitly.
