package types

import (
	"cosmossdk.io/math"
)

func DefaultGenesis() *GenesisState {
	return &GenesisState{
		EndowmentPool: EndowmentPool{
			TotalAllocated:   math.ZeroInt(),
			MonthlyAllowance: math.NewInt(1000000000),
			LastDistribution: 0,
		},
		Allocations: []Allocation{},
	}
}

func (gs GenesisState) Validate() error {
	return nil
}

func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: Params{
			LpLockPeriodYears:       5,
			SocialLockPeriodYears:   10,
			TargetApyBps:            700,
			LpAllocationBps:         3000,
			SocialAllocationBps:     1500,
			CommunityAllocationBps:  5500,
		},
		Endowments:      []Endowment{},
		Strategies:      []InvestmentStrategy{},
		SocialPrograms:  []SocialProgram{},
		NextEndowmentId: 0,
	}
}

func (gs GenesisState) Validate() error {
	if gs.Params.LpAllocationBps+gs.Params.SocialAllocationBps+gs.Params.CommunityAllocationBps != 10000 {
		return ErrInvalidAllocation
	}

	if gs.Params.TargetApyBps == 0 || gs.Params.TargetApyBps > 10000 {
		return ErrInvalidAllocation
	}

	return nil
}

func DefaultParams() Params {
	return Params{
		LpLockPeriodYears:       5,
		SocialLockPeriodYears:   10,
		TargetApyBps:            700,
		LpAllocationBps:         3000,
		SocialAllocationBps:     1500,
		CommunityAllocationBps:  5500,
	}
}
package types

import (
	"cosmossdk.io/math"
)

// GenesisState defines the endowment module's genesis state
type GenesisState struct {
	Params       Params            `json:"params"`
	Allocations  []Allocation      `json:"allocations"`
	Distributions []Distribution   `json:"distributions"`
}

// Allocation represents a fund allocation
type Allocation struct {
	Id          string   `json:"id"`
	Recipient   string   `json:"recipient"`
	Amount      math.Int `json:"amount"`
	Purpose     string   `json:"purpose"`
	Timestamp   int64    `json:"timestamp"`
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
		Allocations:  []Allocation{},
		Distributions: []Distribution{},
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	return nil
}
