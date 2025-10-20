package types

import (
	"cosmossdk.io/math"
)

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: MarketplaceParams{
			MarketplaceFeePercentage: 250,  // 2.5%
			FeeCollector:             "",   // Will be set to ecosystem treasury
			MaxRoyaltyPercentage:     1000, // 10%
			MinListingDuration:       3600, // 1 hour
			MaxListingDuration:       7776000, // 90 days
			CertificationRequired:    true,
		},
		Nfts:             []NFT{},
		Collections:      []Collection{},
		Listings:         []Listing{},
		Sales:            []Sale{},
		NextNftId:        1,
		NextCollectionId: 1,
		NextListingId:    1,
		NextSaleId:       1,
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	return nil
}
