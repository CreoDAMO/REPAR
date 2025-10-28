#!/bin/bash
# Pin Declaration of Sovereignty to IPFS using web-based services

DECLARATION_FILE="DECLARATION_OF_SOVEREIGNTY.md"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Pin Declaration to IPFS - Multiple Options             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Option 1: Use Pinata (requires API key)
echo "🔐 OPTION 1: Pinata (Recommended - Professional IPFS Pinning)"
echo "   1. Visit: https://app.pinata.cloud/"
echo "   2. Create free account (1GB free)"
echo "   3. Upload: $DECLARATION_FILE"
echo "   4. Copy the CID (Content Identifier)"
echo ""

# Option 2: Use NFT.Storage (free, no limits)
echo "🎨 OPTION 2: NFT.Storage (Free, Unlimited)"
echo "   1. Visit: https://nft.storage/"
echo "   2. Create free account"
echo "   3. Upload: $DECLARATION_FILE"
echo "   4. Copy the CID"
echo ""

# Option 3: Use Web3.Storage (free)
echo "🌐 OPTION 3: Web3.Storage (Free)"
echo "   1. Visit: https://web3.storage/"
echo "   2. Create free account"
echo "   3. Upload: $DECLARATION_FILE"
echo "   4. Copy the CID"
echo ""

# Option 4: Local IPFS installation (advanced)
echo "⚙️  OPTION 4: Install IPFS Locally (Advanced)"
echo "   Commands to install IPFS in Replit:"
echo "   $ wget https://dist.ipfs.tech/kubo/v0.26.0/kubo_v0.26.0_linux-amd64.tar.gz"
echo "   $ tar -xvzf kubo_v0.26.0_linux-amd64.tar.gz"
echo "   $ cd kubo && sudo bash install.sh"
echo "   $ ipfs init"
echo "   $ ipfs add $DECLARATION_FILE"
echo ""

# Calculate file hash for verification
echo "═══════════════════════════════════════════════════════════════"
echo "📋 Declaration File Details:"
echo "   File: $DECLARATION_FILE"
if [ -f "$DECLARATION_FILE" ]; then
    echo "   Size: $(du -h $DECLARATION_FILE | cut -f1)"
    echo "   SHA-256: $(sha256sum $DECLARATION_FILE | cut -d' ' -f1)"
else
    echo "   ⚠️  File not found!"
fi
echo ""

echo "💡 TIP: Once you get the CID, update genesis-template.json:"
echo "   Field: metadata.founding_document.ipfs_cid"
echo "   Current: TO_BE_PINNED"
echo "   Update to: ipfs://YOUR_CID_HERE"
echo ""

echo "🔗 IPFS Gateway URLs (after pinning):"
echo "   https://ipfs.io/ipfs/YOUR_CID"
echo "   https://gateway.pinata.cloud/ipfs/YOUR_CID"
echo "   https://YOUR_CID.ipfs.nftstorage.link/"
echo ""
echo "════════════════════════════════════════════════════════════════"
