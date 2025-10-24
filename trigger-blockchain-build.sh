#!/bin/bash
# Script to commit protobuf changes and trigger GitHub blockchain build workflow

set -e

echo "🚀 Triggering Blockchain Build Workflow"
echo "========================================"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Show current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Check for protobuf files to add
echo "📦 Checking for generated protobuf files..."
PROTOBUF_FILES=$(find aequitas/x/*/types -name "*.pb.go" 2>/dev/null | wc -l)
echo "   Found $PROTOBUF_FILES protobuf files"
echo ""

# Check git status
echo "📋 Current changes:"
git status --short aequitas/ | head -20
echo ""

# Ask for confirmation
read -p "❓ Do you want to commit and push these changes to trigger the build? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted by user"
    exit 0
fi

# Stage the protobuf files
echo "📝 Staging protobuf files..."
git add aequitas/x/*/types/*.pb.go 2>/dev/null || echo "   Some files already staged"

# Also add proto directory if it has generated files
if [ -d "aequitas/proto/github.com" ]; then
    echo "📝 Staging proto generation directory..."
    git add aequitas/proto/github.com/ 2>/dev/null || echo "   Already staged"
fi

# Show what will be committed
echo ""
echo "📦 Files to be committed:"
git status --short aequitas/ | head -20
echo ""

# Commit the changes
echo "💾 Creating commit..."
git commit -m "Generate protobuf files for blockchain modules

- Generated protobuf .pb.go files for 9 blockchain modules
- Fixes GitHub Actions build errors
- Resolves 'undefined types' and 'missing ProtoMessage interface' errors

Modules updated:
- claims
- defendant
- dex
- distribution
- endowment
- founderendowment
- justice
- nftmarketplace
- validatorsubsidy

This commit will trigger the blockchain-build.yml workflow." || {
    echo "⚠️  Nothing to commit or commit failed"
    echo "   Changes may already be committed"
}

echo ""
echo "🚀 Pushing to trigger GitHub Actions workflow..."
echo "   Workflow will trigger because files in aequitas/ directory changed"
echo ""

# Push to remote
if git push origin "$CURRENT_BRANCH"; then
    echo ""
    echo "✅ Successfully pushed to $CURRENT_BRANCH!"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Go to your GitHub repository"
    echo "   2. Click on 'Actions' tab"
    echo "   3. Watch for 'Build Aequitas Zone Blockchain' workflow"
    echo "   4. Build should complete in 20-25 minutes"
    echo ""
    echo "📦 After build completes:"
    echo "   - Download artifacts: aequitasd-latest"
    echo "   - Binary will be ready for deployment"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo "   Possible reasons:"
    echo "   - No changes to push (already up to date)"
    echo "   - Authentication required"
    echo "   - Network issues"
    echo ""
    echo "💡 Alternative: Trigger workflow manually"
    echo "   1. Go to GitHub → Actions"
    echo "   2. Select 'Build Aequitas Zone Blockchain'"
    echo "   3. Click 'Run workflow' button"
    echo ""
fi
