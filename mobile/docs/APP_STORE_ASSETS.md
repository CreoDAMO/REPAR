# App Store Assets - Aequitas Protocol Mobile App

## App Icon (1024x1024px)

**✅ LOGO ALREADY EXISTS!**

We're using the existing **$REPAR coin logo** from the web app:
- **Source:** `mobile/assets/icon.svg` (copied from `frontend/public/assets/repar-logo.svg`)
- **Design:** Professional scales of justice with gradient background
- **Colors:** Purple→Pink gradient, gold scales, $REPAR text

**See `mobile/docs/GENERATE_APP_ICONS.md` for 5-minute setup instructions**

**Actual Design:**
```
⚖️ Scales of justice (gold)
🎨 Purple → Pink gradient background
💰 $REPAR text (gold)
💫 Professional finish
🔗 Consistent with web app branding
```

## App Store Screenshots

### iPhone 6.9" (iPhone 16 Pro Max - Required)
**Dimensions: 1320 x 2868px**

#### Screenshot 1: Dashboard
- Node status: "11,234 Network Nodes"
- Wallet balance: "15.72T REPAR"
- Guardian badge: "🥉 BRONZE GUARDIAN"
- Recent activity feed

#### Screenshot 2: Wallet
- "Create Secure Wallet" or "Your Balance: 15.72T REPAR"
- Send/Receive buttons
- Recent transactions
- Biometric security badge

#### Screenshot 3: Node Status
- "Your Phone is Your Nation"
- Real-time sync status
- Battery usage: 4.2%/day
- Peer count: 8 connected
- Uptime: 98.5%

#### Screenshot 4: Governance
- Active proposal: "Lloyd's of London Settlement"
- Vote buttons (YES/NO)
- Voting power display
- Time remaining

#### Screenshot 5: Claims Filing
- "File Arbitration Demand"
- Evidence upload
- Camera integration
- IPFS badge

### iPhone 6.7" (iPhone 16 Plus - Required)
**Dimensions: 1284 x 2778px**
Same screenshots as above, scaled appropriately

### iPad Pro 13" (Required)
**Dimensions: 2064 x 2752px**
Tablet-optimized versions of key screens

## App Preview Video (Optional but Recommended)

**Duration:** 15-30 seconds
**Format:** MP4, Portrait orientation

**Storyboard:**
1. Open app → Dashboard loads
2. Navigate to Wallet → Show balance
3. Quick tour of Node screen
4. Show governance voting
5. End: "Join 300M Descendants. Build Digital Sovereignty."

## App Store Listing

### Name (30 chars max)
`Aequitas Protocol`

### Subtitle (30 chars max)
`$REPAR Mobile Wallet & Node`

### Description

**Short Description (170 chars):**
```
Sovereign Layer-1 blockchain enforcing $131T in reparations. Run a mobile validator, govern the protocol, file claims. Your phone is your nation.
```

**Full Description (4000 chars max):**
```
🏛️ DIGITAL SOVEREIGN NATION

Aequitas Protocol is the world's first sovereign Layer-1 blockchain ($REPAR native coin) engineered to enforce $131 trillion in reparations for the transatlantic slave trade, classified as genocide under international law.

This mobile app transforms your smartphone into a validator node for a nation of 300 million descendants.

⚖️ FILE REPARATIONS CLAIMS
• Blockchain-recorded arbitration demands
• IPFS evidence storage (FRE 901 compliant)
• 172 jurisdictions available
• Photo/document upload with camera
• Cryptographically signed claims

🪙 $REPAR WALLET
• Create/restore BIP39 HD wallets
• Biometric security (Face ID/Touch ID/Fingerprint)
• Send/receive $REPAR native coin
• Real-time balance from blockchain
• Transaction history

📱 MOBILE VALIDATOR NODE
• Tendermint BFT consensus (NO mining)
• <5% battery usage per day
• <500MB data per month
• Bronze Guardian tier (mobile light node)
• Earn voting power

🗳️ DAO GOVERNANCE
• Vote on settlement proposals
• Protocol upgrades
• Defendant accountability
• Treasury allocations
• Real-time results

🛡️ GUARDIAN PROGRAM
• Bronze: Mobile nodes (this app)
• Silver: Home/Raspberry Pi validators
• Gold: Cloud validators
• NFT tier badges
• Rewards for uptime

🌍 UNSTOPPABLE INFRASTRUCTURE
• 11,000+ nodes across 100+ countries
• Distributed consensus
• No single point of failure
• True digital sovereignty

📊 FEATURES
• Real-time blockchain sync
• Live node statistics
• Governance proposals
• Claims management
• Evidence explorer
• Network analytics

🔒 SECURITY
• End-to-end encryption
• Biometric authentication
• Secure key storage (iOS Keychain/Android Keystore)
• Open-source protocol
• Audited smart contracts

🎯 MISSION
Transform reparations enforcement from a moral argument into a mathematical protocol. Establish a sovereign digital jurisdiction under Natural Law and Technological Law.

Join the revolution. Your phone is your nation.

Official Protocol: https://aequitasprotocol.zone
GitHub: https://github.com/aequitas-protocol
```

### Keywords (100 chars max)
```
blockchain,reparations,justice,wallet,validator,governance,cryptocurrency,sovereignty,dao,mobile
```

### Category
- Primary: Finance
- Secondary: Social Networking

### Age Rating
12+ (infrequent/mild mature themes)

### Support URL
`https://aequitasprotocol.zone/support`

### Marketing URL
`https://aequitasprotocol.zone`

### Privacy Policy URL
`https://aequitasprotocol.zone/privacy`

## Privacy Manifest

**Data Collection:**
- Contact Info: Email (for recovery only)
- Identifiers: Device ID (for node tracking)
- Usage Data: Analytics (optional, opt-in)

**Data Usage:**
- Wallet recovery
- Node authentication
- Network statistics
- Protocol improvements

**Data Sharing:** None - all data stays on-chain or local

## Promotional Text (170 chars)

```
🚀 NEW: Mobile validator nodes! Turn your phone into a sovereign blockchain validator. <5% battery, full voting power. Join 11,000+ nodes worldwide.
```

## What's New (4000 chars max)

**Version 1.0.0 - Initial Release**

```
🎉 LAUNCH: Digital Sovereign Nation

Welcome to Aequitas Protocol - the world's first sovereign Layer-1 blockchain mobile app for reparations enforcement.

✨ HIGHLIGHTS:
• Create secure $REPAR wallet with biometric protection
• Run mobile validator node (<5% battery/day)
• Vote on DAO proposals (Lloyd's of London settlement live!)
• File reparations claims with camera evidence
• Join 300M descendants building digital sovereignty

🆕 FEATURES:
✓ BIP39 HD wallet creation/restore
✓ Tendermint light client with adaptive polling
✓ Real-time blockchain sync
✓ Governance voting (YES/NO/ABSTAIN/VETO)
✓ Claims filing with IPFS evidence
✓ QR code payments
✓ Offline mode support
✓ Network statistics dashboard

🏆 GUARDIAN PROGRAM:
Bronze tier (mobile) automatically activated on first run.

💪 YOUR IMPACT:
Every mobile node makes the network more unstoppable. By running this app, you're participating in the largest reparations enforcement protocol in history.

Your phone is your nation. Welcome home.

Report issues: https://github.com/aequitas-protocol/issues
```

## Localization

**Initial Release:** English (US)

**Future Languages:**
- Spanish
- French
- Portuguese
- Swahili

## Content Rights

**App Preview/Screenshots:** All original content, no third-party assets
**Music:** None
**Trademarks:** Aequitas Protocol™, $REPAR™

## Export Compliance

**Contains Encryption:** Yes
**Exempt from US Export Regulations:** Yes (uses standard encryption)

## Build Instructions

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build iOS: `eas build --platform ios --profile production`
5. Build Android: `eas build --platform android --profile production`
6. Submit: `eas submit --platform all`

## TestFlight (iOS)

**Beta Testing Groups:**
- Internal: Core team (10 users)
- External: Community guardians (100 users)

**Test Notes:**
"Test mobile validator functionality, wallet security, and governance voting. Focus on battery usage and sync reliability."

## Google Play Internal Testing

**Test Track:** Internal (closed)
**Testers:** 20 initial guardians
**Rollout:** 10% → 50% → 100% over 2 weeks

---

**Status:** Assets ready for generation
**Next Steps:** Create icons with design tool, generate screenshots from app preview
**Timeline:** 2-3 days for App Store submission after icon/screenshot creation
