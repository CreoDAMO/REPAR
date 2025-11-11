#!/bin/bash

###############################################################################
# AEQUITAS PROTOCOL - DigitalOcean Deployment Automation Script
# 
# This script automates the deployment of the Aequitas Protocol frontend
# to DigitalOcean App Platform.
#
# Prerequisites:
# 1. Install doctl CLI: https://docs.digitalocean.com/reference/doctl/how-to/install/
# 2. Authenticate: doctl auth init (DO token should NOT be in frontend env)
# 3. Configure secrets in DigitalOcean dashboard after first deployment
#
# Usage:
#   ./deploy-to-digitalocean.sh [production|staging]
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Environment
ENVIRONMENT=${1:-production}
APP_NAME="aequitas-protocol-${ENVIRONMENT}"
REGION="nyc3"  # New York datacenter
COSMOS_RPC_URL=${COSMOS_RPC_URL:-""}  # Optional: set if blockchain node is available

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   AEQUITAS PROTOCOL - DigitalOcean Deployment${NC}"
echo -e "${BLUE}   Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo -e "${RED}✗ doctl CLI is not installed${NC}"
    echo -e "${YELLOW}Install it from: https://docs.digitalocean.com/reference/doctl/how-to/install/${NC}"
    exit 1
fi

# Check if authenticated
if ! doctl auth list &> /dev/null; then
    echo -e "${RED}✗ Not authenticated with DigitalOcean${NC}"
    echo -e "${YELLOW}Run: doctl auth init${NC}"
    echo -e "${YELLOW}Note: Your DO token should be configured via doctl, NOT as a VITE_ variable${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}\n"

# Warning about secrets
echo -e "${YELLOW}⚠️  IMPORTANT: Secrets Configuration${NC}"
echo -e "${YELLOW}After deployment, you MUST set the following secrets in the DigitalOcean dashboard:${NC}"
echo -e "${YELLOW}- VITE_CIRCLE_API_KEY${NC}"
echo -e "${YELLOW}- VITE_CIRCLE_ENTITY_SECRET${NC}"
echo -e "${YELLOW}Do NOT put your DigitalOcean API token in frontend environment variables!${NC}\n"

read -p "Continue with deployment? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Create app spec for DigitalOcean App Platform
echo -e "\n${BLUE}Creating App Platform specification...${NC}"

# Build RPC URL config only if set
RPC_ENV=""
if [ -n "$COSMOS_RPC_URL" ]; then
    RPC_ENV="  - key: VITE_COSMOS_RPC_URL
    scope: RUN_TIME
    value: ${COSMOS_RPC_URL}"
fi

cat > .do-app-spec.yaml <<EOF
name: ${APP_NAME}
region: ${REGION}
services:
- name: frontend
  github:
    branch: main
    deploy_on_push: true
    repo: CreoDAMO/REPAR
  source_dir: frontend
  build_command: npm install && npm run build
  run_command: npx vite preview --host 0.0.0.0 --port 8080
  http_port: 8080
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: VITE_COINBASE_APP_ID
    scope: RUN_AND_BUILD_TIME
    value: aequitas-protocol
  - key: NODE_ENV
    scope: RUN_AND_BUILD_TIME
    value: ${ENVIRONMENT}
${RPC_ENV}

- name: block-explorer
  github:
    branch: main
    deploy_on_push: true
    repo: CreoDAMO/REPAR
  source_dir: dexplorer
  build_command: npm install && npm run build
  run_command: npx vite preview --host 0.0.0.0 --port 8081
  http_port: 8081
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /explorer
  envs:
  - key: NODE_ENV
    scope: RUN_AND_BUILD_TIME
    value: ${ENVIRONMENT}

static_sites: []
databases: []
EOF

echo -e "${GREEN}✓ App specification created${NC}\n"

# Deploy to DigitalOcean
echo -e "${BLUE}Deploying to DigitalOcean App Platform...${NC}"
echo -e "${YELLOW}This may take 5-10 minutes...${NC}\n"

# Check if app already exists
APP_ID=$(doctl apps list --format ID,Spec.Name --no-header 2>/dev/null | grep "${APP_NAME}" | awk '{print $1}' || true)

if [ -z "$APP_ID" ]; then
    echo -e "${BLUE}Creating new app: ${APP_NAME}${NC}"
    if doctl apps create --spec .do-app-spec.yaml --wait; then
        APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "${APP_NAME}" | awk '{print $1}')
    else
        echo -e "${RED}✗ Deployment failed${NC}"
        rm -f .do-app-spec.yaml
        exit 1
    fi
else
    echo -e "${BLUE}Updating existing app: ${APP_NAME} (ID: ${APP_ID})${NC}"
    if ! doctl apps update $APP_ID --spec .do-app-spec.yaml --wait; then
        echo -e "${RED}✗ Deployment failed${NC}"
        rm -f .do-app-spec.yaml
        exit 1
    fi
fi

# Get app URL
APP_URL=$(doctl apps list --format DefaultIngress,Spec.Name --no-header | grep "${APP_NAME}" | awk '{print $1}')

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}App URL:${NC} https://${APP_URL}"
echo -e "${BLUE}App ID:${NC} ${APP_ID}"
echo -e "${BLUE}Dashboard:${NC} https://cloud.digitalocean.com/apps/${APP_ID}"

echo -e "\n${GREEN}Next Steps:${NC}"
echo -e "- Configure custom domain (optional)"
echo -e "- Set up monitoring and alerts"
echo -e "- Enable auto-deploy from GitHub"
echo -e "- If you need payment processing, implement a backend API proxy for Circle SDK\n"

# Clean up
rm -f .do-app-spec.yaml

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${BLUE}Frontend is now live and serving in mock data mode.${NC}"
echo -e "${YELLOW}Note: Payment integration requires a backend proxy - see deployment guide for details.${NC}"
