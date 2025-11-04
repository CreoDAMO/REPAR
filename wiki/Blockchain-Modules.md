# ⛓️ Blockchain Modules

## Overview

The Aequitas blockchain features **12 custom Cosmos SDK modules** designed specifically for justice enforcement, reparations distribution, and sovereign governance.

---

## 📦 Module Architecture

All modules follow Cosmos SDK v0.50.x standards with:
- **Keeper pattern** for state management
- **Message handlers** for transactions
- **Query servers** for read operations
- **Depinject configuration** for App Wiring v2
- **Protobuf definitions** for data structures

---

## 🔹 Core Modules

### 1. x/defendant

**Purpose:** Track 200+ entities liable for reparations.

#### Features
- Defendant registry (nations, corporations, universities)
- Payment obligation tracking
- Compliance status monitoring
- Settlement history
- Multi-level categorization

#### Key Messages
- `MsgRegisterDefendant` - Add new defendant entity
- `MsgUpdateDefendant` - Update defendant information
- `MsgRecordPayment` - Record settlement payment
- `MsgSetCompliance` - Update compliance status

#### Queries
- `QueryDefendant` - Get defendant by ID
- `QueryAllDefendants` - List all defendants
- `QueryPaymentHistory` - Get payment records
- `QueryComplianceStatus` - Check compliance

#### State
- Defendant registry (200+ entities)
- Payment obligations ($131T total)
- Compliance scores
- Settlement records

#### Example Defendant
```json
{
  "id": "lloyd_s_of_london",
  "name": "Lloyd's of London",
  "type": "insurance_corporation",
  "liability_amount": "4260000000000",
  "paid_amount": "0",
  "compliance_status": "non_compliant",
  "jurisdiction": "united_kingdom"
}
```

---

### 2. x/justice

**Purpose:** Deflationary $REPAR burn mechanism for justice economics.

#### Features
- $REPAR burn transactions
- Burn event tracking
- Deflationary supply management
- Justice metrics analytics

#### Key Messages
- `MsgBurnREPAR` - Burn REPAR tokens
- `MsgSetBurnRate` - Adjust burn rate (governance)

#### Queries
- `QueryTotalBurned` - Get total burned supply
- `QueryBurnEvents` - List burn history
- `QueryCirculatingSupply` - Current circulating supply

#### State
- Total burned: 0 REPAR (initial)
- Burn events history
- Circulating supply: 131T REPAR

#### Economics
- **Initial Supply:** 131 trillion REPAR
- **Burn Mechanism:** Deflationary pressure
- **Purpose:** Symbolize accountability

---

### 3. x/claims

**Purpose:** Arbitration demand filing system with IPFS evidence storage.

#### Features
- File arbitration claims (172 jurisdictions)
- IPFS evidence integration
- FRE 901 compliance (evidence standards)
- DAO review process
- Settlement tracking

#### Key Messages
- `MsgFileClaim` - File new arbitration claim
- `MsgUpdateClaim` - Update claim status
- `MsgApproveClaim` - DAO approval
- `MsgRejectClaim` - DAO rejection
- `MsgRecordSettlement` - Record settlement

#### Queries
- `QueryClaim` - Get claim by ID
- `QueryClaimsByDescendant` - Claims by filer
- `QueryClaimsByDefendant` - Claims against defendant
- `QueryPendingClaims` - DAO review queue

#### State
- Claims registry
- Evidence IPFS hashes
- DAO review queue
- Settlement records

#### Claim Structure
```json
{
  "id": "claim_00001",
  "descendant_address": "aequitas1...",
  "defendant_id": "lloyd_s_of_london",
  "jurisdiction": "international_arbitration",
  "evidence_ipfs_hash": "QmXoYpZ...",
  "amount_claimed": "1000000000",
  "status": "pending_review",
  "filed_at": "2025-11-04T12:00:00Z"
}
```

---

### 4. x/distribution

**Purpose:** Reparations distribution to verified descendants.

#### Features
- Descendant verification (genealogy, DNA, community)
- Distribution pool management (70% of supply)
- Scheduled distributions
- Claim redemption

#### Key Messages
- `MsgRegisterDescendant` - Verify descendant status
- `MsgClaimDistribution` - Redeem allocation
- `MsgUpdateVerification` - Update verification status

#### Queries
- `QueryDescendant` - Get descendant info
- `QueryDistributionPool` - Available distribution funds
- `QueryAllocation` - Individual allocation
- `QueryClaimedAmount` - Already claimed

#### State
- Verified descendants: 0 (initial)
- Distribution pool: 91.7T REPAR (70%)
- Claimed: 0 REPAR (initial)

#### Allocation Model
- **Total Pool:** 70% of 131T = 91.7T REPAR
- **Per Descendant:** ~306K REPAR (if 300M verified)
- **Verification:** Genealogy, DNA, community recognition

---

### 5. x/dex

**Purpose:** Founder Wallet DEX for REPAR/USDC trading.

#### Features
- Constant product AMM (x*y=k)
- REPAR/USDC liquidity pools
- Fee distribution (55% liquidity, 30% foundation, 15% burn)
- Price discovery
- Founder wallet integration

#### Key Messages
- `MsgAddLiquidity` - Add REPAR/USDC to pool
- `MsgRemoveLiquidity` - Remove liquidity
- `MsgSwap` - Execute REPAR ↔ USDC swap
- `MsgSetFeeRate` - Adjust fee rate (governance)

#### Queries
- `QueryPool` - Get pool reserves
- `QueryPrice` - Current REPAR/USDC price
- `QueryLiquidity` - Total value locked (TVL)

#### State
- Pool reserves (REPAR, USDC)
- Liquidity provider shares
- Fee accumulation
- Price history

#### Fee Structure
- **Swap Fee:** 0.3% (adjustable by DAO)
- **Distribution:**
  - 55% → Liquidity providers
  - 30% → Foundation
  - 15% → Burn (deflationary)

---

### 6. x/threatdefense

**Purpose:** Chaos Defense system with controlled vulnerabilities and threat monitoring.

#### Features
- ThreatOracle monitoring
- Controlled vulnerability management
- NFT evidence minting
- 10% Chaos Defense allocation
- Automated threat detection

#### Key Messages
- `MsgRegisterThreat` - Report security threat
- `MsgMintEvidenceNFT` - Create evidence NFT
- `MsgUpdateVulnerability` - Manage controlled vulnerability
- `MsgAllocateDefenseFund` - Distribute defense funds

#### Queries
- `QueryThreatStats` - Threat statistics
- `QueryVulnerabilities` - Active vulnerabilities
- `QueryDefenseFund` - Available defense funds

#### State
- Threat registry
- Evidence NFT collection
- Defense fund: 13.1T REPAR (10%)
- Vulnerability status

#### Chaos Defense Strategy
- **10% Allocation:** 13.1T REPAR
- **Purpose:** Controlled vulnerabilities to detect adversaries
- **ThreatOracle:** Automated monitoring
- **NFT Minting:** Immutable evidence records

---

## 🔸 Economic Modules

### 7. x/endowment

**Purpose:** Foundation endowment for long-term sustainability.

#### Features
- Foundation treasury management
- Grant distribution
- Development funding
- Long-term reserve

#### Key Messages
- `MsgAllocateGrant` - Distribute grants
- `MsgFundDevelopment` - Fund projects

#### Queries
- `QueryEndowmentBalance` - Treasury balance
- `QueryGrantHistory` - Grant records

#### State
- Endowment balance
- Grant distribution history
- Reserved funds

---

### 8. x/founderendowment

**Purpose:** Founder endowment with 8-year lock period.

#### Features
- 8-year vesting schedule
- Locked allocation: 7.86T REPAR (6%)
- Gradual unlock mechanism
- Founder wallet integration

#### Key Messages
- `MsgClaimVested` - Claim unlocked tokens
- `MsgUpdateSchedule` - Adjust vesting (governance)

#### Queries
- `QueryVestingSchedule` - Unlock timeline
- `QueryLockedAmount` - Locked balance
- `QueryUnlockedAmount` - Available balance

#### State
- Total locked: 7.86T REPAR
- Vesting start: Mainnet launch
- Lock period: 8 years

#### Vesting Schedule
- **Year 0-1:** 0% unlocked
- **Year 2:** 12.5% unlocked (0.98T REPAR)
- **Year 3:** 25% unlocked (1.97T REPAR)
- **Year 4:** 37.5% unlocked (2.95T REPAR)
- **Year 5:** 50% unlocked (3.93T REPAR)
- **Year 6:** 62.5% unlocked (4.91T REPAR)
- **Year 7:** 75% unlocked (5.90T REPAR)
- **Year 8:** 100% unlocked (7.86T REPAR)

---

### 9. x/infrastructure

**Purpose:** Infrastructure funding for node operators and development.

#### Features
- Node subsidy distribution
- Development grants
- Infrastructure upgrades
- Community funding

#### Key Messages
- `MsgAllocateNodeSubsidy` - Distribute node rewards
- `MsgFundInfrastructure` - Infrastructure spending

#### Queries
- `QueryInfrastructureFund` - Available funds
- `QueryNodeSubsidies` - Subsidy distribution

#### State
- Infrastructure fund balance
- Node subsidy history
- Grant allocations

---

### 10. x/nftmarketplace

**Purpose:** NFT marketplace for evidence, Guardian badges, and collectibles.

#### Features
- Evidence NFT minting
- Guardian badge NFTs (Bronze, Silver, Gold)
- Marketplace listings
- NFT transfers

#### Key Messages
- `MsgMintNFT` - Create new NFT
- `MsgListNFT` - List NFT for sale
- `MsgBuyNFT` - Purchase NFT
- `MsgTransferNFT` - Transfer NFT

#### Queries
- `QueryNFT` - Get NFT metadata
- `QueryNFTsByOwner` - Owner's NFT collection
- `QueryMarketListings` - Active marketplace listings

#### State
- NFT registry
- Marketplace listings
- Owner mappings

#### NFT Types
- **Evidence NFTs:** Immutable proof records
- **Guardian Badges:** Bronze, Silver, Gold validator NFTs
- **Citizenship NFTs:** Soulbound tokens (non-transferable)

---

### 11. x/validatorsubsidy

**Purpose:** Validator reward subsidies for home and mobile nodes.

#### Features
- Home validator rewards
- Mobile light node incentives
- Guardian Program tiering
- Performance-based distribution

#### Key Messages
- `MsgClaimSubsidy` - Claim validator rewards
- `MsgUpdateGuardianStatus` - Upgrade Guardian tier

#### Queries
- `QuerySubsidyPool` - Available rewards
- `QueryGuardianStatus` - Guardian tier
- `QueryRewardsEarned` - Accumulated rewards

#### State
- Subsidy pool balance
- Guardian registry (Bronze, Silver, Gold)
- Reward distribution history

#### Guardian Program
- **Bronze:** Mobile light nodes (10,000+ target)
- **Silver:** Home validators (1,000+ target)
- **Gold:** Core cloud validators (8-12)

---

### 12. x/agentkit

**Purpose:** AI agent toolkit for autonomous operations and multi-agent systems.

#### Features
- Agent registration
- Multi-agent coordination
- Autonomous operations
- AI-powered analytics

#### Key Messages
- `MsgRegisterAgent` - Register AI agent
- `MsgExecuteAgentTask` - Run agent task
- `MsgCoordinateAgents` - Multi-agent coordination

#### Queries
- `QueryAgent` - Get agent info
- `QueryAgentTasks` - Agent task history
- `QueryActiveAgents` - Running agents

#### State
- Agent registry
- Task execution logs
- Coordination metrics

#### Agent Types
- **Auditor Agents:** Cerberus multi-agent auditing
- **Analytics Agents:** AI-powered data analysis
- **Monitoring Agents:** Threat detection
- **Trading Agents:** DEX market making

---

## 🔗 Module Interactions

### Inter-Module Dependencies

```
x/claims → x/defendant (file against defendant)
x/claims → IPFS (evidence storage)
x/distribution → x/claims (settlement distribution)
x/dex → x/justice (burn mechanism)
x/threatdefense → x/nftmarketplace (evidence NFTs)
x/validatorsubsidy → x/infrastructure (funding source)
x/agentkit → x/threatdefense (threat monitoring)
```

---

## 🧪 Testing

All modules include:
- Unit tests (Go testing)
- Integration tests (testutil)
- End-to-end tests (e2e)
- Simulation tests (Cosmos SDK)

**Run tests:**
```bash
cd aequitas
go test ./x/<module>/...
```

---

## 📖 Module Documentation

Each module includes:
- `README.md` - Module overview
- `spec/` - Specifications
- `proto/` - Protobuf definitions
- `keeper/` - State management
- `types/` - Message types
- `module.go` - Module registration

---

**Last Updated:** November 04, 2025
**Version:** 1.0  
**Next:** [API Reference](./API-Reference.md) | [Smart Contracts](./Smart-Contracts.md)
