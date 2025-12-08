package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/aequitas-protocol/ai-autonomous"
)

func main() {
	log.Println("═══════════════════════════════════════════════════════════════")
	log.Println("🤖 AEQUITAS AUTONOMOUS AI AGENT")
	log.Println("═══════════════════════════════════════════════════════════════")

	config := &autonomous.AgentConfig{
		ScanIntervalHours:   24,
		AutoFixEnabled:      true,
		ChaosTestingEnabled: false,
		ThreatThreshold:     "high",
		MaxConcurrentScans:  5,
		NVIDIAModelID:       os.Getenv("NVIDIA_MODEL_ID"),
		SatelliteEnabled:    os.Getenv("SATELLITE_ENABLED") == "true",
	}

	agent, err := autonomous.NewAutonomousAgent(config)
	if err != nil {
		log.Fatalf("Failed to create autonomous agent: %v", err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		log.Println("Shutting down autonomous agent...")
		cancel()
	}()

	log.Println("✅ Autonomous AI Agent starting...")
	if err := agent.Start(ctx); err != nil {
		log.Printf("Agent stopped: %v", err)
	}
}
