# Aequitas Cloud Engine (ACE) V1 - Production

**Status:** 🚀 Production Implementation (Not a Prototype)

## Overview

The Aequitas Cloud Engine (ACE) is a production-grade sovereign cloud orchestration system that coordinates the entire Aequitas Protocol infrastructure. ACE is NOT an MVP or prototype - it's a real, production-ready control plane that integrates with:

- **Aequitas Blockchain**: Real transaction signing & submission to x/ modules
- **VM Infrastructure**: Production node deployment orchestration
- **NVIDIA NIM**: AI-powered workload scheduling and analysis
- **IPFS/Ceph**: Distributed evidence storage with blockchain anchoring
- **Mobile Network**: Satellite/LoRa/Internet failover coordination
- **$REPAR Governance**: Dynamic pricing and resource billing

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                ACE PRODUCTION CONTROL PLANE                  │
├─────────────────────────────────────────────────────────────┤
│  🧠 KERNEL LAYER (Go)                                       │
│  ├─ AI-Optimized Scheduler (Real NVIDIA NIM Integration)    │
│  ├─ Sovereign Identity Engine (Cosmos SDK Client)           │
│  └─ Consensus Module (Tendermint RPC + WebSocket Events)    │
│                                                             │
│  ⚙️ ORCHESTRATION LAYER (Go)                               │
│  ├─ VM Manager (vm-infrastructure CLI Integration)          │
│  ├─ Network Engine (Mobile Sovereignty Layer Integration)   │
│  └─ Storage Orchestrator (Real IPFS + Ceph Clients)         │
│                                                             │
│  🤖 AI SIDECAR (Python)                                     │
│  ├─ NVIDIA NIM Integration (Reuses auditor/aequitas_ai.py)  │
│  ├─ Multi-Temperature Sampling                              │
│  └─ gRPC/HTTP Interface to Go Core                          │
│                                                             │
│  💾 STORAGE LAYER (Go + Real Clients)                      │
│  ├─ IPFS Client (go-ipfs-api)                               │
│  ├─ Ceph Client (go-ceph librados)                          │
│  └─ Blockchain Anchoring (x/claims, x/justice transactions) │
│                                                             │
│  📊 OBSERVABILITY (Production)                              │
│  ├─ Structured Logging (zap)                                │
│  ├─ Metrics (Prometheus)                                    │
│  └─ Distributed Tracing                                     │
└─────────────────────────────────────────────────────────────┘
```

## Production Features

### ✅ Real Blockchain Integration
- Cosmos SDK Go client with transaction signing
- Tendermint WebSocket event subscriptions
- Direct integration with x/infrastructure, x/claims, x/justice modules
- On-chain identity verification (not cached stubs)

### ✅ Real Storage Integration
- Production IPFS HTTP API client (go-ipfs-api)
- Ceph librados bindings (go-ceph)
- Evidence metadata anchored on blockchain
- FRE 901 compliant immutable storage

### ✅ Real AI Integration
- NVIDIA NIM sidecar using proven auditor/aequitas_ai.py
- Multi-temperature self-consistency sampling
- gRPC/HTTP bridge to Go scheduler
- Real workload placement based on GPU telemetry

### ✅ Real VM Orchestration
- Direct integration with vm-infrastructure CLI
- Lifecycle event capture and processing
- Real node inventory and telemetry
- Production deployment coordination

### ✅ Production Observability
- Structured logging with zap
- Prometheus metrics endpoint
- Health and readiness probes
- Distributed tracing support

## Quick Start

### Prerequisites
```bash
# Go 1.21+
go version

# Running Aequitas blockchain
aequitasd status

# IPFS daemon (optional for development)
ipfs daemon

# NVIDIA NIM (optional, uses auditor integration)
cd ../auditor && python orchestrator.py
```

### Build
```bash
cd ace
./scripts/build-ace.sh
```

### Run
```bash
# Set environment variables
export BLOCKCHAIN_RPC="http://localhost:26657"
export NVIDIA_NIM_ENDPOINT="http://localhost:8000"
export STORAGE_ENDPOINT="http://localhost:5001"

# Start ACE
./bin/ace-kernel
```

### Test
```bash
./scripts/deploy-test.sh
```

## API Endpoints

### Health & Status
- `GET /health` - Health check
- `GET /api/v1/network/status` - Network layer status

### Node Management
- `POST /api/v1/register-node` - Register validator node
- `GET /api/v1/nodes` - List registered nodes

### Workload Scheduling
- `POST /api/v1/schedule-workload` - Schedule AI/compute workload
- `GET /api/v1/workloads` - List active workloads

### Evidence Storage
- `POST /api/v1/store-evidence` - Store evidence with blockchain anchoring
- `GET /api/v1/evidence/{hash}` - Retrieve evidence

### Governance
- `GET /api/v1/governance/pricing` - Get resource pricing in $REPAR
- `POST /api/v1/governance/vote` - Submit governance vote

### Identity
- `GET /api/v1/identity/verify?did={did}` - Verify sovereign identity
- `POST /api/v1/identity/register` - Register new identity

## Integration Points

### With Aequitas Blockchain
```go
// Real transaction submission to x/infrastructure module
tx, err := aceKernel.RegisterNode(nodeID, hardwareSpec, stake)

// Subscribe to blockchain events
aceKernel.SubscribeToEvents("tm.event='NewBlock'", handleNewBlock)
```

### With VM Infrastructure
```bash
# ACE orchestrates vm-infrastructure CLI
vm-infrastructure deploy --provider local-kvm --name ace-node-001

# ACE monitors deployment status
vm-infrastructure status ace-node-001
```

### With NVIDIA NIM (via Auditor)
```python
# AI Sidecar (reuses auditor/aequitas_ai.py)
from auditor.agents.aequitas_ai import AequitasAI

ai = AequitasAI(nvidia_api_key=os.getenv("NVIDIA_API_KEY"))
result = ai.analyze_workload(workload_spec)
```

### With Mobile Sovereignty Layer
```typescript
// Network failover coordination
import { NetworkAbstractionLayer } from '../mobile/services/sovereignty'

const network = new NetworkAbstractionLayer()
network.onLayerChange((newLayer) => {
  aceKernel.updateNetworkStatus(newLayer)
})
```

## Deployment

### Docker
```bash
cd deployments/docker
docker-compose up -d
```

### Kubernetes
```bash
cd deployments/kubernetes
kubectl apply -f ace-deployment.yaml
```

### Bare Metal
```bash
cd deployments/terraform
terraform init
terraform apply
```

## Configuration

Environment variables:
```bash
# Required
BLOCKCHAIN_RPC=http://localhost:26657           # Aequitas blockchain RPC
CHAIN_ID=aequitas-1                             # Chain ID

# Optional
ACE_PORT=8080                                   # ACE API port
NVIDIA_NIM_ENDPOINT=http://localhost:8000       # NVIDIA NIM endpoint
STORAGE_ENDPOINT=http://localhost:5001          # IPFS gateway
NETWORK_MODE=internet                           # internet|lora|satellite
GOVERNANCE_ENABLED=true                         # Enable governance features
LOG_LEVEL=info                                  # debug|info|warn|error
```

## Metrics

Prometheus metrics available at `/metrics`:
- `ace_nodes_total` - Total registered nodes
- `ace_workloads_scheduled_total` - Total workloads scheduled
- `ace_evidence_stored_total` - Total evidence items stored
- `ace_blockchain_tx_total` - Total blockchain transactions
- `ace_network_failovers_total` - Network failover events

## Security

- Zero-trust architecture with identity verification
- All blockchain transactions signed with private keys
- Evidence encrypted at rest and in transit
- Post-quantum cryptography ready
- Audit logging for all operations

## Production Checklist

- [ ] Cosmos SDK client configured with chain credentials
- [ ] IPFS daemon running and accessible
- [ ] Blockchain node synced and responsive
- [ ] NVIDIA NIM sidecar deployed (if using AI features)
- [ ] Prometheus scraping configured
- [ ] Log aggregation configured
- [ ] Backup and disaster recovery procedures documented
- [ ] Security hardening completed
- [ ] Load testing performed

## Development

```bash
# Run tests
go test ./...

# Build with race detection
go build -race -o bin/ace-kernel ./cmd/ace-kernel

# Generate protobuf
./scripts/generate-proto.sh

# Lint
golangci-lint run
```

## License

Part of the Aequitas Protocol - see root directory for comprehensive licensing framework.

## Support

For production support:
- GitHub Issues: https://github.com/CreoDAMO/REPAR/issues
- Documentation: ../docs/ACE_ARCHITECTURE.md
- Operational Runbook: ../docs/ACE_OPERATIONS.md

---

**This is not a prototype. This is production infrastructure for a digital sovereign nation of 300 million descendants.**
