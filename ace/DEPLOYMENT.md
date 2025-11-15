## ACE V1 Production Deployment Guide

**Status:** ✅ Production-Ready  
**Version:** 1.0.0  
**Last Updated:** November 15, 2025

## Overview

This guide provides step-by-step instructions for deploying the Aequitas Cloud Engine (ACE) V1 in production environments. ACE is now 100% production-ready with complete Cosmos SDK blockchain integration, NVIDIA NIM AI scheduling, and production observability.

## Quick Start

```bash
# Docker deployment (recommended for most users)
cd ace
export NVIDIA_API_KEY="nvapi-..."  # Optional but recommended
./scripts/deploy-production.sh

# Production deployment will be available at:
# - API: http://localhost:8080
# - Metrics: http://localhost:9090
# - AI Sidecar: http://localhost:8001
```

## Prerequisites

### Hardware Requirements

**Minimum (Development)**
- CPU: 4 cores
- RAM: 8 GB
- Storage: 50 GB SSD
- Network: 10 Mbps

**Recommended (Production)**
- CPU: 16+ cores
- RAM: 32+ GB
- Storage: 500 GB NVMe SSD
- Network: 100+ Mbps
- GPU: NVIDIA A100/H100 (for AI features)

### Software Requirements

- **Docker:** 24.0+ with Docker Compose
- **Go:** 1.21+ (for bare-metal deployment)
- **Python:** 3.11+ (for AI sidecar development)
- **Kubernetes:** 1.28+ (for K8s deployment)

### Environment Variables

Required:
- `BLOCKCHAIN_RPC` - Aequitas blockchain RPC endpoint
- `CHAIN_ID` - Chain ID (default: `aequitas-1`)

Optional but recommended:
- `NVIDIA_API_KEY` - NVIDIA NIM API key for AI features
- `ACE_PORT` - API port (default: 8080)
- `ACE_METRICS_PORT` - Metrics port (default: 9090)
- `LOG_LEVEL` - Logging level: debug, info, warn, error (default: info)

## Deployment Options

### Option 1: Docker Compose (Recommended)

**Best for:** Most production deployments, quick setup

```bash
cd ace/deployments/docker

# Set environment variables
export NVIDIA_API_KEY="nvapi-..."
export BLOCKCHAIN_RPC="http://your-blockchain:26657"
export CHAIN_ID="aequitas-1"

# Deploy
docker-compose up -d

# Verify
curl http://localhost:8080/health
curl http://localhost:9090/metrics

# View logs
docker-compose logs -f ace-kernel
```

**Services Started:**
- `ace-kernel` - Control plane (port 8080, 9090)
- `ace-ai-sidecar` - AI scheduling (port 8001)
- `blockchain` - Aequitas blockchain node
- `ipfs` - IPFS storage
- `prometheus` - Metrics collection
- `grafana` - Monitoring dashboards (port 3000)

### Option 2: Kubernetes

**Best for:** Large-scale deployments, auto-scaling

```bash
# Create namespace
kubectl create namespace ace

# Set secrets
kubectl create secret generic ace-secrets \
  --from-literal=nvidia-api-key="${NVIDIA_API_KEY}" \
  --namespace ace

# Deploy
kubectl apply -f ace/deployments/kubernetes/ace-deployment.yaml

# Verify
kubectl get pods -n ace
kubectl logs -n ace deployment/ace-kernel -f

# Get service endpoint
kubectl get svc -n ace ace-kernel
```

**Features:**
- Auto-scaling based on load
- High availability with multiple replicas
- Health checks and automatic restarts
- Resource limits and QoS

### Option 3: Bare Metal

**Best for:** Maximum performance, full control

```bash
cd ace

# Build ACE
./scripts/build-ace.sh

# Start blockchain (if not already running)
aequitasd start --home ~/.aequitas &

# Start AI sidecar (requires Docker for GPU support)
docker run -d --name ace-ai-sidecar --gpus all -p 8001:8001 \
  -e NVIDIA_API_KEY="${NVIDIA_API_KEY}" \
  ace-ai-sidecar

# Start ACE Control Plane
export ACE_PORT=8080
export ACE_METRICS_PORT=9090
export BLOCKCHAIN_RPC="http://localhost:26657"
export CHAIN_ID="aequitas-1"
export NVIDIA_NIM_ENDPOINT="http://localhost:8001"
export LOG_LEVEL="info"

./bin/ace-kernel

# Verify
curl http://localhost:8080/health
```

**Systemd Service (Optional):**
```bash
# Create service file
sudo tee /etc/systemd/system/ace-kernel.service > /dev/null <<EOF
[Unit]
Description=Aequitas Cloud Engine (ACE) Control Plane
After=network.target aequitasd.service

[Service]
Type=simple
User=aequitas
WorkingDirectory=/opt/ace
Environment="ACE_PORT=8080"
Environment="ACE_METRICS_PORT=9090"
Environment="BLOCKCHAIN_RPC=http://localhost:26657"
Environment="CHAIN_ID=aequitas-1"
Environment="NVIDIA_NIM_ENDPOINT=http://localhost:8001"
Environment="LOG_LEVEL=info"
ExecStart=/opt/ace/bin/ace-kernel
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable ace-kernel
sudo systemctl start ace-kernel
sudo systemctl status ace-kernel
```

## Post-Deployment Configuration

### 1. Register First Validator Node

```bash
curl -X POST http://localhost:8080/api/v1/register-node \
  -H 'Content-Type: application/json' \
  -d '{
    "node_id": "validator-001",
    "hardware": {
      "cpu_cores": 64,
      "gpu_count": 8,
      "memory_gb": 512,
      "storage_gb": 2000
    },
    "network_mode": "internet"
  }'
```

### 2. Schedule Test Workload

```bash
curl -X POST http://localhost:8080/api/v1/schedule-workload \
  -H 'Content-Type: application/json' \
  -d '{
    "workload_type": "claims_processing",
    "duration_seconds": 3600,
    "user_did": "aequitas1..."
  }'
```

### 3. Store Evidence

```bash
curl -X POST http://localhost:8080/api/v1/store-evidence \
  -H 'Content-Type: application/json' \
  -d '{
    "evidence_data": "base64_encoded_data",
    "metadata": {
      "case_id": "case-001",
      "jurisdiction": "international"
    }
  }'
```

## Monitoring & Observability

### Prometheus Metrics

Access metrics at: `http://localhost:9090/metrics`

**Key Metrics:**
- `ace_nodes_total` - Total registered nodes
- `ace_workloads_scheduled_total` - Workloads scheduled
- `ace_evidence_stored_total` - Evidence items stored
- `ace_blockchain_tx_total` - Blockchain transactions
- `ace_network_failovers_total` - Network failover events
- `ace_allocation_latency_seconds` - Resource allocation latency
- `ace_scheduler_decision_latency_seconds` - AI scheduler latency

### Grafana Dashboards

Access Grafana at: `http://localhost:3000` (admin/admin)

**Pre-configured Dashboards:**
1. ACE Overview - System health and performance
2. Blockchain Integration - Transaction metrics
3. AI Scheduler Performance - Workload placement
4. Storage Operations - IPFS/Ceph metrics
5. Network Layer - Failover and connectivity

### Structured Logging

ACE uses **zap** structured logging in JSON format.

**Log Levels:**
- `debug` - Detailed debugging information
- `info` - General operational information (default)
- `warn` - Warning messages
- `error` - Error conditions

**View Logs:**
```bash
# Docker
docker-compose logs -f ace-kernel

# Systemd
journalctl -u ace-kernel -f

# Direct
tail -f ace-kernel.log
```

**Filter by Level:**
```bash
# Errors only
docker-compose logs ace-kernel | jq 'select(.level=="error")'

# Specific component
docker-compose logs ace-kernel | jq 'select(.logger=="blockchain")'
```

## Production Checklist

Before going live, ensure:

- [ ] Cosmos SDK blockchain node synced and operational
- [ ] NVIDIA_API_KEY set (if using AI features)
- [ ] IPFS daemon running and accessible
- [ ] Prometheus scraping configured
- [ ] Grafana dashboards imported
- [ ] Health checks passing (`/health` endpoint)
- [ ] Metrics endpoint accessible (`/metrics`)
- [ ] First validator node registered successfully
- [ ] Test workload scheduled and completed
- [ ] Evidence storage tested with IPFS
- [ ] Blockchain transaction submission verified
- [ ] Network failover tested (if using mobile sovereignty)
- [ ] Backup and disaster recovery procedures documented
- [ ] Monitoring alerts configured
- [ ] Security hardening completed (firewall, SSL/TLS)
- [ ] Load testing performed (100+ concurrent requests)

## Security Best Practices

1. **Use TLS/SSL** for all API endpoints in production
2. **Firewall Configuration:**
   - Allow: 8080 (API), 9090 (metrics)
   - Block: Internal service ports (26657, 5001, 8001)
3. **Secrets Management:**
   - Never commit NVIDIA_API_KEY or private keys to git
   - Use Kubernetes secrets or environment variables
   - Rotate API keys regularly
4. **Access Control:**
   - Implement authentication for API endpoints
   - Use rate limiting to prevent abuse
   - Monitor for suspicious activity
5. **Regular Updates:**
   - Keep ACE updated to latest version
   - Monitor security advisories
   - Apply patches promptly

## Troubleshooting

### ACE won't start

**Check:**
1. Blockchain RPC accessible: `curl ${BLOCKCHAIN_RPC}/health`
2. Ports not in use: `lsof -i :8080`
3. Logs for errors: `docker-compose logs ace-kernel`
4. Environment variables set correctly

### AI features not working

**Check:**
1. NVIDIA_API_KEY is set
2. AI sidecar is running: `curl http://localhost:8001/health`
3. AI sidecar logs: `docker-compose logs ace-ai-sidecar`
4. Network connectivity to NVIDIA NIM endpoint

### Blockchain transactions failing

**Check:**
1. Blockchain node is synced
2. Chain ID matches: `curl ${BLOCKCHAIN_RPC}/status`
3. Account has sufficient balance for fees
4. Transaction logs: grep for "blockchain_tx"

### High latency

**Check:**
1. Resource utilization: `docker stats`
2. Network latency to blockchain RPC
3. IPFS performance
4. Prometheus metrics for bottlenecks

## Scaling ACE

### Horizontal Scaling (Multiple ACE Instances)

```yaml
# Kubernetes
replicas: 3  # In ace-deployment.yaml

# Docker Compose (manual)
docker-compose up --scale ace-kernel=3
```

**Load Balancing:**
- Use NGINX or HAProxy for API load balancing
- Session affinity not required (stateless API)
- Health checks on `/health` endpoint

### Vertical Scaling (More Resources)

**Docker:**
```yaml
# docker-compose.yml
deploy:
  resources:
    limits:
      cpus: '16'
      memory: 32G
```

**Kubernetes:**
```yaml
resources:
  requests:
    cpu: "8"
    memory: "16Gi"
  limits:
    cpu: "16"
    memory: "32Gi"
```

## Integration with Aequitas Ecosystem

### Mobile App Integration

Mobile validators connect to ACE for:
- Workload scheduling
- Network failover coordination
- Evidence storage

**Mobile SDK Configuration:**
```typescript
const aceClient = new ACEClient({
  endpoint: 'https://ace.aequitasprotocol.zone',
  chainId: 'aequitas-1'
});
```

### VM Infrastructure Integration

ACE orchestrates vm-infrastructure CLI for node deployment:

```bash
# ACE calls vm-infrastructure
ace-kernel -> vm-infrastructure deploy --provider local-kvm --name node-001
```

### Blockchain Module Integration

ACE interacts with these Aequitas blockchain modules:
- `x/infrastructure` - Node registration and allocation
- `x/claims` - Evidence metadata storage
- `x/justice` - Compliance and audit trails
- `x/distribution` - Resource billing in $REPAR

## Support & Resources

- **Documentation:** `ace/README.md`, `ace/docs/architecture/`
- **Issues:** https://github.com/CreoDAMO/REPAR/issues
- **Production Support:** production@aequitasprotocol.zone
- **Community:** Discord #ace-deployment

---

**ACE V1 is production-ready. Deploy with confidence. The sovereign cloud is here.**
