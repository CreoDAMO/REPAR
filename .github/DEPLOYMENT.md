# Aequitas Protocol Deployment Guide

## Overview
This project uses GitHub Actions for automated building and deployment of both the blockchain and frontend components.

## GitHub Actions Workflows

### 1. 🔗 Blockchain Build (`blockchain-build.yml`)
**Triggers:** Push to `main`/`develop`, PRs, or manual dispatch
**Purpose:** Build and test the Aequitas Zone blockchain

**What it does:**
- ✅ Compiles the blockchain daemon (`aequitasd`) with Go 1.24
- ✅ Runs test suite
- ✅ Creates binary artifacts
- ✅ Initializes testnet configuration
- ✅ Uploads build artifacts (retained for 30 days)

**Manual trigger:**
```bash
# Via GitHub UI: Actions → Build Aequitas Zone Blockchain → Run workflow
```

### 2. 🌐 Frontend Deployment (`deploy-frontend.yml`)
**Triggers:** Push to `main` or manual dispatch
**Purpose:** Deploy React frontend to GitHub Pages

**What it does:**
- ✅ Builds optimized production bundle
- ✅ Deploys to GitHub Pages
- ✅ Provides live URL for the application

**Setup Required:**
1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Push to `main` branch to trigger deployment

**Live URL:** `https://<username>.github.io/<repo-name>/`

### 3. ✅ Continuous Integration (`ci.yml`)
**Triggers:** Push to any branch, PRs
**Purpose:** Quality checks across the stack

**What it does:**
- ✅ Frontend linting and build verification
- ✅ Blockchain compilation checks
- ✅ Go module verification
- ✅ Integration status reporting

## Setup Instructions

### Prerequisites
1. GitHub repository with Actions enabled
2. Repository permissions:
   - `contents: read`
   - `pages: write`
   - `id-token: write` (for Pages deployment)

### Enable GitHub Pages
```bash
1. Go to Settings → Pages
2. Source: "GitHub Actions"
3. Save
```

### Enable Actions
```bash
1. Go to Actions tab
2. Allow all actions
3. Workflows will run automatically on push
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev  # Development server on port 5000
npm run build  # Production build
```

### Blockchain
```bash
cd aequitas
go mod download
go build -o build/aequitasd ./cmd/aequitasd
./build/aequitasd init validator --chain-id aequitas-1
./build/aequitasd start
```

## Blockchain Configuration

### $REPAR Parameters
- **Total Supply:** 131,000,000,000,000 (131 Trillion)
- **Base Denom:** `repar`
- **Display Denom:** `REPAR` (6 decimals)
- **Chain ID:** `aequitas-1`
- **Min Commission:** 4.5%
- **Unbonding Period:** 21 days

### Genesis Accounts
- **Validator:** 100,000,000,000,000,000 repar (100 quadrillion base units)
- **Alice (Faucet):** 10,000,000,000,000,000 repar (10 quadrillion base units)

## Deployment Workflow

### For Blockchain Updates:
1. Make changes in `aequitas/` directory
2. Commit and push to `main` or `develop`
3. GitHub Actions builds the binary
4. Download artifact from Actions tab
5. Deploy to your infrastructure

### For Frontend Updates:
1. Make changes in `frontend/` directory
2. Commit and push to `main`
3. GitHub Actions automatically deploys to Pages
4. Visit live URL to see changes

## Monitoring

### Build Status Badges
Add to your README.md:
```markdown
![Blockchain Build](https://github.com/<user>/<repo>/workflows/Build%20Aequitas%20Zone%20Blockchain/badge.svg)
![Frontend Deploy](https://github.com/<user>/<repo>/workflows/Deploy%20Frontend%20to%20GitHub%20Pages/badge.svg)
![CI](https://github.com/<user>/<repo>/workflows/CI%20-%20Full%20Stack%20Testing/badge.svg)
```

### Check Workflow Status
```bash
# Via GitHub CLI
gh workflow list
gh run list --workflow=blockchain-build.yml
```

## Troubleshooting

### Blockchain Build Fails
- Check Go version (requires 1.24+)
- Verify `go.mod` and `go.sum` are committed
- Review Actions logs for dependency errors

### Frontend Deployment Fails
- Ensure Pages is enabled in Settings
- Check `frontend/dist` is generated correctly
- Verify base URL in `vite.config.js`

### Common Issues
1. **Go module errors:** Run `go mod tidy` locally
2. **npm errors:** Delete `node_modules`, run `npm install`
3. **Pages 404:** Check repository Pages settings

## Production Deployment

### Blockchain Mainnet
1. Download production binary from Actions
2. Update `config.yml` with mainnet parameters
3. Initialize with mainnet chain ID
4. Deploy to secure infrastructure
5. Open RPC ports for frontend connection

### Frontend Production
1. Update API endpoints in frontend config
2. Configure proper CORS settings
3. Deploy to CDN or hosting platform
4. Update DNS records

## Security Notes

⚠️ **Important:**
- Never commit private keys or mnemonics
- Use GitHub Secrets for sensitive configuration
- Testnet only - not for production funds
- Review all workflow permissions

## Support

For issues or questions:
- GitHub Issues: Report bugs and feature requests
- Documentation: See `/docs` folder
- Discord: (Coming soon)

---
**Built with ❤️ for justice | Powered by GitHub Actions**
