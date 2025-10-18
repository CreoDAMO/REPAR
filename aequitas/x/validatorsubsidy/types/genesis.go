package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: DefaultParams(),
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

	// Validate parameters
	if err := gs.Params.Validate(); err != nil {
		return err
	}
	return nil
}

// DefaultParams returns default module parameters
func DefaultParams() Params {
	return Params{
		SubsidyAmount:    6456000000, // $6,456 USDC in micro units
		OperatorAddress:  "", // Set in genesis
		DistributionInterval: 2592000, // 30 days in seconds
	}
}

// Validate validates parameters
func (p Params) Validate() error {
	if p.SubsidyAmount <= 0 {
		return ErrInvalidSubsidyAmount
	}
	if p.OperatorAddress != "" {
		if _, err := sdk.AccAddressFromBech32(p.OperatorAddress); err != nil {
			return ErrInvalidOperatorAddress
		}
	}
	if p.DistributionInterval <= 0 {
		return ErrInvalidDistributionInterval
	}
	return nil
}

// LastDistribution tracks the last subsidy payment time
type LastDistribution struct {
	Time sdk.Time
}