package types

const (
	// ModuleName defines the module name
	ModuleName = "dex"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName
)

// Store key prefixes
var (
	PoolKey             = []byte{0x01} // key for pools
	LiquidityPositionKey = []byte{0x02} // key for liquidity positions
	NextPoolIDKey       = []byte{0x03} // key for next pool ID
)

// GetPoolKey returns the store key for a specific pool
func GetPoolKey(poolID uint64) []byte {
	return append(PoolKey, UintToBytes(poolID)...)
}

// GetLiquidityPositionKey returns the store key for a liquidity position
func GetLiquidityPositionKey(owner string, poolID uint64) []byte {
	return append(append(LiquidityPositionKey, []byte(owner)...), UintToBytes(poolID)...)
}

// GetLiquidityPositionsByOwnerPrefix returns the prefix for all positions of an owner
func GetLiquidityPositionsByOwnerPrefix(owner string) []byte {
	return append(LiquidityPositionKey, []byte(owner)...)
}

// UintToBytes converts uint64 to bytes
func UintToBytes(n uint64) []byte {
	b := make([]byte, 8)
	for i := 0; i < 8; i++ {
		b[i] = byte(n >> (8 * uint(7-i)))
	}
	return b
}
