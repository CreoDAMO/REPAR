package types

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: Params{
			TradingFeePercent: 250,  // 2.5%
			MinPrice:          "1",
			MaxRoyalty:        1000, // 10%
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
	// Validate params
	if gs.Params.TradingFeePercent > 10000 {
		return ErrInvalidParams
	}
	
	// Validate NFTs
	nftIDs := make(map[string]bool)
	for _, nft := range gs.Nfts {
		if nftIDs[nft.Id] {
			return ErrDuplicateNFT
		}
		nftIDs[nft.Id] = true
	}
	
	// Validate collections
	collectionIDs := make(map[string]bool)
	for _, collection := range gs.Collections {
		if collectionIDs[collection.Id] {
			return ErrDuplicateCollection
		}
		collectionIDs[collection.Id] = true
	}
	
	return nil
}
