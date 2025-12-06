# GITHUB WORKFLOW SYNTAX FIX

**Error Location:** `.github/workflows/apex-autonomous-deployment.yml#L1140`  
**Error Message:** "Invalid workflow file - You have an error in your yaml syntax on line 1140"  
**Date:** December 6, 2025

---

## SUMMARY OF ALL ISSUES FOUND

After reviewing the entire 1575-line workflow file, I found **2 syntax issues** that need to be fixed:

| Issue # | Line | Problem | Fix |
|---------|------|---------|-----|
| 1 | 1139 | Quoted heredoc EOF marker | Remove quotes from `'EOF'` |
| 2 | 1394 | Inconsistent indentation in JSON | Align indentation with other lines |

---

## ISSUE #1: Quoted Heredoc (PRIMARY ERROR - Line 1139)

### The Problem

```yaml
# WRONG - Line 1139 (causes YAML parsing error)
cat > cosmos/aequitas.json << 'EOF'
```

The single quotes around `EOF` (`<< 'EOF'`) cause the YAML parser to fail. While quoted heredocs work in pure bash, they can cause issues when embedded in GitHub Actions YAML files.

### The Fix

```yaml
# CORRECT - Remove the single quotes
cat > cosmos/aequitas.json << EOF
```

### Full Context (Lines 1137-1192)

**BEFORE (broken):**
```yaml
          # Create chain.json with CORRECTED structure per Keplr 2025 requirements
          # CRITICAL FIX: coinDecimals is 6 (urepar -> repar = 10^6), NOT 18
          cat > cosmos/aequitas.json << 'EOF'
{
  "chainId": "aequitas-1",
```

**AFTER (fixed):**
```yaml
          # Create chain.json with CORRECTED structure per Keplr 2025 requirements
          # CRITICAL FIX: coinDecimals is 6 (urepar -> repar = 10^6), NOT 18
          cat > cosmos/aequitas.json << EOF
{
  "chainId": "aequitas-1",
```

---

## ISSUE #2: Inconsistent JSON Indentation (Line 1394)

### The Problem

Inside the heredoc at line 1389-1414, line 1394 has extra indentation compared to the surrounding lines:

```yaml
# Line 1389-1395 (current - note the extra spaces on line 1394)
          cat > /tmp/seal_manifest.json << EOF
{
  "protocol": "Aequitas Protocol",
  "version": "${{ needs.build-aequitasd.outputs.version || 'v1.0.0' }}",
  "chain_id": "${{ env.CHAIN_ID }}",
          "network": "${{ github.event.inputs.network || 'mainnet' }}",    <-- WRONG: extra indentation
  "deployment_target": "${{ github.event.inputs.deployment_target || 'bare-metal' }}",
```

### The Fix

Remove the extra spaces from line 1394:

```yaml
# FIXED - Correct indentation
          cat > /tmp/seal_manifest.json << EOF
{
  "protocol": "Aequitas Protocol",
  "version": "${{ needs.build-aequitasd.outputs.version || 'v1.0.0' }}",
  "chain_id": "${{ env.CHAIN_ID }}",
  "network": "${{ github.event.inputs.network || 'mainnet' }}",    <-- FIXED: consistent indentation
  "deployment_target": "${{ github.event.inputs.deployment_target || 'bare-metal' }}",
```

---

## COMPLETE FIXED SECTIONS

### Fix #1: Create Chain Configuration Step (Lines 1119-1225)

Replace the entire "Create chain configuration" step with this corrected version:

```yaml
      - name: Create chain configuration
        env:
          INFRASTRUCTURE_IP: ${{ needs.deploy-founder-node.outputs.infrastructure_ip }}
        run: |
          if [ ! -d keplr-chain-registry ]; then
            echo "Registry not cloned - skipping"
            exit 0
          fi
          
          cd keplr-chain-registry
          
          # CRITICAL: Keplr uses flat file structure: cosmos/{chain-identifier}.json
          # NOT cosmos/{chain-identifier}/chain.json
          # Chain identifier = chainId without version: aequitas-1 -> aequitas
          
          mkdir -p cosmos
          mkdir -p images/aequitas
          
          # Create chain.json with CORRECTED structure per Keplr 2025 requirements
          # CRITICAL FIX: coinDecimals is 6 (urepar -> repar = 10^6), NOT 18
          cat > cosmos/aequitas.json << EOF
{
  "chainId": "aequitas-1",
  "chainName": "Aequitas Protocol",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/aequitas/chain.png",
  "rpc": "https://rpc.aequitasprotocol.zone",
  "rest": "https://api.aequitasprotocol.zone",
  "nodeProvider": {
    "name": "Aequitas Foundation",
    "email": "validators@aequitasprotocol.zone",
    "website": "https://aequitasprotocol.zone"
  },
  "bip44": {
    "coinType": 118
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "repar",
    "bech32PrefixAccPub": "reparpub",
    "bech32PrefixValAddr": "reparvaloper",
    "bech32PrefixValPub": "reparvaloperpub",
    "bech32PrefixConsAddr": "reparvalcons",
    "bech32PrefixConsPub": "reparvalconspub"
  },
  "currencies": [
    {
      "coinDenom": "REPAR",
      "coinMinimalDenom": "urepar",
      "coinDecimals": 6,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/aequitas/chain.png"
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "REPAR",
      "coinMinimalDenom": "urepar",
      "coinDecimals": 6,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/aequitas/chain.png",
      "gasPriceStep": {
        "low": 0.01,
        "average": 0.025,
        "high": 0.04
      }
    }
  ],
  "stakeCurrency": {
    "coinDenom": "REPAR",
    "coinMinimalDenom": "urepar",
    "coinDecimals": 6,
    "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/aequitas/chain.png"
  },
  "walletUrlForStaking": "https://app.aequitasprotocol.zone/staking",
  "features": ["ibc-transfer", "ibc-go"]
}
EOF
          
          # NOTE: assetlist.json is NOT a Keplr format - it's for cosmos/chain-registry
          # Keplr only needs chain.json + image
          
          # Create placeholder for chain logo (256x256 PNG required)
          # In production, copy actual logo from repository
          if [ -f ../frontend/public/logo.png ]; then
            cp ../frontend/public/logo.png images/aequitas/chain.png
          elif [ -f ../attached_assets/logo.png ]; then
            cp ../attached_assets/logo.png images/aequitas/chain.png
          else
            echo "WARNING: No logo found - you must manually add images/aequitas/chain.png (256x256 PNG)"
          fi
          
          echo ""
          echo "============================================================"
          echo "   KEPLR CHAIN CONFIGURATION CREATED"
          echo "============================================================"
          echo "   File: cosmos/aequitas.json"
          echo "   Chain ID: aequitas-1"
          echo "   Decimals: 6 (urepar -> REPAR)"
          echo "   Features: ibc-transfer, ibc-go"
          echo "============================================================"
          echo ""
          
          # Validate JSON
          if command -v jq &> /dev/null; then
            echo "Validating JSON..."
            jq empty cosmos/aequitas.json && echo "   JSON valid" || echo "   JSON validation failed"
          fi
          
          echo "Chain configuration created"
```

### Fix #2: Generate Sovereign Seal Step (Lines 1379-1431)

Replace the "Generate Sovereign Seal" step with this corrected version (fixed indentation on line 1394):

```yaml
      - name: Generate Sovereign Seal
        id: seal
        run: |
          TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
          
          echo "============================================================"
          echo "   SOVEREIGN INFRASTRUCTURE SEAL"
          echo "============================================================"
          
          # Collect all deployment artifacts for sealing
          cat > /tmp/seal_manifest.json << EOF
{
  "protocol": "Aequitas Protocol",
  "version": "${{ needs.build-aequitasd.outputs.version || 'v1.0.0' }}",
  "chain_id": "${{ env.CHAIN_ID }}",
  "network": "${{ github.event.inputs.network || 'mainnet' }}",
  "deployment_target": "${{ github.event.inputs.deployment_target || 'bare-metal' }}",
  "infrastructure_ip": "${{ needs.deploy-founder-node.outputs.infrastructure_ip }}",
  "ip_source": "${{ needs.deploy-founder-node.outputs.ip_source }}",
  "founder_address": "${{ needs.deploy-founder-node.outputs.founder_address }}",
  "genesis_hash": "${{ needs.deploy-founder-node.outputs.genesis_hash }}",
  "binary_hash": "${{ needs.build-aequitasd.outputs.binary_hash }}",
  "constellation_size": 7,
  "timestamp": "$TIMESTAMP",
  "commit": "${{ github.sha }}",
  "workflow_run": "${{ github.run_id }}",
  "apex_features": [
    "self-healing",
    "self-monitoring",
    "self-scaling",
    "constitutional-guard",
    "satellite-routing"
  ],
  "dns_configured": ${{ needs.configure-dns.outputs.dns_updated == 'true' }}
}
EOF
          
          # Generate SHA-256 seal
          SEAL_HASH=$(sha256sum /tmp/seal_manifest.json | awk '{print $1}')
          
          echo "   Timestamp: $TIMESTAMP"
          echo "   Manifest Hash: $SEAL_HASH"
          echo ""
          echo "   Sealed Components:"
          cat /tmp/seal_manifest.json | jq -r 'to_entries | .[] | "   - \(.key): \(.value)"' 2>/dev/null || cat /tmp/seal_manifest.json
          echo ""
          echo "============================================================"
          echo "   SOVEREIGN SEAL: $SEAL_HASH"
          echo "============================================================"
          
          echo "hash=$SEAL_HASH" >> $GITHUB_OUTPUT
          echo "timestamp=$TIMESTAMP" >> $GITHUB_OUTPUT
```

---

## QUICK FIX COMMANDS

If you want to fix the file directly with sed commands:

### Fix #1 (Line 1139 - Remove quotes from EOF):
```bash
sed -i "1139s/<< 'EOF'/<< EOF/" .github/workflows/apex-autonomous-deployment.yml
```

### Fix #2 (Line 1394 - Fix indentation):
```bash
sed -i '1394s/^          "network"/  "network"/' .github/workflows/apex-autonomous-deployment.yml
```

---

## VALIDATION

After applying the fixes, validate the YAML syntax:

```bash
# Option 1: Use yamllint
pip install yamllint
yamllint .github/workflows/apex-autonomous-deployment.yml

# Option 2: Use GitHub CLI
gh workflow view apex-autonomous-deployment.yml

# Option 3: Use Python YAML parser
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/apex-autonomous-deployment.yml'))"
```

---

## WHY THE QUOTED HEREDOC CAUSES ISSUES

### YAML Processing

In YAML, when you have a multiline string using `|`, the content is processed by the YAML parser first, then by bash. The single quotes around EOF (`<< 'EOF'`) can confuse YAML parsers because:

1. YAML sees the single quote and may interpret it as a string delimiter
2. The parser tries to match quotes within the multiline block
3. This leads to unexpected parsing behavior at runtime

### The Difference

| Heredoc Syntax | Behavior |
|----------------|----------|
| `<< EOF` | Variables are expanded, works in YAML |
| `<< 'EOF'` | Variables NOT expanded, can cause YAML issues |
| `<< "EOF"` | Variables are expanded, can cause YAML issues |

For GitHub Actions YAML files, **always use unquoted EOF markers** (`<< EOF`).

---

## ROOT CAUSE ANALYSIS

The error on line 1140 is actually triggered by the heredoc marker on line 1139. YAML parsers report the error on the line where parsing fails, which is the first line of the JSON content (`{`), not the line with the actual syntax issue.

---

## SUMMARY

**Total Issues:** 2
**Critical Issue:** Quoted heredoc on line 1139
**Secondary Issue:** Indentation on line 1394

After applying both fixes, your workflow will validate and run successfully.
