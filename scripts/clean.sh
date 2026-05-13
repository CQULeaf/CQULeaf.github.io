#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "Removing Windows reserved-name leftovers..."
rm -f NUL nul _site/NUL _site/nul 2>/dev/null || true

echo "Removing generated site output..."
rm -rf _site

echo "Removing Jekyll caches..."
rm -rf .jekyll-cache .sass-cache .jekyll-metadata

echo "Removing stale failed Ruby bundle from system Ruby attempt..."
rm -rf vendor/bundle/ruby/3.0.0

if [[ "${CLEAN_BUNDLE:-0}" == "1" ]]; then
  echo "Removing local bundle directories..."
  rm -rf .bundle .gem32 vendor/bundle
fi

echo "Cleanup complete."
