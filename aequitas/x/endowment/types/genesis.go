package types

import (
	"cosmossdk.io/math"
)

// GenesisState defines the endowment module's genesis state
type GenesisState struct {
	Params        Params         `json:"params"`
	Allocations   []Allocation   `json:"allocations"`
	Distributions []Distribution `json:"distributions"`
}

// Allocation represents a fund allocation
type Allocation struct {
	Id        string   `json:"id"`
	Recipient string   `json:"recipient"`
	Amount    math.Int `json:"amount"`
	Purpose   string   `json:"purpose"`
	Timestamp int64    `json:"timestamp"`
}

// Distribution represents a fund distribution
type Distribution struct {
	Id        string   `json:"id"`
	Amount    math.Int `json:"amount"`
	Recipient string   `json:"recipient"`
	Timestamp int64    `json:"timestamp"`
}

// Params defines the parameters for the endowment module
type Params struct {
	DistributionInterval uint64 `json:"distribution_interval"`
}

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: Params{
			DistributionInterval: 2592000, // 30 days
		},
		Allocations:   []Allocation{},
		Distributions: []Distribution{},
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	return nil
}
