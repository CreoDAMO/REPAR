package types

import (
	"cosmossdk.io/math"
)

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
