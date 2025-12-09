// ═══════════════════════════════════════════════════════════════════════════
// AUTONOMOUS AGENT MAIN ENTRY POINT
// Command-line interface for the Aequitas Autonomous AI Agent
// ═══════════════════════════════════════════════════════════════════════════

package main

import (
        "context"
        "flag"
        "fmt"
        "log"
        "os"
        "os/signal"
        "syscall"

        "github.com/CreoDAMO/REPAR/ai/autonomous"
)

func main() {
        var (
                scanInterval    = flag.Int("interval", 6, "Scan interval in hours")
                autoFix         = flag.Bool("autofix", true, "Enable auto-fix")
                chaosEnabled    = flag.Bool("chaos", true, "Enable chaos engineering")
                threatThreshold = flag.String("threshold", "high", "Minimum threat severity")
                nvidiaModel     = flag.String("model", "aequitas-unified-1.0", "NVIDIA NIM model ID")
        )
        flag.Parse()

        printBanner()

        config := &autonomous.AgentConfig{
                ScanIntervalHours:   *scanInterval,
                AutoFixEnabled:      *autoFix,
                ChaosTestingEnabled: *chaosEnabled,
                ThreatThreshold:     *threatThreshold,
                MaxConcurrentScans:  4,
                NVIDIAModelID:       *nvidiaModel,
        }

        agent, err := autonomous.NewAutonomousAgent(config)
        if err != nil {
                log.Fatalf("Failed to create agent: %v\n", err)
        }

        ctx, cancel := context.WithCancel(context.Background())
        defer cancel()

        sigChan := make(chan os.Signal, 1)
        signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

        go func() {
                <-sigChan
                fmt.Println("\n🛑 Shutting down autonomous agent...")
                cancel()
        }()

        log.Println("Starting agent...")
        if err := agent.Start(ctx); err != nil && err != context.Canceled {
                log.Fatalf("Agent error: %v\n", err)
        }

        log.Println("Agent shutdown complete.")
}

func printBanner() {
        banner := `
═══════════════════════════════════════════════════════════════════════════
    AEQUITAS AUTONOMOUS AI AGENT
═══════════════════════════════════════════════════════════════════════════

    Production-Ready Autonomous Security & Justice Enforcement
    
    Features:
    ✅ Continuous Security Scanning
    ✅ AI-Powered Threat Analysis  
    ✅ Automatic Vulnerability Fixing
    ✅ Chaos Engineering Testing
    ✅ Constitutional Compliance Enforcement
    ✅ Post-Quantum Cryptography
    
    Architecture: Jacque Antoine DeGraff (@JacqueDeGraff)
    License: Constitutional License - Cannot Be Shut Down
    
═══════════════════════════════════════════════════════════════════════════
`
        fmt.Println(banner)
}
