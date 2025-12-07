# Aequitas Protocol - Workflow Documentation

This directory contains comprehensive documentation for the final 5% execution plan, infrastructure deployment, and CI/CD automation for the Aequitas Protocol.

## Contents

### 1. **WORKFLOW_DOCUMENTATION.md**
The primary comprehensive guide covering:
- The Final 5% Execution Plan ($22M allocation across three areas)
- Infrastructure Deployment Strategy
- CI/CD Pipeline Architecture
- Security Hardening and Chaos Engineering
- Operational Procedures
- Complete Deployment Checklist

**Key Sections:**
- Area 1: The AI Core & Reasoning Engine ($10M)
- Area 2: Live Data Ingestion & Real-World Interface ($5M)
- Area 3: The Elite Human-in-the-Loop Team ($7M)

### 2. **deployment.yml**
The infrastructure-as-code specification for DigitalOcean deployment, including:
- Environment setup and prerequisites
- Cloudflare DNS configuration
- Docker Compose service definitions for all 22+ subdomains
- Nginx Proxy Manager configuration
- Post-deployment setup procedures

### 3. **deploy-to-digitalocean.yml**
GitHub Actions workflow for automated deployment:
- Secure SSH connection to DigitalOcean Droplet
- Automatic cloning/pulling of all application repositories
- Docker Compose orchestration
- Container health verification
- Zero-downtime deployments

### 4. **ci-docs.yml**
Continuous Integration workflow for documentation quality:
- Broken link detection
- Markdown linting
- YAML validation
- Security vulnerability scanning

## Quick Start

### Prerequisites
- DigitalOcean account with a Droplet (Ubuntu 22.04, 4GB+ RAM)
- Domain name managed by Cloudflare
- GitHub repository with Actions enabled
- SSH key pair for Droplet access

### Setup Steps

1. **Configure GitHub Secrets**
   - `DO_HOST`: DigitalOcean Droplet IP
   - `DO_USERNAME`: SSH username (usually `root`)
   - `DO_SSH_PRIVATE_KEY`: Private SSH key for authentication
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API token with DNS:Edit permissions

2. **Prepare DigitalOcean Droplet**
   ```bash
   # SSH into your Droplet
   ssh root@YOUR_DROPLET_IP
   
   # Install Docker and Docker Compose
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y docker.io docker-compose git curl wget
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. **Configure Cloudflare DNS**
   - Create A records for all 22 subdomains pointing to your Droplet IP
   - Enable Cloudflare proxy for DDoS protection and CDN

4. **Deploy**
   - Push changes to the main branch or manually trigger the workflow
   - The deployment workflow will automatically:
     - Connect to your Droplet via SSH
     - Clone/pull all application repositories
     - Start Docker Compose with all services
     - Configure Nginx Proxy Manager

5. **Post-Deployment**
   - Access Nginx Proxy Manager at `http://YOUR_DROPLET_IP:81`
   - Configure proxy hosts for each subdomain
   - Request SSL certificates via Let's Encrypt

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare (DNS & DDoS)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Nginx Proxy Manager (Port 80/443)               │
│         (SSL Termination, Traffic Routing, Load Balancing)  │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   ┌─────────┐     ┌─────────┐     ┌─────────┐
   │ Static  │     │ Static  │     │ Dynamic │
   │ Sites   │     │ Sites   │     │ Apps    │
   │ (Nginx) │     │ (Nginx) │     │ (Node)  │
   └─────────┘     └─────────┘     └─────────┘
   
   (All running in Docker containers on DigitalOcean)
```

## Security Features

### 10% Chaos Engineering
- Random service failures for resilience testing
- Network latency injection
- Resource exhaustion scenarios
- Data corruption testing
- API rate limiting tests

### 3% Tripwire Mechanisms
- Honeypot data for unauthorized access detection
- Canary tokens for data distribution tracking
- Rate limit triggers for security alerts
- Cryptographic signature verification
- Comprehensive audit logging

## Operational Procedures

### Daily Operations
- Monitor service health metrics
- Review security logs
- Validate data pipeline health
- Check AI model performance

### Weekly Operations
- Security log review
- Dependency vulnerability checks
- Performance optimization
- Backup verification

### Monthly Operations
- Capacity planning
- Compliance audits
- Cost optimization
- Feature release planning

## Troubleshooting

### Container Won't Start
```bash
# SSH into Droplet
ssh root@YOUR_DROPLET_IP

# Check container logs
docker logs CONTAINER_NAME

# Restart container
docker restart CONTAINER_NAME

# Check all containers
docker ps -a
```

### DNS Not Resolving
- Verify A records in Cloudflare
- Check that Cloudflare proxy is enabled
- Wait for DNS propagation (up to 24 hours)
- Flush local DNS cache

### SSL Certificate Issues
- Access Nginx Proxy Manager at port 81
- Check SSL tab for certificate status
- Request new certificate if expired
- Verify domain is accessible

### Performance Issues
- Monitor CPU/memory usage: `docker stats`
- Check disk space: `df -h`
- Review application logs
- Scale services if needed

## Monitoring and Alerting

Recommended tools:
- **Prometheus**: Metrics collection
- **Grafana**: Visualization and dashboards
- **ELK Stack**: Log aggregation
- **Sentry**: Error tracking
- **Uptime Robot**: Service availability

## References

- [DigitalOcean Documentation](https://docs.digitalocean.com)
- [Docker Documentation](https://docs.docker.com)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns)
- [Nginx Proxy Manager](https://nginxproxymanager.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review application logs
3. Consult the full WORKFLOW_DOCUMENTATION.md
4. Contact the development team

---

**Last Updated:** October 21, 2025  
**Version:** 1.0.0  
**Status:** Ready for Deployment

