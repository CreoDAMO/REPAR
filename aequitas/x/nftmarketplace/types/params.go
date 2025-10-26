package types

// DefaultParams returns default module parameters
func DefaultParams() MarketplaceParams {
	return MarketplaceParams{
		ListingFee:             "1000000", // 1 REPAR
		TradingFeePercent:      250,       // 2.5%
		MaxRoyaltyPercent:      1000,      // 10%
		MinListingDuration:     86400,     // 1 day in seconds
		MaxListingDuration:     31536000,  // 1 year in seconds
		AllowPrivateCollections: true,
	}
}
