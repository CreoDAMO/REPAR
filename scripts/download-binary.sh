#!/bin/bash
# Download aequitasd binary from GitHub Actions or compile locally

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Download/Compile Aequitas Zone Binary                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

GITHUB_REPO="CreoDAMO/REPAR"
BINARY_NAME="aequitasd"
BIN_DIR="./bin"

mkdir -p "$BIN_DIR"

echo "🎯 Choose binary acquisition method:"
echo ""
echo "   1️⃣  Download from GitHub Actions (Latest successful build)"
echo "   2️⃣  Compile locally from source (Requires Go)"
echo ""

# Function to download from GitHub
download_from_github() {
    echo "📥 Downloading from GitHub Actions..."
    echo ""
    echo "⚠️  GitHub Actions artifacts require authentication."
    echo ""
    echo "📋 Manual Download Steps:"
    echo "   1. Visit: https://github.com/$GITHUB_REPO/actions"
    echo "   2. Click on latest successful 'Build Aequitas Zone Blockchain' workflow"
    echo "   3. Scroll to 'Artifacts' section"
    echo "   4. Download 'aequitasd-latest.zip'"
    echo "   5. Extract and upload to Replit:"
    echo "      - Click 'Upload file' in Replit file tree"
    echo "      - Upload to bin/ directory"
    echo ""
    echo "   Latest artifact URL:"
    echo "   https://github.com/$GITHUB_REPO/actions/runs/18846055981/artifacts/4383146372"
    echo ""
    echo "   Binary SHA-256: 3b3db469e1185d3be9cf63881e79500573a0a3e5983b715f6d66f4d8b027f0ce"
    echo ""
}

# Function to compile locally
compile_locally() {
    echo "🔨 Compiling from source..."
    echo ""
    
    # Check if Go is installed
    if ! command -v go &> /dev/null; then
        echo "❌ Go is not installed."
        echo "   Installing Go..."
        # This would need to use Replit's package manager
        echo "   Please install Go using: Install a module -> go"
        return 1
    fi
    
    echo "✅ Go found: $(go version)"
    echo ""
    
    cd aequitas || {
        echo "❌ Error: aequitas directory not found"
        return 1
    }
    
    echo "📦 Installing dependencies..."
    go mod download
    
    echo "🔨 Building binary..."
    go build -o "../$BIN_DIR/$BINARY_NAME" ./cmd/aequitasd
    
    if [ -f "../$BIN_DIR/$BINARY_NAME" ]; then
        chmod +x "../$BIN_DIR/$BINARY_NAME"
        echo ""
        echo "✅ Build successful!"
        echo "   Binary: $BIN_DIR/$BINARY_NAME"
        echo "   Size: $(du -h ../$BIN_DIR/$BINARY_NAME | cut -f1)"
        echo ""
        
        # Verify binary
        echo "🔍 Verifying binary..."
        "../$BIN_DIR/$BINARY_NAME" version 2>/dev/null || echo "Binary ready (version command may not be implemented)"
        echo ""
        
        # Calculate hash
        echo "🔐 Binary Hash:"
        sha256sum "../$BIN_DIR/$BINARY_NAME"
        echo ""
    else
        echo "❌ Build failed!"
        return 1
    fi
    
    cd ..
}

# Main execution
echo "════════════════════════════════════════════════════════════════"
echo ""

# Check if binary already exists
if [ -f "$BIN_DIR/$BINARY_NAME" ]; then
    echo "⚠️  Binary already exists: $BIN_DIR/$BINARY_NAME"
    echo "   Size: $(du -h $BIN_DIR/$BINARY_NAME | cut -f1)"
    echo "   Hash: $(sha256sum $BIN_DIR/$BINARY_NAME | cut -d' ' -f1)"
    echo ""
    read -p "   Replace? (y/n): " replace
    if [[ ! "$replace" =~ ^[Yy]$ ]]; then
        echo "   Keeping existing binary."
        exit 0
    fi
    rm "$BIN_DIR/$BINARY_NAME"
fi

# Default to showing both options
echo "🤔 Recommendation:"
echo "   • For fastest setup: Download from GitHub (Option 1)"
echo "   • For latest code: Compile locally (Option 2)"
echo ""

download_from_github
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "💡 After obtaining the binary, run:"
echo "   ./scripts/init-testnet.sh"
echo ""
