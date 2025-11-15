package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/CreoDAMO/aequitas-cloud-engine/internal/ai"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/governance"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/identity"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/kernel"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/network"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/scheduler"
	"github.com/CreoDAMO/aequitas-cloud-engine/internal/storage"
	"github.com/CreoDAMO/aequitas-cloud-engine/pkg/observability"
	"go.uber.org/zap"
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
	MetricsPort       string
	BlockchainRPC     string
	ChainID           string
	NIMEndpoint       string
	StorageEndpoint   string
	NetworkMode       string
	GovernanceEnabled bool
	LogLevel          string
}

func loadConfig() *ACEConfig {
	return &ACEConfig{
		Port:              getEnv("ACE_PORT", "8080"),
		MetricsPort:       getEnv("ACE_METRICS_PORT", "9090"),
		BlockchainRPC:     getEnv("BLOCKCHAIN_RPC", "http://localhost:26657"),
		ChainID:           getEnv("CHAIN_ID", "aequitas-1"),
		NIMEndpoint:       getEnv("NVIDIA_NIM_ENDPOINT", "http://localhost:8000"),
		StorageEndpoint:   getEnv("STORAGE_ENDPOINT", "http://localhost:5001"),
		NetworkMode:       getEnv("NETWORK_MODE", "internet"),
		GovernanceEnabled: getEnv("GOVERNANCE_ENABLED", "true") == "true",
		LogLevel:          getEnv("LOG_LEVEL", "info"),
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

	obs, err := observability.New(config.LogLevel)
	if err != nil {
		fmt.Printf("❌ Failed to initialize observability: %v\n", err)
		os.Exit(1)
	}
	defer obs.Shutdown()

	logger := obs.Logger
	logger.Info("ACE Control Plane initializing",
		zap.String("version", Version),
		zap.String("blockchain_rpc", config.BlockchainRPC),
		zap.String("chain_id", config.ChainID),
		zap.String("network_mode", config.NetworkMode),
	)

	go func() {
		logger.Info("Starting metrics server", zap.String("port", config.MetricsPort))
		if err := obs.StartMetricsServer(":" + config.MetricsPort); err != nil {
			logger.Fatal("Failed to start metrics server", zap.Error(err))
		}
	}()

	aceKernel := kernel.NewACEKernel(&kernel.Config{
		BlockchainRPC:     config.BlockchainRPC,
		ChainID:           config.ChainID,
		GovernanceEnabled: config.GovernanceEnabled,
	}, logger, obs.Metrics)

	aiScheduler := scheduler.NewAIWorkloadScheduler(config.NIMEndpoint, logger, obs.Metrics)
	identityEngine := identity.NewIdentityEngine(config.BlockchainRPC, config.ChainID, logger)
	networkEngine := network.NewNetworkEngine(config.NetworkMode, logger, obs.Metrics)
	storageEngine := storage.NewSovereignStorage(config.StorageEndpoint, config.BlockchainRPC, logger, obs.Metrics)
	governanceEngine := governance.NewGovernanceEngine(config.BlockchainRPC, logger)
	aiIntegration := ai.NewNIMIntegration(config.NIMEndpoint, logger)

	aceKernel.Initialize(
		aiScheduler,
		identityEngine,
		networkEngine,
		storageEngine,
		governanceEngine,
		aiIntegration,
	)

	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		handleHealth(w, r, logger)
	})
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
		logger.Info("ACE Control Plane ready",
			zap.String("api_port", config.Port),
			zap.String("metrics_port", config.MetricsPort),
			zap.String("nim_endpoint", config.NIMEndpoint),
			zap.String("storage_endpoint", config.StorageEndpoint),
			zap.Bool("governance_enabled", config.GovernanceEnabled),
		)

		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Server error", zap.Error(err))
		}
	}()

	aceKernel.Start()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down ACE Control Plane")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		logger.Error("Server forced to shutdown", zap.Error(err))
	}

	aceKernel.Stop()

	logger.Info("ACE Control Plane stopped gracefully")
}

func handleHealth(w http.ResponseWriter, r *http.Request, logger *zap.Logger) {
	w.Header().Set("Content-Type", "application/json")
	response := fmt.Sprintf(`{"status":"healthy","version":"%s","timestamp":"%s"}`, Version, time.Now().Format(time.RFC3339))
	w.Write([]byte(response))
	
	logger.Debug("Health check requested", zap.String("remote_addr", r.RemoteAddr))
}
