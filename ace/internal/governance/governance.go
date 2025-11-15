package governance

import (
	"fmt"
	"log"
	"math"
)

type GovernanceEngine struct {
	BlockchainRPC string
	basePrices    map[string]float64
	demandFactor  float64
}

func NewGovernanceEngine(blockchainRPC string) *GovernanceEngine {
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

	log.Printf("💰 Cost calculated: type=%s, hours=%.2f, base=%.2f, final=%.2f $REPAR\n", 
		resourceType, hours, basePrice, finalCost)

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
	log.Printf("📊 Demand factor updated: %.2f\n", newFactor)
}

func (g *GovernanceEngine) GetPricingTable() map[string]float64 {
	pricing := make(map[string]float64)
	for resourceType, basePrice := range g.basePrices {
		pricing[resourceType] = basePrice * g.demandFactor
	}
	return pricing
}

func (g *GovernanceEngine) RecordGovernanceAction(action string, params map[string]interface{}) error {
	log.Printf("🗳️  Governance action stub: %s with params %v\n", action, params)
	return nil
}
