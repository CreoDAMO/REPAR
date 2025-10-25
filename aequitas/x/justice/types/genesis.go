
package types

import (
	"cosmossdk.io/math"
)

// GenesisState defines the justice module's genesis state
type GenesisState struct {
	BurnStatistics     BurnStatistics     `json:"burn_statistics"`
	Burns              []Burn             `json:"burns"`
	ArbitrationMetrics ArbitrationMetrics `json:"arbitration_metrics"`
	Statistics         BurnStatistics     `json:"statistics"` // Alias for compatibility
}

// BurnStatistics tracks total burns
type BurnStatistics struct {
	TotalTokensBurned  string `json:"total_tokens_burned"`
	TotalBurned        string `json:"total_burned"`
	TotalJusticeBurned string `json:"total_justice_burned"`
}

// ArbitrationMetrics tracks arbitration statistics
type ArbitrationMetrics struct {
	TotalCases            uint64 `json:"total_cases"`
	ResolvedCases         uint64 `json:"resolved_cases"`
	PendingCases          uint64 `json:"pending_cases"`
	AverageResolutionTime uint64 `json:"average_resolution_time"`
}

// Burn represents a token burn event
type Burn struct {
	Id        string    `json:"id"`
	Amount    math.Int  `json:"amount"`
	Burner    string    `json:"burner"`
	Reason    string    `json:"reason"`
	Timestamp int64     `json:"timestamp"`
}

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		BurnStatistics: BurnStatistics{
			TotalTokensBurned:  "0",
			TotalBurned:        "0",
			TotalJusticeBurned: "0",
		},
		Burns: []Burn{},
		ArbitrationMetrics: ArbitrationMetrics{
			TotalCases:            0,
			ResolvedCases:         0,
			PendingCases:          0,
			AverageResolutionTime: 0,
		},
		Statistics: BurnStatistics{
			TotalBurned:        "0",
			TotalJusticeBurned: "0",
		},
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	return nil
}

// ValidateGenesis validates the genesis state
func ValidateGenesis(data GenesisState) error {
	return data.Validate()
}
