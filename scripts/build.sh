#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

find_ruby() {
  local candidate

  if [[ -n "${RUBY_BIN:-}" ]]; then
    if [[ -x "$RUBY_BIN" ]]; then
      echo "$RUBY_BIN"
      return 0
    fi
    echo "RUBY_BIN is set but is not executable: $RUBY_BIN" >&2
    return 1
  fi

  if [[ -n "${RUBY_DIR:-}" ]]; then
    for candidate in "$RUBY_DIR/bin/ruby" "$RUBY_DIR/bin/ruby.exe"; do
      if [[ -x "$candidate" ]]; then
        echo "$candidate"
        return 0
      fi
    done
    echo "RUBY_DIR is set but no Ruby executable was found under: $RUBY_DIR/bin" >&2
    return 1
  fi

  for candidate in \
    "$HOME/.rubies/ruby-3.2.4/bin/ruby" \
    "/home/yxh/.rubies/ruby-3.2.4/bin/ruby" \
    "/mnt/c/Ruby34-x64/bin/ruby.exe"; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done

  if command -v ruby >/dev/null 2>&1; then
    command -v ruby
    return 0
  fi

  echo "Ruby not found. Set RUBY_BIN=/path/to/ruby or RUBY_DIR=/path/to/ruby-root." >&2
  return 1
}

RUBY_BIN="$(find_ruby)"
RUBY_BINDIR="$(cd "$(dirname "$RUBY_BIN")" && pwd)"
RUBY_PLATFORM="$("$RUBY_BIN" -e 'print RUBY_PLATFORM' 2>/dev/null || true)"

export PATH="$RUBY_BINDIR:$PATH"

if [[ "${USE_REPO_BUNDLE:-}" == "1" || "$RUBY_PLATFORM" != *"mingw"* && "$RUBY_PLATFORM" != *"mswin"* ]]; then
  export GEM_HOME="${GEM_HOME:-$ROOT_DIR/.gem32}"
  export GEM_PATH="${GEM_PATH:-$ROOT_DIR/.gem32}"
  export BUNDLE_PATH="${BUNDLE_PATH:-$ROOT_DIR/vendor/bundle}"
  export BUNDLE_DISABLE_SHARED_GEMS="${BUNDLE_DISABLE_SHARED_GEMS:-true}"
fi

cd "$ROOT_DIR"

echo "Using Ruby: $RUBY_BIN"
if ! "$RUBY_BIN" -S bundle check >/dev/null 2>&1; then
  echo "Installing bundle dependencies..."
  "$RUBY_BIN" -S bundle install
fi

exec "$RUBY_BIN" -S bundle exec jekyll build --future "$@"
