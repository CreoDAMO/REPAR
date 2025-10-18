package types

import "cosmossdk.io/collections"

const (
	ModuleName = "endowment"
	StoreKey   = ModuleName
)

var (
	ParamsKey             = collections.NewPrefix(0)
	EndowmentKey          = collections.NewPrefix(1)
	InvestmentStrategyKey = collections.NewPrefix(2)
	SocialProgramKey      = collections.NewPrefix(3)
	YieldDistributionKey  = collections.NewPrefix(4)
	NextEndowmentIDKey    = collections.NewPrefix(5)
)
