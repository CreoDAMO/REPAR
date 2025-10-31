#!/bin/bash
###############################################################################
# Manual GitHub Release Upload
# Run this with: ./upload-binary-manual.sh YOUR_GITHUB_TOKEN
###############################################################################

GITHUB_TOKEN=$1

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Usage: ./upload-binary-manual.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "Get token from: https://github.com/settings/tokens/new"
    echo "Scopes needed: repo (full control)"
    exit 1
fi

REPO="CreoDAMO/REPAR"
TAG="v1.0.0-blockchain"
BINARY="bin/aequitasd-v1.0.0-linux-amd64.gz"

echo "🚀 Creating GitHub release..."

# Create release
RESPONSE=$(curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/releases" \
    -d "{\"tag_name\":\"$TAG\",\"name\":\"Aequitas Blockchain v1.0.0\",\"body\":\"Pre-built blockchain binary for deployment\"}")

UPLOAD_URL=$(echo "$RESPONSE" | grep -o '"upload_url": "[^"]*' | cut -d'"' -f4 | sed 's/{?name,label}//')

# Upload binary
echo "📤 Uploading binary (61MB)..."
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/gzip" \
    --data-binary @"$BINARY" \
    "${UPLOAD_URL}?name=aequitasd-v1.0.0-linux-amd64.gz"

echo ""
echo "✅ Done! Download with:"
echo "wget https://github.com/$REPO/releases/download/$TAG/aequitasd-v1.0.0-linux-amd64.gz"
