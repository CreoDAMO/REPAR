# Keplr Chain Registry Submission Guide

## Overview

This document provides step-by-step instructions for submitting the Aequitas Protocol to the official Keplr Chain Registry.

## Prerequisites

- [ ] Mainnet is live and stable
- [ ] All network endpoints are operational and HTTPS-secured
- [ ] Genesis file is publicly accessible
- [ ] Block explorer is functional
- [ ] Logo assets are created and hosted
- [ ] Chain configuration files are prepared

## Submission Files

All submission files are located in `/keplr-chain-registry/`:

1. **aequitas.json** - Main chain configuration
2. **assetlist.json** - $REPAR native asset configuration
3. **README.md** - Comprehensive chain information
4. **Logo assets:**
   - `/frontend/public/assets/repar-logo.svg`
   - `/frontend/public/assets/repar-logo.png` (needs generation)

## Submission Process

### Step 1: Fork Keplr Chain Registry

1. Go to: https://github.com/chainapsis/keplr-chain-registry
2. Click "Fork" to create your own copy
3. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/keplr-chain-registry.git
   cd keplr-chain-registry
   ```

### Step 2: Add Aequitas Protocol

1. Create a new directory for Aequitas:
   ```bash
   mkdir -p cosmos/aequitas
   ```

2. Copy submission files:
   ```bash
   # From the REPAR repository
   cp keplr-chain-registry/aequitas.json cosmos/aequitas/chain.json
   cp keplr-chain-registry/assetlist.json cosmos/aequitas/assetlist.json
   ```

3. Add logo to the repository:
   ```bash
   # Create images directory if it doesn't exist
   mkdir -p images/aequitas
   
   # Copy logo files (you'll need to generate PNG from SVG first)
   cp frontend/public/assets/repar-logo.svg images/aequitas/
   cp frontend/public/assets/repar-logo.png images/aequitas/
   ```

### Step 3: Update Logo URLs in Configuration

Update the logo URLs in `cosmos/aequitas/chain.json` and `cosmos/aequitas/assetlist.json`:

```json
"logo_URIs": {
  "png": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/aequitas/repar-logo.png",
  "svg": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/aequitas/repar-logo.svg"
}
```

### Step 4: Validate Configuration

Before submitting, validate your configuration:

1. **Check JSON syntax:**
   ```bash
   # Validate JSON files
   jq empty cosmos/aequitas/chain.json
   jq empty cosmos/aequitas/assetlist.json
   ```

2. **Verify required fields:**
   - Chain ID: `aequitas-1`
   - Bech32 prefix: `repar`
   - Coin decimals: 6
   - All endpoints are HTTPS
   - Logo URLs are accessible

3. **Test endpoints:**
   ```bash
   # Test RPC
   curl https://rpc.aequitasprotocol.zone:26657/status
   
   # Test REST API
   curl https://api.aequitasprotocol.zone:1317/cosmos/base/tendermint/v1beta1/node_info
   
   # Test gRPC (requires grpcurl)
   grpcurl grpc.aequitasprotocol.zone:9090 list
   ```

### Step 5: Create Pull Request

1. **Commit your changes:**
   ```bash
   git add cosmos/aequitas/ images/aequitas/
   git commit -m "Add Aequitas Protocol to Keplr Chain Registry

   - Chain ID: aequitas-1
   - Native Coin: $REPAR (131T total supply)
   - Sovereign Layer-1 blockchain for reparations enforcement
   - 9 custom Cosmos SDK modules
   - Live mainnet with block explorer
   "
   ```

2. **Push to your fork:**
   ```bash
   git push origin main
   ```

3. **Create Pull Request:**
   - Go to: https://github.com/chainapsis/keplr-chain-registry/pulls
   - Click "New Pull Request"
   - Select your fork as the source
   - Title: "Add Aequitas Protocol (aequitas-1)"
   - Description:
     ```markdown
     ## Chain Information
     - **Chain ID:** aequitas-1
     - **Network:** Mainnet
     - **Native Coin:** $REPAR
     - **Total Supply:** 131 Trillion
     - **Cosmos SDK:** v0.54.0-alpha
     
     ## Endpoints
     - **RPC:** https://rpc.aequitasprotocol.zone:26657
     - **REST:** https://api.aequitasprotocol.zone:1317
     - **gRPC:** grpc.aequitasprotocol.zone:9090
     - **Explorer:** https://explorer.aequitasprotocol.zone
     
     ## Resources
     - **Website:** https://aequitasprotocol.zone
     - **GitHub:** https://github.com/CreoDAMO/REPAR
     - **Genesis:** https://github.com/CreoDAMO/REPAR/releases
     
     ## Description
     Aequitas Protocol is a sovereign Layer-1 blockchain designed to enforce
     $131 trillion in reparations for the transatlantic slave trade genocide.
     The blockchain transforms reparations enforcement into a mathematical
     protocol with 9 custom Cosmos SDK modules.
     
     ## Checklist
     - [x] Mainnet is live and stable
     - [x] All endpoints operational (HTTPS)
     - [x] Genesis file publicly accessible
     - [x] Block explorer functional
     - [x] Logo assets provided (SVG + PNG)
     - [x] Configuration validated
     ```

### Step 6: Wait for Review

Keplr team will review your submission. They may request changes or clarifications.

**Response Time:** Typically 1-2 weeks for initial review.

## Post-Submission

### Monitor Pull Request

- Respond promptly to any feedback
- Make requested changes quickly
- Keep endpoints operational and monitored

### Update Documentation

Once approved, update the REPAR documentation:

```markdown
✅ **Keplr Integration:** Official chain registry submission approved
- Users can now add Aequitas Protocol directly from Keplr
- No manual chain configuration needed
```

## Alternative: Manual Integration (Before Official Approval)

Users can manually add Aequitas to Keplr using the WalletConnect component:

```javascript
// Frontend automatically suggests chain when user connects
// See: frontend/src/components/WalletConnect.jsx (line 110-157)

await window.keplr.experimentalSuggestChain({
  chainId: 'aequitas-1',
  chainName: 'Aequitas Protocol',
  rpc: 'https://rpc.aequitasprotocol.zone:26657',
  rest: 'https://api.aequitasprotocol.zone:1317',
  // ... (full configuration in WalletConnect.jsx)
});
```

## Generating PNG from SVG

Before submission, convert the SVG logo to PNG:

### Using Inkscape (Recommended)
```bash
inkscape frontend/public/assets/repar-logo.svg \
  --export-type=png \
  --export-filename=frontend/public/assets/repar-logo.png \
  --export-width=512 \
  --export-height=512
```

### Using ImageMagick
```bash
convert -background none \
  -resize 512x512 \
  frontend/public/assets/repar-logo.svg \
  frontend/public/assets/repar-logo.png
```

### Online Tool
1. Go to: https://svgtopng.com/
2. Upload: `frontend/public/assets/repar-logo.svg`
3. Set dimensions: 512x512 pixels
4. Download PNG
5. Save to: `frontend/public/assets/repar-logo.png`

## Verification Checklist

Before submitting, verify:

- [ ] Mainnet has been running for at least 7 days
- [ ] No critical issues or downtime in the past 7 days
- [ ] All 3 endpoints (RPC, REST, gRPC) are HTTPS and operational
- [ ] Genesis file downloads successfully and validates
- [ ] Block explorer loads and shows recent blocks
- [ ] Logo SVG renders correctly
- [ ] Logo PNG is 512x512 pixels, transparent background
- [ ] JSON files validate (no syntax errors)
- [ ] Chain ID matches everywhere: `aequitas-1`
- [ ] Bech32 prefix matches everywhere: `repar`
- [ ] Decimals are consistent: 6 (not 18 for native Cosmos)
- [ ] Gas prices are reasonable: 0.01-0.04 urepar

## Common Issues & Solutions

### Issue: "Endpoints not accessible"
**Solution:** Ensure all endpoints use HTTPS and have valid SSL certificates.

### Issue: "Genesis file too large"
**Solution:** Compress genesis with gzip and provide `.tar.gz` file.

### Issue: "Logo not displaying"
**Solution:** Verify PNG is 512x512, transparent background, and publicly accessible.

### Issue: "Wrong coin decimals"
**Solution:** Use 6 decimals for native Cosmos chains (not 18 for EVM).

### Issue: "Chain ID mismatch"
**Solution:** Ensure `aequitas-1` is used consistently in all files.

## Contact

For questions about the Keplr submission:

- **Keplr GitHub:** https://github.com/chainapsis/keplr-chain-registry/issues
- **Keplr Discord:** https://discord.gg/keplr
- **Aequitas Support:** contact@aequitasprotocol.zone

---

**⚖️ The Justice Machine - $REPAR Native Coin**
