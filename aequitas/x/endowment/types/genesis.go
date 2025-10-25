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
