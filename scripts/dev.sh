#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUBY_DIR="${RUBY_DIR:-$HOME/.rubies/ruby-3.2.4}"
PORT="${PORT:-4000}"
HOST="${HOST:-127.0.0.1}"
LIVE_RELOAD_PORT="${LIVE_RELOAD_PORT:-35729}"
PORTS_TO_CHECK=("$PORT" "$LIVE_RELOAD_PORT")

export PATH="$RUBY_DIR/bin:$PATH"
export GEM_HOME="$ROOT_DIR/.gem32"
export GEM_PATH="$ROOT_DIR/.gem32"
export BUNDLE_PATH="$ROOT_DIR/vendor/bundle"
export BUNDLE_DISABLE_SHARED_GEMS="true"

cleanup_listener() {
  local port="$1"
  local pids
  pids="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"

  if [[ -z "$pids" ]]; then
    return
  fi

  while IFS= read -r pid; do
    [[ -z "$pid" ]] && continue

    local cmd
    cmd="$(ps -p "$pid" -o args= 2>/dev/null || true)"

    if [[ "$cmd" == *"$ROOT_DIR"* ]] || [[ "$cmd" == *"bundle exec jekyll serve"* ]] || [[ "$cmd" == *"jekyll serve"* ]]; then
      echo "Cleaning existing dev server on port $port (pid $pid)..."
      kill "$pid" 2>/dev/null || true

      for _ in {1..20}; do
        if ! kill -0 "$pid" 2>/dev/null; then
          break
        fi
        sleep 0.2
      done

      if kill -0 "$pid" 2>/dev/null; then
        echo "Force stopping stubborn dev server on port $port (pid $pid)..."
        kill -9 "$pid" 2>/dev/null || true
      fi
    else
      echo "Port $port is occupied by a non-project process:"
      echo "$cmd"
      echo "Refusing to kill it automatically. Set a different PORT/LIVE_RELOAD_PORT and retry."
      exit 1
    fi
  done <<< "$pids"
}

if [[ ! -x "$RUBY_DIR/bin/ruby" ]]; then
  echo "Local Ruby not found at $RUBY_DIR"
  echo "Expected: $RUBY_DIR/bin/ruby"
  echo "If needed, reinstall Ruby 3.2.4 or set RUBY_DIR=/path/to/ruby before running."
  exit 1
fi

cd "$ROOT_DIR"

for port in "${PORTS_TO_CHECK[@]}"; do
  cleanup_listener "$port"
done

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
