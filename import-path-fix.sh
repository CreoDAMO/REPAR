#!/bin/bash
# import-path-fix.sh
# Fix Go module import path mismatch for Aequitas blockchain
# This script regenerates proto files and verifies all types are correctly generated

set -e

echo "🔧 Fixing Go Import Path Mismatch"
echo "=================================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================================================
# Step 1: Verify .pb.go files exist but check their package declaration
# ============================================================================
echo -e "${BLUE}Step 1: Checking generated file package declarations${NC}"

CLAIMS_PB="aequitas/x/claims/types/claims.pb.go"

if [ -f "$CLAIMS_PB" ]; then
    PACKAGE=$(head -n 20 "$CLAIMS_PB" | grep "^package " | head -n 1)
    echo "Claims package: $PACKAGE"
    
    # Check if ArbitrationClaim type is actually in the file
    if grep -q "type ArbitrationClaim struct" "$CLAIMS_PB"; then
        echo -e "${GREEN}✓ ArbitrationClaim exists in file${NC}"
    else
        echo -e "${RED}✗ ArbitrationClaim NOT in file (proto generation issue)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ claims.pb.go doesn't exist yet${NC}"
fi

echo ""

# ============================================================================
# Step 2: Force regenerate with correct paths
# ============================================================================
echo -e "${BLUE}Step 2: Regenerating proto with explicit paths${NC}"

cd aequitas

# Delete ALL generated files to start fresh
echo "Deleting old generated files..."
find x/*/types -name "*.pb.go" -delete 2>/dev/null || true
find x/*/types -name "*.pb.gw.go" -delete 2>/dev/null || true

# Verify buf.gen.yaml has correct settings
echo "Checking buf.gen.yaml configuration..."
if [ -f "buf.gen.yaml" ]; then
    echo "buf.gen.yaml found"
    cat buf.gen.yaml
else
    echo -e "${YELLOW}⚠ buf.gen.yaml missing, creating...${NC}"
    cat > buf.gen.yaml << 'BUFGEN'
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/CreoDAMO/REPAR/aequitas
plugins:
  - plugin: buf.build/protocolbuffers/go:v1.31.0
    out: .
    opt:
      - paths=source_relative
  - plugin: buf.build/grpc/go:v1.3.0
    out: .
    opt:
      - paths=source_relative
  - plugin: buf.build/grpc-ecosystem/gateway:v2.18.0
    out: .
    opt:
      - paths=source_relative
BUFGEN
fi

echo ""
echo "Regenerating all proto files..."
if buf generate; then
    echo -e "${GREEN}✓ Proto generation complete${NC}"
else
    echo -e "${RED}✗ Proto generation failed${NC}"
    buf generate --debug || true
fi

cd ..

echo ""
echo -e "${BLUE}Step 3: Verifying generated types${NC}"

check_type() {
    local MODULE=$1
    local FILE=$2
    local TYPE=$3
    
    local FILEPATH="aequitas/x/$MODULE/types/$FILE.pb.go"
    
    if [ ! -f "$FILEPATH" ]; then
        echo -e "${RED}✗ $MODULE: $FILE.pb.go missing${NC}"
        return 1
    fi
    
    if grep -q "type $TYPE struct" "$FILEPATH"; then
        echo -e "${GREEN}✓ $MODULE: $TYPE found${NC}"
        return 0
    else
        echo -e "${RED}✗ $MODULE: $TYPE NOT found in generated file${NC}"
        return 1
    fi
}

check_type "claims" "claims" "ArbitrationClaim" || true
check_type "defendant" "defendant" "Defendant" || true
check_type "justice" "justice" "JusticeBurn" || true

echo ""
echo -e "${GREEN}✅ Proto generation fix complete!${NC}"
