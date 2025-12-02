package kernel

import (
        "encoding/json"
        "fmt"
        "net/http"
        "sync"

        "github.com/CreoDAMO/aequitas-cloud-engine/pkg/observability"
        "go.uber.org/zap"
)

type Config struct {
        BlockchainRPC     string
        ChainID           string
        GovernanceEnabled bool
}

type Resource struct {
        ID       string
        Type     string
        Capacity int64
        Used     int64
        NodeID   string
}

type ACEKernel struct {
        config           *Config
        logger           *zap.Logger
        metrics          *observability.Metrics
        resourcePool     map[string]*Resource
        identityEngine   IdentityEngine
        scheduler        Scheduler
        consensusEngine  ConsensusEngine
        networkEngine    NetworkEngine
        storageEngine    StorageEngine
        governanceEngine GovernanceEngine
        aiIntegration    AIIntegration
        mu               sync.RWMutex
        running          bool
}

type IdentityEngine interface {
        VerifyDID(did string) (bool, error)
        GenerateSovereignIdentity() (string, error)
}

type Scheduler interface {
        PredictOptimalNode(request interface{}, userStake int64) (string, error)
}

type ConsensusEngine interface {
        RecordAllocation(userDID string, resourceID string) error
}

type NetworkEngine interface {
        AutoFailover(detectedRisk bool) error
        GetCurrentLayer() string
}

type StorageEngine interface {
        StoreEvidence(data []byte, metadata string) (string, error)
}

type GovernanceEngine interface {
        CalculateResourceCost(resourceType string, duration int) (float64, error)
}

type AIIntegration interface {
        InitializeLocalAI() error
        GetModelStatus() map[string]string
}

type WorkloadRequest struct {
        Type     string `json:"type"`
        UserDID  string `json:"user_did"`
        Resources map[string]int64 `json:"resources"`
        Priority int    `json:"priority"`
}

type NodeRegistration struct {
        Identity string            `json:"identity"`
        Hardware string            `json:"hardware"`
        Stake    int64             `json:"stake"`
        Metadata map[string]string `json:"metadata"`
}

func NewACEKernel(config *Config, logger *zap.Logger, metrics *observability.Metrics) *ACEKernel {
        return &ACEKernel{
                config:       config,
                logger:       logger,
                metrics:      metrics,
                resourcePool: make(map[string]*Resource),
                running:      false,
        }
}

func (k *ACEKernel) Initialize(
        scheduler Scheduler,
        identity IdentityEngine,
        network NetworkEngine,
        storage StorageEngine,
        governance GovernanceEngine,
        ai AIIntegration,
) {
        k.scheduler = scheduler
        k.identityEngine = identity
        k.networkEngine = network
        k.storageEngine = storage
        k.governanceEngine = governance
        k.aiIntegration = ai

        if k.logger != nil {
                k.logger.Info("ACE Kernel initialized with all subsystems")
        }
}

func (k *ACEKernel) Start() {
        k.mu.Lock()
        defer k.mu.Unlock()
        
        k.running = true
        
        if err := k.aiIntegration.InitializeLocalAI(); err != nil {
                if k.logger != nil {
                        k.logger.Warn("AI integration not available", zap.Error(err))
                }
        }
        
        if k.logger != nil {
                k.logger.Info("ACE Kernel control plane started")
        }
}

func (k *ACEKernel) Stop() {
        k.mu.Lock()
        defer k.mu.Unlock()
        
        k.running = false
        if k.logger != nil {
                k.logger.Info("ACE Kernel control plane stopped")
        }
}

func (k *ACEKernel) AllocateWithConsensus(userDID string, request WorkloadRequest) error {
        verified, err := k.identityEngine.VerifyDID(userDID)
        if err != nil {
                return fmt.Errorf("identity verification failed: %w", err)
        }
        if !verified {
                return fmt.Errorf("invalid or unverified sovereign identity")
        }

        userStake := int64(1000)
        
        nodeID, err := k.scheduler.PredictOptimalNode(request, userStake)
        if err != nil {
                return fmt.Errorf("scheduling failed: %w", err)
        }

        if k.logger != nil {
                k.logger.Info("Allocated workload", zap.String("userDID", userDID), zap.String("nodeID", nodeID))
        }
        return nil
}

func (k *ACEKernel) HandleRegisterNode(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        var reg NodeRegistration
        if err := json.NewDecoder(r.Body).Decode(&reg); err != nil {
                http.Error(w, "Invalid request body", http.StatusBadRequest)
                return
        }

        verified, err := k.identityEngine.VerifyDID(reg.Identity)
        if err != nil || !verified {
                http.Error(w, "Identity verification failed", http.StatusUnauthorized)
                return
        }

        k.mu.Lock()
        resourceID := fmt.Sprintf("node-%s", reg.Identity)
        k.resourcePool[resourceID] = &Resource{
                ID:       resourceID,
                Type:     reg.Hardware,
                Capacity: 100,
                Used:     0,
                NodeID:   reg.Identity,
        }
        k.mu.Unlock()

        if k.logger != nil {
                k.logger.Info("Node registered", zap.String("identity", reg.Identity), zap.String("hardware", reg.Hardware), zap.Int64("stake", reg.Stake))
        }

        response := map[string]interface{}{
                "status":      "registered",
                "node_id":     resourceID,
                "identity":    reg.Identity,
                "hardware":    reg.Hardware,
                "network_mode": k.networkEngine.GetCurrentLayer(),
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func (k *ACEKernel) HandleScheduleWorkload(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        var request WorkloadRequest
        if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
                http.Error(w, "Invalid request body", http.StatusBadRequest)
                return
        }

        if err := k.AllocateWithConsensus(request.UserDID, request); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
        }

        cost, _ := k.governanceEngine.CalculateResourceCost(request.Type, 3600)

        response := map[string]interface{}{
                "status":        "scheduled",
                "workload_type": request.Type,
                "user_did":      request.UserDID,
                "cost_repar":    cost,
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func (k *ACEKernel) HandleStoreEvidence(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

        var req struct {
                Data     string `json:"data"`
                UserDID  string `json:"user_did"`
                Metadata string `json:"metadata"`
        }

        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
                http.Error(w, "Invalid request body", http.StatusBadRequest)
                return
        }

        hash, err := k.storageEngine.StoreEvidence([]byte(req.Data), req.Metadata)
        if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
        }

        response := map[string]interface{}{
                "status":        "stored",
                "evidence_hash": hash,
                "blockchain_anchored": true,
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func (k *ACEKernel) HandleGetPricing(w http.ResponseWriter, r *http.Request) {
        resourceType := r.URL.Query().Get("resource_type")
        if resourceType == "" {
                resourceType = "compute"
        }

        cost, _ := k.governanceEngine.CalculateResourceCost(resourceType, 3600)

        response := map[string]interface{}{
                "resource_type": resourceType,
                "cost_per_hour": cost,
                "currency":      "$REPAR",
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func (k *ACEKernel) HandleNetworkStatus(w http.ResponseWriter, r *http.Request) {
        response := map[string]interface{}{
                "current_layer": k.networkEngine.GetCurrentLayer(),
                "failover_ready": true,
                "layers_available": []string{"internet", "lora", "satellite"},
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}

func (k *ACEKernel) HandleVerifyIdentity(w http.ResponseWriter, r *http.Request) {
        did := r.URL.Query().Get("did")
        if did == "" {
                http.Error(w, "DID parameter required", http.StatusBadRequest)
                return
        }

        verified, err := k.identityEngine.VerifyDID(did)
        if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
        }

        response := map[string]interface{}{
                "did":      did,
                "verified": verified,
                "sovereign_identity": verified,
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
}
