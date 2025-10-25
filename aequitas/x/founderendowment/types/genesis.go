package types

import (
	"cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	// 6% of 131T = 7.86T REPAR as principal
	principalAmount := math.NewInt(131_000_000_000_000).MulRaw(6).QuoRaw(100)

	return &GenesisState{
		Endowment: FounderEndowment{
			Id:               "founder_endowment",
			Principal:        principalAmount,
			YieldAccumulated: math.ZeroInt(),
			TargetApyBps:     450, // 4.5%
			LastYieldCalc:    0,
			UnlockTime:       0,
			IsLocked:         true,
			FounderAddress:   "",
			RenewalCount:     0,
		},
		DistributionConfig: DistributionConfig{
			ProtocolPercentage: 90,
			FounderPercentage:  10,
		},
		ProtocolAllocation: ProtocolAllocation{
			DexLiquidityPercentage:     25,
			DaoTreasuryPercentage:      25,
			SocialEndowmentPercentage:  25,
			ValidatorSubsidyPercentage: 15,
		},
		Statistics: EndowmentStats{
			TotalPrincipal:        principalAmount,
			TotalYieldDistributed: math.ZeroInt(),
			TotalFounderDividends: math.ZeroInt(),
			TotalProtocolFunding:  math.ZeroInt(),
			DistributionCount:     0,
		},
		Distributions: []YieldDistribution{},
	}
}

// Validate performs basic genesis state validation returning an error upon any failure
func (gs GenesisState) Validate() error {
	// Validate endowment
	if gs.Endowment.Principal.IsZero() || gs.Endowment.Principal.IsNegative() {
		return ErrInvalidPrincipal
	}

	if gs.Endowment.TargetApyBps == 0 || gs.Endowment.TargetApyBps > 10000 {
		return ErrInvalidAPY
	}

	// Validate distribution config
	if gs.DistributionConfig.ProtocolPercentage+gs.DistributionConfig.FounderPercentage != 100 {
		return ErrInvalidDistribution
	}

	// Validate protocol allocation (should sum to 90%)
	totalProtocol := gs.ProtocolAllocation.DexLiquidityPercentage +
		gs.ProtocolAllocation.DaoTreasuryPercentage +
		gs.ProtocolAllocation.SocialEndowmentPercentage +
		gs.ProtocolAllocation.ValidatorSubsidyPercentage

	if totalProtocol != 90 {
		return ErrInvalidProtocolAllocation
	}

	return nil
}
package types

import (
	"cosmossdk.io/math"
)

// GenesisState defines the founderendowment module's genesis state
type GenesisState struct {
	Params        Params          `json:"params"`
	Endowments    []Endowment     `json:"endowments"`
	Distributions []Distribution  `json:"distributions"`
}

// Endowment represents a founder endowment
type Endowment struct {
	Id          string   `json:"id"`
	Founder     string   `json:"founder"`
	Amount      math.Int `json:"amount"`
	VestingEnd  int64    `json:"vesting_end"`
	Timestamp   int64    `json:"timestamp"`
}

// Distribution represents an endowment distribution
type Distribution struct {
	Id        string   `json:"id"`
	Amount    math.Int `json:"amount"`
	Recipient string   `json:"recipient"`
	Timestamp int64    `json:"timestamp"`
}

// Params defines the parameters for the founderendowment module
type Params struct {
	VestingPeriod uint64 `json:"vesting_period"`
}

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: Params{
			VestingPeriod: 31536000, // 1 year
		},
		Endowments:    []Endowment{},
		Distributions: []Distribution{},
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	return nil
}
