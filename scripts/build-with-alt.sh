#!/usr/bin/env bash
# Build the current homepage into dist/ and the previous homepage
# (pre-Blake restructure, commit ffe8967) into dist/alt/ for GitHub Pages.
# Usage: scripts/build-with-alt.sh [alt-ref]
set -euo pipefail
ALT_REF="${1:-ffe89678d3681adc497ff5a372075a0985ddb323}"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"
npx vite build
TMP="$(mktemp -d)"
trap 'git worktree remove --force "$TMP" >/dev/null 2>&1 || true; rm -rf "$TMP"' EXIT
git worktree add --detach "$TMP" "$ALT_REF" >/dev/null
ln -s "$ROOT/node_modules" "$TMP/node_modules"
(cd "$TMP" && npx vite build --base /small-bird-creative/alt/ --outDir "$ROOT/dist/alt" --emptyOutDir)
if grep -rq '1612apartments' "$ROOT/dist"; then echo "ERROR: forbidden 1612 link found" >&2; exit 1; fi
echo "Built dist/ (root) and dist/alt/ (from $ALT_REF)"
