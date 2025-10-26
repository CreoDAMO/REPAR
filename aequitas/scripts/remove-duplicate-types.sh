
#!/bin/bash
set -e

echo "🧹 Removing manual type files that duplicate proto-generated code..."

# Remove files that duplicate proto message definitions
# These will be regenerated from .proto files

# Claims module
rm -f x/claims/types/claims.go 2>/dev/null || true

# Defendant module  
rm -f x/defendant/types/defendant.go 2>/dev/null || true

# DEX module
rm -f x/dex/types/dex.go 2>/dev/null || true

# Distribution module
rm -f x/distribution/types/distribution.go 2>/dev/null || true

# Endowment module
rm -f x/endowment/types/endowment.go 2>/dev/null || true

# Founder Endowment module
rm -f x/founderendowment/types/founderendowment.go 2>/dev/null || true

# Justice module
rm -f x/justice/types/justice.go 2>/dev/null || true

# NFT Marketplace module
rm -f x/nftmarketplace/types/nftmarketplace.go 2>/dev/null || true

# Validator Subsidy module
rm -f x/validatorsubsidy/types/validatorsubsidy.go 2>/dev/null || true

echo "✅ Manual type files removed"
echo ""
echo "📝 Kept helper files:"
find x/*/types -name "*.go" -type f | grep -v ".pb.go" | sort
echo ""
echo "🔧 Next steps:"
echo "1. Run ./scripts/protocgen.sh to regenerate proto files"
echo "2. The .pb.go files will contain all type definitions"
echo "3. Helper files (codec.go, errors.go, etc.) provide business logic"
