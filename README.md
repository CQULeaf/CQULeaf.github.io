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

The script uses the local Ruby installed at `/home/yxh/.rubies/ruby-3.2.4`, installs gems into the repository, and starts Jekyll with LiveReload on `http://127.0.0.1:4000`.

If you want to override the defaults:

```bash
PORT=4001 HOST=0.0.0.0 LIVE_RELOAD_PORT=35730 ./scripts/dev.sh
```

Manual equivalent:

```bash
env PATH=/home/yxh/.rubies/ruby-3.2.4/bin:$PATH \
GEM_HOME=$PWD/.gem32 \
GEM_PATH=$PWD/.gem32 \
BUNDLE_PATH=$PWD/vendor/bundle \
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --livereload --future
```

If you need to install dependencies manually first:

```bash
env PATH=/home/yxh/.rubies/ruby-3.2.4/bin:$PATH \
GEM_HOME=$PWD/.gem32 \
GEM_PATH=$PWD/.gem32 \
BUNDLE_PATH=$PWD/vendor/bundle \
bundle install
```

Cleanup command:

```bash
./scripts/clean.sh
```

## Repository cleanup

Theme upstream documents and collaboration template files that are not needed for day-to-day site editing were archived under `docs/archive/upstream-theme/` and `.github/archive/`.
