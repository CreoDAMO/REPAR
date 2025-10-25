
package types

import "cosmossdk.io/math"

// SubsidyPool represents the validator subsidy pool state
type SubsidyPool struct {
	TotalAllocated   math.Int
	MonthlyBudget    math.Int
	EmergencyReserve math.Int
	LastDistribution int64
}
