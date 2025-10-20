package keeper

import (
	"context"

	"github.com/aequitas/aequitas/x/nftmarketplace/types"
)

// InitGenesis initializes the module's state from a genesis state
func (k Keeper) InitGenesis(ctx context.Context, data *types.GenesisState) error {
	// Set params
	if err := k.Params.Set(ctx, data.Params); err != nil {
		return err
	}

	// Set NFTs
	for _, nft := range data.Nfts {
		if err := k.NFTs.Set(ctx, nft.Id, nft); err != nil {
			return err
		}
	}

	// Set collections
	for _, collection := range data.Collections {
		if err := k.Collections.Set(ctx, collection.Id, collection); err != nil {
			return err
		}
	}

	// Set listings
	for _, listing := range data.Listings {
		if err := k.Listings.Set(ctx, listing.Id, listing); err != nil {
			return err
		}
	}

	// Set sales
	for _, sale := range data.Sales {
		if err := k.Sales.Set(ctx, sale.Id, sale); err != nil {
			return err
		}
	}

	return nil
}

// ExportGenesis exports the module's state to a genesis state
func (k Keeper) ExportGenesis(ctx context.Context) (*types.GenesisState, error) {
	params, err := k.Params.Get(ctx)
	if err != nil {
		return nil, err
	}

	var nfts []types.NFT
	var collections []types.Collection
	var listings []types.Listing
	var sales []types.Sale

	// Get all NFTs
	_ = k.NFTs.Walk(ctx, nil, func(key string, value types.NFT) (bool, error) {
		nfts = append(nfts, value)
		return false, nil
	})

	// Get all collections
	_ = k.Collections.Walk(ctx, nil, func(key string, value types.Collection) (bool, error) {
		collections = append(collections, value)
		return false, nil
	})

	// Get all listings
	_ = k.Listings.Walk(ctx, nil, func(key string, value types.Listing) (bool, error) {
		listings = append(listings, value)
		return false, nil
	})

	// Get all sales
	_ = k.Sales.Walk(ctx, nil, func(key string, value types.Sale) (bool, error) {
		sales = append(sales, value)
		return false, nil
	})

	nextNFTID, _ := k.NextNFTID.Peek(ctx)
	nextCollectionID, _ := k.NextCollectionID.Peek(ctx)
	nextListingID, _ := k.NextListingID.Peek(ctx)
	nextSaleID, _ := k.NextSaleID.Peek(ctx)

	return &types.GenesisState{
		Params:           params,
		Nfts:             nfts,
		Collections:      collections,
		Listings:         listings,
		Sales:            sales,
		NextNftId:        nextNFTID,
		NextCollectionId: nextCollectionID,
		NextListingId:    nextListingID,
		NextSaleId:       nextSaleID,
	}, nil
}
