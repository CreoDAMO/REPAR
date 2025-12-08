# Aequitas Protocol Scripts Categorization

**Created:** December 5, 2025  
**Purpose:** Organize scripts into Legacy vs Current for sovereign infrastructure

---

## LEGACY SCRIPTS (Move to `docs/scripts/legacy/`)

These scripts are DigitalOcean-specific or outdated deployment methods:

| Script | Reason for Legacy Status |
|--------|-------------------------|
| `deploy-to-digitalocean.sh` | DigitalOcean App Platform specific |
| `deploy-to-droplet-now.sh` | DigitalOcean droplet deployment |
| `deploy-blockchain-to-droplet.sh` | DigitalOcean droplet specific |
| `setup-cloudflare-dns.sh` | Uses `DROPLET_IP` variable (old naming) |
| `setup-all-subdomains.sh` | Legacy subdomain setup |
| `migrate-from-digitalocean.sh` | Migration reference (keep for docs) |
| `push-to-github.sh` | Simple git wrapper (not needed) |
| `commit-fixes.sh` | Simple git wrapper (not needed) |
| `trigger-blockchain-build.sh` | Legacy CI trigger |
| `upload-binary-manual.sh` | Manual upload (replaced by releases) |

**Total Legacy: 10 scripts**

---

## CURRENT SCRIPTS (Keep in `scripts/`)

These scripts are for sovereign ACE/AVM infrastructure:

### DNS & Infrastructure
| Script | Purpose |
|--------|---------|
| `update-dns-ace-avm.sh` | **PRIMARY** - ACE/AVM DNS management with auto-detection |
| `setup-cloudflare-dns-sovereign.sh` | Sovereign infrastructure DNS setup |
| `setup-cloudflare-dns-correct.sh` | Corrected DNS configuration |
| `setup-cloudflare-dns-now.sh` | Quick DNS setup utility |

### Blockchain Deployment
| Script | Purpose |
|--------|---------|
| `deploy-blockchain-complete.sh` | Full build & deploy from source |
| `deploy-blockchain-from-release.sh` | Deploy from GitHub release |
| `deploy-blockchain-no-validation.sh` | Quick deploy without validation |
| `download-binary.sh` | Download pre-built binary |

### Chain Initialization
| Script | Purpose |
|--------|---------|
| `init-mainnet.sh` | Initialize mainnet (aequitas-1) |
| `init-testnet.sh` | Initialize testnet |
| `init-both.sh` | Initialize both networks |
| `init-both-pregenerated.sh` | Initialize with pre-generated genesis |
| `generate-genesis.sh` | Generate genesis file |

### Validator Setup
| Script | Purpose |
|--------|---------|
| `home-validator-setup.sh` | Home computer validator setup |
| `raspberry-pi-validator.sh` | Raspberry Pi validator setup |

### ACE/AVM Integration
| Script | Purpose |
|--------|---------|
| `ace-cli-integration.sh` | ACE CLI integration utilities |

### Wallet & Registry
| Script | Purpose |
|--------|---------|
| `automate-keplr-registry.sh` | Keplr wallet chain registry automation |

### Utilities
| Script | Purpose |
|--------|---------|
| `diagnostic.sh` | System diagnostics |
| `validate-deployment-scripts.sh` | Validate deployment scripts |
| `pin-to-ipfs.sh` | Pin content to IPFS |
| `create-github-release.sh` | Create GitHub releases |
| `import-path-fix.sh` | Fix import paths |

### Python Scripts
| Script | Purpose |
|--------|---------|
| `fix_genesis_allocation.py` | Fix genesis allocation issues |
| `fix_genesis_complete.py` | Complete genesis fix |
| `generate_genesis_allocations.py` | Generate allocation structure |

**Total Current: 24 scripts**

---

## VM-INFRASTRUCTURE/SCRIPTS (Keep as-is)

These are in the vm-infrastructure folder and should stay:

| Script | Purpose |
|--------|---------|
| `bootstrap-with-genesis.sh` | Bootstrap 7-node constellation with genesis |
| `install-aequitas-stack.sh` | Install complete Aequitas stack |
| `security-hardening.sh` | Security hardening for nodes |
| `cerberus-auditor.service` | Systemd service for Cerberus auditor |

---

## MIGRATION COMMANDS

Run these commands to move legacy scripts:

```bash
# Create legacy directory
mkdir -p docs/scripts/legacy

# Move legacy scripts
mv scripts/deploy-to-digitalocean.sh docs/scripts/legacy/
mv scripts/deploy-to-droplet-now.sh docs/scripts/legacy/
mv scripts/deploy-blockchain-to-droplet.sh docs/scripts/legacy/
mv scripts/setup-cloudflare-dns.sh docs/scripts/legacy/
mv scripts/setup-all-subdomains.sh docs/scripts/legacy/
mv scripts/migrate-from-digitalocean.sh docs/scripts/legacy/
mv scripts/push-to-github.sh docs/scripts/legacy/
mv scripts/commit-fixes.sh docs/scripts/legacy/
mv scripts/trigger-blockchain-build.sh docs/scripts/legacy/
mv scripts/upload-binary-manual.sh docs/scripts/legacy/

# Verify current scripts remain
ls scripts/
```

---

## SUMMARY

| Category | Count | Location |
|----------|-------|----------|
| Legacy Scripts | 10 | `docs/scripts/legacy/` |
| Current Scripts | 24 | `scripts/` |
| VM Infrastructure | 4 | `vm-infrastructure/scripts/` |
| **Total** | **38** | |

---

## PRIMARY SCRIPTS FOR SOVEREIGN DEPLOYMENT

For ACE/AVM sovereign infrastructure, use these in order:

1. **`update-dns-ace-avm.sh`** - Update DNS to sovereign infrastructure
2. **`deploy-blockchain-complete.sh`** or **`deploy-blockchain-from-release.sh`** - Deploy blockchain
3. **`init-mainnet.sh`** - Initialize mainnet
4. **`automate-keplr-registry.sh`** - Register with Keplr

For home validators:
1. **`home-validator-setup.sh`** or **`raspberry-pi-validator.sh`**
