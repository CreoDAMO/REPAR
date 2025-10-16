package types

import "cosmossdk.io/collections"

const (
	// ModuleName defines the module name
	ModuleName = "dex"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName
)

var (
	ParamsKey       = collections.NewPrefix(0)
	OrderBookKey    = collections.NewPrefix(1)
	OrderKey        = collections.NewPrefix(2)
	NextOrderIDKey  = collections.NewPrefix(3)
)

// GetPairID returns a unique identifier for a trading pair
func GetPairID(baseDenom, quoteDenom string) string {
	return baseDenom + "/" + quoteDenom
}