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

## Repository cleanup

Theme upstream documents and collaboration template files that are not needed for day-to-day site editing are archived under `docs/archive/upstream-theme/`.
