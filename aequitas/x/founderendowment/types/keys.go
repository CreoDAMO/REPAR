
package types

import "cosmossdk.io/collections"

const (
	ModuleName = "founderendowment"
	StoreKey   = ModuleName
)

var (
	EndowmentKey          = collections.NewPrefix(0)
	DistributionConfigKey = collections.NewPrefix(1)
	ProtocolAllocationKey = collections.NewPrefix(2)
	StatisticsKey         = collections.NewPrefix(3)
	DistributionsKey      = collections.NewPrefix(4)
)
