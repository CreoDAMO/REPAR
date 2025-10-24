
#!/bin/bash
# diagnostic.sh
# Generate complete diagnostic report of blockchain state

echo "🔍 AEQUITAS BLOCKCHAIN DIAGNOSTIC REPORT"
echo "========================================"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# ============================================================================
# Check 1: Git Status
# ============================================================================
echo -e "${BLUE}[1] Git Status${NC}"
echo "───────────────"

if [ -f ".git/index.lock" ]; then
    echo -e "${RED}✗ Git lock file exists (.git/index.lock)${NC}"
    echo "  Fix: rm -f .git/index.lock"
else
    echo -e "${GREEN}✓ No git lock${NC}"
fi

UNCOMMITTED=$(git status --porcelain | wc -l)
if [ "$UNCOMMITTED" -gt 0 ]; then
    echo -e "${YELLOW}⚠ $UNCOMMITTED uncommitted changes${NC}"
    echo "  Top 10 changes:"
    git status --porcelain | head -n 10 | sed 's/^/    /'
else
    echo -e "${GREEN}✓ Working directory clean${NC}"
fi
echo ""

# ============================================================================
# Check 2: Proto Files
# ============================================================================
echo -e "${BLUE}[2] Proto Files${NC}"
echo "───────────────"

MODULES=("dex" "claims" "defendant" "justice" "endowment" "founderendowment" "nftmarketplace" "distribution" "validatorsubsidy")

for module in "${MODULES[@]}"; do
    PROTO_DIR="aequitas/proto/aequitas/$module/v1"
    if [ -d "$PROTO_DIR" ]; then
        PROTO_COUNT=$(ls -1 "$PROTO_DIR"/*.proto 2>/dev/null | wc -l)
        if [ "$PROTO_COUNT" -gt 0 ]; then
            echo -e "${GREEN}✓ $module: $PROTO_COUNT proto file(s)${NC}"
        else
            echo -e "${RED}✗ $module: No proto files${NC}"
        fi
    else
        echo -e "${RED}✗ $module: Proto directory missing${NC}"
    fi
done
echo ""

# ============================================================================
# Check 3: Generated Proto Code
# ============================================================================
echo -e "${BLUE}[3] Generated Proto Code (.pb.go files)${NC}"
echo "───────────────────────────────────────"

for module in "${MODULES[@]}"; do
    TYPES_DIR="aequitas/x/$module/types"
    if [ -d "$TYPES_DIR" ]; then
        PB_COUNT=$(find "$TYPES_DIR" -name "*.pb.go" 2>/dev/null | wc -l)
        if [ "$PB_COUNT" -gt 0 ]; then
            echo -e "${GREEN}✓ $module: $PB_COUNT generated file(s)${NC}"
        else
            echo -e "${RED}✗ $module: No .pb.go files${NC}"
        fi
    else
        echo -e "${RED}✗ $module: Types directory missing${NC}"
    fi
done
echo ""

# ============================================================================
# Check 4: Specific Type Checks
# ============================================================================
echo -e "${BLUE}[4] Type Definition Checks${NC}"
echo "───────────────────────────"

# Check claims module
if [ -f "aequitas/x/claims/types/claims.pb.go" ]; then
    if grep -q "type ArbitrationClaim struct" "aequitas/x/claims/types/claims.pb.go"; then
        echo -e "${GREEN}✓ ArbitrationClaim type exists in claims${NC}"
    else
        echo -e "${RED}✗ ArbitrationClaim type missing in claims${NC}"
    fi
else
    echo -e "${RED}✗ claims.pb.go missing${NC}"
fi

echo ""

# ============================================================================
# Check 5: Build Test
# ============================================================================
echo -e "${BLUE}[5] Quick Build Test${NC}"
echo "────────────────────"

cd aequitas
if go list ./x/claims/types >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Claims types package loads${NC}"
else
    echo -e "${RED}✗ Claims types package fails${NC}"
    go list ./x/claims/types 2>&1 | head -n 3 | sed 's/^/    /'
fi
cd ..

echo ""
echo "═══════════════════════════════════════"
echo "Diagnostic complete."
echo "═══════════════════════════════════════"
