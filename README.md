# CQULeaf.github.io

This repository contains Xuhang Ye's personal website and blog, built with Jekyll and deployed as a GitHub Pages style static site.

## What the site includes

- `index.html`: homepage with blog post feed
- `_posts/`: blog articles
- `projects.html`: project portfolio
- `aboutme.html`: profile, timeline, and contact form
- `resume.html`: embedded resume page
- `assets/`: stylesheets, scripts, images, and project logos

## Run locally

Recommended command:

```bash
./scripts/dev.sh
```

The script starts Jekyll with LiveReload on `http://127.0.0.1:4000`.
The script auto-detects Ruby in this order:

1. `RUBY_BIN=/path/to/ruby`
2. `RUBY_DIR=/path/to/ruby-root`
3. Linux local Ruby paths such as `/home/yxh/.rubies/ruby-3.2.4/bin/ruby`
4. The current Windows Ruby path `/mnt/c/Ruby34-x64/bin/ruby.exe`
5. `ruby` on `PATH`

On Linux Ruby, gems use the repository-local bundle path by default. On Windows Ruby, the script uses the installed Ruby environment by default. Set `USE_REPO_BUNDLE=1` if you want the Windows Ruby run to install into `.gem32` and `vendor/bundle`.

If you want to override the defaults:

```bash
PORT=4001 HOST=0.0.0.0 LIVE_RELOAD_PORT=35730 ./scripts/dev.sh
```

Build without serving:

```bash
./scripts/build.sh
```

Cleanup command:

```bash
./scripts/clean.sh
```

To also remove local bundle directories:

```bash
CLEAN_BUNDLE=1 ./scripts/clean.sh
```

## Mathematical posts

Add `math: true` to a post's frontmatter to load MathJax and number display
equations automatically, starting at (1) on each page. Do not also load MathJax
through `ext-js`. Posts without this flag keep their existing behavior.

Use Kramdown's `$$...$$` syntax inline for symbols and references. Put the
delimiters on separate lines for display equations. Give equations semantic
labels rather than typing their numbers into the prose:

```markdown
The segment in equation $$\eqref{eq:segment}$$ joins the two points.

$$
p(t)=(1-t)u+tv,\qquad 0\leq t\leq1.
\label{eq:segment}
$$
```

References resolve to clickable equation numbers, including forward references.
Labels must be unique within a page; use matching labels and equation order in
paired translations. Use `aligned` inside a display block for a multi-line
derivation with one number. Add `\notag` inside a display block to omit its
number; do not reference an unnumbered equation. Inline math is not numbered.
See [MathJax's numbering documentation](https://docs.mathjax.org/en/v2.7/tex.html#automatic-equation-numbering).

For a centered three-line table, add `{: .three-line}` immediately after a
Markdown table, with no blank line between them:

```markdown
| $$t$$ | $$p(t)$$ | Position |
| --- | --- | --- |
| 0 | $$(2,0)$$ | First endpoint |
| 1 | $$(0,2)$$ | Second endpoint |
{: .three-line}
```

This centers both the table and its cells, removes vertical rules and striping,
and retains a top rule, a rule below the header, and a bottom rule. Keep headers
descriptive and include units where relevant. Wide tables need a task-specific
responsive layout; do not shrink their text until it becomes unreadable.

Define symbols, domains, and assumptions before using them. Separate definitions,
claims, proof steps, and examples in the prose; distinguish geometric intuition
from proof and handle boundary or degenerate cases explicitly. Use numbered
references where they help the reader follow a derivation. Use `##` for major
sections and `###` for their direct subsections; keep the same hierarchy in both
language versions.

After `bash scripts/build.sh`, run `python3 scripts/check-math-posts.py` and inspect
both languages in the browser. Check formula rendering, reference jumps below
the fixed navbar, and tables at desktop and phone widths. Long display equations
scroll within the article; prefer a readable `aligned` derivation when possible.

## Repository cleanup

Theme upstream documents and collaboration template files that are not needed for day-to-day site editing are archived under `docs/archive/upstream-theme/`.
