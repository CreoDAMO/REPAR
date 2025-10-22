
# Cloudflare Subdomain Configuration for Aequitas Protocol

**Domain:** `aequitasprotocol.zone`

This document lists all required subdomains for the complete Aequitas Protocol ecosystem, organized by function and dashboard panel.

## Root & Core Infrastructure

| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `@` | A | DigitalOcean Droplet IP | Main website root |
| `www` | CNAME | `aequitasprotocol.zone` | WWW redirect |
| `app` | A | DigitalOcean Droplet IP | Main application frontend (port 5000) |

## Blockchain Infrastructure

| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `rpc` | A | DigitalOcean Droplet IP | Blockchain RPC endpoint (port 26657) |
| `api` | A | DigitalOcean Droplet IP | REST API gateway (port 1317) |
| `grpc` | A | DigitalOcean Droplet IP | gRPC endpoint (port 9090) |
| `ws` | A | DigitalOcean Droplet IP | WebSocket endpoint (port 26657) |
| `explorer` | A | DigitalOcean Droplet IP | Block Explorer (Dexplorer) (port 3001) |
| `backend` | A | DigitalOcean Droplet IP | Circle API Backend (port 3002) |
| `auditor-api` | A | DigitalOcean Droplet IP | Cerberus Auditor API (port 8000) |

## Dashboard Panels & Features

### Main Dashboard
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `dashboard` | CNAME | `app.aequitasprotocol.zone` | Main dashboard overview |
| `stats` | CNAME | `app.aequitasprotocol.zone` | Real-time statistics |

### Black Paper & Documentation
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `paper` | CNAME | `app.aequitasprotocol.zone` | Black Paper viewer |
| `docs` | A | DigitalOcean Droplet IP | Technical documentation |
| `whitepaper` | CNAME | `paper.aequitasprotocol.zone` | Alternative Black Paper URL |
| `actions` | CNAME | `app.aequitasprotocol.zone` | Action Items dashboard |
| `roadmap` | CNAME | `app.aequitasprotocol.zone` | Project roadmap |

### Forensic Audit System
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `audit` | CNAME | `app.aequitasprotocol.zone` | 205-page forensic audit viewer |
| `evidence` | CNAME | `app.aequitasprotocol.zone` | Evidence explorer & Chain of Guilt |
| `forensics` | CNAME | `audit.aequitasprotocol.zone` | Forensic analysis dashboard |

### Defendant Database
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `defendants` | CNAME | `app.aequitasprotocol.zone` | 200+ defendant registry |
| `liability` | CNAME | `defendants.aequitasprotocol.zone` | Liability tracking |
| `registry` | CNAME | `defendants.aequitasprotocol.zone` | Defendant registry |

### Transparency & Ledger
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `ledger` | CNAME | `app.aequitasprotocol.zone` | Global Reparations Ledger |
| `transparency` | CNAME | `ledger.aequitasprotocol.zone` | Transparency dashboard |
| `grl` | CNAME | `ledger.aequitasprotocol.zone` | Global Reparations Ledger shorthand |

### Founder Wallet
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `wallet` | CNAME | `app.aequitasprotocol.zone` | Multi-sig founder wallet |
| `multisig` | CNAME | `wallet.aequitasprotocol.zone` | Multi-signature wallet interface |

### Legal & Arbitration Systems
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `ifr` | CNAME | `app.aequitasprotocol.zone` | International Forensic Registry |
| `grc` | CNAME | `app.aequitasprotocol.zone` | Global Reparations Commission |
| `claims` | CNAME | `app.aequitasprotocol.zone` | Claims filing system |
| `arbitration` | CNAME | `claims.aequitasprotocol.zone` | Arbitration demands |
| `legal` | A | DigitalOcean Droplet IP | Legal filings repository |

### Governance
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `dao` | CNAME | `app.aequitasprotocol.zone` | DAO governance interface |
| `governance` | CNAME | `dao.aequitasprotocol.zone` | Governance dashboard |
| `vote` | CNAME | `dao.aequitasprotocol.zone` | Voting interface |

### AI & Analytics
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `ai` | CNAME | `app.aequitasprotocol.zone` | AI analytics dashboard |
| `analytics` | CNAME | `ai.aequitasprotocol.zone` | NVIDIA-powered analytics |
| `oracle` | CNAME | `ai.aequitasprotocol.zone` | Threat Oracle queries |
| `warroom` | CNAME | `ai.aequitasprotocol.zone` | War Room visualization |
| `agentkit` | CNAME | `app.aequitasprotocol.zone` | AgentKit agent factory |
| `agents` | CNAME | `agentkit.aequitasprotocol.zone` | Agent management |

### Endowment System
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `endowment` | CNAME | `app.aequitasprotocol.zone` | Harvard Endowment Protocol |
| `fund` | CNAME | `endowment.aequitasprotocol.zone` | Endowment fund dashboard |
| `investment` | CNAME | `endowment.aequitasprotocol.zone` | Investment strategies |

### Alliances & Organizations
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `alliances` | CNAME | `app.aequitasprotocol.zone` | Strategic alliances dashboard |
| `partners` | CNAME | `alliances.aequitasprotocol.zone` | Partner organizations |
| `caricom` | CNAME | `alliances.aequitasprotocol.zone` | CARICOM integration |
| `ncobra` | CNAME | `alliances.aequitasprotocol.zone` | N'COBRA alliance |

### $REPAR Economics
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `repar` | CNAME | `app.aequitasprotocol.zone` | $REPAR coin hub |
| `economics` | CNAME | `repar.aequitasprotocol.zone` | Economics dashboard |
| `tokenomics` | CNAME | `repar.aequitasprotocol.zone` | Tokenomics viewer |
| `burn` | CNAME | `repar.aequitasprotocol.zone` | Justice Burn tracker |

### Cryptocurrency Comparison
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `compare` | CNAME | `app.aequitasprotocol.zone` | Crypto comparison tool |
| `vs` | CNAME | `compare.aequitasprotocol.zone` | Versus comparison |

### DEX & Trading
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `dex` | CNAME | `app.aequitasprotocol.zone` | Decentralized exchange |
| `swap` | CNAME | `dex.aequitasprotocol.zone` | Token swap interface |
| `trade` | CNAME | `dex.aequitasprotocol.zone` | Trading interface |
| `liquidity` | CNAME | `dex.aequitasprotocol.zone` | Liquidity pools |

### Payment Systems
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `pay` | CNAME | `app.aequitasprotocol.zone` | SuperPay payment gateway |
| `superpay` | CNAME | `pay.aequitasprotocol.zone` | SuperPay interface |
| `fiat` | CNAME | `pay.aequitasprotocol.zone` | Fiat on-ramp |
| `onramp` | CNAME | `pay.aequitasprotocol.zone` | Crypto on-ramp (Onramper) |
| `coinbase` | CNAME | `pay.aequitasprotocol.zone` | Coinbase integration |

### Validator Subsidy
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `validators` | CNAME | `app.aequitasprotocol.zone` | Validator subsidy dashboard |
| `subsidy` | CNAME | `validators.aequitasprotocol.zone` | Subsidy program |
| `nodes` | CNAME | `validators.aequitasprotocol.zone` | Node management |

### Development & Testing
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `testnet` | A | Testnet Droplet IP | Testnet environment |
| `faucet` | CNAME | `testnet.aequitasprotocol.zone` | Testnet faucet |
| `dev` | A | Dev Droplet IP | Development environment |
| `staging` | A | Staging Droplet IP | Staging environment |

### IPFS & Storage
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `ipfs` | A | IPFS Gateway IP | IPFS gateway |
| `storage` | CNAME | `ipfs.aequitasprotocol.zone` | Decentralized storage |
| `files` | CNAME | `ipfs.aequitasprotocol.zone` | File access |

### Monitoring & Status
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `status` | A | Status Page IP | System status page |
| `monitor` | CNAME | `status.aequitasprotocol.zone` | Monitoring dashboard |
| `health` | CNAME | `status.aequitasprotocol.zone` | Health checks |

### API & Services
| Subdomain | Type | Points To | Purpose |
|-----------|------|-----------|---------|
| `api-v1` | A | DigitalOcean Droplet IP | API version 1 |
| `api-v2` | A | DigitalOcean Droplet IP | API version 2 (future) |
| `graphql` | A | DigitalOcean Droplet IP | GraphQL endpoint |

## DNS Record Configuration Template

### For Each A Record:
```
Type: A
Name: [subdomain]
Content: [DigitalOcean Droplet IP]
TTL: Auto
Proxy Status: Proxied (orange cloud) OR DNS Only (grey cloud)
```

### For Each CNAME Record:
```
Type: CNAME
Name: [subdomain]
Content: [target domain]
TTL: Auto
Proxy Status: Proxied (orange cloud)
```

### For TXT Verification Records:
```
Type: TXT
Name: _replit-challenge.[subdomain]
Content: [Replit verification token]
TTL: Auto
```

## Security Recommendations

1. **Enable Cloudflare Proxy (Orange Cloud)** for:
   - All public-facing subdomains (app, www, paper, dex, etc.)
   - DDoS protection enabled
   - SSL/TLS encryption (Full Strict mode)

2. **DNS Only (Grey Cloud)** for:
   - RPC endpoints (rpc, api, grpc, ws)
   - Direct blockchain access required
   - IPFS gateway

3. **SSL/TLS Settings:**
   - Mode: Full (Strict)
   - Minimum TLS Version: 1.2
   - Always Use HTTPS: Enabled
   - Automatic HTTPS Rewrites: Enabled

4. **Firewall Rules:**
   - Rate limiting on API endpoints
   - Country-based restrictions (optional)
   - Bot protection enabled

## Deployment Priority

### Phase 1 (Immediate - Mainnet Launch):
- Root (@, www, app)
- Blockchain infrastructure (rpc, api, grpc, explorer)
- Core dashboards (dashboard, repar, dex, validators)

### Phase 2 (Week 1):
- All dashboard panels (audit, defendants, ledger, etc.)
- Payment systems (pay, superpay, onramp)
- Documentation (docs, paper, legal)

### Phase 3 (Month 1):
- Advanced features (ai, warroom, oracle)
- Development environments (testnet, faucet, dev)
- Monitoring (status, monitor, health)

## Total Subdomain Count

**Estimated Total:** 65+ subdomains

### Summary by Category:
- **Root & Core Infrastructure:** 3 subdomains
- **Blockchain Infrastructure:** 7 subdomains
- **Dashboard Panels:** 2 subdomains
- **Documentation:** 5 subdomains
- **Forensic Audit System:** 3 subdomains
- **Defendant Database:** 3 subdomains
- **Transparency & Ledger:** 3 subdomains
- **Founder Wallet:** 2 subdomains
- **Legal & Arbitration:** 6 subdomains
- **Governance:** 3 subdomains
- **AI & Analytics:** 6 subdomains
- **Endowment System:** 3 subdomains
- **Alliances & Organizations:** 4 subdomains
- **$REPAR Economics:** 4 subdomains
- **Crypto Comparison:** 2 subdomains
- **DEX & Trading:** 4 subdomains
- **Payment Systems:** 6 subdomains
- **Validator Subsidy:** 3 subdomains
- **Development & Testing:** 4 subdomains
- **IPFS & Storage:** 3 subdomains
- **Monitoring & Status:** 3 subdomains
- **API & Services:** 3 subdomains

This comprehensive subdomain structure ensures every feature of the Aequitas Protocol has a dedicated, memorable URL while maintaining proper organization and scalability.
