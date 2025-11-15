package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/CreoDAMO/aequitas-cloud-engine/internal/kernel"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/scheduler"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/identity"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/network"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/storage"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/governance"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/ai"
)

const (
	Version = "1.0.0"
	Banner  = `
┌─────────────────────────────────────────────────────────────┐
│      AEQUITAS CLOUD ENGINE (ACE) V1 - CONTROL PLANE        │
│                  Sovereign Cloud Orchestration              │
├─────────────────────────────────────────────────────────────┤
│  🧠 AI-Optimized Scheduling  │  🛡️ Zero-Trust Security     │
│  ⚡ Multi-Layer Networking    │  💾 Distributed Storage     │
│  🗳️ $REPAR Governance        │  🔐 Sovereign Identity      │
└─────────────────────────────────────────────────────────────┘
`
)

type ACEConfig struct {
	Port              string
	BlockchainRPC     string
	NIMEndpoint       string
	StorageEndpoint   string
	NetworkMode       string
	GovernanceEnabled bool
}

func loadConfig() *ACEConfig {
	return &ACEConfig{
		Port:              getEnv("ACE_PORT", "8080"),
		BlockchainRPC:     getEnv("BLOCKCHAIN_RPC", "http://localhost:26657"),
		NIMEndpoint:       getEnv("NVIDIA_NIM_ENDPOINT", "http://localhost:8000"),
		StorageEndpoint:   getEnv("STORAGE_ENDPOINT", "http://localhost:5001"),
		NetworkMode:       getEnv("NETWORK_MODE", "internet"),
		GovernanceEnabled: getEnv("GOVERNANCE_ENABLED", "true") == "true",
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func main() {
	fmt.Print(Banner)
	fmt.Printf("ACE Kernel v%s starting...\n\n", Version)

	config := loadConfig()

	aceKernel := kernel.NewACEKernel(&kernel.Config{
		BlockchainRPC:     config.BlockchainRPC,
		GovernanceEnabled: config.GovernanceEnabled,
	})

	aiScheduler := scheduler.NewAIWorkloadScheduler(config.NIMEndpoint)
	
	identityEngine := identity.NewIdentityEngine(config.BlockchainRPC)
	
	networkEngine := network.NewNetworkEngine(config.NetworkMode)
	
	storageEngine := storage.NewSovereignStorage(config.StorageEndpoint, config.BlockchainRPC)
	
	governanceEngine := governance.NewGovernanceEngine(config.BlockchainRPC)
	
	aiIntegration := ai.NewNIMIntegration(config.NIMEndpoint)

	aceKernel.Initialize(
		aiScheduler,
		identityEngine,
		networkEngine,
		storageEngine,
		governanceEngine,
		aiIntegration,
	)

	mux := http.NewServeMux()
	
	mux.HandleFunc("/health", handleHealth)
	mux.HandleFunc("/api/v1/register-node", aceKernel.HandleRegisterNode)
	mux.HandleFunc("/api/v1/schedule-workload", aceKernel.HandleScheduleWorkload)
	mux.HandleFunc("/api/v1/store-evidence", aceKernel.HandleStoreEvidence)
	mux.HandleFunc("/api/v1/governance/pricing", aceKernel.HandleGetPricing)
	mux.HandleFunc("/api/v1/network/status", aceKernel.HandleNetworkStatus)
	mux.HandleFunc("/api/v1/identity/verify", aceKernel.HandleVerifyIdentity)

	server := &http.Server{
		Addr:         ":" + config.Port,
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("✅ ACE Control Plane listening on port %s\n", config.Port)
		log.Printf("📡 Blockchain RPC: %s\n", config.BlockchainRPC)
		log.Printf("🤖 NVIDIA NIM: %s\n", config.NIMEndpoint)
		log.Printf("💾 Storage: %s\n", config.StorageEndpoint)
		log.Printf("🌐 Network Mode: %s\n", config.NetworkMode)
		log.Printf("🗳️ Governance: %v\n\n", config.GovernanceEnabled)
		
		log.Println("🚀 ACE is ready to orchestrate sovereign infrastructure")
		log.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
		
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("❌ Server error: %v\n", err)
		}
	}()

	aceKernel.Start()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("\n🛑 Shutting down ACE Control Plane...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("❌ Server forced to shutdown: %v", err)
	}

	aceKernel.Stop()

	log.Println("✅ ACE Control Plane stopped gracefully")
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status":"healthy","version":"%s","timestamp":"%s"}`, Version, time.Now().Format(time.RFC3339))
}
