# Aequitas Protocol Frontend

React + Vite frontend for the Aequitas Zone blockchain.

## Blockchain Integration

The frontend connects to the Aequitas Zone Cosmos blockchain via:
- **Local RPC**: `http://0.0.0.0:26657` (development)
- **Fallback RPC**: `https://rpc.aequitas.zone` (production)

### Features
- Real-time blockchain data with automatic fallback to mock data
- Live chain status indicator
- Defendant liability tracking from on-chain state
- Justice Burn NFT integration
- Multi-signature wallet support

### Environment Setup

Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

### Running with Blockchain

1. Start the Aequitas chain (in the `aequitas` directory):
```bash
ignite chain serve
```

2. Start the frontend:
```bash
npm run dev
```

The app will automatically connect to the local chain or fallback to mock data if unavailable.