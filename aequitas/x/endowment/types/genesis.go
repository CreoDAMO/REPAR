package types

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: Params{
			LpLockPeriodYears:       10,
			SocialLockPeriodYears:   5,
			TargetApyBps:            500,  // 5%
			LpAllocationBps:         4000, // 40%
			SocialAllocationBps:     4000, // 40%
			CommunityAllocationBps:  2000, // 20%
		},
		Endowments:     []Endowment{},
		Strategies:     []InvestmentStrategy{},
		SocialPrograms: []SocialProgram{},
		NextEndowmentId: 1,
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	// Validate that allocation percentages add up to 10000 (100%)
	total := gs.Params.LpAllocationBps + gs.Params.SocialAllocationBps + gs.Params.CommunityAllocationBps
	if total != 10000 {
		return ErrInvalidAllocation
	}
	
	return nil
}
