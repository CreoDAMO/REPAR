# Aequitas Protocol - Dexplorer Configuration

## Chain Information

### Mainnet Configuration
```javascript
{
  chainId: 'aequitas-1',
  chainName: 'Aequitas Protocol',
  rpcEndpoint: 'https://rpc.aequitasprotocol.zone',
  wsEndpoint: 'wss://rpc.aequitasprotocol.zone/websocket',
  nativeCurrency: {
    denom: 'urepar',
    symbol: 'REPAR',
    decimals: 6
  },
  bech32Prefix: 'aequitas'
}
```

### Testnet Configuration
```javascript
{
  chainId: 'aequitas-testnet-1',
  chainName: 'Aequitas Testnet',
  rpcEndpoint: 'https://rpc-testnet.aequitasprotocol.zone',
  wsEndpoint: 'wss://rpc-testnet.aequitasprotocol.zone/websocket',
  nativeCurrency: {
    denom: 'urepar',
    symbol: 'REPAR',
    decimals: 6
  },
  bech32Prefix: 'aequitas'
}
```

### Local Development Configuration
```javascript
{
  chainId: 'aequitas-local',
  chainName: 'Aequitas Local',
  rpcEndpoint: 'http://localhost:26657',
  wsEndpoint: 'ws://localhost:26657/websocket',
  nativeCurrency: {
    denom: 'urepar',
    symbol: 'REPAR',
    decimals: 6
  },
  bech32Prefix: 'aequitas'
}
```

## How to Use

### Option 1: Direct Connection
1. Start Dexplorer: `npm run dev` (in dexplorer directory)
2. Enter RPC endpoint when prompted
3. For local dev: `http://localhost:26657`
4. For testnet: `https://rpc-testnet.aequitasprotocol.zone`
5. For mainnet: `https://rpc.aequitasprotocol.zone`

### Option 2: Quick Connect
Click the "Aequitas Protocol" button on the connect screen to automatically connect to localhost:26657

## Features Available

Once connected to the Aequitas blockchain, you can:

- 📊 **Dashboard**: View real-time chain statistics
- 🔗 **Blocks**: Browse latest blocks and block details
- 💱 **Transactions**: Explore all transactions
- 👥 **Validators**: See active validators and staking info
- 🗳️ **Governance**: View proposals and voting
- 📝 **Accounts**: Search for and view account balances
- ⚙️ **Parameters**: View chain parameters

## Native Currency Display

Dexplorer will automatically display:
- **Base Denomination**: urepar (micro-REPAR)
- **Display Denomination**: REPAR
- **Conversion**: 1 REPAR = 1,000,000 urepar
- **Total Supply**: 131,000,000,000,000 REPAR (131 trillion)

## Custom Modules

Aequitas Protocol has custom modules that may not display in standard Dexplorer:
- `x/defendant` - Defendant liability tracking
- `x/justice` - Justice Burn mechanism
- `x/claims` - Arbitration demands
- `x/distribution` - Reparations distribution
- `x/threatdefense` - 10% Chaos Defense

These modules' transactions and queries will appear in the explorer, but may need custom decoding.

## Running Dexplorer

### Development Mode
```bash
cd dexplorer
npm run dev
```
Opens on http://localhost:5173 (or next available port)

### Production Build
```bash
cd dexplorer
npm run build
npm run preview
```

## Integration with Aequitas Frontend

You can also integrate Dexplorer directly into the main Aequitas frontend by:
1. Copying Dexplorer components to `frontend/src/pages/`
2. Adding route in main App.tsx
3. Using the same RPC endpoint as the main app

## Notes

- Dexplorer connects directly via RPC/WebSocket, no backend needed
- Real-time updates via WebSocket subscriptions
- Lightweight and fast
- Works with any Cosmos SDK chain (Tendermint v0.34+)
