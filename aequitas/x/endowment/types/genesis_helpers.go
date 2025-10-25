package types

import "cosmossdk.io/math"

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Endowments:          []Endowment{},
		InvestmentStrategies: []InvestmentStrategy{},
		SocialPrograms:      []SocialProgram{},
		YieldDistributions:  []YieldDistribution{},
		TotalEndowmentValue: math.ZeroInt(),
	}
}

// Validate validates the genesis state
func (gs GenesisState) Validate() error {
	// Add validation logic here
	return nil
}
