package governance

import (
        "fmt"
        "math"

        "go.uber.org/zap"
)

type GovernanceEngine struct {
        BlockchainRPC string
        basePrices    map[string]float64
        demandFactor  float64
        logger        *zap.Logger
}

func NewGovernanceEngine(blockchainRPC string, logger *zap.Logger) *GovernanceEngine {
        return &GovernanceEngine{
                BlockchainRPC: blockchainRPC,
                basePrices: map[string]float64{
                        "compute":  10.0,
                        "storage":  5.0,
                        "network":  2.0,
                        "ai":       25.0,
                        "quantum":  100.0,
                },
                demandFactor: 1.0,
                logger:       logger,
        }
}

func (g *GovernanceEngine) CalculateResourceCost(resourceType string, durationSeconds int) (float64, error) {
        basePrice, exists := g.basePrices[resourceType]
        if !exists {
                return 0, fmt.Errorf("unknown resource type: %s", resourceType)
        }

        hours := float64(durationSeconds) / 3600.0

        cost := basePrice * hours * g.demandFactor

        stakeDiscount := 0.0

        finalCost := cost * (1.0 - stakeDiscount)

        if g.logger != nil {
                g.logger.Info("Cost calculated", zap.String("type", resourceType), zap.Float64("hours", hours), zap.Float64("final", finalCost))
        }

        return math.Round(finalCost*100) / 100, nil
}

func (g *GovernanceEngine) UpdateDemandFactor(newFactor float64) {
        if newFactor < 0.1 {
                newFactor = 0.1
        }
        if newFactor > 10.0 {
                newFactor = 10.0
        }

        g.demandFactor = newFactor
        if g.logger != nil {
                g.logger.Info("Demand factor updated", zap.Float64("factor", newFactor))
        }
}

func (g *GovernanceEngine) GetPricingTable() map[string]float64 {
        pricing := make(map[string]float64)
        for resourceType, basePrice := range g.basePrices {
                pricing[resourceType] = basePrice * g.demandFactor
        }
        return pricing
}

func (g *GovernanceEngine) RecordGovernanceAction(action string, params map[string]interface{}) error {
        if g.logger != nil {
                g.logger.Info("Governance action recorded", zap.String("action", action))
        }
        return nil
}
