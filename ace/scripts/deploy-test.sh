#!/bin/bash

set -e

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│      ACE V1 - TEST DEPLOYMENT SCRIPT                       │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""

ACE_ENDPOINT=${ACE_ENDPOINT:-"http://localhost:8080"}

echo "🧪 Testing ACE Endpoints..."
echo "ACE Control Plane: $ACE_ENDPOINT"
echo ""

echo "1️⃣  Testing Health Endpoint..."
curl -s "$ACE_ENDPOINT/health" | jq '.' || echo "❌ Health check failed"
echo ""

echo "2️⃣  Registering Test Node..."
curl -s -X POST "$ACE_ENDPOINT/api/v1/register-node" \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "did:aequitas:test-node-001",
    "hardware": "sovereign-vm",
    "stake": 1000,
    "metadata": {
      "region": "us-east",
      "provider": "local-kvm"
    }
  }' | jq '.' || echo "❌ Node registration failed"
echo ""

echo "3️⃣  Scheduling Test Workload..."
curl -s -X POST "$ACE_ENDPOINT/api/v1/schedule-workload" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "evidence_processing",
    "user_did": "did:aequitas:test-user-001",
    "resources": {
      "cpu": 2,
      "memory": 4096
    },
    "priority": 1
  }' | jq '.' || echo "❌ Workload scheduling failed"
echo ""

echo "4️⃣  Storing Test Evidence..."
curl -s -X POST "$ACE_ENDPOINT/api/v1/store-evidence" \
  -H "Content-Type: application/json" \
  -d '{
    "data": "Test forensic evidence for Aequitas Protocol",
    "user_did": "did:aequitas:test-user-001",
    "metadata": "FRE 901 compliant evidence"
  }' | jq '.' || echo "❌ Evidence storage failed"
echo ""

echo "5️⃣  Checking Governance Pricing..."
curl -s "$ACE_ENDPOINT/api/v1/governance/pricing?resource_type=compute" | jq '.' || echo "❌ Pricing check failed"
echo ""

echo "6️⃣  Checking Network Status..."
curl -s "$ACE_ENDPOINT/api/v1/network/status" | jq '.' || echo "❌ Network status failed"
echo ""

echo "7️⃣  Verifying Test Identity..."
curl -s "$ACE_ENDPOINT/api/v1/identity/verify?did=did:aequitas:test-user-001" | jq '.' || echo "❌ Identity verification failed"
echo ""

echo "✅ TEST DEPLOYMENT COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
