# Keplr Chain Registry Submission Guide for Aequitas Protocol

## Overview

This guide explains how to submit Aequitas Protocol to the official Keplr Chain Registry for "Community-Driven" integration.

**Important**: This is a **manual process** - no GitHub Actions automation is possible.

---

## Prerequisites

✅ **Chain must be live** (mainnet operational)  
✅ **RPC/REST endpoints must be working** (https://rpc.aequitasprotocol.zone:26657)  
✅ **Logo must be 256x256 PNG** (will be auto-cropped to circle)  
✅ **ChainID must match nodes** (aequitas-1)

---

## Step-by-Step Submission Process

### 1. Fork the Keplr Chain Registry

```bash
# Navigate to GitHub and fork:
https://github.com/chainapsis/keplr-chain-registry

# Or use GitHub CLI:
gh repo fork chainapsis/keplr-chain-registry --clone
cd keplr-chain-registry
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Add Aequitas Chain Configuration

**Copy the Keplr-compatible config:**

```bash
# Create the chain file in the cosmos directory:
cp /path/to/this/repo/keplr-chain-registry/keplr-aequitas.json cosmos/aequitas.json
```

**Or manually create `cosmos/aequitas.json` with this content:**

```json
{
  "chainId": "aequitas-1",
  "chainName": "Aequitas Protocol",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/CreoDAMO/REPAR/main/keplr-chain-registry/images/aequitas/chain.png",
  "rpc": "https://rpc.aequitasprotocol.zone:26657",
  "rest": "https://api.aequitasprotocol.zone:1317",
  "nodeProvider": {
    "name": "Aequitas Foundation",
    "email": "contact@aequitasprotocol.zone",
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
      "coinDecimals": 6
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "REPAR",
      "coinMinimalDenom": "urepar",
      "coinDecimals": 6,
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
    "coinDecimals": 6
  },
  "features": ["ibc-transfer", "ibc-go"],
  "walletUrlForStaking": "https://aequitasprotocol.zone/stake"
}
```

### 4. Add Chain Logo (256x256 PNG)

```bash
# Create images directory
mkdir -p images/aequitas

# Copy/create the 256x256 PNG logo:
# (The logo will be automatically cropped into a circle by Keplr)
cp /path/to/repar-logo-256.png images/aequitas/chain.png
```

**⚠️ Important**: 
- Must be exactly 256x256 pixels
- PNG format only
- Will be auto-cropped to circle
- Should look good when circular

### 5. Validate Configuration

```bash
# Run Keplr's validation tool:
yarn validate cosmos/aequitas.json
```

**Should pass all checks:**
- ✅ ChainID matches format
- ✅ RPC endpoint is reachable
- ✅ REST endpoint is reachable
- ✅ All required fields present
- ✅ Gas price structure valid

### 6. Test Locally (Optional)

```bash
# Start local development server to preview:
yarn dev

# Visit: http://localhost:3000
# Search for "Aequitas" to see how it looks
```

### 7. Commit and Push

```bash
git checkout -b add-aequitas-protocol
git add cosmos/aequitas.json
git add images/aequitas/chain.png
git commit -m "Add Aequitas Protocol (aequitas-1) to Keplr registry"
git push origin add-aequitas-protocol
```

### 8. Create Pull Request

1. Go to your forked repository on GitHub
2. Click "Compare & pull request"
3. **Title**: `Add Aequitas Protocol (aequitas-1)`
4. **Description**:

```markdown
## Chain Information
- **Chain ID**: aequitas-1
- **Chain Name**: Aequitas Protocol
- **Network Type**: Mainnet (Live)
- **Native Coin**: $REPAR

## Endpoints (Verified Working)
- **RPC**: https://rpc.aequitasprotocol.zone:26657
- **REST**: https://api.aequitasprotocol.zone:1317
- **Block Explorer**: https://explorer.aequitasprotocol.zone

## About
Aequitas Protocol is a sovereign Layer-1 blockchain built on Cosmos SDK, designed to enforce $131 trillion in reparations for the transatlantic slave trade genocide. The protocol transforms reparations enforcement from a moral argument into a mathematical protocol.

## Additional Info
- **Repository**: https://github.com/CreoDAMO/REPAR
- **Website**: https://aequitasprotocol.zone
- **Total Supply**: 131 Trillion REPAR
- **Custom Modules**: 9 sovereign governance modules
- **IBC Enabled**: Yes
- **CosmWasm**: No

## Checklist
- [x] Chain configuration file added (cosmos/aequitas.json)
- [x] Logo added (images/aequitas/chain.png, 256x256 PNG)
- [x] RPC/REST endpoints verified working
- [x] Validation passed (`yarn validate`)
- [x] ChainID matches live network (aequitas-1)
- [x] Mainnet is live and operational

## Why This Matters
This chain serves a critical humanitarian and justice mission. Integration with Keplr will enable financial sovereignty for descendants of enslaved people globally (300M+ potential users).

Thank you for considering this submission.
```

5. Click "Create pull request"

### 9. Wait for Review

**What happens next:**
- Keplr team reviews for security and compliance
- They verify all endpoints are working
- They check logo quality and format
- Approval is **not guaranteed** (they verify all submissions)
- Typical review time: 1-4 weeks

### 10. After Approval

Once approved:
- Chain shows "Community-Driven" tag in Keplr extension
- Accessible at: https://chains.keplr.app/
- Users can add Aequitas to their Keplr wallet
- Integration appears in Keplr mobile app

---

## Important Notes

### Do NOT Include CoinGecko ID
**Reason**: $REPAR is not listed on CoinGecko yet, so omit the `coinGeckoId` field entirely.

### Features Field
Only include features your chain actually supports:
- ✅ `ibc-transfer` (IBC enabled)
- ✅ `ibc-go` (using ibc-go module)
- ❌ `cosmwasm` (not enabled on Aequitas)

### Gas Prices
Our current gas prices:
- Low: 0.01 urepar
- Average: 0.025 urepar
- High: 0.04 urepar

### Endpoint Requirements
- Must use HTTPS/TLS
- Must have CORS enabled
- Must be publicly accessible (no authentication)
- Must match the chainID exactly

---

## Alternative: Programmatic Addition (Temporary)

**For development/testing only**, users can add Aequitas directly to their Keplr without PR approval:

```javascript
// In your frontend code:
await window.keplr.experimentalSuggestChain({
  chainId: "aequitas-1",
  chainName: "Aequitas Protocol",
  rpc: "https://rpc.aequitasprotocol.zone:26657",
  rest: "https://api.aequitasprotocol.zone:1317",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "repar",
    bech32PrefixAccPub: "reparpub",
    bech32PrefixValAddr: "reparvaloper",
    bech32PrefixValPub: "reparvaloperpub",
    bech32PrefixConsAddr: "reparvalcons",
    bech32PrefixConsPub: "reparvalconspub"
  },
  currencies: [
    { coinDenom: "REPAR", coinMinimalDenom: "urepar", coinDecimals: 6 }
  ],
  feeCurrencies: [
    {
      coinDenom: "REPAR",
      coinMinimalDenom: "urepar",
      coinDecimals: 6,
      gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 }
    }
  ],
  stakeCurrency: {
    coinDenom: "REPAR",
    coinMinimalDenom: "urepar",
    coinDecimals: 6
  },
  features: ["ibc-transfer", "ibc-go"]
});
```

**Note**: This only adds to **that specific user's wallet** - not a global integration.

---

## Troubleshooting

### "RPC endpoint not responding"
- Verify: `curl https://rpc.aequitasprotocol.zone:26657/status`
- Check CORS headers enabled
- Ensure HTTPS certificate valid

### "ChainID mismatch"
- Check: `curl https://rpc.aequitasprotocol.zone:26657/status | jq .result.node_info.network`
- Must return exactly: `"aequitas-1"`

### "Validation failed"
- Run: `yarn validate cosmos/aequitas.json`
- Fix any errors shown
- Common issues: malformed JSON, missing required fields

### "Logo not displaying"
- Verify exactly 256x256 pixels: `file images/aequitas/chain.png`
- Ensure PNG format (not JPG/SVG)
- Check file size < 1MB

---

## Summary: No Automation Needed

**Why no GitHub Actions workflow is needed:**
1. Submission requires **forking their repo** (can't automate cross-repo PRs)
2. Requires **manual review** by Keplr team (approval not guaranteed)
3. One-time process (only submit once)
4. Their repo validates on their CI (not ours)

**The process is simple enough to do manually when mainnet is ready.**

---

## Current Status

- ✅ Keplr-compatible config created (`keplr-aequitas.json`)
- ⏳ Need 256x256 PNG logo generated
- ⏳ Mainnet must be live with working RPC/REST
- ⏳ Manual PR submission when ready

---

⚖️ **Ready to submit when mainnet launches!**
