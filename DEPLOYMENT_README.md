# Aequitas Protocol Deployment Guide

## Overview

This guide covers deploying the complete Aequitas Protocol infrastructure to DigitalOcean using Docker Compose and GitHub Actions for CI/CD.

## Architecture

The deployment consists of the following services:

1. **Nginx Proxy Manager** - Traffic routing and SSL management (ports 80, 443, 81)
2. **Frontend** - React application (exposed on 5173)
3. **Backend** - Python API server (exposed on 3000)
4. **Calculator** - Financial modeling platform (exposed on 3001)
5. **Explorer** - Block explorer (exposed on 3002)
6. **Auditor** - Cerberus AI engine (exposed on 8000)
7. **Database** - MySQL 8.0 for calculator data (port 3306)

## Prerequisites

### 1. DigitalOcean Droplet

Create a DigitalOcean Droplet with the following specifications:

- **OS**: Ubuntu 22.04 LTS
- **CPU**: 4+ cores
- **RAM**: 8GB+ (16GB recommended)
- **Storage**: 100GB+ SSD
- **Networking**: Public IP address

### 2. Domain Configuration

- Domain name managed by Cloudflare
- Cloudflare API Token with DNS:Edit permissions

### 3. GitHub Repository Secrets

Add the following secrets to your GitHub repository (`Settings` > `Secrets and variables` > `Actions`):

Required secrets:
- `DO_HOST` - Your DigitalOcean Droplet IP address
- `DO_USERNAME` - SSH username (usually `root`)
- `DO_SSH_PRIVATE_KEY` - Private SSH key for authentication
- `MYSQL_ROOT_PASSWORD` - MySQL root password
- `MYSQL_PASSWORD` - MySQL password for aequitas user
- `CALCULATOR_DATABASE_URL` - Full database connection string (e.g., `mysql://aequitas:password@db:3306/calculator`)
- `OPENAI_API_KEY` - OpenAI API key for Cerberus Engine
- `ANTHROPIC_API_KEY` - Anthropic API key for Cerberus Engine

## Deployment Steps

### Step 1: Prepare DigitalOcean Droplet

SSH into your droplet and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
sudo apt install -y docker.io docker-compose git curl wget jq
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Create project directory
sudo mkdir -p /opt/aequitas
sudo chown $USER:$USER /opt/aequitas
```

### Step 2: Configure Cloudflare DNS

Set up your environment variables:

```bash
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
export DROPLET_IP="your-droplet-ip"
export DOMAIN="aequitasprotocol.zone"
```

Clone the repository and run the DNS setup script:

```bash
cd /opt/aequitas
git clone https://github.com/CreoDAMO/REPAR.git
cd REPAR
./scripts/setup-cloudflare-dns.sh
```

This will create A records for all 24 subdomains pointing to your Droplet IP.

### Step 3: Deploy Services

The GitHub Actions workflow will automatically deploy when you push to the main branch. You can also trigger it manually:

1. Go to your GitHub repository
2. Click `Actions` tab
3. Select `Deploy to DigitalOcean` workflow
4. Click `Run workflow`

### Step 4: Configure Nginx Proxy Manager

1. Access Nginx Proxy Manager at `http://YOUR_DROPLET_IP:81`

2. Login with default credentials:
   - Email: `admin@example.com`
   - Password: `changeme`
   - **Change these immediately!**

3. Add Proxy Hosts for each subdomain:

   **Example for Calculator:**
   - Domain Names: `calculator.aequitasprotocol.zone`
   - Scheme: `http`
   - Forward Hostname / IP: `aequitas-calculator`
   - Forward Port: `3001`
   - Enable `Block Common Exploits`
   - Enable `Websockets Support`

   **Example for Frontend:**
   - Domain Names: `www.aequitasprotocol.zone`
   - Scheme: `http`
   - Forward Hostname / IP: `aequitas-frontend`
   - Forward Port: `5173`

   **Repeat for all services:**
   - Backend: `api.aequitasprotocol.zone` → `aequitas-backend:3000`
   - Explorer: `explorer.aequitasprotocol.zone` → `aequitas-explorer:3002`
   - Auditor: `auditor.aequitasprotocol.zone` → `aequitas-auditor:8000`

4. Enable SSL for each proxy host:
   - Go to the `SSL` tab
   - Select `Request a new SSL Certificate`
   - Enable `Force SSL`
   - Enable `HTTP/2 Support`
   - Check `I Agree to Let's Encrypt TOS`
   - Click `Save`

### Step 5: Verify Deployment

Check all containers are running:

```bash
cd /opt/aequitas/REPAR
docker-compose ps
```

Check logs for any errors:

```bash
docker-compose logs -f calculator
docker-compose logs -f frontend
docker-compose logs -f backend
```

Visit your subdomains to verify they're accessible:

- https://www.aequitasprotocol.zone
- https://calculator.aequitasprotocol.zone
- https://explorer.aequitasprotocol.zone

## Subdomain Mapping

The following subdomains are configured:

| Subdomain | Service | Purpose |
|-----------|---------|---------|
| www | Frontend | Main landing page and dashboard |
| calculator | Calculator | Financial modeling platform |
| black-paper | Static | Technical whitepaper |
| audit | Static | Audit documentation |
| defendants | Frontend | Defendant database |
| ledger | Frontend | Transaction ledger |
| founder-wallet | Frontend | Founder allocation tracker |
| roadmap | Static | Development roadmap |
| ifr | Frontend | Investor relations |
| grc | Frontend | Governance & compliance |
| dao | Frontend | DAO governance interface |
| ai-analytics | Frontend | AI analytics dashboard |
| endowment | Static | Endowment tracker |
| alliances | Static | Strategic alliances |
| economics | Static | Token economics |
| crypto-comparison | Static | Competitive analysis |
| dex | Frontend | Decentralized exchange |
| nft-marketplace | Frontend | NFT marketplace |
| chain-integration | Frontend | Blockchain integration |
| onramp | Frontend | Fiat on-ramp |
| superpay | Frontend | Payment system |
| validator-subsidy | Frontend | Validator rewards |
| founder-endowment | Frontend | Founder endowment |
| explorer | Explorer | Block explorer |

## Maintenance

### Update Services

Push changes to the main branch and the GitHub Actions workflow will automatically deploy updates.

Or manually update on the server:

```bash
cd /opt/aequitas/REPAR
git pull
docker-compose up --build -d
```

### View Logs

```bash
docker-compose logs -f [service-name]
```

### Restart Services

```bash
docker-compose restart [service-name]
```

### Backup Database

```bash
docker exec aequitas-db mysqldump -u root -p calculator > backup.sql
```

### Restore Database

```bash
docker exec -i aequitas-db mysql -u root -p calculator < backup.sql
```

## Troubleshooting

### Container Won't Start

Check logs:
```bash
docker-compose logs [service-name]
```

Rebuild the container:
```bash
docker-compose up --build -d [service-name]
```

### DNS Not Resolving

- Verify A records in Cloudflare dashboard
- Check Cloudflare proxy is enabled
- Wait for DNS propagation (up to 24 hours)
- Test with `dig calculator.aequitasprotocol.zone`

### SSL Certificate Issues

- Access Nginx Proxy Manager at port 81
- Delete and recreate the proxy host
- Request new SSL certificate
- Ensure domain is accessible via HTTP first

### Performance Issues

Monitor resources:
```bash
docker stats
htop
df -h
```

Scale services if needed by adjusting docker-compose.yml resources.

## Security Recommendations

1. **Change default passwords** for Nginx Proxy Manager immediately
2. **Enable firewall** and allow only necessary ports:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```
3. **Set up automatic security updates**
4. **Regular backups** of database and configuration
5. **Monitor logs** for suspicious activity
6. **Keep Docker images updated**

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review application logs
3. Consult the [full workflow documentation](docs/workflow/WORKFLOW_DOCUMENTATION.md)
4. Contact the development team

## References

- [DigitalOcean Documentation](https://docs.digitalocean.com)
- [Docker Documentation](https://docs.docker.com)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns)
- [Nginx Proxy Manager](https://nginxproxymanager.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated:** October 22, 2025  
**Version:** 1.0.0  
**Status:** Production Ready
