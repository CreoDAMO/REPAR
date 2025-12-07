# Dexplorer Block Explorer - Setup Complete

## Overview
Dexplorer has been successfully integrated into the Aequitas Protocol as the blockchain explorer.

## What is Dexplorer?
Dexplorer is a lightweight, disposable blockchain explorer for Cosmos SDK chains. It connects directly via RPC/WebSocket without requiring backend infrastructure or databases.

## Integration Details

### Deployment
- **Repository**: Cloned from https://github.com/arifintahu/dexplorer.git
- **Location**: `/dexplorer` directory
- **Port**: 3001 (configured in vite.config.ts)
- **Workflow**: "Block Explorer" workflow running on port 3001

### Configuration
Dexplorer has been pre-configured with Aequitas Protocol as the default chain:

```javascript
{
  name: 'Aequitas Protocol',
  rpc: 'http://localhost:26657',
}
```

### Navigation Integration
A "Block Explorer" link has been added to the frontend navigation bar (both desktop and mobile) that opens Dexplorer in a new tab.

Location: `frontend/src/components/Navigation.jsx`

## How to Use

### Access the Block Explorer
1. Click the **"Explorer"** link in the navigation bar (with external link icon)
2. Dexplorer will open in a new tab at http://localhost:3001
3. Click **"Aequitas Protocol"** to auto-connect to localhost:26657

### Manual Connection
You can also manually enter any Cosmos SDK RPC endpoint:
- **Mainnet**: `https://rpc.aequitasprotocol.zone` (when live)
- **Testnet**: `https://rpc-testnet.aequitasprotocol.zone` (when live)
- **Local**: `http://localhost:26657` (for development)

## Features Available

Once connected to the Aequitas blockchain, Dexplorer provides:

- 📊 **Dashboard**: Real-time chain statistics and activity
- 🔗 **Blocks**: Browse and search blocks by height
- 💱 **Transactions**: View all transactions with details
- 👥 **Validators**: Active validator set and staking information
- 🗳️ **Governance**: Proposals and voting results
- 📝 **Accounts**: Account balances and transaction history
- ⚙️ **Parameters**: Chain parameters and configuration

## Native Currency Display

Dexplorer automatically displays:
- **Denom**: `urepar` (micro-REPAR, base unit)
- **Symbol**: `REPAR`
- **Decimals**: 6 (1 REPAR = 1,000,000 urepar)
- **Total Supply**: 131,000,000,000,000 REPAR (131 trillion)

## Custom Modules

Aequitas Protocol has custom Cosmos SDK modules:
- `x/defendant` - Defendant liability tracking
- `x/justice` - Justice Burn mechanism
- `x/claims` - Arbitration filing
- `x/distribution` - Reparations distribution
- `x/threatdefense` - Threat detection

These modules will appear in the explorer, though they may need custom decoding for full transaction details.

## Technical Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + Zustand
- **Blockchain**: CosmJS (@cosmjs/stargate, @cosmjs/tendermint-rpc)
- **Real-time**: WebSocket subscriptions

## Running Dexplorer

### Production
Dexplorer runs automatically via the "Block Explorer" workflow:
```bash
cd dexplorer && npm run dev
```
Accessible at: http://localhost:3001

### Manual Start (if needed)
```bash
cd dexplorer
npm install  # if not already installed
npm run dev
```

### Build for Production
```bash
cd dexplorer
npm run build
npm run preview
```

## Files Modified

### Dexplorer Configuration
- `dexplorer/vite.config.ts` - Added server config for port 3001
- `dexplorer/src/components/Connect/index.tsx` - Added Aequitas to chainList
- `dexplorer/AEQUITAS_CONFIG.md` - Configuration documentation

### Frontend Integration
- `frontend/src/components/Navigation.jsx` - Added Explorer link

### Documentation
- `docs/DEXPLORER_SETUP.md` - This file
- Updated `replit.md` with Dexplorer integration

## Workflows

Two workflows are now running:
1. **Frontend** - Main Aequitas UI (port 5000)
2. **Block Explorer** - Dexplorer (port 3001)

## Troubleshooting

### Block Explorer not loading
- Check if the "Block Explorer" workflow is running
- Verify port 3001 is not blocked
- Restart the workflow if needed

### Cannot connect to blockchain
- Ensure the Aequitas blockchain node is running on localhost:26657
- Check RPC endpoint is correct
- Verify WebSocket endpoint is accessible

### Explorer shows no data
- Blockchain node must be running and synced
- RPC and WebSocket endpoints must be available
- Check connection status in Dexplorer UI

## Next Steps

When the Aequitas blockchain is running:
1. Start the blockchain node: `aequitasd start`
2. Open Block Explorer from navigation
3. Connect to http://localhost:26657
4. Explore blocks, transactions, validators, and governance

## Production Deployment

For production deployment:
1. Update RPC endpoint to production URL
2. Build Dexplorer: `npm run build`
3. Deploy to static hosting or serve via CDN
4. Update navigation link to production URL

## Support

- **Dexplorer Docs**: https://github.com/arifintahu/dexplorer
- **Aequitas Config**: `dexplorer/AEQUITAS_CONFIG.md`
- **Live Demo**: https://dexplorer.arifintahu.com (general demo)

---

**Status**: ✅ Fully integrated and running on port 3001
