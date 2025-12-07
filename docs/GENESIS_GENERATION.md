# Genesis Generation Guide for Aequitas Protocol

## Overview

This guide explains how the Aequitas Protocol generates deterministic genesis files for both testnet and mainnet with proper $REPAR coin allocation.

## Allocation Structure

The total supply of 131 trillion $REPAR coins is allocated as follows:

### Total Distribution

| Fund | Percentage | Amount (REPAR) | Description |
|------|-----------|----------------|-------------|
| Community & Descendant Fund | 43% | 56.33T | For verified descendants and community programs |
| Claims & Compensation Fund | 25% | 32.75T | Reserved for approved reparations claims |
| **Founder Total** | **18%** | **23.58T** | **Founder's complete allocation** |
| ├─ Founder Wallet | 12% | 15.72T | Direct allocation + dev discretionary |
| └─ Founder Endowment | 6% | 7.86T | Locked for 8 years, renewable |
| Ecosystem & Enforcement Treasury | 10% | 13.1T | For ecosystem growth and enforcement |
| Foundation Treasury & Reserves | 4% | 5.24T | Protocol reserves and operations |

### Founder Allocation Details

The founder receives 18% total allocation:

1. **12% to Founder Wallet** (15.72T REPAR):
   - 10% Original Founder Allocation: 13.1T REPAR
   - 2% Development Discretionary: 2.62T REPAR
   - Wallet Address: `repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun`

2. **6% to Founder Endowment** (7.86T REPAR):
   - Locked for 8 years (renewable)
   - 90% of profits go to protocol
   - 10% of profits go to founder
   - Managed by `founderendowment` module

## Genesis Generation Process

### Automated GitHub Actions

The blockchain build workflow automatically:

1. Builds the blockchain binary
2. Generates testnet genesis with proper allocations
3. Generates mainnet genesis with proper allocations
4. Validates all genesis files
5. Uploads artifacts (binary + genesis files + checksums)

### Manual Genesis Generation

To generate genesis files manually:

```bash
# Generate testnet genesis
./scripts/generate-genesis.sh testnet

# Generate mainnet genesis
./scripts/generate-genesis.sh mainnet
```

### File Structure

```
chain-config/
├── allocation-structure.json          # Source of truth for coin allocation
├── testnet/
│   ├── genesis-testnet.json          # Generated testnet genesis
│   └── genesis-testnet.json.sha256   # Checksum for verification
└── mainnet/
    ├── genesis-mainnet.json          # Generated mainnet genesis
    └── genesis-mainnet.json.sha256   # Checksum for verification
```

## Scripts

### 1. `generate_genesis_allocations.py`

Python script that:
- Reads `allocation-structure.json`
- Validates total supply equals 131T REPAR
- Generates module accounts for each fund
- Creates proper balances for all accounts
- Updates genesis file with correct allocations

**Usage:**
```bash
python3 scripts/generate_genesis_allocations.py testnet
python3 scripts/generate_genesis_allocations.py mainnet
```

### 2. `generate-genesis.sh`

Shell script that:
- Runs the Python allocation generator
- Validates JSON structure
- Generates SHA-256 checksums
- Provides next steps

**Usage:**
```bash
./scripts/generate-genesis.sh testnet
./scripts/generate-genesis.sh mainnet
```

## Module Accounts

The following module accounts are created automatically:

| Module Account | Address | Purpose |
|----------------|---------|---------|
| `descendant_fund` | `repar17xpfvakm2amg962yls6f84z3kell8c5lc66g0s` | Community & descendant programs |
| `claims_fund` | `repar1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8lyv94w` | Claims & compensation |
| `founderendowment` | `repar10d07y265gmmuvt4z0w9aw880jnsr700j6z2zm3` | Founder endowment (locked 8 years) |
| `enforcement_treasury` | `repar1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3h6cprl` | Enforcement operations |
| `foundation_treasury` | `repar1tygms3xhhs3yv487phx3dw4a95jn7t7lr6yxtq` | Foundation reserves |

## Verification

### Verify Allocation Totals

```bash
# Check Python script output for validation
python3 scripts/generate_genesis_allocations.py testnet

# Look for these confirmations:
# ✅ Allocation structure validated: 131000000000000 REPAR
# ✅ Total allocated: 131,000,000,000,000 repar
# ✅ Matches supply: True
```

### Verify Genesis Checksum

```bash
# Verify testnet genesis
shasum -a 256 -c chain-config/testnet/genesis-testnet.json.sha256

# Verify mainnet genesis
shasum -a 256 -c chain-config/mainnet/genesis-mainnet.json.sha256
```

### Verify with Binary

```bash
# Testnet
./bin/aequitasd genesis validate chain-config/testnet/genesis-testnet.json

# Mainnet
./bin/aequitasd genesis validate chain-config/mainnet/genesis-mainnet.json
```

## GitHub Actions Workflow

The `.github/workflows/blockchain-build.yml` workflow includes:

### Steps:
1. **Build blockchain binary** - Compiles `aequitasd`
2. **Generate testnet genesis** - Creates testnet genesis with allocations
3. **Generate mainnet genesis** - Creates mainnet genesis with allocations
4. **Validate genesis files** - Runs validation checks
5. **Upload artifacts** - Stores binary, genesis files, and checksums

### Artifacts:
- `aequitasd-latest` - Latest blockchain binary
- `genesis-testnet-<commit>` - Testnet genesis + checksum
- `genesis-mainnet-<commit>` - Mainnet genesis + checksum
- `allocation-structure` - Allocation configuration

## Using Generated Genesis Files

### Testnet Initialization

```bash
# 1. Download binary and genesis from GitHub Actions artifacts
# 2. Initialize testnet
./scripts/init-testnet.sh

# 3. The script will:
#    - Copy genesis-testnet.json to node config
#    - Set up validator keys
#    - Prepare for node startup
```

### Mainnet Initialization

```bash
# 1. Download binary and genesis from GitHub Actions artifacts
# 2. Initialize mainnet (PRODUCTION)
./scripts/init-mainnet.sh

# 3. The script will:
#    - Copy genesis-mainnet.json to node config
#    - Set up validator keys
#    - Coordinate with other validators for genesis ceremony
```

## Important Notes

### $REPAR is a NATIVE COIN, not a token

- $REPAR is the native coin of the Aequitas blockchain
- Not an ERC-20 or any other token standard
- Part of the Layer-1 blockchain protocol itself
- Total supply is fixed at 131 trillion REPAR

### Deterministic Generation

- Same allocation structure always produces same output
- Genesis files are reproducible
- Checksums verify file integrity
- No manual editing required

### Security

- Founder wallet address is hardcoded for security
- Module accounts use standard Cosmos SDK derivation
- All allocations are cryptographically verifiable
- Genesis files are immutable once network starts

## Troubleshooting

### Issue: Allocation doesn't total 131T

**Solution:** The allocation structure automatically validates. If you modify `allocation-structure.json`, ensure all amounts sum to exactly 131,000,000,000,000.

### Issue: Genesis validation fails

**Solution:** Ensure you've run the genesis generation script before validation:
```bash
./scripts/generate-genesis.sh testnet
./bin/aequitasd genesis validate chain-config/testnet/genesis-testnet.json
```

### Issue: Module account balances incorrect

**Solution:** The Python script automatically creates module accounts and balances. Don't edit genesis files manually - regenerate them using the scripts.

## References

- Frontend allocation structure: `frontend/src/data/statistics.js`
- Allocation configuration: `chain-config/allocation-structure.json`
- Genesis generator: `scripts/generate_genesis_allocations.py`
- Shell script: `scripts/generate-genesis.sh`
- GitHub workflow: `.github/workflows/blockchain-build.yml`
