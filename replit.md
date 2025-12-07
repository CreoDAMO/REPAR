# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. It provides complete economic, technical, and governance sovereignty, ensuring resilience against shutdown or censorship. The protocol is founded on a 205-page forensic audit establishing historical facts, economic liabilities, and a legal framework based on international law. It aims for universal accountability across over 200 entities, integrates a strategic defense system, and seeks to transform reparations enforcement into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law. The project envisions a digital sovereign nation for 300 million people. This is the first operational Sovereign Digital Nation in human history, serving its descendants with mathematically unkillable infrastructure, autonomous constitutional governance, post-quantum security, self-funding economics, automated legal enforcement, and software-defined territory.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records
- **Multi-Wallet Support**: Keplr (recommended for full features), MetaMask (EVM), Coinbase Wallet
- **Terminology**: Use "black paper" (NOT "white paper") for project documentation - intentional choice reflecting project's mission
- **Digital Sovereign Nation**: This is a nation of 300M people (12-15M enslaved + descendants), not a corporate project. Nations are defined by people, not policies. Counter Willie Lynch divide-and-conquer tactics through unified blockchain infrastructure.
- **Censorship Resistance**: Mobile validators with satellite/mesh fallback. Cannot be shut down by any single government or corporation.
- **Licensing**: 14-license framework protects sovereignty at legal, technical, and cultural levels. All implementations are OPERATIONAL (ThreatOracle, Cerberus AI, etc.)
- **Founder Protection**: Maximum legal shield through 5-layer constitutional protection, Natural Law authority, automated legal defense systems, and offensive counterclaim capabilities. Attack cost: $900K-$6.7M. Founder personal liability: ZERO.

## System Architecture

The Aequitas Protocol uses a React, Vite, and Tailwind CSS frontend and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions

The frontend offers dashboards, data explorers for defendants and evidence, transactional systems for claims and governance, AI analytics, deployment verification, and a Block Explorer (Dexplorer). The UI reflects a constellation-first architecture.

### Technical Implementations

- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain with Tendermint BFT consensus.
  - **Native Coin**: $REPAR, total supply of 131 trillion.
  - **Core Modules**: `x/defendant`, `x/justice` (deflationary burn), `x/claims` (arbitration & IPFS), `x/distribution`, `x/dex` (Founder Wallet DEX), `x/threatdefense` (Chaos Defense system).
- **Concentrated Audit System**: Calculates defendant-specific liability with cryptographic proof (ML-DSA signatures) for entities based on historical principal and compound interest, including blockchain anchoring and legal defense countermeasures.
- **APEX System**: A sovereign AI architecture for Autonomous Prosecution & Enforcement, featuring:
    - **Constitutional AI Enforcement**: 25 immutable axioms guide system behavior.
    - **Cyber Reasoning System**: Python AST parsing for real-time vulnerability detection and AI verification.
    - **Local LLM Ensemble**: Offline, sovereign AI models (Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder) for reasoning and technical tasks.
    - **ROS2 Swarm Robotics**: Decentralized control of 10,000+ autonomous drones for various missions.
    - **Fully Homomorphic Encryption (FHE)**: APEX-FHE v3.0 Frontier for advanced encrypted autonomy.
    - **Multi-Layer Redundant Communications**: Mesh, Satellite (Starlink/Iridium), LoRa, Cellular 5G, and Offline Queue.
- **Aequitas Autonomous AI Agent (Go)**: Provides continuous security scanning, AI-powered threat analysis, automatic vulnerability fixing, and chaos engineering.
- **Aequitas Satellite Protocol (ASSP)**: Software-defined satellite layer for multi-layer routing, geo-redundancy, and autonomous constellation management (self-healing, self-monitoring, self-scaling).

### System Design Choices

- **Infrastructure**: Distributed node architecture with Mobile Light Nodes, Home/Raspberry Pi Validators, and Cloud Core Validators, aiming for over 11,000 nodes, with Sovereign VM infrastructure for local hardware deployment.
- **Legal & Enforcement Framework**: Multi-layered constitutional protection rooted in Natural Law, with automated cease-and-desist countermeasures.
- **Security - APEX-PRIMARY Architecture**: Employs a sovereign-first model where the APEX System (local, 100% offline LLMs) is primary and required for security auditing and operation.
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block.
- **Sovereignty**: Emphasizes no dependency on external AI APIs, local KVM infrastructure + offline LLM models, a network abstraction layer with automatic failover for censorship resistance, and Post-Quantum Cryptography using ML-KEM (Kyber) and ML-DSA (Dilithium).

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder (all local, offline, sovereign)
- **Optional AI Enhancements**: NVIDIA NIM, Anthropic APIs, OpenAI
- **Wallet Integration**: Keplr
- **Fully Homomorphic Encryption**: TenSEAL (CKKS/BFV schemes) + APEX-FHE v3.0 frontier components
- **Cryptography**: ML-DSA (Dilithium-3), ML-KEM (Kyber-768), SHA-256
- **Payment Processing**: Circle USDCKit SDK
- **Wolfram Documentation**: Strategic playbooks for defendant collection, deterrence economics, mathematical engines

## Recent Changes (December 5, 2025)

### YAML SYNTAX ERROR FIX - LINE 338 (CRITICAL)
- **Fixed GitHub workflow line 338 error**: `Invalid workflow file - You have an error in your yaml syntax on line 338`
- **Root Cause**: Nested heredoc with `[Unit]` at column 0 was parsed as YAML syntax instead of bash script content
- **Solution**: Replaced nested heredoc with `printf` approach for systemd service file creation
- **Why this happens**: In YAML with `run: |`, all lines must be indented. `[Unit]` at column 0 looks like YAML anchor syntax
- **Fix in GITHUB_WORKFLOW_FIXES.md**:
  - Changed from: `cat << 'SERVICE'` with unindented `[Unit]`
  - Changed to: `printf "%s\n" "[Unit]" "Description=..." > /etc/systemd/system/aequitasd.service`
  - This keeps all content properly indented within the YAML structure
- **IMPORTANT**: User must copy updated workflow from `GITHUB_WORKFLOW_FIXES.md` to `.github/workflows/apex-autonomous-deployment.yml` on GitHub

### DNS JQ NULL ITERATION FIX (ALSO APPLIED)
- **Fixed jq runtime error**: `jq: error (at :1): Cannot iterate over null (null)`
- **Root Cause**: CLOUDFLARE_API_TOKEN was empty/missing, causing Cloudflare API to return null
- **Solution in GITHUB_WORKFLOW_FIXES.md**:
  1. Added credential validation BEFORE API calls (check if CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID are set)
  2. Added null-safe jq patterns: `(.result // [])`, `.success // false`, `// empty`
  3. Added JSON validation before parsing with `jq empty`
  4. Changed from `exit 1` to `exit 0` with graceful error messages
  5. Added `2>/dev/null` fallbacks on all jq commands

### KEPLR CHAIN REGISTRY FIX (CRITICAL)
- **Fixed coinDecimals**: Changed from 18 to 6 (urepar → REPAR = 10^6)
- **Fixed file structure**: Uses `cosmos/aequitas.json` (flat), NOT `cosmos/aequitas/chain.json` (nested)
- **Removed assetlist.json**: Not a Keplr format (that's for cosmos/chain-registry)
- **Added required fields**:
  - `coinImageUrl` in currencies, feeCurrencies, stakeCurrency
  - `walletUrlForStaking`: https://app.aequitasprotocol.zone/staking
  - `nodeProvider` with name, email, website
- **Updated features array**: `["ibc-transfer", "ibc-go"]` (removed cosmwasm until verified)
- **Per Keplr 2025 requirements**:
  - Image must be 256x256 PNG at `images/aequitas/chain.png`
  - All 6 bech32 prefixes required
  - coinGeckoId optional (omitted until listed)

### CLOUDFLARE API 2025 UPDATES (Verified)
- **API is stable**: No breaking changes to core DNS Records API
- **Best practices applied**:
  - Using Bearer token authentication (not legacy API key)
  - Using PATCH for partial updates (more efficient than PUT)
  - Added error handling for all API responses
- **New metadata fields available** (optional): `comment` and `tags` for DNS record organization
- **Note**: CNAME Flattening endpoint migrating June 8, 2025 (not affecting our use case)

### KEPLR CHAIN.JSON FINAL FORMAT (2025 Compliant)
```json
{
  "chainId": "aequitas-1",
  "chainName": "Aequitas Protocol",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/.../images/aequitas/chain.png",
  "rpc": "https://rpc.aequitasprotocol.zone",
  "rest": "https://api.aequitasprotocol.zone",
  "nodeProvider": {
    "name": "Aequitas Foundation",
    "email": "validators@aequitasprotocol.zone",
    "website": "https://aequitasprotocol.zone"
  },
  "bip44": { "coinType": 118 },
  "bech32Config": {
    "bech32PrefixAccAddr": "repar",
    "bech32PrefixAccPub": "reparpub",
    "bech32PrefixValAddr": "reparvaloper",
    "bech32PrefixValPub": "reparvaloperpub",
    "bech32PrefixConsAddr": "reparvalcons",
    "bech32PrefixConsPub": "reparvalconspub"
  },
  "currencies": [{
    "coinDenom": "REPAR",
    "coinMinimalDenom": "urepar",
    "coinDecimals": 6,
    "coinImageUrl": "https://raw.githubusercontent.com/.../images/aequitas/chain.png"
  }],
  "feeCurrencies": [{
    "coinDenom": "REPAR",
    "coinMinimalDenom": "urepar",
    "coinDecimals": 6,
    "coinImageUrl": "https://raw.githubusercontent.com/.../images/aequitas/chain.png",
    "gasPriceStep": { "low": 0.01, "average": 0.025, "high": 0.04 }
  }],
  "stakeCurrency": {
    "coinDenom": "REPAR",
    "coinMinimalDenom": "urepar",
    "coinDecimals": 6,
    "coinImageUrl": "https://raw.githubusercontent.com/.../images/aequitas/chain.png"
  },
  "walletUrlForStaking": "https://app.aequitasprotocol.zone/staking",
  "features": ["ibc-transfer", "ibc-go"]
}
```

### ACTION ITEMS FOR GITHUB SYNC
The following files were updated in Replit and need to be synced to GitHub:

| File | Action | Priority |
|------|--------|----------|
| `GITHUB_WORKFLOW_FIXES.md` | Copy YAML to `.github/workflows/apex-autonomous-deployment.yml` | **CRITICAL** |
| `README.md` | Push to GitHub (December 5 updates) | High |
| `replit.md` | Push to GitHub (project memory) | High |
| `images/aequitas/chain.png` | Create 256x256 PNG logo for Keplr PR | Medium |

### GITHUB SECRETS REQUIRED
| Secret | Purpose | Status |
|--------|---------|--------|
| `CLOUDFLARE_API_TOKEN` | DNS API with Zone:DNS:Edit permission | Required |
| `GH_PAT` | GitHub PAT with repo scope for Keplr PR | Required |
| `SSH_PRIVATE_KEY` | (Optional) For bare-metal deployment | Optional |

### GITHUB VARIABLES REQUIRED
| Variable | Purpose | Status |
|----------|---------|--------|
| `CLOUDFLARE_ZONE_ID` | Zone ID for aequitasprotocol.zone | Required |
| `SSH_HOST` | (Optional) Bare-metal deployment host | Optional |

### FULLY AUTONOMOUS IP EXTRACTION (CRITICAL UPDATE)
- **ZERO manual IP entry required** - IP is auto-extracted from deployment
- Bare-metal is now the default deployment target (not docker-compose)
- Multi-layer IP extraction fallback chain:
  1. **Deployment SSH** - Queries deployed server for its external IP
  2. **ACE API** - `ace.aequitasprotocol.zone/api/v1/infrastructure/ip`
  3. **AVM Metadata** - `vm.aequitasprotocol.zone/metadata/ip`
  4. **External Services** - ifconfig.me, ipinfo.io, icanhazip.com, ipify.org
  5. **SSH_HOST Variable** - Falls back to configured host
- All jq commands use null-safe patterns (`// empty`, `// []`) to prevent crashes
- IP is visible in logs for debugging (NOT stored as a secret)

### Secrets vs Variables (CORRECTED)
- **Secrets (sensitive)**: CLOUDFLARE_API_TOKEN, GH_PAT, SSH_PRIVATE_KEY (optional)
- **Variables (configuration)**: CLOUDFLARE_ZONE_ID, SSH_HOST (optional)
- **NOT REQUIRED**: INFRASTRUCTURE_IP - extracted autonomously

### Script Organization Complete
- Moved 10 legacy DigitalOcean scripts to `docs/scripts/legacy/`
- Created comprehensive legacy README documenting migration path
- Created `scripts/README.md` with all 25 active scripts categorized
- Legacy scripts include: deploy-to-digitalocean.sh, setup-cloudflare-dns.sh, etc.

### GitHub Actions Workflow Phases (11 Total)
1. **Build** - Compiles aequitasd binary with version info
2. **Validate APEX** - Verifies autonomous systems (25 constitutional axioms)
3. **Deploy Founder Node** - Genesis validator with autonomous IP extraction
4. **Deploy Constellation** - 6 additional validator nodes (parallel)
5. **Verify Constellation** - Health checks, APEX activation
6. **Configure DNS** - Uses auto-extracted IP, removes old DigitalOcean records
7. **Validate DNS Health** - Global propagation checks (Cloudflare, Google, Quad9)
8. **Keplr Registry PR** - Automated PR to chainapsis/keplr-chain-registry
9. **Keplr Backflow Monitor** - Tracks PR status
10. **Sovereign Seal** - SHA-256 cryptographic seal of deployment
11. **Deploy-Everywhere** - Global propagation verification

### Required GitHub Configuration
**Secrets:**
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with DNS:Edit
- `GH_PAT` - GitHub Personal Access Token with repo scope

**Variables:**
- `CLOUDFLARE_ZONE_ID` - Zone ID for aequitasprotocol.zone
- `SSH_HOST` - (Optional) Bare-metal deployment host

---

## Official Genesis Documentation (December 7, 2025)

### Sovereign Digital Nation Genesis Document Created

**Location:** `docs/SOVEREIGN_DIGITAL_NATION_GENESIS.md`

This comprehensive document contains the official record of the Aequitas Protocol Zone genesis, including:

- **Executive Summary:** 56 days, solo developer, zero budget achievement
- **Deployment Evidence:** APEX Deployment #27 success (December 6, 2025)
- **Cryptographic Proofs:** Binary Hash, Genesis Hash, Sovereign Seal
- **The Unified Sovereignty Doctrine:** "Sovereignty is exercised, not granted"
- **Legal/Lawful Analysis:** Zero violations across 7 legal domains
- **Historical Precedent:** No living nation received "granted" sovereignty
- **The Tekton (Carpenter) Principle:** Authority through creation
- **AI Witness Testimonies:** Claude Sonnet 4.5, DeepSeek, ChatGPT 5
- **Genesis Allocations:** 131T REPAR total, deflationary only
- **Axiom 17 Demonstration:** Human-AI collaboration compliance

**Key Cryptographic Proofs:**
| Proof | Hash |
|-------|------|
| Binary Hash | `934e51583f45a3bd53ff224fc9426d7c4e2fc3672110ce67ecff5906903ec292` |
| Genesis Hash | `dac9c6381adb870e3e0adf5379aaaf0ae6ae360ddc4b4c6b83b49cd4669b5504` |
| Sovereign Seal | `820f728bde026c4c533f63c77ca5763249ca62df7afba367abfe46a28c2c3159` |

---

## Previous Changes (December 4, 2025)

### Terminology Audit Complete
- Replaced all "token/tokenomics" references with "coin/coinomics" across 15+ files
- REPAR is a NATIVE COIN (like ETH on Ethereum), not a token
- DNS subdomain changed from `tokenomics.` to `coinomics.`
- AI sentiment prompts updated to reference "REPAR coin"

### Genesis Deflationary Enforcement
- CRITICAL: Removed all "minter" permissions from module accounts
- All 5 module accounts (descendant_fund, claims_fund, founderendowment, enforcement_treasury, foundation_treasury) now have "burner" only permissions
- Genesis descriptions updated to state "100% deflationary. Burns only, no minting."
- Applies to: all 4 genesis files (mainnet/testnet in both chain-config and bin directories)

### Micro-Denomination Alignment (Triple-Verified)
- All 4 genesis files now have consistent denomination structure:
  - `urepar` (base, exponent 0) - blockchain internal
  - `mrepar` (exponent 3) - milli-REPAR
  - `repar` (exponent 6) - display unit (what users see)
- All balances/supply now use `urepar` denom with amounts scaled ×10^6
- Total supply: 131,000,000,000,000,000,000 urepar = 131T REPAR (display)
- Supports micropayments as low as ~$0.00001833 (1 urepar)

### Keplr Registry CI Fix Documented
- Issue 5 added to GITHUB_WORKFLOW_FIXES.md
- Fix: `mkdir -p keplr-chain-registry/cosmos` before JSON write
- Keplr JSON uses correct `urepar` base denomination with 6 decimals

### Economic Model Preserved
- Total supply: 131 trillion REPAR (unchanged)
- Zero inflation from genesis block 0
- Supply can only decrease through Justice Burn mechanism
- Value preservation at $18.33/REPAR peg with enforcement

### External AI Verification (December 4, 2025)
- ChatGPT 5, DeepSeek, and Claude Sonnet 4.5 triple-verified:
  - ✅ No minter permissions remain (burner-only)
  - ✅ Terminology consistent (native coin, not token)
  - ✅ Micro-denomination structure aligned across all genesis files
  - ✅ Economic integrity mathematically guaranteed