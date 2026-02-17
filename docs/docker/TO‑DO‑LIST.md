# **TO‑DO‑LIST.md**  
### **Full Containerization, Publishing & Deployment Roadmap for REPAR / Aequitas**

This document outlines every required step to ensure the entire Aequitas sovereign infrastructure is fully containerized, versioned, and reproducible via Docker Hub and GitHub Actions.

---

## **1. Expand Containerization (One Dockerfile Per Service)**  
Each service must have its own Dockerfile.  
Create or verify Dockerfiles for:

> **Note:** Go services that share the root `go.mod` must be built from the repo root using `-f`:  
> `docker build -f <path>/Dockerfile .`

### **Core Blockchain**
- [x] `./Dockerfile` → Blockchain node (`aequitasd`)

### **Backend Services**
- [x] `./backend/Dockerfile` → Backend API (Node.js)
- [x] `./auditor/Dockerfile` → Cerberus Security Auditor (Python)
- [x] `./cmd/autonomous-agent/Dockerfile` → Autonomous AI Agent (Go) — build from repo root: `docker build -f cmd/autonomous-agent/Dockerfile .`
- [x] `./aequitas/adns-server/Dockerfile` → ADNS Post‑Quantum DNS Server (Go) — build from repo root: `docker build -f aequitas/adns-server/Dockerfile .`
- [x] `./ace/deployments/docker/Dockerfile` → ACE Kernel (Go)
- [x] `./ace/deployments/docker/Dockerfile.sidecar` → ACE AI Sidecar
- [x] `./vm-infrastructure/docker/Dockerfile` → Sovereign VM / Zone VM

### **Frontend Services**
- [x] `./frontend/Dockerfile` → Web App (Vite/React)
- [x] `./dexplorer/Dockerfile` → Block Explorer (Node.js)

### **Optional**
- [ ] `./mobile/Dockerfile` → APK builder (Expo/React Native — typically built via EAS Build, not Docker)

---

## **2. Create Docker Hub Repositories for Each Service**
For each service above, create a corresponding Docker Hub repo:

- [ ] `creodamo/repar` (exists)
- [ ] `creodamo/backend`
- [ ] `creodamo/frontend`
- [ ] `creodamo/explorer`
- [ ] `creodamo/auditor`
- [ ] `creodamo/autonomous-agent`
- [ ] `creodamo/adns-server`
- [ ] `creodamo/ace-kernel`
- [ ] `creodamo/vm`

---

## **3. Expand GitHub Actions Workflow to Build & Push ALL Images**
Update your workflow to:

### **Build**
- [ ] Build each service using its Dockerfile  
- [ ] Tag each image with `latest` and commit SHA  
- [ ] Use build caching for speed

### **Push**
- [ ] Push each image to Docker Hub  
- [ ] Push both `latest` and versioned tags  
- [ ] Ensure `DOCKER_PAT` is used for authentication  

### **Permissions**
- [ ] Ensure workflow has `packages: write`  
- [ ] Ensure workflow has `contents: read`  
- [ ] Ensure workflow has `id-token: write`

---

## **4. Update docker-compose.yml to Pull from Docker Hub**
Replace local builds with Docker Hub images:

- [ ] Replace `build: ./backend` → `image: creodamo/backend:latest`
- [ ] Replace `build: ./frontend` → `image: creodamo/frontend:latest`
- [ ] Replace `build: ./dexplorer` → `image: creodamo/explorer:latest`
- [ ] Replace `build: ./auditor` → `image: creodamo/auditor:latest`
- [ ] Replace autonomous-agent → `image: creodamo/autonomous-agent:latest`
- [ ] Replace adns-server → `image: creodamo/adns-server:latest`
- [ ] Replace ace → `image: creodamo/ace-kernel:latest`
- [ ] Replace vm-infrastructure → `image: creodamo/vm:latest`

This makes your entire constellation **portable** and **reproducible**.

---

## **5. Versioning & Release Strategy**
Implement:

- [ ] Semantic versioning (`v1.0.0`, `v1.0.1`, etc.)
- [ ] Git tags trigger image builds
- [ ] Multi‑arch builds (amd64 + arm64)
- [ ] Automated changelog generation

---

## **6. Validate Images**
For each image:

- [ ] Run container locally  
- [ ] Verify entrypoint  
- [ ] Verify exposed ports  
- [ ] Verify environment variables  
- [ ] Verify healthchecks  
- [ ] Verify logs  

---

## **7. Publish Documentation**
Create or update:

- [ ] `README.md` with image usage  
- [ ] `docker-compose.example.yml`  
- [ ] Architecture diagram  
- [ ] Service dependency graph  
- [ ] Deployment instructions  

---

## **8. Optional Enhancements**
- [ ] Add GitHub Container Registry (GHCR) as a mirror  
- [ ] Add vulnerability scanning (Trivy)  
- [ ] Add SBOM generation (Syft)  
- [ ] Add automated tests for each service  
- [ ] Add CI/CD badges to README  

---

## **9. Final Goal**
A fully reproducible, multi‑image, sovereign blockchain constellation where:

- Every service has its own Dockerfile  
- Every service is published to Docker Hub  
- GitHub Actions builds and pushes everything  
- docker‑compose pulls everything from Docker Hub  
- Anyone can deploy the entire network with one command:  

```
docker compose up -d
```

---

## **Dockerfile Inventory (Correct Paths)**

| Service | Dockerfile Path | Language | Build Context |
|---|---|---|---|
| Blockchain Node | `./Dockerfile` | Go (Cosmos SDK) | `.` |
| Backend API | `./backend/Dockerfile` | Node.js | `./backend` |
| Cerberus Auditor | `./auditor/Dockerfile` | Python | `./auditor` |
| Autonomous Agent | `./cmd/autonomous-agent/Dockerfile` | Go | `.` (repo root) |
| ADNS Server | `./aequitas/adns-server/Dockerfile` | Go | `.` (repo root) |
| ACE Kernel | `./ace/deployments/docker/Dockerfile` | Go | `./ace` |
| ACE Sidecar | `./ace/deployments/docker/Dockerfile.sidecar` | Go | `./ace` |
| Sovereign VM | `./vm-infrastructure/docker/Dockerfile` | Go | `.` (repo root) |
| Frontend | `./frontend/Dockerfile` | Node.js (Vite/React) | `./frontend` |
| Block Explorer | `./dexplorer/Dockerfile` | Node.js | `./dexplorer` |
