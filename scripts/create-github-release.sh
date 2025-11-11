#!/bin/bash
###############################################################################
# Create GitHub Release with Aequitas Blockchain Binary
# Uploads the pre-built aequitasd binary to GitHub Releases
###############################################################################

set -e

REPO="CreoDAMO/REPAR"
TAG="v1.0.0-blockchain"
RELEASE_NAME="Aequitas Zone Blockchain v1.0.0"
BINARY_PATH="bin/aequitasd-v1.0.0-linux-amd64.gz"
GITHUB_TOKEN="${GITHUB_TOKEN}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN not set"
    echo "Please set your GitHub Personal Access Token:"
    echo "export GITHUB_TOKEN='your_token_here'"
    exit 1
fi

echo "════════════════════════════════════════════════════════"
echo "   Creating GitHub Release for Aequitas Blockchain"
echo "   Repository: $REPO"
echo "   Tag: $TAG"
echo "════════════════════════════════════════════════════════"

# Check if release already exists
echo "📋 Checking if release exists..."
RELEASE_ID=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/releases/tags/$TAG" | \
    grep -o '"id": [0-9]*' | head -1 | grep -o '[0-9]*' || echo "")

if [ -n "$RELEASE_ID" ]; then
    echo "⚠️  Release $TAG already exists (ID: $RELEASE_ID)"
    echo "Deleting old release..."
    curl -s -X DELETE -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPO/releases/$RELEASE_ID"
    
    # Delete tag
    git tag -d "$TAG" 2>/dev/null || true
    git push origin ":refs/tags/$TAG" 2>/dev/null || true
fi

# Create new release
echo "🚀 Creating new release..."
RESPONSE=$(curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$REPO/releases" \
    -d @- << EOF
{
  "tag_name": "$TAG",
  "name": "$RELEASE_NAME",
  "body": "## Aequitas Zone Blockchain Binary\n\n**Pre-built blockchain binary** for deployment to production servers.\n\n### What's Included:\n- \`aequitasd\` - Aequitas Zone blockchain binary (152MB uncompressed)\n- Built with Go 1.23.3\n- Cosmos SDK v0.50.14\n- CometBFT consensus\n\n### Download & Install:\n\n\`\`\`bash\n# Download binary\nwget https://github.com/$REPO/releases/download/$TAG/aequitasd-v1.0.0-linux-amd64.gz\n\n# Extract\ngunzip aequitasd-v1.0.0-linux-amd64.gz\n\n# Install\nchmod +x aequitasd-v1.0.0-linux-amd64\nsudo mv aequitasd-v1.0.0-linux-amd64 /usr/local/bin/aequitasd\n\n# Verify\naequitasd version\n\`\`\`\n\n### Deploy to DigitalOcean:\n\nAfter installing the binary, initialize and start the blockchain:\n\n\`\`\`bash\n# Initialize Mainnet\naequitasd init validator-mainnet --chain-id aequitas-1\nwget https://raw.githubusercontent.com/$REPO/main/chain-config/mainnet/genesis-mainnet.json\nmv genesis-mainnet.json ~/.aequitas/config/genesis.json\n\n# Start node\naequitasd start\n\`\`\`\n\n### Checksums:\n- **MD5**: 294acde0c93dfcfe3021ba7ec799fe92\n- **Build Date**: October 30, 2025\n- **Chain ID (Mainnet)**: aequitas-1\n- **Chain ID (Testnet)**: aequitas-testnet-1",
  "draft": false,
  "prerelease": false
}
EOF
)

RELEASE_ID=$(echo "$RESPONSE" | grep -o '"id": [0-9]*' | head -1 | grep -o '[0-9]*')
UPLOAD_URL=$(echo "$RESPONSE" | grep -o '"upload_url": "[^"]*' | cut -d'"' -f4 | sed 's/{?name,label}//')

if [ -z "$RELEASE_ID" ]; then
    echo "❌ Failed to create release"
    echo "$RESPONSE"
    exit 1
fi

echo "✅ Release created! ID: $RELEASE_ID"

# Upload binary asset
echo "📤 Uploading binary asset (61MB compressed)..."
ASSET_NAME="aequitasd-v1.0.0-linux-amd64.gz"

curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/gzip" \
    --data-binary @"$BINARY_PATH" \
    "${UPLOAD_URL}?name=${ASSET_NAME}" > /dev/null

echo ""
echo "════════════════════════════════════════════════════════"
echo "   ✅ RELEASE CREATED SUCCESSFULLY!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "🔗 Release URL:"
echo "   https://github.com/$REPO/releases/tag/$TAG"
echo ""
echo "📥 Download URL:"
echo "   https://github.com/$REPO/releases/download/$TAG/$ASSET_NAME"
echo ""
echo "🚀 Install on DigitalOcean Droplet:"
echo ""
echo "   wget https://github.com/$REPO/releases/download/$TAG/$ASSET_NAME"
echo "   gunzip $ASSET_NAME"
echo "   chmod +x aequitasd-v1.0.0-linux-amd64"
echo "   sudo mv aequitasd-v1.0.0-linux-amd64 /usr/local/bin/aequitasd"
echo "   aequitasd version"
echo ""
