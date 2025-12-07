#!/bin/bash
# Script to commit all blockchain build fixes

set -e

cd /home/runner/workspace

echo "🔧 Committing Blockchain Build Fixes..."
echo "========================================"
echo ""

# Stage proto definition fixes
echo "📦 Staging proto definition fixes..."
git add aequitas/proto/aequitas/dex/v1/*.proto
git add aequitas/proto/buf.lock

# Stage syntax error fixes
echo "🔨 Staging syntax fixes..."
git add aequitas/x/dex/types/expected_keepers.go
git add aequitas/x/validatorsubsidy/types/keys.go
git add aequitas/x/distribution/types/errors.go
git add aequitas/x/nftmarketplace/types/errors.go

# Stage ALL generated proto files
echo "📝 Staging generated proto files..."
git add 'aequitas/x/*/types/*.pb.go' 'aequitas/x/*/types/*.pb.gw.go' 2>/dev/null || true

# Show what will be committed
echo ""
echo "📋 Files to be committed:"
git status --short

echo ""
echo "💾 Committing changes..."
git commit -m "fix: Generate proto files and resolve build errors

- Add cosmos_proto imports to DEX module proto files
- Fix duplicate package declarations in dex and validatorsubsidy
- Remove duplicate ModuleName constants
- Generate all missing proto files for all modules
- Update buf.lock with correct dependencies

Resolves all GitHub Actions build errors:
- undefined: types.ArbitrationClaim, Defendant, Payment, etc.
- ModuleName redeclared errors
- syntax error: non-declaration statement outside function body

Fixes #42"

echo ""
echo "✅ Committed successfully!"
echo ""
echo "📤 Ready to push to GitHub. Run:"
echo "   git push origin main"
echo ""
echo "Or run this script with --push flag to push automatically:"
echo "   bash commit-fixes.sh --push"
echo ""

# Check if --push flag was provided
if [ "$1" == "--push" ]; then
    echo "🚀 Pushing to GitHub..."
    git push origin main
    echo ""
    echo "✅ Build fixes pushed to GitHub!"
    echo "🔍 Check build status at: https://github.com/CreoDAMO/REPAR/actions"
fi
