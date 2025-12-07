# Circle USDCKit Integration Guide

## Overview
This document explains how to integrate Circle's USDCKit SDK into the Aequitas Protocol for USDC payment processing.

## What is USDCKit?
USDCKit is Circle's developer-friendly SDK (released March 2025) designed to simplify USDC payment integration, automation, and compliance for businesses at scale.

## Key Features
- ✅ Automated fund flows (wallet creation, sweeps, mass payouts)
- ✅ Multi-chain support via Cross-Chain Transfer Protocol (CCTP)
- ✅ Built-in compliance (Circle Compliance Engine, Travel Rule support)
- ✅ High-performance infrastructure (millions of transactions)
- ✅ Supported chains: Ethereum, Solana, Arbitrum, Avalanche, Base, Polygon, Unichain

## Installation
```bash
npm install @circle-fin/usdckit --save
```

## Prerequisites
1. **Circle Developer Console Account**: https://console.circle.com
2. **API Key**: Generate from Circle Developer Console
3. **Entity Secret**: 32-byte key for wallet security

## Required Environment Variables
Add these to Replit Secrets:

```
CIRCLE_API_KEY=your_circle_api_key_here
CIRCLE_ENTITY_SECRET=your_32_byte_entity_secret_here
```

## Basic Setup

### 1. Create Circle Client
```javascript
import { createCircleClient } from '@circle-fin/usdckit'
import { ETH_SEPOLIA } from '@circle-fin/usdckit/chains'

const client = createCircleClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
  chain: ETH_SEPOLIA, // Start with testnet
})
```

### 2. Create an Account/Wallet
```javascript
// Creates an account on the default chain
const account = await client.createAccount()
console.log('Account created:', account.address)
```

### 3. Query Accounts
```javascript
// Query by address
const account = await client.getAccounts({ 
  address: '0xmy-address' 
})

// Query by custom reference ID
const account = await client.getAccounts({ 
  refId: 'user-1' 
})

// Query by minimum balance
const accounts = await client.getAccounts({ 
  amountGte: 1000 
})
```

### 4. Transfer USDC
```javascript
// Transfer USDC between accounts
const transfer = await client.transfer({
  from: senderAccount,
  to: recipientAddress,
  amount: '100', // Amount in USDC
})
```

### 5. Sweep Tokens (Gas-Efficient Collection)
```javascript
// Sweep USDC from multiple wallets to treasury
const sweep = await client.sweepTokens({
  fromAccounts: [account1, account2, account3],
  toAccount: treasuryAccount,
})
```

## Integration Points for Aequitas Protocol

### Justice Burn Payment Processing
When a defendant makes a payment:
1. Accept USDC via Circle wallet
2. Verify payment amount
3. Execute Justice Burn (burn equivalent $REPAR)
4. Record transaction on blockchain
5. Update defendant liability

### Reparations Distribution
When distributing to descendants:
1. Query registered descendants from x/distribution module
2. Calculate allocation amounts
3. Use Circle mass payout for efficient distribution
4. Record distribution on blockchain

### DEX Integration
For the Founder Wallet DEX:
- Accept USDC deposits via Circle wallets
- Enable USDC <-> REPAR swaps
- Process cross-chain USDC transfers via CCTP

## Production Deployment

### Mainnet Configuration
```javascript
import { ETH_MAINNET, SOLANA_MAINNET } from '@circle-fin/usdckit/chains'

const client = createCircleClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
  chain: ETH_MAINNET, // Switch to mainnet
})
```

### Multi-Chain Support
```javascript
// Support USDC on multiple chains
const ethClient = createCircleClient({ chain: ETH_MAINNET })
const solClient = createCircleClient({ chain: SOLANA_MAINNET })
const arbClient = createCircleClient({ chain: ARBITRUM_MAINNET })

// Cross-chain transfer via CCTP
const cctp = await ethClient.crossChainTransfer({
  from: ethAddress,
  to: solAddress,
  amount: '1000',
  destinationChain: SOLANA_MAINNET,
})
```

## Compliance Features

### Transaction Screening
Circle automatically screens all transactions through their Compliance Engine:
- Sanctions list checking
- AML/CFT compliance
- Travel Rule adherence (for regulated jurisdictions)

### Audit Trail
All transactions are logged and auditable:
```javascript
// Query transaction history
const txHistory = await client.getTransactions({
  accountId: account.id,
  startDate: '2025-01-01',
  endDate: '2025-12-31',
})
```

## Pricing
- **Free Tier**: First 1,000 Monthly Active Wallets
- **API Calls**: First 25,000 monthly calls free
- Volume discounts available for scale

## Security Best Practices

1. **Never commit API keys** - Always use Replit Secrets
2. **Rotate entity secrets** regularly
3. **Use testnet** for development (ETH_SEPOLIA, SOL_DEVNET)
4. **Implement rate limiting** to avoid API quota exhaustion
5. **Monitor webhook events** for payment confirmations

## Resources
- **Official Docs**: https://docs-w3s-node-sdk.circle.com/
- **Developer Portal**: https://developers.circle.com/
- **NPM Package**: https://www.npmjs.com/package/@circle-fin/usdckit
- **Support Email**: usdckit@circle.com
- **Blog Tutorial**: https://www.circle.com/blog/build-a-usdc-payment-gated-app-with-circle-sdk

## Next Steps

1. ✅ **SDK Installed**: `@circle-fin/usdckit` v0.17.1
2. ⏳ **Get API Keys**: Register at https://console.circle.com
3. ⏳ **Add Secrets**: Add CIRCLE_API_KEY and CIRCLE_ENTITY_SECRET to Replit
4. ⏳ **Create Integration**: Build Circle client utility in frontend
5. ⏳ **Test on Testnet**: Verify functionality on ETH_SEPOLIA
6. ⏳ **Deploy to Mainnet**: Switch to production chains

---

**Status**: SDK installed, awaiting API keys from user to activate integration.
