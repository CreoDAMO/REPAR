# GitHub Workflow Error Message

Run mkdir -p docker-data/founder
  mkdir -p docker-data/founder
  cp -r ./founder-node/* docker-data/founder/
  
  cat > docker-compose.founder.yml << EOF
  version: '3.8'
  services:
    founder-node:
      image: ${IMAGE_TAG}
      container_name: aequitas-founder-01
      ports:
        - "26656:26656"
        - "26657:26657"
        - "26660:26660"
        - "9090:9090"
        - "1317:1317"
      volumes:
        - ./docker-data/founder:/root/.aequitas
      restart: unless-stopped
      networks:
        - aequitas-network
  networks:
    aequitas-network:
      external: true
  EOF
  
  docker compose -f docker-compose.founder.yml up -d
  
  CONTAINER_ID=$(docker ps -q -f name=aequitas-founder-01)
  echo "container_id=$CONTAINER_ID" >> $GITHUB_OUTPUT
  echo "rpc_endpoint=http://localhost:26657" >> $GITHUB_OUTPUT
  shell: /usr/bin/bash -e {0}
  env:
    CHAIN_ID: aequitas-1
    GENESIS_TIME: 2025-12-03T00:00:00Z
    TOTAL_REPARATIONS: 131000000000000000000
    FOUNDER_VESTED: 15720000000000000000
    FOUNDER_ENDOWMENT: 7860000000000000000
    IMAGE_TAG: aequitas-node:v1.0.0-ed83bd3
time="2026-01-12T17:23:33Z" level=warning msg="/home/runner/work/REPAR/REPAR/docker-compose.founder.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
 founder-node Pulling 
 founder-node Error pull access denied for aequitas-node, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
Error response from daemon: pull access denied for aequitas-node, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
Error: Process completed with exit code 1.

Can you explain this error for me

Skip to content
CreoDAMO
REPAR
Repository navigation
Code
Issues
Pull requests
Discussions
Actions
Projects
Wiki
Security
8
 (8)
Insights
Settings
APEX Autonomous Constellation Deployment
APEX Autonomous Constellation Deployment #146
All jobs
Run details
Manually triggered yesterday
@CreoDAMOCreoDAMO
⁠
 ed83bd3
main
Status
Failure
Total duration
20m 53s
Artifacts
2


Deployment Summary summary
APEX Autonomous Constellation Deployment (Complete)
Deployment Date: 2026-01-12 17:38:19 UTC
Chain ID: aequitas-1
Network: mainnet
Method: Docker Compose

Phase Status
Phase	Component	Status
0	Docker Setup	success
1.1	Build Blockchain	success
1.2	Build Mobile APK	success
1.3	Validate APEX	success
2.1	Deploy Founder	failure
2.2	Deploy Constellation	skipped
3.1	Build Services	skipped
3.2	Build ADNS	skipped
4.1	Deploy Services	skipped
4.2	Deploy Mobile Page	skipped
5.1	Configure DNS	skipped
5.2	Enable IBC	skipped
6.1	Keplr PR	skipped
7.1	Sovereign Seal	skipped
Infrastructure Components
Component	Status	Details
Blockchain Nodes	7	1 founder + 6 validators
Backend API	Running	Port 3000
Frontend	Running	Port 8080
Block Explorer	Running	Port 8081
Security Auditor	Running	Port 5000
AI Autonomous	Running	Internal
ADNS Resolver	Running	Port 5353/udp
IBC Relayer	Running	Hermes
Mobile APK	Built	7ae3c113f68a1630cf99fc108fd391440ab6023df7c0758c44610437ce022752
Mobile Sovereignty
Metric	Value
APK Hash	7ae3c113f68a1630cf99fc108fd391440ab6023df7c0758c44610437ce022752
Signed	true
IPFS	pending
Download URL	
Sovereignty Features
ADNS Alternate Roots: .aequitas, .repar, .sovereign
Post-Quantum: ML-DSA-87 + CKKS FHE
Constitutional Axioms: 25/25
IBC Cross-Chain: Enabled
Mobile Validators: APK Ready
Docker Deployment: Complete
Sovereign Seal
Hash: ``

🎉 APEX Autonomous Constellation Deployment Complete

All blockchain nodes, services, mobile APK, and ADNS infrastructure deployed successfully.

Local Access:

RPC: http://localhost:26657
Frontend: http://localhost:8080
Explorer: http://localhost:8081
Mobile:
Job summary generated at run-time
Annotations
1 error and 1 warning
Deploy Founder Node (Docker)
Process completed with exit code 1.
Build Mobile APK (Sovereign Distribution)
Retention days cannot be greater than the maximum allowed retention set within the repository. Using 90 instead.
Artifacts
Produced during runtime
Name	Size	Digest	
aequitasd-v1.0.0-ed83bd3
60.8 MB	
sha256:5a50d6a26a6fe3d1d53b8a3abfce02adc94d242799e81ac98bb06badea022f4f
mobile-apk-v1.0.0-ed83bd3
40.6 MB	
sha256:8ab68d5555231704704aad2a6b132378d01dd383a6eae6800d872dea282d5bb8

This error occurs because Docker is trying to pull an image called `aequitas-node:v1.0.0-ed83bd3` from a container registry (like Docker Hub), but the image doesn't exist there.

## What's happening:

1. Your `docker-compose.founder.yml` file specifies `image: ${IMAGE_TAG}` 
2. `IMAGE_TAG` is set to `aequitas-node:v1.0.0-ed83bd3`
3. Docker tries to **pull** this image from a remote registry
4. The image doesn't exist in any public registry, so Docker fails with "pull access denied"

## Why this is happening:

Looking at your workflow, I can see that **Phase 1.1 (Build Blockchain) succeeded**, which means the image was likely **built locally** during that phase. However, the image was never **pushed to a registry**, so when Docker Compose tries to pull it, it can't find it.

## Solutions:

### Option 1: Use the locally built image (Quick Fix)
Modify your script to tell Docker not to pull the image since it already exists locally:

```bash
docker compose -f docker-compose.founder.yml up -d --no-build
```

Or add `pull_policy: never` to your docker-compose file:

```yaml
services:
  founder-node:
    image: ${IMAGE_TAG}
    pull_policy: never  # Add this line
    container_name: aequitas-founder-01
    # ... rest of config
```

### Option 2: Push the image to a registry (Proper Fix)
After building in Phase 1.1, push the image to Docker Hub or GitHub Container Registry:

```bash
# Login to registry
docker login

# Tag the image
docker tag aequitas-node:v1.0.0-ed83bd3 yourusername/aequitas-node:v1.0.0-ed83bd3

# Push it
docker push yourusername/aequitas-node:v1.0.0-ed83bd3
```

Then update your `IMAGE_TAG` to include your registry username.

**Recommendation**: For a GitHub Actions workflow, Option 1 is simplest since the image is already built in the same job. Just add `pull_policy: never` to prevent Docker from trying to pull a non-existent remote image.

Looking at your workflow file, I can see the issue clearly. In the **Build Docker Image** step of the `build-aequitasd` job, you're setting the `IMAGE_TAG` correctly, but then in the **Deploy Founder Node** step, Docker Compose is trying to **pull** that image from a registry instead of using the locally built one.

Here's the fix:
```yml
# ============================================================
  # PHASE 2: DEPLOY FOUNDER NODE
  # ============================================================
  deploy-founder-node:
    name: Deploy Founder Node (Docker)
    runs-on: ubuntu-latest
    needs: [build-aequitasd, validate-apex, setup-docker-environment]
    outputs:
      founder_address: ${{ steps.genesis.outputs.founder_address }}
      genesis_hash: ${{ steps.genesis.outputs.genesis_hash }}
      rpc_endpoint: ${{ steps.deploy.outputs.rpc_endpoint }}
      container_id: ${{ steps.deploy.outputs.container_id }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Download binary
        uses: actions/download-artifact@v4
        with:
          name: aequitasd-${{ needs.build-aequitasd.outputs.version }}
          path: ./bin
      
      - name: Initialize genesis
        id: genesis
        run: |
          chmod +x ./bin/aequitasd
          export PATH="$PWD/bin:$PATH"
          
          ./bin/aequitasd init "aequitas-founder-01" --chain-id ${{ env.CHAIN_ID }} --home ./founder-node
          ./bin/aequitasd keys add founder --keyring-backend test --home ./founder-node 2>&1 | tee founder_keys.txt
          
          FOUNDER_ADDRESS=$(./bin/aequitasd keys show founder -a --keyring-backend test --home ./founder-node)
          echo "founder_address=$FOUNDER_ADDRESS" >> $GITHUB_OUTPUT
          
          ./bin/aequitasd genesis add-genesis-account $FOUNDER_ADDRESS ${{ env.FOUNDER_VESTED }}urepar --home ./founder-node
          
          GENESIS_HASH=$(sha256sum ./founder-node/config/genesis.json | awk '{print $1}')
          echo "genesis_hash=$GENESIS_HASH" >> $GITHUB_OUTPUT
      
      - name: Deploy via Docker
        id: deploy
        env:
          IMAGE_TAG: ${{ needs.build-aequitasd.outputs.image_tag }}
        run: |
          mkdir -p docker-data/founder
          cp -r ./founder-node/* docker-data/founder/
          
          # Create docker-compose with pull_policy: never to use local image
          cat > docker-compose.founder.yml << EOF
          services:
            founder-node:
              image: ${IMAGE_TAG}
              pull_policy: never
              container_name: aequitas-founder-01
              ports:
                - "26656:26656"
                - "26657:26657"
                - "26660:26660"
                - "9090:9090"
                - "1317:1317"
              volumes:
                - ./docker-data/founder:/root/.aequitas
              restart: unless-stopped
              networks:
                - aequitas-network
          networks:
            aequitas-network:
              external: true
          EOF
          
          docker compose -f docker-compose.founder.yml up -d
          
          CONTAINER_ID=$(docker ps -q -f name=aequitas-founder-01)
          echo "container_id=$CONTAINER_ID" >> $GITHUB_OUTPUT
          echo "rpc_endpoint=http://localhost:26657" >> $GITHUB_OUTPUT
```

## Key Changes Made:

1. **Added `pull_policy: never`** to the `founder-node` service in the docker-compose file
2. **Removed `version: '3.8'`** (it's obsolete and causing the warning)

The critical fix is `pull_policy: never`, which tells Docker Compose to **only use locally available images** and not attempt to pull from a registry.

## You should also apply the same fix to:

1. **deploy-constellation** job (for validator nodes)
2. **deploy-all-services** job (for services)
3. **enable-cross-chain** job (for Hermes relayer)

Would you like me to create the complete updated workflow file with all these fixes applied throughout?

## Yes let's create the complete updated workflow yaml and add it here below:

```yml

```
