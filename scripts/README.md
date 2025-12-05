# Aequitas Protocol - Active Scripts

**Updated:** December 5, 2025  
**Status:** Production-ready scripts for sovereign infrastructure

---

## Quick Start: Deploy Sovereign Infrastructure

### 1. Update DNS to ACE/AVM Infrastructure

```bash
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ZONE_ID="your-zone-id"
export INFRASTRUCTURE_TYPE="sovereign"

./update-dns-ace-avm.sh
```

### 2. Deploy Blockchain

```bash
# Option A: From source (full build)
./deploy-blockchain-complete.sh

# Option B: From GitHub release (faster)
./deploy-blockchain-from-release.sh
```

### 3. Initialize Network

```bash
# Mainnet
./init-mainnet.sh

# Or both mainnet + testnet
./init-both-pregenerated.sh
```

### 4. Register with Keplr

```bash
./automate-keplr-registry.sh
```

---

## Script Categories

### DNS & Infrastructure (4 scripts)

| Script | Purpose |
|--------|---------|
| `update-dns-ace-avm.sh` | **PRIMARY** - ACE/AVM DNS with auto-detection |
| `setup-cloudflare-dns-sovereign.sh` | Sovereign DNS setup |
| `setup-cloudflare-dns-correct.sh` | Corrected DNS configuration |
| `setup-cloudflare-dns-now.sh` | Quick DNS utility |

### Blockchain Deployment (4 scripts)

| Script | Purpose |
|--------|---------|
| `deploy-blockchain-complete.sh` | Full build & deploy from source |
| `deploy-blockchain-from-release.sh` | Deploy from GitHub release |
| `deploy-blockchain-no-validation.sh` | Quick deploy without validation |
| `download-binary.sh` | Download pre-built binary |

### Chain Initialization (5 scripts)

| Script | Purpose |
|--------|---------|
| `init-mainnet.sh` | Initialize mainnet (aequitas-1) |
| `init-testnet.sh` | Initialize testnet |
| `init-both.sh` | Initialize both networks |
| `init-both-pregenerated.sh` | Initialize with pre-generated genesis |
| `generate-genesis.sh` | Generate genesis file |

### Validator Setup (2 scripts)

| Script | Purpose |
|--------|---------|
| `home-validator-setup.sh` | Home computer validator |
| `raspberry-pi-validator.sh` | Raspberry Pi validator |

### ACE/AVM Integration (1 script)

| Script | Purpose |
|--------|---------|
| `ace-cli-integration.sh` | ACE CLI integration utilities |

### Wallet & Registry (1 script)

| Script | Purpose |
|--------|---------|
| `automate-keplr-registry.sh` | Keplr chain registry automation |

### Utilities (5 scripts)

| Script | Purpose |
|--------|---------|
| `diagnostic.sh` | System diagnostics |
| `validate-deployment-scripts.sh` | Validate deployment scripts |
| `pin-to-ipfs.sh` | Pin content to IPFS |
| `create-github-release.sh` | Create GitHub releases |
| `import-path-fix.sh` | Fix import paths |

### Python Scripts (3 scripts)

| Script | Purpose |
|--------|---------|
| `fix_genesis_allocation.py` | Fix genesis allocation issues |
| `fix_genesis_complete.py` | Complete genesis fix |
| `generate_genesis_allocations.py` | Generate allocation structure |

---

## Other Script Locations

### VM Infrastructure Scripts

**Location:** `/vm-infrastructure/scripts/`

- `bootstrap-with-genesis.sh` - 7-node constellation bootstrap
- `install-aequitas-stack.sh` - Complete stack install
- `security-hardening.sh` - Security hardening
- `update-dns-ace-avm.sh` - Comprehensive DNS (also here)

### ACE Kernel Scripts

**Location:** `/ace/scripts/`

- ACE Cloud Engine management scripts

---

## Legacy Scripts

**Archived:** `/docs/scripts/legacy/`

Do not use legacy scripts in production. They are for historical reference only.

---

## Statistics

| Category | Count |
|----------|-------|
| Active Shell Scripts | 22 |
| Active Python Scripts | 3 |
| VM Infrastructure | 4 |
| Legacy Scripts | 10 |
| **Total** | **39** |

---

*Sovereign infrastructure deployed in 53 days.*
