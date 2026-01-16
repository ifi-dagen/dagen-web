#!/usr/bin/env bash
set -euo pipefail

# Hvor vi legger content-repoet midlertidig
TMP_DIR=".tmp-content"

# URL settes av GitHub Actions (med token)
CONTENT_REPO_URL="${CONTENT_REPO_URL:-}"

if [[ -z "$CONTENT_REPO_URL" ]]; then
  echo "CONTENT_REPO_URL is missing"
  exit 1
fi

rm -rf "$TMP_DIR"
git clone --depth 1 "$CONTENT_REPO_URL" "$TMP_DIR"

# Kopier innhold inn i dagen-web
rm -rf content
mkdir -p content
cp -R "$TMP_DIR"/hjem content/hjem || true
cp -R "$TMP_DIR"/bedrift content/bedrift || true
cp -R "$TMP_DIR"/bli-med content/bli-med || true
cp -R "$TMP_DIR"/om-oss content/om-oss || true
cp -R "$TMP_DIR"/program content/program || true
cp -R "$TMP_DIR"/stillingsannonser content/stillingsannonser || true

# Kopier public assets
mkdir -p public
cp -R "$TMP_DIR"/public/* public/ || true

rm -rf "$TMP_DIR"
echo "✅ Content pulled successfully"
