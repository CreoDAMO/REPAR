# 🚀 Quick Start Guide

Get up and running with Aequitas Protocol in 5 minutes.

---

## 📱 For Users - Mobile App

### Download (Coming Soon)

```bash
# iOS (TestFlight Beta)
# Visit: https://testflight.apple.com/join/aequitas
# Or scan QR code

# Android (Play Store Internal Testing)
# Visit: https://play.google.com/store/apps/details?id=zone.aequitas.mobile
```

### First Launch

1. **Accept Citizenship** - Review and accept DC-SSI framework
2. **Create Wallet** - Generate 24-word mnemonic (WRITE IT DOWN!)
3. **Enable Biometric** - Set up FaceID/TouchID/Fingerprint
4. **Become Light Validator** - One-tap activation
5. **Verify Descent** (Optional) - Unlock full features

**Done! You're now running a mobile sovereign node.**

---

## 💻 For Developers - Local Development

### Prerequisites

- **Node.js 20+** and npm
- **Go 1.23+** (for blockchain development)
- **Git**

### Installation (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/CreoDAMO/REPAR.git
cd REPAR

# 2. Install frontend dependencies
cd frontend && npm install

# 3. Start development server
npm run dev
```

**Open:** http://localhost:5000

---

## 🏗️ Full Stack Setup

### Frontend + Backend + Blockchain

```bash
# Terminal 1 - Frontend (React/Vite)
cd frontend
npm install
npm run dev
# Runs on: http://localhost:5000

# Terminal 2 - Block Explorer
cd dexplorer
npm install
npm run dev -- --host 0.0.0.0 --port 3001
# Runs on: http://localhost:3001

# Terminal 3 - Circle API Backend
cd backend
npm install
PORT=3002 npm run dev
# Runs on: http://localhost:3002

# Terminal 4 - Blockchain (optional - for local testing)
cd aequitas
# Build blockchain binary
go build -o ./build/aequitasd ./cmd/aequitasd
# Initialize testnet
./scripts/init-testnet.sh
# Start node
./build/aequitasd start
```

---

## 📱 Mobile App Development

### Expo Setup

```bash
# 1. Navigate to mobile directory
cd mobile

# 2. Install dependencies
npm install

# 3. Start Expo development server
npx expo start

# 4. Run on device
npm run ios      # iOS (requires macOS + Xcode)
npm run android  # Android (requires Android Studio)

# 5. Or scan QR code with Expo Go app
```

### Production Build

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

---

## ⛓️ Blockchain Development

### Build from Source

```bash
# Navigate to blockchain directory
cd aequitas

# Install Go dependencies
go mod download

# Generate protobuf files
make proto-gen

# Build binary
go build -o ./build/aequitasd ./cmd/aequitasd

# Verify build
./build/aequitasd version
# Should output: aequitas-1
```

### Initialize Networks

```bash
# Initialize both testnet and mainnet
./scripts/init-both.sh

# Or individually:
./scripts/init-testnet.sh   # Testnet only
./scripts/init-mainnet.sh   # Mainnet only
```

### Start Node

```bash
# Start testnet node
./build/aequitasd start --home ~/.aequitas-testnet

# Start mainnet node
./build/aequitasd start --home ~/.aequitas
```

---

## 🔑 Wallet Setup

### Keplr (Recommended)

1. Install Keplr browser extension
2. Visit Aequitas web app
3. Click "Connect Keplr"
4. Approve chain addition
5. Done! Full features unlocked

### MetaMask (EVM Compatibility)

1. Install MetaMask
2. Add Aequitas RPC (coming soon)
3. Connect to web app
4. Limited features (EVM only)

### Coinbase Wallet

1. Install Coinbase Wallet
2. Visit web app
3. Click "Connect Coinbase"
4. Approve connection

---

## 🛠️ Development Workflows

### Frontend Development

```bash
cd frontend

# Development
npm run dev          # Start dev server

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Linting
npm run lint         # Check code quality
```

### Mobile Development

```bash
cd mobile

# Development
npx expo start       # Start Expo dev server
npm run ios          # iOS simulator
npm run android      # Android emulator

# Building
eas build --platform ios     # iOS build
eas build --platform android # Android build

# Submission
eas submit --platform ios    # Submit to App Store
eas submit --platform android # Submit to Play Store
```

### Blockchain Development

```bash
cd aequitas

# Development
make proto-gen       # Generate protobuf
make build           # Build binary
make test            # Run tests
make install         # Install binary to $GOPATH/bin

# Testnet
./scripts/init-testnet.sh    # Initialize
./build/aequitasd start --home ~/.aequitas-testnet
```

---

## 🔍 Common Commands

### Blockchain

```bash
# Query balance
aequitasd query bank balances <address>

# Send transaction
aequitasd tx bank send <from> <to> <amount>repar

# Query defendant
aequitasd query defendant show-defendant <id>

# File claim
aequitasd tx claims file-claim <defendant-id> <amount> <evidence-hash>

# Vote on proposal
aequitasd tx gov vote <proposal-id> yes

# Query DEX pool
aequitasd query dex pool
```

### Node Operations

```bash
# Check node status
aequitasd status

# View logs
tail -f ~/.aequitas/aequitasd.log

# Reset node (WARNING: DELETES DATA)
aequitasd tendermint unsafe-reset-all
```

---

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
```

### Mobile Tests

```bash
cd mobile
npm test             # Unit tests
```

### Blockchain Tests

```bash
cd aequitas
go test ./...        # All tests
go test ./x/claims/...  # Specific module
```

---

## 📦 Environment Variables

### Frontend (.env)

```bash
VITE_CHAIN_ID=aequitas-testnet-1
VITE_RPC_URL=http://localhost:26657
VITE_REST_URL=http://localhost:1317
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

### Mobile (app.json)

```json
{
  "extra": {
    "chainId": "aequitas-testnet-1",
    "rpcUrl": "https://rpc.aequitasprotocol.zone",
    "restUrl": "https://api.aequitasprotocol.zone"
  }
}
```

### Backend (.env)

```bash
PORT=3002
CIRCLE_API_KEY=your_api_key_here
CIRCLE_API_URL=https://api.circle.com/v1
```

---

## 🆘 Troubleshooting

### Frontend Not Loading?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Mobile App Won't Build?

```bash
# Clear Expo cache
npx expo start --clear

# Reset Metro bundler
npx expo start --reset-cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Blockchain Won't Start?

```bash
# Check if ports are available
lsof -i :26657  # Tendermint RPC
lsof -i :1317   # REST API

# Reset blockchain data (WARNING: DELETES DATA)
aequitasd tendermint unsafe-reset-all --home ~/.aequitas-testnet

# Reinitialize
./scripts/init-testnet.sh
```

### Wallet Won't Connect?

1. **Keplr:** Clear browser cache, reload page
2. **MetaMask:** Check network settings, ensure RPC is correct
3. **Coinbase:** Disable/enable extension, reconnect

---

## 📚 Next Steps

### For Users
- ✅ [Mobile App Guide](./Mobile-App.md) - Complete mobile app documentation
- ✅ [FAQ](./FAQ.md) - Frequently asked questions
- ✅ [Digital Citizenship](./Digital-Citizenship.md) - Understand DC-SSI framework

### For Developers
- ✅ [Architecture](./Architecture.md) - System architecture overview
- ✅ [Blockchain Modules](./Blockchain-Modules.md) - All 12 modules explained
- ✅ [API Reference](./API-Reference.md) - Complete API docs
- ✅ [Contributing](./Contributing.md) - How to contribute

### For Validators
- ✅ [Node Setup](./Node-Setup.md) - Run validators (mobile/home/cloud)
- ✅ [Infrastructure](./Infrastructure.md) - Distributed sovereignty strategy
- ✅ [Monitoring](./Monitoring.md) - System monitoring

---

## 🎯 Quick Access Checklist

- [ ] Repository cloned
- [ ] Node.js 20+ installed
- [ ] Frontend running on :5000
- [ ] Wallet connected (Keplr recommended)
- [ ] Mobile app downloaded (or built from source)
- [ ] Blockchain testnet initialized (optional)
- [ ] 24-word mnemonic backed up
- [ ] Biometric auth enabled

**You're ready to build on Aequitas!**

---

**Last Updated:** November 04, 2025
**Version:** 1.0  
**Need Help?** Open an issue on GitHub or email support@aequitasprotocol.zone
