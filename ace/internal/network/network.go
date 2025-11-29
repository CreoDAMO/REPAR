package network

import (
        "fmt"
        "log"
        "time"
)

type NetworkEngine struct {
        CurrentLayer string
        layers       []string
        failoverEnabled bool
        lastFailover time.Time
        satelliteProtocolActive bool  // ASSP integration
}

func NewNetworkEngine(initialMode string) *NetworkEngine {
        return &NetworkEngine{
                CurrentLayer: initialMode,
                layers:       []string{"internet", "lora", "satellite"},
                failoverEnabled: true,
                lastFailover: time.Now(),
        }
}

func (n *NetworkEngine) AutoFailover(detectedRisk bool) error {
        if !detectedRisk {
                return nil
        }

        currentIndex := n.getCurrentLayerIndex()
        nextIndex := (currentIndex + 1) % len(n.layers)
        nextLayer := n.layers[nextIndex]

        log.Printf("⚠️  Network risk detected! Failing over: %s → %s\n", n.CurrentLayer, nextLayer)

        if err := n.SwitchToLayer(nextLayer); err != nil {
                return fmt.Errorf("failover failed: %w", err)
        }

        n.lastFailover = time.Now()
        log.Printf("✅ Failover successful to %s layer\n", nextLayer)
        return nil
}

func (n *NetworkEngine) SwitchToLayer(layer string) error {
        validLayer := false
        for _, l := range n.layers {
                if l == layer {
                        validLayer = true
                        break
                }
        }

        if !validLayer {
                return fmt.Errorf("invalid network layer: %s", layer)
        }

        n.CurrentLayer = layer
        log.Printf("🌐 Network layer switched to: %s\n", layer)
        return nil
}

func (n *NetworkEngine) GetCurrentLayer() string {
        return n.CurrentLayer
}

func (n *NetworkEngine) getCurrentLayerIndex() int {
        for i, layer := range n.layers {
                if layer == n.CurrentLayer {
                        return i
                }
        }
        return 0
}

func (n *NetworkEngine) GetStatus() map[string]interface{} {
        return map[string]interface{}{
                "current_layer":         n.CurrentLayer,
                "failover_enabled":      n.failoverEnabled,
                "last_failover":         n.lastFailover.Format(time.RFC3339),
                "available_layers":      n.layers,
                "satellite_protocol":    n.satelliteProtocolActive,
        }
}

func (n *NetworkEngine) EnableSatelliteProtocol() {
        n.satelliteProtocolActive = true
        log.Printf("🛰️  Aequitas Satellite Protocol (ASSP) activated\n")
}
