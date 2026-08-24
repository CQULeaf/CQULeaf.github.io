#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"
bash scripts/build.sh >/dev/null

EN_PAGE="_site/2026-04-02-codex-skills-i-recommend/index.html"
ZH_PAGE="_site/zh/2026-04-02-codex-skills-i-recommend/index.html"

rg -q '6 minutes read' "$EN_PAGE" || {
  echo 'English read time is not pluralized.' >&2
  exit 1
}

if rg -q '少于 1 分钟阅读' "$ZH_PAGE"; then
  echo 'Chinese read time is still below one minute.' >&2
  exit 1
fi

rg -q '[1-9][0-9]* 分钟阅读' "$ZH_PAGE" || {
  echo 'Chinese read time is missing.' >&2
  exit 1
}
