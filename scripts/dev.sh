#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUBY_DIR="${RUBY_DIR:-$HOME/.rubies/ruby-3.2.4}"
PORT="${PORT:-4000}"
HOST="${HOST:-127.0.0.1}"
LIVE_RELOAD_PORT="${LIVE_RELOAD_PORT:-35729}"

export PATH="$RUBY_DIR/bin:$PATH"
export GEM_HOME="$ROOT_DIR/.gem32"
export GEM_PATH="$ROOT_DIR/.gem32"
export BUNDLE_PATH="$ROOT_DIR/vendor/bundle"
export BUNDLE_DISABLE_SHARED_GEMS="true"

if [[ ! -x "$RUBY_DIR/bin/ruby" ]]; then
  echo "Local Ruby not found at $RUBY_DIR"
  echo "Expected: $RUBY_DIR/bin/ruby"
  echo "If needed, reinstall Ruby 3.2.4 or set RUBY_DIR=/path/to/ruby before running."
  exit 1
fi

cd "$ROOT_DIR"

if [[ ! -f "$ROOT_DIR/Gemfile.lock" ]] || [[ ! -x "$ROOT_DIR/vendor/bundle/ruby/3.2.0/bin/jekyll" ]]; then
  echo "Installing bundle dependencies..."
  bundle install
fi

echo "Starting Jekyll at http://$HOST:$PORT"
exec bundle exec jekyll serve \
  --host "$HOST" \
  --port "$PORT" \
  --livereload \
  --livereload-port "$LIVE_RELOAD_PORT" \
  --future
