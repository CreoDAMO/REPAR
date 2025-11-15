#!/bin/bash
# ACE V1 Production Deployment Script
# Deploys the first Aequitas Cloud Engine node

set -e

echo "🚀 ACE V1 Production Deployment"
echo "================================"
echo ""

# Configuration
ACE_VERSION="1.0.0"
DEPLOYMENT_TYPE="${DEPLOYMENT_TYPE:-docker}"  # docker, kubernetes, or bare-metal
ACE_PORT="${ACE_PORT:-8080}"
METRICS_PORT="${ACE_METRICS_PORT:-9090}"
BLOCKCHAIN_RPC="${BLOCKCHAIN_RPC:-http://localhost:26657}"
CHAIN_ID="${CHAIN_ID:-aequitas-1}"

# Color codes for output
GREEN='\033[0.32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Prerequisite checks
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Docker (for Docker deployment)
    if [ "$DEPLOYMENT_TYPE" = "docker" ]; then
        if ! command -v docker &> /dev/null; then
            log_error "Docker not found. Please install Docker first."
            exit 1
        fi
        
        if ! command -v docker-compose &> /dev/null; then
            log_error "Docker Compose not found. Please install Docker Compose first."
            exit 1
        fi
    fi
    
    # Check Go (for bare-metal deployment)
    if [ "$DEPLOYMENT_TYPE" = "bare-metal" ]; then
        if ! command -v go &> /dev/null; then
            log_error "Go not found. Please install Go 1.21+ first."
            exit 1
        fi
        
        GO_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
        log_info "Go version: $GO_VERSION"
    fi
    
    # Check environment variables
    if [ -z "$NVIDIA_API_KEY" ]; then
        log_warn "NVIDIA_API_KEY not set. AI features will be disabled."
    else
        log_info "NVIDIA_API_KEY is set"
    fi
    
    log_info "All prerequisites met"
}

# Docker deployment
deploy_docker() {
    log_info "Deploying ACE using Docker Compose..."
    
    cd deployments/docker
    
    # Create .env file
    cat > .env <<EOF
NVIDIA_API_KEY=${NVIDIA_API_KEY:-}
ACE_PORT=${ACE_PORT}
ACE_METRICS_PORT=${METRICS_PORT}
BLOCKCHAIN_RPC=${BLOCKCHAIN_RPC}
CHAIN_ID=${CHAIN_ID}
GRAFANA_PASSWORD=${GRAFANA_PASSWORD:-admin}
EOF
    
    # Pull images
    log_info "Pulling Docker images..."
    docker-compose pull
    
    # Build ACE images
    log_info "Building ACE images..."
    docker-compose build
    
    # Start services
    log_info "Starting ACE services..."
    docker-compose up -d
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 10
    
    # Check health
    if curl -f http://localhost:${ACE_PORT}/health &> /dev/null; then
        log_info "ACE Control Plane is healthy"
    else
        log_error "ACE Control Plane health check failed"
        docker-compose logs ace-kernel
        exit 1
    fi
    
    if curl -f http://localhost:8001/health &> /dev/null; then
        log_info "AI Sidecar is healthy"
    else
        log_warn "AI Sidecar health check failed (this is OK if NVIDIA_API_KEY is not set)"
    fi
    
    cd ../..
}

# Kubernetes deployment
deploy_kubernetes() {
    log_info "Deploying ACE on Kubernetes..."
    
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl not found. Please install kubectl first."
        exit 1
    fi
    
    # Apply Kubernetes manifests
    kubectl apply -f deployments/kubernetes/ace-namespace.yaml
    kubectl apply -f deployments/kubernetes/ace-deployment.yaml
    kubectl apply -f deployments/kubernetes/ace-service.yaml
    
    # Wait for deployment
    log_info "Waiting for ACE deployment to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/ace-kernel -n ace
    
    # Get service endpoint
    ACE_ENDPOINT=$(kubectl get svc ace-kernel -n ace -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
    log_info "ACE Control Plane endpoint: http://${ACE_ENDPOINT}:${ACE_PORT}"
}

# Bare metal deployment
deploy_bare_metal() {
    log_info "Deploying ACE on bare metal..."
    
    # Build ACE binary
    log_info "Building ACE binary..."
    go build -o bin/ace-kernel ./cmd/ace-kernel
    
    # Build AI sidecar Docker container (we still use Docker for the AI sidecar)
    log_info "Starting AI sidecar (Docker required for NVIDIA GPU support)..."
    if command -v docker &> /dev/null; then
        docker build -t ace-ai-sidecar -f deployments/docker/Dockerfile.sidecar .
        docker run -d --name ace-ai-sidecar --gpus all -p 8001:8001 \
            -e NVIDIA_API_KEY=${NVIDIA_API_KEY:-} \
            ace-ai-sidecar
    else
        log_warn "Docker not available. AI sidecar will not be started."
    fi
    
    # Create systemd service (optional)
    if command -v systemctl &> /dev/null; then
        log_info "Creating systemd service..."
        
        sudo tee /etc/systemd/system/ace-kernel.service > /dev/null <<EOF
[Unit]
Description=Aequitas Cloud Engine (ACE) Control Plane
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
Environment="ACE_PORT=${ACE_PORT}"
Environment="ACE_METRICS_PORT=${METRICS_PORT}"
Environment="BLOCKCHAIN_RPC=${BLOCKCHAIN_RPC}"
Environment="CHAIN_ID=${CHAIN_ID}"
Environment="NVIDIA_NIM_ENDPOINT=http://localhost:8001"
Environment="LOG_LEVEL=info"
ExecStart=$(pwd)/bin/ace-kernel
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
        
        sudo systemctl daemon-reload
        sudo systemctl enable ace-kernel
        sudo systemctl start ace-kernel
        
        log_info "ACE service started and enabled"
    else
        # Start directly
        log_info "Starting ACE directly..."
        export ACE_PORT=${ACE_PORT}
        export ACE_METRICS_PORT=${METRICS_PORT}
        export BLOCKCHAIN_RPC=${BLOCKCHAIN_RPC}
        export CHAIN_ID=${CHAIN_ID}
        export NVIDIA_NIM_ENDPOINT=http://localhost:8001
        export LOG_LEVEL=info
        
        nohup ./bin/ace-kernel > ace-kernel.log 2>&1 &
        ACE_PID=$!
        echo $ACE_PID > ace-kernel.pid
        
        log_info "ACE started with PID: $ACE_PID"
    fi
    
    # Wait and check health
    sleep 5
    if curl -f http://localhost:${ACE_PORT}/health &> /dev/null; then
        log_info "ACE Control Plane is healthy"
    else
        log_error "ACE Control Plane health check failed"
        exit 1
    fi
}

# Post-deployment verification
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Test health endpoint
    if curl -f http://localhost:${ACE_PORT}/health &> /dev/null; then
        log_info "Health check: PASS"
    else
        log_error "Health check: FAIL"
        return 1
    fi
    
    # Test metrics endpoint
    if curl -f http://localhost:${METRICS_PORT}/metrics &> /dev/null; then
        log_info "Metrics endpoint: PASS"
    else
        log_warn "Metrics endpoint: FAIL (this might be OK depending on configuration)"
    fi
    
    log_info "Deployment verification complete"
}

# Display deployment summary
show_summary() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 ACE V1 Deployment Complete!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📍 Endpoints:"
    echo "   API:     http://localhost:${ACE_PORT}"
    echo "   Metrics: http://localhost:${METRICS_PORT}/metrics"
    echo "   Health:  http://localhost:${ACE_PORT}/health"
    echo ""
    echo "🔗 Integrations:"
    echo "   Blockchain: ${BLOCKCHAIN_RPC}"
    echo "   Chain ID:   ${CHAIN_ID}"
    echo "   AI Sidecar: http://localhost:8001"
    echo ""
    echo "📊 Monitoring:"
    if [ "$DEPLOYMENT_TYPE" = "docker" ]; then
        echo "   Grafana:    http://localhost:3000 (admin/admin)"
        echo "   Prometheus: http://localhost:9091"
    fi
    echo ""
    echo "📚 Next Steps:"
    echo "   1. Register your first validator node:"
    echo "      curl -X POST http://localhost:${ACE_PORT}/api/v1/register-node \\"
    echo "        -H 'Content-Type: application/json' \\"
    echo "        -d '{\"node_id\":\"validator-001\",\"hardware\":{\"cpu\":64,\"gpu\":8,\"memory\":512}}'"
    echo ""
    echo "   2. Monitor metrics at http://localhost:${METRICS_PORT}/metrics"
    echo ""
    echo "   3. View logs:"
    if [ "$DEPLOYMENT_TYPE" = "docker" ]; then
        echo "      docker-compose -f deployments/docker/docker-compose.yml logs -f ace-kernel"
    else
        echo "      tail -f ace-kernel.log"
    fi
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Main deployment flow
main() {
    echo "Deployment Type: $DEPLOYMENT_TYPE"
    echo "ACE Version: $ACE_VERSION"
    echo ""
    
    check_prerequisites
    
    case "$DEPLOYMENT_TYPE" in
        docker)
            deploy_docker
            ;;
        kubernetes)
            deploy_kubernetes
            ;;
        bare-metal)
            deploy_bare_metal
            ;;
        *)
            log_error "Invalid deployment type: $DEPLOYMENT_TYPE"
            log_error "Valid options: docker, kubernetes, bare-metal"
            exit 1
            ;;
    esac
    
    verify_deployment
    show_summary
}

# Run main function
main
