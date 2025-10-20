# Aequitas Protocol - Chain Configuration

## Important: Cosmos vs EVM Chains

**Aequitas Protocol** is built on **Cosmos SDK**, NOT Ethereum Virtual Machine (EVM). This means:

| Wallet Type | For Chains | Example Chains | Works with Aequitas? |
|-------------|-----------|----------------|---------------------|
| **MetaMask** | EVM chains | Ethereum, Polygon, BSC, Arbitrum | ❌ No |
| **Keplr** | Cosmos SDK | Cosmos Hub, Osmosis, **Aequitas** | ✅ Yes |

**Chainlist.org** is specifically for EVM chains and won't work with Aequitas.

---

## 🦊 For Keplr Wallet (Recommended)

### Quick Setup

1. **Install Keplr**
   - Browser Extension: https://www.keplr.app/download
   - Mobile App: Available on iOS/Android

2. **Add Aequitas to Keplr**
   ```javascript
   // Include the script in your HTML
   <script src="keplr-integration.js"></script>
   
   // Call this function when user clicks "Add to Keplr"
   <button onclick="addAequitasToKeplr()">
     Add Aequitas to Keplr
   </button>
   ```

3. **Configuration File**
   - See `aequitas-chain.json` for the full chain configuration
   - See `keplr-integration.js` for implementation code

---

## 📋 Chain Details

| Parameter | Value |
|-----------|-------|
| **Chain ID** | `aequitas-1` |
| **Chain Name** | Aequitas Zone |
| **Native Coin** | REPAR (not a token!) |
| **Denomination** | urepar (micro-REPAR) |
| **Decimals** | 6 |
| **Bech32 Prefix** | `aequitas` |
| **RPC Endpoint** | `http://localhost:26657` (development) |
| **REST API** | `http://localhost:1317` (development) |

---

## 🌐 For Production Deployment

When deploying to mainnet, update these values in `aequitas-chain.json`:

```json
{
  "rpc": "https://rpc.aequitas.zone",  // Your production RPC
  "rest": "https://api.aequitas.zone", // Your production REST API
  "chainId": "aequitas-1"             // Your mainnet chain ID
}
```

---

## 🔗 Block Explorer (Dexplorer)

The included **Dexplorer** is a lightweight Cosmos block explorer that connects directly to your RPC endpoint:

- **Development**: http://localhost:3001
- **Production**: Update after deployment

### Connecting Dexplorer to Aequitas

1. Open Dexplorer at `http://localhost:3001`
2. Enter RPC endpoint: `http://localhost:26657`
3. Click "Connect"

Dexplorer will fetch blockchain data directly via WebSocket RPC - no backend required!

---

## 🚀 Integration Examples

### React Component

```jsx
import { addAequitasToKeplr } from './keplr-integration';

function AddToKeplrButton() {
  return (
    <button 
      onClick={addAequitasToKeplr}
      className="btn-primary"
    >
      Connect Keplr Wallet
    </button>
  );
}
```

### Vue Component

```vue
<template>
  <button @click="connectKeplr">
    Add Aequitas to Keplr
  </button>
</template>

<script>
import { addAequitasToKeplr } from './keplr-integration';

export default {
  methods: {
    async connectKeplr() {
      await addAequitasToKeplr();
    }
  }
}
</script>
```

---

## 📚 Resources

- **Keplr Docs**: https://docs.keplr.app
- **Cosmos SDK**: https://docs.cosmos.network
- **Chain Registry**: https://github.com/cosmos/chain-registry
- **Dexplorer**: https://github.com/arifintahu/dexplorer

---

## ⚠️ Why Not Chainlist.org?

Chainlist.org is specifically for **EVM-compatible** chains that use:
- Ethereum addresses (0x...)
- ERC-20 tokens
- Ethereum JSON-RPC API

Aequitas uses:
- Cosmos addresses (aequitas...)
- Native coin ($REPAR, not ERC-20)
- Tendermint RPC API
- IBC (Inter-Blockchain Communication)

For Cosmos chains, use the **Cosmos Chain Registry** instead:
https://github.com/cosmos/chain-registry

---

## 🛠️ Development Notes

- **RPC Port**: 26657 (Tendermint RPC)
- **REST Port**: 1317 (Cosmos REST API)
- **gRPC Port**: 9090 (gRPC gateway)
- **P2P Port**: 26656 (Node communication)

Make sure these ports are accessible for your blockchain node to function properly.
