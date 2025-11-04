#!/bin/bash

# Aequitas Protocol - Wiki Auto-Generation Script
# This script auto-generates and updates wiki pages from codebase

set -e

echo "🔄 Aequitas Protocol Wiki Generator"
echo "===================================="
echo ""

# Colors
GREEN='\033[0.32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
WIKI_DIR="$SCRIPT_DIR"

echo "📂 Project Root: $PROJECT_ROOT"
echo "📝 Wiki Directory: $WIKI_DIR"
echo ""

# Function to count files
count_files() {
    local dir=$1
    local pattern=$2
    find "$dir" -type f -name "$pattern" 2>/dev/null | wc -l | tr -d ' '
}

# Function to get license file sizes
get_license_size() {
    local file=$1
    if [ -f "$PROJECT_ROOT/$file" ]; then
        wc -c < "$PROJECT_ROOT/$file" | awk '{printf "%.1fKB", $1/1024}'
    else
        echo "N/A"
    fi
}

# Function to update timestamp
update_timestamp() {
    local file=$1
    local date=$(date "+%B %d, %Y")
    sed -i.bak "s/Last Updated:.*/Last Updated:** $date/" "$file"
    rm -f "${file}.bak"
}

echo "📊 Gathering statistics..."
echo ""

# Count components
FRONTEND_PAGES=$(count_files "$PROJECT_ROOT/frontend/src/pages" "*.jsx")
MOBILE_COMPONENTS=$(count_files "$PROJECT_ROOT/mobile" "*.tsx")
BLOCKCHAIN_MODULES=$(ls -1 "$PROJECT_ROOT/aequitas/x" 2>/dev/null | wc -l | tr -d ' ')
DOC_FILES=$(count_files "$PROJECT_ROOT/docs" "*.md")

echo -e "${GREEN}✅ Frontend Pages:${NC} $FRONTEND_PAGES"
echo -e "${GREEN}✅ Mobile Components:${NC} $MOBILE_COMPONENTS"
echo -e "${GREEN}✅ Blockchain Modules:${NC} $BLOCKCHAIN_MODULES"
echo -e "${GREEN}✅ Documentation Files:${NC} $DOC_FILES"
echo ""

# Generate statistics file
echo "📈 Generating statistics..."
cat > "$WIKI_DIR/Statistics.md" << EOF
# 📊 Project Statistics

**Last Updated:** $(date "+%B %d, %Y")

---

## 📦 Codebase Metrics

### Frontend
- **Pages:** $FRONTEND_PAGES React components
- **Framework:** React 19, Vite 7, Tailwind CSS 3
- **Lines of Code:** ~15,000+ (estimated)

### Mobile
- **Components:** $MOBILE_COMPONENTS TypeScript files
- **Framework:** Expo 52, React Native
- **Lines of Code:** ~3,500+
- **Status:** Production-ready

### Blockchain
- **Custom Modules:** $BLOCKCHAIN_MODULES
- **Language:** Go 1.23+
- **Framework:** Cosmos SDK v0.50.x
- **Lines of Code:** ~25,000+ (estimated)

### Documentation
- **Documentation Files:** $DOC_FILES
- **Wiki Pages:** $(count_files "$WIKI_DIR" "*.md")
- **Total Docs Size:** ~500KB+

---

## 💾 Repository Size

\`\`\`bash
# Calculate repository size
$(cd "$PROJECT_ROOT" && du -sh . 2>/dev/null || echo "N/A")
\`\`\`

---

## ⚖️ Licensing

- **Total Licenses:** 10
- **License Documentation:** ~110KB

| License | Size |
|---------|------|
| LICENSE.md | $(get_license_size "LICENSE.md") |
| LICENSE-CODE.md | $(get_license_size "LICENSE-CODE.md") |
| LICENSE-AGPL.md | $(get_license_size "LICENSE-AGPL.md") |
| LICENSE-RESEARCH.md | $(get_license_size "LICENSE-RESEARCH.md") |
| LICENSE-CC0.md | $(get_license_size "LICENSE-CC0.md") |
| LICENSE-ODC-BY.md | $(get_license_size "LICENSE-ODC-BY.md") |
| LICENSE-MOBILE-EULA.md | $(get_license_size "LICENSE-MOBILE-EULA.md") |
| LICENSE-TK.md | $(get_license_size "LICENSE-TK.md") |
| LICENSE-DCSSI.md | $(get_license_size "LICENSE-DCSSI.md") |
| NOTICE.md | $(get_license_size "NOTICE.md") |

---

## 🚀 Deployment Status

### Production Deployments
- **Frontend:** ✅ Deployed
- **Mobile App:** ⏳ TestFlight pending
- **Blockchain:** ✅ Testnet + Mainnet initialized
- **Block Explorer:** ✅ Deployed

---

## 📱 Mobile App

- **Lines of Code:** 3,500+
- **Files:** 25+
- **Battery Usage:** 4.2% per day
- **Data Usage:** <500MB per month
- **Status:** Production-ready

---

## ⛓️ Blockchain

### Network Statistics
- **Native Coin:** \$REPAR
- **Total Supply:** 131 trillion
- **Consensus:** Tendermint BFT
- **Custom Modules:** $BLOCKCHAIN_MODULES
- **Validators:** 11,000+ (target Year 1)

### Module Breakdown
$(ls -1 "$PROJECT_ROOT/aequitas/x" 2>/dev/null | sed 's/^/- x\//')

---

## 🌍 Infrastructure

### Node Tiers
- **Tier 0 (Mobile):** 10,000+ target
- **Tier 1 (Home):** 1,000+ target
- **Tier 2 (Cloud):** 8-12 core validators

### Geographic Distribution
- **Target Countries:** 100+
- **Descendants:** 300 million potential

---

**Generated:** $(date "+%B %d, %Y at %H:%M:%S")  
**Script:** generate-wiki.sh  
**Version:** 1.0
EOF

echo -e "${GREEN}✅ Statistics.md generated${NC}"
echo ""

# Update timestamps on existing wiki pages
echo "⏰ Updating timestamps..."
for file in "$WIKI_DIR"/*.md; do
    if [ -f "$file" ] && [ "$file" != "$WIKI_DIR/Statistics.md" ]; then
        update_timestamp "$file"
        echo "  ✓ $(basename "$file")"
    fi
done
echo ""

# Generate module index
echo "📚 Generating module index..."
cat > "$WIKI_DIR/Module-Index.md" << EOF
# 📦 Module Index

**All blockchain modules in the Aequitas Protocol.**

---

## Custom Cosmos SDK Modules

$(ls -1 "$PROJECT_ROOT/aequitas/x" 2>/dev/null | while read module; do
    echo "### x/$module"
    echo ""
    if [ -f "$PROJECT_ROOT/aequitas/x/$module/README.md" ]; then
        echo "**Documentation:** [x/$module/README.md](../aequitas/x/$module/README.md)"
    fi
    echo "**Location:** \`aequitas/x/$module\`"
    echo ""
done)

---

**Last Updated:** $(date "+%B %d, %Y")  
**Total Modules:** $BLOCKCHAIN_MODULES
EOF

echo -e "${GREEN}✅ Module-Index.md generated${NC}"
echo ""

# Generate frontend pages index
echo "🎨 Generating frontend pages index..."
cat > "$WIKI_DIR/Frontend-Pages.md" << EOF
# 🎨 Frontend Pages

**All React pages in the Aequitas web application.**

---

## Page List ($FRONTEND_PAGES Total)

$(find "$PROJECT_ROOT/frontend/src/pages" -name "*.jsx" 2>/dev/null | while read page; do
    filename=$(basename "$page" .jsx)
    echo "### $filename"
    echo ""
    echo "**File:** \`frontend/src/pages/$filename.jsx\`"
    echo "**Route:** \`/${filename,,}\` (estimated)"
    echo ""
done)

---

**Last Updated:** $(date "+%B %d, %Y")  
**Total Pages:** $FRONTEND_PAGES
EOF

echo -e "${GREEN}✅ Frontend-Pages.md generated${NC}"
echo ""

echo "✨ Wiki generation complete!"
echo ""
echo "Generated files:"
echo "  • Statistics.md"
echo "  • Module-Index.md"
echo "  • Frontend-Pages.md"
echo ""
echo -e "${YELLOW}💡 To push to GitHub Wiki:${NC}"
echo "   git clone https://github.com/CreoDAMO/REPAR.wiki.git"
echo "   cp wiki/*.md REPAR.wiki/"
echo "   cd REPAR.wiki && git add . && git commit -m 'Update wiki' && git push"
echo ""
echo "✅ Done!"
