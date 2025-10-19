#!/bin/bash

###############################################################################
# AEQUITAS PROTOCOL - DigitalOcean Deployment Automation Script
# 
# This script automates the deployment of the Aequitas Protocol frontend
# to DigitalOcean App Platform.
#
# Prerequisites:
# 1. Install doctl CLI: https://docs.digitalocean.com/reference/doctl/how-to/install/
# 2. Authenticate: doctl auth init
# 3. Set VITE_DO_ACCESS_TOKEN in your environment
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
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}\n"

# Create app spec for DigitalOcean App Platform
echo -e "${BLUE}Creating App Platform specification...${NC}"

cat > .do-app-spec.yaml <<EOF
name: ${APP_NAME}
region: ${REGION}
services:
- name: frontend
  github:
    branch: main
    deploy_on_push: true
    repo: CreoDAMO/REPAR
  source_dir: /frontend
  build_command: npm install && npm run build
  run_command: npm run preview -- --host 0.0.0.0 --port 8080
  http_port: 8080
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: VITE_CIRCLE_API_KEY
    scope: RUN_TIME
    type: SECRET
    value: \${VITE_CIRCLE_API_KEY}
  - key: VITE_CIRCLE_ENTITY_SECRET
    scope: RUN_TIME
    type: SECRET
    value: \${VITE_CIRCLE_ENTITY_SECRET}
  - key: VITE_COINBASE_APP_ID
    scope: RUN_TIME
    value: aequitas-protocol
  - key: VITE_COSMOS_RPC_URL
    scope: RUN_TIME
    value: http://0.0.0.0:26657
  - key: NODE_ENV
    scope: RUN_TIME
    value: ${ENVIRONMENT}

- name: block-explorer
  github:
    branch: main
    deploy_on_push: true
    repo: CreoDAMO/REPAR
  source_dir: /dexplorer
  build_command: npm install && npm run build
  run_command: npm run preview -- --host 0.0.0.0 --port 8081
  http_port: 8081
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /explorer
  envs:
  - key: NODE_ENV
    scope: RUN_TIME
    value: ${ENVIRONMENT}

static_sites: []
databases: []
EOF

echo -e "${GREEN}✓ App specification created${NC}\n"

# Deploy to DigitalOcean
echo -e "${BLUE}Deploying to DigitalOcean App Platform...${NC}"
echo -e "${YELLOW}This may take 5-10 minutes...${NC}\n"

# Check if app already exists
APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "${APP_NAME}" | awk '{print $1}' || true)

if [ -z "$APP_ID" ]; then
    echo -e "${BLUE}Creating new app: ${APP_NAME}${NC}"
    doctl apps create --spec .do-app-spec.yaml --wait
else
    echo -e "${BLUE}Updating existing app: ${APP_NAME} (ID: ${APP_ID})${NC}"
    doctl apps update $APP_ID --spec .do-app-spec.yaml --wait
fi

# Get app URL
APP_URL=$(doctl apps list --format DefaultIngress,Spec.Name --no-header | grep "${APP_NAME}" | awk '{print $1}')

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}App URL:${NC} https://${APP_URL}"
echo -e "${BLUE}Dashboard:${NC} https://cloud.digitalocean.com/apps"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. Set your environment secrets in the DigitalOcean dashboard"
echo -e "2. Configure custom domain (optional)"
echo -e "3. Enable HTTPS/SSL (automatic with App Platform)"
echo -e "4. Set up monitoring and alerts\n"

# Clean up
rm -f .do-app-spec.yaml

echo -e "${GREEN}Deployment complete!${NC}"
