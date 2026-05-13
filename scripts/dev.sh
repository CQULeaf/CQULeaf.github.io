#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-4000}"
HOST="${HOST:-127.0.0.1}"
LIVE_RELOAD_PORT="${LIVE_RELOAD_PORT:-35729}"
PORTS_TO_CHECK=("$PORT" "$LIVE_RELOAD_PORT")

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

cleanup_listener() {
  local port="$1"
  local pids=""
  local jekyll_pids=""

  if command -v lsof >/dev/null 2>&1; then
    pids="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"
  elif command -v fuser >/dev/null 2>&1; then
    pids="$(fuser -n tcp "$port" 2>/dev/null || true)"
  fi

  jekyll_pids="$(ps -ef | awk -v port="$port" '
    /[j]ekyll serve/ && ($0 ~ "--port " port || $0 ~ "--port=" port) { print $2 }
  ' || true)"

  pids="$(printf '%s\n%s\n' "$pids" "$jekyll_pids" | awk 'NF && !seen[$0]++')"

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

for port in "${PORTS_TO_CHECK[@]}"; do
  cleanup_listener "$port"
done

echo "Using Ruby: $RUBY_BIN"
if ! "$RUBY_BIN" -S bundle check >/dev/null 2>&1; then
  echo "Installing bundle dependencies..."
  "$RUBY_BIN" -S bundle install
fi

echo "Starting Jekyll at http://$HOST:$PORT"
exec "$RUBY_BIN" -S bundle exec jekyll serve \
  --host "$HOST" \
  --port "$PORT" \
  --livereload \
  --livereload-port "$LIVE_RELOAD_PORT" \
  --future
