# Legacy Scripts Archive

**Archived:** December 5, 2025  
**Status:** No longer maintained

---

## DO NOT USE IN PRODUCTION

These scripts were part of the initial development phase (Oct-Nov 2025) before the implementation of sovereign ACE/AVM infrastructure.

---

## Why These Are Legacy

### DigitalOcean Dependencies (6 scripts)
- Built for DigitalOcean App Platform and Droplets
- Hardcoded to IPs: `159.203.92.230`, `76.223.105.230`
- Replaced by sovereign ACE/AVM infrastructure

### Git Wrappers (2 scripts)
- Simple git command wrappers
- No longer needed (use git directly)

### Legacy CI/CD (2 scripts)
- Manual build triggers
- Replaced by GitHub Actions workflows

---

## Archived Scripts

| Script | Original Purpose | Replacement |
|--------|-----------------|-------------|
| `deploy-to-digitalocean.sh` | DigitalOcean App Platform deployment | APEX Autonomous Deployment |
| `deploy-to-droplet-now.sh` | Droplet deployment | `deploy-blockchain-complete.sh` |
| `deploy-blockchain-to-droplet.sh` | Blockchain on droplet | `deploy-blockchain-from-release.sh` |
| `setup-cloudflare-dns.sh` | Uses old `DROPLET_IP` variable | `update-dns-ace-avm.sh` |
| `setup-all-subdomains.sh` | Legacy subdomain setup | `update-dns-ace-avm.sh` |
| `migrate-from-digitalocean.sh` | Historical migration reference | N/A (historical) |
| `push-to-github.sh` | Simple git wrapper | Use `git push` directly |
| `commit-fixes.sh` | Simple git wrapper | Use `git commit` directly |
| `trigger-blockchain-build.sh` | Legacy CI trigger | `.github/workflows/apex-autonomous-deployment.yml` |
| `upload-binary-manual.sh` | Manual binary upload | GitHub Releases via workflow |

---

## Current Scripts Location

- **Active Deployment Scripts:** `/scripts/` (24 active scripts)
- **VM Infrastructure Scripts:** `/vm-infrastructure/scripts/` (4 scripts)
- **ACE Kernel Scripts:** `/ace/scripts/`

---

## Historical Context

These scripts represent the evolution from:
- Cloud-dependent infrastructure (DigitalOcean) to Sovereign infrastructure (ACE/AVM)
- Manual deployment processes to APEX autonomous deployment

**Timeline:**
- **Oct 11, 2025:** Development start
- **Nov 2025:** DigitalOcean deployment phase
- **Dec 3, 2025:** Sovereign ACE/AVM deployment
- **Dec 5, 2025:** Scripts archived

---

*Built a sovereign digital nation in 53 days.*
