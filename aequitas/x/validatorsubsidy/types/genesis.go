package types

import (
	"cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Pool: ValidatorSubsidyPool{
			TotalAllocated:   math.ZeroInt(),
			MonthlyBudget:    math.NewInt(1000000000000), // 1M REPAR
			EmergencyReserve: math.NewInt(500000000000),  // 500K REPAR
			LastDistribution: 0,
		},
		Validators: []ValidatorSubsidyRecord{},
		Payments:   []SubsidyPayment{},
		Schedule: SubsidyDistributionSchedule{
			DistributionIntervalSeconds: 2592000, // 30 days
			NextDistribution:            0,
			AutoDistribute:              true,
			MinValidatorUptimePercent:   "95.0",
		},
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	// Validate pool
	if gs.Pool.MonthlyBudget.IsNegative() {
		return ErrInvalidAmount
	}
	if gs.Pool.EmergencyReserve.IsNegative() {
		return ErrInvalidAmount
	}

	// Validate validators
	validatorAddrs := make(map[string]bool)
	for _, val := range gs.Validators {
		if validatorAddrs[val.ValidatorAddress] {
			return ErrAlreadyRegistered
		}
		validatorAddrs[val.ValidatorAddress] = true

		if val.MonthlyAllocation.IsNegative() {
			return ErrInvalidAmount
		}
		if val.TotalReceived.IsNegative() {
			return ErrInvalidAmount
		}
	}

	// Validate schedule
	if gs.Schedule.DistributionIntervalSeconds <= 0 {
		return ErrInvalidAmount
	}

	return nil
}
