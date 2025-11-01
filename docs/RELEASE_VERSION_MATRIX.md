# Aequitas Protocol - Release Version Matrix

## Purpose

This document clarifies the versioning strategy for Aequitas blockchain releases and resolves any confusion between release naming conventions.

---

## Current Release Status

### v0.1.0 (Build 103) - November 1, 2025 ✅ LATEST

**Status**: Production-ready, recommended for deployment

**Build Details:**
- Commit: `f3ff3f78d9575f8434e64520f8dc7040121e54eb`
- Short Hash: `f3ff3f7`
- Build Date: 2025-11-01 18:24:51 UTC
- Binary Size: 152 MB

**Technical Stack:**
- Cosmos SDK: **v0.54.0-alpha**
- Go Version: 1.24 (required by dependencies)
- CometBFT: Latest
- Build System: GitHub Actions CI/CD

**Features:**
- ✅ All 9 custom modules compiled with App Wiring v2 (depinject)
- ✅ 40 protobuf files generated via buf
- ✅ No runtime configuration panics
- ✅ Both testnet and mainnet genesis files validated

**Artifacts:**
1. `aequitasd-linux-amd64.tar.gz` - Blockchain binary
2. `aequitasd.sha256` - Checksum verification
3. `genesis-testnet.tar.gz` - Testnet genesis + checksum
4. `genesis-mainnet.tar.gz` - Mainnet genesis + checksum
5. `allocation-structure` - Canonical allocation specification

**Networks:**
- **Testnet**: aequitas-testnet-1 (~/.aequitas-testnet)
- **Mainnet**: aequitas-1 (~/.aequitas)

**Download**: https://github.com/CreoDAMO/REPAR/releases/tag/v0.1.0

---

### v1.0.0 (Blockchain Binary) - October 30, 2025 ⚠️ SUPERSEDED

**Status**: Superseded by v0.1.0 Build 103 (use latest instead)

**Build Details:**
- Built with Go 1.23.3
- Cosmos SDK: **v0.50.14** (older version)
- MD5: 294acde0c93dfcfe3021ba7ec799fe92

**Why Superseded:**
- Uses older Cosmos SDK v0.50.14 vs v0.54.0-alpha in Build 103
- Missing App Wiring v2 (depinject) configuration
- Older protobuf generation tooling
- Fewer tested features

**Download**: https://github.com/CreoDAMO/REPAR/releases/tag/v1.0.0

---

## Version Numbering Clarification

### Why is v0.1.0 newer than v1.0.0?

**Explanation:**

1. **v1.0.0 was a preliminary release** created on October 30, 2025 using older Cosmos SDK (v0.50.14)
2. **v0.1.0 Build 103 is the production-ready release** created on November 1, 2025 after:
   - Upgrading to Cosmos SDK v0.54.0-alpha
   - Implementing App Wiring v2 (depinject) for all 9 custom modules
   - Generating all 40 missing protobuf files
   - Fixing all runtime configuration panics
   - Validating both mainnet and testnet genesis files

3. **Semantic Versioning Correction:**
   - v0.1.0 correctly indicates pre-production (0.x.x = not yet 1.0)
   - v1.0.0 was premature (should have been v0.9.0)
   - When mainnet launches successfully, we'll release v1.0.0 (properly)

---

## Recommended Usage

### For Development

```bash
# Always use the latest v0.1.0 Build 103
wget https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/aequitasd-linux-amd64.tar.gz
tar -xzf aequitasd-linux-amd64.tar.gz
chmod +x aequitasd
./aequitasd version
# Expected output: v0.1.0-103-gf3ff3f7
```

### For Production Deployment

**Mainnet:**
```bash
# Download mainnet genesis
wget https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-mainnet.tar.gz
tar -xzf genesis-mainnet.tar.gz

# Initialize with pre-generated genesis
./aequitasd init validator-node --chain-id aequitas-1 --home ~/.aequitas
cp genesis.json ~/.aequitas/config/genesis.json

# Verify genesis
./aequitasd validate-genesis --home ~/.aequitas

# Start mainnet node
./aequitasd start --home ~/.aequitas
```

**Testnet:**
```bash
# Download testnet genesis
wget https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-testnet.tar.gz
tar -xzf genesis-testnet.tar.gz

# Initialize with pre-generated genesis
./aequitasd init validator-node --chain-id aequitas-testnet-1 --home ~/.aequitas-testnet
cp genesis.json ~/.aequitas-testnet/config/genesis.json

# Verify genesis
./aequitasd validate-genesis --home ~/.aequitas-testnet

# Start testnet node
./aequitasd start --home ~/.aequitas-testnet
```

---

## Future Versioning Strategy

### Upcoming Releases

**v0.2.0** (Planned: Q1 2026)
- External security audits integrated (Quantstamp, Informal Systems)
- Performance optimizations
- Enhanced monitoring/logging
- Bug fixes from testnet operation

**v0.3.0** (Planned: Q1 2026)
- Governance module enhancements
- DEX improvements (additional trading pairs)
- Mobile wallet integration support

**v1.0.0** (Planned: Q2 2026) - **Official Mainnet Launch**
- Mainnet genesis event
- Full security audit completion
- Production-ready for mass adoption
- LBP (Liquidity Bootstrapping Pool) launch

### Semantic Versioning Rules

Following standard semantic versioning:

- **0.x.x**: Pre-production releases (testing, iteration)
- **1.x.x**: Production releases (mainnet launch, stable)
- **x.Y.x**: Minor version (new features, backwards compatible)
- **x.x.Z**: Patch version (bug fixes only)

**Breaking Changes:**
- Major version bump (2.0.0, 3.0.0, etc.)
- Requires chain upgrade/migration
- Announced minimum 30 days in advance

---

## Build Verification

### Verify Release Authenticity

**Check SHA-256 Checksum:**
```bash
# Download checksum file
wget https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/aequitasd.sha256

# Verify binary
sha256sum -c aequitasd.sha256
# Expected output: aequitasd-linux-amd64.tar.gz: OK
```

**Verify Commit Hash:**
```bash
./aequitasd version --long
# Should show: f3ff3f78d9575f8434e64520f8dc7040121e54eb
```

**Verify Cosmos SDK Version:**
```bash
./aequitasd version --long | grep cosmos
# Should show: v0.54.0-alpha
```

---

## Migration Guide

### From v1.0.0 to v0.1.0

If you deployed v1.0.0 (October 30 release):

**⚠️ WARNING**: These are incompatible releases. You must restart with new genesis.

**Steps:**
1. **Stop old node** (if running)
   ```bash
   pkill aequitasd
   ```

2. **Backup old data** (optional, for reference)
   ```bash
   mv ~/.aequitas ~/.aequitas-old-backup
   ```

3. **Download v0.1.0** (see "Recommended Usage" section above)

4. **Initialize with new genesis**
   ```bash
   # Use pre-generated genesis files from v0.1.0 release
   ```

5. **Start new node**
   ```bash
   ./aequitasd start --home ~/.aequitas
   ```

**Why Migration Required:**
- Different Cosmos SDK version (v0.50.14 → v0.54.0-alpha)
- Different module wiring (manual → App Wiring v2)
- Different genesis structure (allocation updates)

---

## Release Changelog

### v0.1.0 (November 1, 2025)

**Added:**
- ✅ App Wiring v2 (depinject) for all 9 custom modules
- ✅ 40 protobuf files generated via buf
- ✅ Comprehensive allocation structure documentation
- ✅ Both testnet and mainnet genesis validation
- ✅ Founder allocation verified (23.58T REPAR = 18%)
- ✅ Sovereignty declaration cryptographically bound to genesis

**Changed:**
- ⬆️ Upgraded Cosmos SDK: v0.50.14 → v0.54.0-alpha
- ⬆️ Upgraded Go version: 1.23.3 → 1.24 (required by dependencies)
- 🔧 Module initialization: Manual wiring → App Wiring v2

**Fixed:**
- 🐛 Runtime configuration panics eliminated
- 🐛 Missing protobuf files generated
- 🐛 Module dependency injection errors resolved
- 🐛 Genesis validation errors fixed

### v1.0.0 (October 30, 2025)

**Added:**
- Initial blockchain binary compilation
- Basic Cosmos SDK setup (v0.50.14)
- Manual module wiring

**Issues:**
- ⚠️ Runtime configuration panics
- ⚠️ Missing protobuf files (40 total)
- ⚠️ No App Wiring v2 integration
- ⚠️ Genesis validation errors

---

## Support

**Questions about releases?**
- GitHub Issues: https://github.com/CreoDAMO/REPAR/issues
- Discussions: https://github.com/CreoDAMO/REPAR/discussions

**Build from source?**
- See: `docs/BLOCKCHAIN_BUILD_FIXED_FINAL.md`
- See: `docs/MODULE_DEPINJECT_FIX.md`

**Deployment issues?**
- Check: Build verification steps above
- Verify: SHA-256 checksums match
- Confirm: Correct Cosmos SDK version (v0.54.0-alpha)

---

⚖️ **The Justice Machine - $REPAR Native Coin**
