# Keplr Chain Registry Manual Submission Guide

**Created:** December 7, 2025  
**Purpose:** Manual PR submission for Aequitas Protocol to Keplr wallet

---

## Prerequisites

1. GitHub account with fork access
2. Clone of `chainapsis/keplr-chain-registry`
3. Your logo file: `docs/REPAR_Coin_Logo.png` (256x256 PNG)

---

## Step 1: Fork and Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/keplr-chain-registry.git
cd keplr-chain-registry
git remote add upstream https://github.com/chainapsis/keplr-chain-registry.git
git fetch upstream
git checkout -b add-aequitas-protocol
```

---

## Step 2: Create Directory Structure

```bash
mkdir -p images/aequitas
```

---

## Step 3: Copy Your Logo

Copy your logo file to `images/aequitas/chain.png`:

```bash
# From your REPAR repository root:
cp docs/REPAR_Coin_Logo.png /path/to/keplr-chain-registry/images/aequitas/chain.png
```

**Important:** Logo must be 256x256 PNG format.

---

## Step 4: Create Chain Configuration

Create file `cosmos/aequitas.json` with this content:

```json
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
```

---

## Step 5: Commit and Push

```bash
git add cosmos/aequitas.json
git add images/aequitas/chain.png
git commit -m "feat: Add Aequitas Protocol (aequitas-1)

- Chain ID: aequitas-1
- Native coin: REPAR (6 decimals, urepar base)
- Bech32 prefix: repar
- Features: IBC transfers, IBC-Go
- Node provider: Aequitas Foundation
- Staking URL: https://app.aequitasprotocol.zone/staking

Signed-off-by: Jacque Antoine DeGraff <bot@aequitasprotocol.zone>"

git push origin add-aequitas-protocol
```

---

## Step 6: Create Pull Request

Go to GitHub and create a PR with this content:

### PR Title
```
feat: Add Aequitas Protocol (aequitas-1)
```

### PR Body
```markdown
## Chain Information

| Field | Value |
|-------|-------|
| Chain ID | aequitas-1 |
| Chain Name | Aequitas Protocol |
| Native Token | REPAR |
| Decimals | 6 |
| Bech32 Prefix | repar |

## Description

This PR adds Aequitas Protocol to the Keplr wallet registry.

**Aequitas Protocol** is a sovereign Layer-1 blockchain enforcing $131 trillion in reparations for the transatlantic slave trade genocide. The protocol transforms reparations enforcement from a moral argument into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law.

## Endpoints

| Type | URL |
|------|-----|
| RPC | https://rpc.aequitasprotocol.zone |
| REST | https://api.aequitasprotocol.zone |
| Explorer | https://explorer.aequitasprotocol.zone |

## Node Provider

- **Name:** Aequitas Foundation
- **Email:** validators@aequitasprotocol.zone
- **Website:** https://aequitasprotocol.zone

## Files Added

- `cosmos/aequitas.json` - Chain configuration
- `images/aequitas/chain.png` - Chain logo (256x256 PNG)

## Checklist

- [x] Chain ID is unique and follows naming conventions
- [x] Logo is 256x256 PNG format
- [x] All endpoints are live and accessible
- [x] Configuration follows Keplr schema requirements
- [x] coinDecimals is correct (6 for urepar -> REPAR)
```

---

## Verification

Before submitting, verify:

1. **Endpoints are live:**
   ```bash
   curl https://rpc.aequitasprotocol.zone/status
   curl https://api.aequitasprotocol.zone/cosmos/base/tendermint/v1beta1/node_info
   ```

2. **JSON is valid:**
   ```bash
   cat cosmos/aequitas.json | jq .
   ```

3. **Logo dimensions:**
   ```bash
   identify images/aequitas/chain.png
   # Should show: 256x256
   ```

---

## After PR Submission

1. Monitor the PR for reviewer feedback
2. Address any requested changes promptly
3. Once merged, Aequitas will appear in Keplr wallet within 24-48 hours

---

## Support

- Repository: https://github.com/CreoDAMO/REPAR
- Website: https://aequitasprotocol.zone
- Email: validators@aequitasprotocol.zone
