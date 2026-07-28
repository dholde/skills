#!/usr/bin/env bash
# Resolve a Cursor agent transcript path by uuid or keyword.
# Usage: resolve-transcripts.sh [uuid|keyword]
set -euo pipefail

query="${1:-}"
cwd="${PWD}"
slug="${cwd#/}"
slug="${slug//\//-}"
base="${HOME}/.cursor/projects/${slug}/agent-transcripts"

if [[ ! -d "$base" ]]; then
  echo "No transcripts dir: $base" >&2
  exit 1
fi

if [[ -z "$query" || "$query" == "latest" || "$query" == "this chat" ]]; then
  latest="$(find "$base" -type f -name '*.jsonl' -print0 | xargs -0 ls -t 2>/dev/null | head -n 1 || true)"
  if [[ -z "$latest" ]]; then
    echo "No transcripts under $base" >&2
    exit 1
  fi
  echo "$latest"
  exit 0
fi

# UUID form
if [[ "$query" =~ ^[0-9a-fA-F-]{36}$ ]]; then
  path="${base}/${query}/${query}.jsonl"
  if [[ -f "$path" ]]; then
    echo "$path"
    exit 0
  fi
  echo "UUID not found: $path" >&2
  exit 1
fi

# Keyword / title search
matches="$(rg -l -i --fixed-strings "$query" "$base" 2>/dev/null | head -n 5 || true)"
if [[ -z "$matches" ]]; then
  echo "No transcript matched: $query" >&2
  exit 1
fi
echo "$matches"
