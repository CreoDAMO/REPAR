package types

// DefaultParams returns default parameters for the DEX module
func DefaultParams() Params {
	return Params{
		TradingFeeRate: "0.003", // 0.3% trading fee
	}
}

// Validate validates all params
func (p Params) Validate() error {
	return nil
}
