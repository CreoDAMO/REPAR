package network

import (
        "fmt"
        "log"
        "sync"
        "time"
)

type SatelliteType string

const (
        SatelliteTypeLEO   SatelliteType = "leo"
        SatelliteTypeMEO   SatelliteType = "meo"
        SatelliteTypeGEO   SatelliteType = "geo"
        SatelliteTypeVirtual SatelliteType = "virtual"
        SatelliteTypeMobile SatelliteType = "mobile"
)

type RouteMetrics struct {
        Latency         time.Duration
        PacketLoss      float64
        Bandwidth       int64
        LastUpdated     time.Time
        ConsecutiveFailures int
}

type SatelliteRoute struct {
        ID              string
        Type            SatelliteType
        Endpoint        string
        Priority        int
        Active          bool
        Metrics         RouteMetrics
        GeoRegion       string
}

type NetworkEngine struct {
        CurrentLayer            string
        layers                  []string
        failoverEnabled         bool
        lastFailover            time.Time
        satelliteProtocolActive bool
        
        satelliteRoutes         map[string]*SatelliteRoute
        routesMutex             sync.RWMutex
        
        multiLayerEnabled       bool
        geoRedundancyEnabled    bool
        latencyOptimization     bool
        
        routingStats            *RoutingStats
}

type RoutingStats struct {
        TotalPacketsRouted      int64
        FailoverCount           int
        AverageLatencyMs        float64
        PacketLossRate          float64
        ActiveRoutes            int
        LastStatUpdate          time.Time
}

func NewNetworkEngine(initialMode string) *NetworkEngine {
        return &NetworkEngine{
                CurrentLayer:            initialMode,
                layers:                  []string{"internet", "lora", "satellite", "mesh", "quantum"},
                failoverEnabled:         true,
                lastFailover:            time.Now(),
                satelliteRoutes:         make(map[string]*SatelliteRoute),
                multiLayerEnabled:       true,
                geoRedundancyEnabled:    true,
                latencyOptimization:     true,
                routingStats:            &RoutingStats{LastStatUpdate: time.Now()},
        }
}

func (n *NetworkEngine) RegisterSatelliteRoute(route *SatelliteRoute) error {
        n.routesMutex.Lock()
        defer n.routesMutex.Unlock()
        
        if route.ID == "" {
                return fmt.Errorf("route ID cannot be empty")
        }
        
        route.Active = true
        route.Metrics.LastUpdated = time.Now()
        n.satelliteRoutes[route.ID] = route
        
        log.Printf("🛰️  Registered satellite route: %s (%s) in region %s\n", 
                route.ID, route.Type, route.GeoRegion)
        
        return nil
}

func (n *NetworkEngine) SelectOptimalRoute(targetRegion string) (*SatelliteRoute, error) {
        n.routesMutex.RLock()
        defer n.routesMutex.RUnlock()
        
        var candidates []*SatelliteRoute
        
        for _, route := range n.satelliteRoutes {
                if !route.Active {
                        continue
                }
                
                if n.geoRedundancyEnabled && targetRegion != "" && route.GeoRegion == targetRegion {
                        candidates = append(candidates, route)
                } else if targetRegion == "" {
                        candidates = append(candidates, route)
                }
        }
        
        if len(candidates) == 0 {
                for _, route := range n.satelliteRoutes {
                        if route.Active {
                                candidates = append(candidates, route)
                        }
                }
        }
        
        if len(candidates) == 0 {
                return nil, fmt.Errorf("no active satellite routes available")
        }
        
        var best *SatelliteRoute
        var bestScore float64 = -1
        
        for _, route := range candidates {
                score := n.calculateRouteScore(route)
                if score > bestScore {
                        bestScore = score
                        best = route
                }
        }
        
        return best, nil
}

func (n *NetworkEngine) calculateRouteScore(route *SatelliteRoute) float64 {
        score := 100.0
        
        if n.latencyOptimization {
                latencyMs := float64(route.Metrics.Latency.Milliseconds())
                if latencyMs > 0 {
                        score -= latencyMs / 10
                }
        }
        
        score -= route.Metrics.PacketLoss * 100
        
        score -= float64(route.Metrics.ConsecutiveFailures) * 20
        
        score += float64(10 - route.Priority)
        
        return score
}

func (n *NetworkEngine) RoutePacket(packet []byte, targetRegion string) error {
        route, err := n.SelectOptimalRoute(targetRegion)
        if err != nil {
                return n.handleRoutingFailure(packet, err)
        }
        
        log.Printf("📡 Routing packet via %s (%s)\n", route.ID, route.Type)
        
        n.routingStats.TotalPacketsRouted++
        n.routingStats.LastStatUpdate = time.Now()
        
        return nil
}

func (n *NetworkEngine) handleRoutingFailure(packet []byte, originalErr error) error {
        log.Printf("⚠️  Primary routing failed: %v, attempting failover\n", originalErr)
        
        n.routesMutex.RLock()
        defer n.routesMutex.RUnlock()
        
        for _, route := range n.satelliteRoutes {
                if route.Active && route.Metrics.ConsecutiveFailures < 3 {
                        log.Printf("🔄 Failover to route: %s\n", route.ID)
                        n.routingStats.FailoverCount++
                        return nil
                }
        }
        
        return fmt.Errorf("all routes exhausted: %w", originalErr)
}

func (n *NetworkEngine) UpdateRouteMetrics(routeID string, metrics RouteMetrics) error {
        n.routesMutex.Lock()
        defer n.routesMutex.Unlock()
        
        route, exists := n.satelliteRoutes[routeID]
        if !exists {
                return fmt.Errorf("route not found: %s", routeID)
        }
        
        route.Metrics = metrics
        route.Metrics.LastUpdated = time.Now()
        
        if metrics.ConsecutiveFailures >= 5 {
                route.Active = false
                log.Printf("❌ Route %s marked inactive due to failures\n", routeID)
        }
        
        return nil
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
        n.routingStats.FailoverCount++
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
        n.routesMutex.RLock()
        activeRoutes := 0
        for _, route := range n.satelliteRoutes {
                if route.Active {
                        activeRoutes++
                }
        }
        n.routesMutex.RUnlock()
        
        return map[string]interface{}{
                "current_layer":           n.CurrentLayer,
                "failover_enabled":        n.failoverEnabled,
                "last_failover":           n.lastFailover.Format(time.RFC3339),
                "available_layers":        n.layers,
                "satellite_protocol":      n.satelliteProtocolActive,
                "multi_layer_enabled":     n.multiLayerEnabled,
                "geo_redundancy_enabled":  n.geoRedundancyEnabled,
                "latency_optimization":    n.latencyOptimization,
                "active_satellite_routes": activeRoutes,
                "total_packets_routed":    n.routingStats.TotalPacketsRouted,
                "failover_count":          n.routingStats.FailoverCount,
        }
}

func (n *NetworkEngine) EnableSatelliteProtocol() {
        n.satelliteProtocolActive = true
        log.Printf("🛰️  Aequitas Satellite Protocol (ASSP) activated\n")
}

func (n *NetworkEngine) EnableMultiLayerRouting() {
        n.multiLayerEnabled = true
        log.Printf("🌐 Multi-layer routing enabled\n")
}

func (n *NetworkEngine) EnableGeoRedundancy() {
        n.geoRedundancyEnabled = true
        log.Printf("🌍 Geo-redundancy enabled\n")
}

func (n *NetworkEngine) EnableLatencyOptimization() {
        n.latencyOptimization = true
        log.Printf("⚡ Latency optimization enabled\n")
}

func (n *NetworkEngine) GetRoutingStats() *RoutingStats {
        return n.routingStats
}

func (n *NetworkEngine) GetAllRoutes() []*SatelliteRoute {
        n.routesMutex.RLock()
        defer n.routesMutex.RUnlock()
        
        routes := make([]*SatelliteRoute, 0, len(n.satelliteRoutes))
        for _, route := range n.satelliteRoutes {
                routes = append(routes, route)
        }
        return routes
}
