#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "Removing generated site output..."
rm -rf _site

echo "Removing stale failed Ruby bundle from system Ruby attempt..."
rm -rf vendor/bundle/ruby/3.0.0

echo "Cleanup complete."
