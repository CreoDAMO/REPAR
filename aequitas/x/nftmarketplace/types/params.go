package types

// DefaultParams returns default module parameters
func DefaultParams() MarketplaceParams {
        return MarketplaceParams{
                MarketplaceFeePercentage: 250,      // 2.5%
                FeeCollector:             "",       // Will be set to ecosystem treasury
                MaxRoyaltyPercentage:     1000,     // 10%
                MinListingDuration:       86400,    // 1 day in seconds
                MaxListingDuration:       31536000, // 1 year in seconds
                CertificationRequired:    true,     // Require certification for evidence NFTs
        }
}
