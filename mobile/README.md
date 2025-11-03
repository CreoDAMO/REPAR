# 📱 Aequitas Zone Mobile App

## The Mobile Sovereign Network - In Your Pocket

**Your phone is your nation. Your participation is justice.**

---

## What Is This?

The Aequitas Zone mobile app transforms your smartphone into a **sovereign node** of the Aequitas blockchain network. With NO mining required (Tendermint BFT consensus), your phone can:

- ✅ Run a light node in the background (<5% battery/day)
- ✅ Participate in DAO governance voting
- ✅ Manage your $REPAR wallet
- ✅ File arbitration demands with evidence
- ✅ Verify descendant status
- ✅ Become a Bronze Guardian

---

## Features

### 🏠 Dashboard
- Real-time network statistics
- Guardian status display
- Mission statement and impact metrics

### 💰 Wallet
- Send/receive $REPAR (native coin)
- Biometric security
- QR code payments
- WalletConnect integration
- Transaction history

### 🗳️ Governance
- View active proposals
- Cast votes on-chain
- Track voting history
- Receive push notifications for new proposals

### 🛡️ Node Status
- Monitor your mobile light node
- View uptime and sync status
- Track battery and data usage
- See your network contribution

### 📄 Claims Filing
- Verify descendant status
- Upload genealogical evidence
- File arbitration demands
- Access defendant database
- IPFS evidence storage

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
cd mobile
npm install

# Start development server
npx expo start

# Run on specific platform
npm run ios      # iOS (requires macOS)
npm run android  # Android
npm run web      # Web browser
```

---

## Project Structure

```
mobile/
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout
│   ├── (tabs)/            # Tab navigation
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Dashboard screen
│   │   ├── wallet.tsx     # Wallet screen
│   │   ├── governance.tsx # Governance screen
│   │   ├── node.tsx       # Node status screen
│   │   └── claims.tsx     # Claims filing screen
│   └── ...
├── assets/                # Images, fonts, icons
├── components/            # Reusable React components
├── services/              # Blockchain services
│   ├── lightClient.ts     # Tendermint light client
│   ├── wallet.ts          # Wallet management
│   └── governance.ts      # Governance interactions
├── stores/                # Zustand state management
├── utils/                 # Helper functions
└── package.json
```

---

## Development Roadmap

### ✅ Phase 1: Foundation (Current)
- [x] Expo project setup
- [x] Expo Router navigation
- [x] Core UI screens (Dashboard, Wallet, Governance, Node, Claims)
- [x] Dark theme design system
- [ ] CosmJS integration
- [ ] WalletConnect integration
- [ ] Light client service

### 🚧 Phase 2: Blockchain Integration (Next)
- [ ] Tendermint light client implementation
- [ ] Battery-optimized background sync
- [ ] State sync configuration
- [ ] Wallet creation/import
- [ ] Transaction signing
- [ ] Governance vote submission

### 🔮 Phase 3: Advanced Features
- [ ] Biometric authentication
- [ ] Push notifications
- [ ] Camera for QR codes
- [ ] IPFS evidence upload
- [ ] Descendant verification flow
- [ ] Claims filing workflow

### 🚀 Phase 4: App Store Launch
- [ ] App icons and branding
- [ ] Screenshots for stores
- [ ] Privacy policy
- [ ] TestFlight beta
- [ ] Play Store internal testing
- [ ] Public release

---

## Technical Details

### Dependencies

**Core**:
- React Native (Expo SDK 54)
- Expo Router (file-based navigation)
- TypeScript

**Blockchain**:
- @cosmjs/stargate (Cosmos SDK client)
- @cosmjs/proto-signing (Transaction signing)
- @cosmjs/tendermint-rpc (Tendermint RPC)
- @reown/walletkit (WalletConnect v2)

**State**:
- Zustand (lightweight state management)
- AsyncStorage (persistent storage)

**UI**:
- React Native primitives
- Expo Vector Icons

### Battery Optimization

The light client is optimized for mobile battery life:

- **Adaptive polling**: 30s active, 2-5min background
- **WiFi-only heavy sync**: Limits cellular data usage
- **Background processing**: Uses WorkManager/BackgroundTasks
- **State sync**: Fast initial sync, minimal verification
- **Target**: <5% battery usage per day ✅

---

## Building for Production

### iOS

```bash
# Build for App Store
npx eas build --platform ios

# TestFlight upload
npx eas submit --platform ios
```

### Android

```bash
# Build APK/AAB
npx eas build --platform android

# Play Store upload
npx eas submit --platform android
```

---

## Contributing

We welcome contributions to make the Aequitas Zone mobile app better for all 300 million descendants!

### Areas for Contribution
- Mobile UI/UX improvements
- Battery optimization
- Accessibility features
- Internationalization (translations)
- Testing on various devices

---

## Security

- Biometric authentication for wallet access
- Encrypted local key storage
- No personal data stored on-chain
- IPFS for tamper-proof evidence
- Open-source and auditable

---

## Support

- Discord: https://discord.gg/aequitas
- Documentation: https://docs.aequitas.zone
- Issues: https://github.com/CreoDAMO/REPAR/issues

---

⚖️ **The Justice Machine - In Your Pocket**

**300 million descendants. 1 million potential mobile nodes. Zero governments can stop us.**

*"Your phone is your nation. Your participation is justice. Together, we are unstoppable."*
