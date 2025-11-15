#!/bin/bash

set -e

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│      AEQUITAS CLOUD ENGINE (ACE) V1 - BUILD SCRIPT         │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""

PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$PROJECT_ROOT"

echo "📦 Installing Go dependencies..."
go mod tidy
go mod download

echo ""
echo "🔨 Building ACE Kernel..."
go build -o bin/ace-kernel ./cmd/ace-kernel

echo ""
echo "✅ BUILD COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Binaries:"
echo "  - ACE Kernel: $PROJECT_ROOT/bin/ace-kernel"
echo ""
echo "To start ACE:"
echo "  $PROJECT_ROOT/bin/ace-kernel"
echo ""
echo "Environment variables:"
echo "  ACE_PORT               (default: 8080)"
echo "  BLOCKCHAIN_RPC         (default: http://localhost:26657)"
echo "  NVIDIA_NIM_ENDPOINT    (default: http://localhost:8000)"
echo "  STORAGE_ENDPOINT       (default: http://localhost:5001)"
echo "  NETWORK_MODE           (default: internet)"
echo "  GOVERNANCE_ENABLED     (default: true)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
