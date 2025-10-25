package keeper

import (
        "context"

        "github.com/CreoDAMO/REPAR/aequitas/x/nftmarketplace/types"
)

type queryServer struct {
        Keeper
}

// NewQueryServerImpl returns an implementation of the QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
        return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

// NFT queries a specific NFT by ID
func (q queryServer) NFT(ctx context.Context, req *types.QueryNFTRequest) (*types.QueryNFTResponse, error) {
        nft, err := q.Keeper.NFTs.Get(ctx, req.Id)
        if err != nil {
                return nil, types.ErrNFTNotFound
        }

        return &types.QueryNFTResponse{Nft: nft}, nil
}

// NFTs queries all NFTs with pagination
func (q queryServer) NFTs(ctx context.Context, req *types.QueryNFTsRequest) (*types.QueryNFTsResponse, error) {
        var nfts []types.NFT

        // Iterate through all NFTs
        err := q.Keeper.NFTs.Walk(ctx, nil, func(key string, value types.NFT) (bool, error) {
                // Apply filters if provided
                if req.Category != types.NFTCategory_NFT_CATEGORY_UNSPECIFIED && value.Category != req.Category {
                        return false, nil
                }
                if req.Owner != "" && value.Owner != req.Owner {
                        return false, nil
                }
                nfts = append(nfts, value)
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryNFTsResponse{Nfts: nfts}, nil
}

// NFTsByOwner queries all NFTs owned by a specific address
func (q queryServer) NFTsByOwner(ctx context.Context, req *types.QueryNFTsByOwnerRequest) (*types.QueryNFTsByOwnerResponse, error) {
        var nfts []types.NFT

        err := q.Keeper.NFTs.Walk(ctx, nil, func(key string, value types.NFT) (bool, error) {
                if value.Owner == req.Owner {
                        nfts = append(nfts, value)
                }
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryNFTsByOwnerResponse{Nfts: nfts}, nil
}

// NFTsByCollection queries all NFTs in a collection
func (q queryServer) NFTsByCollection(ctx context.Context, req *types.QueryNFTsByCollectionRequest) (*types.QueryNFTsByCollectionResponse, error) {
        var nfts []types.NFT

        err := q.Keeper.NFTs.Walk(ctx, nil, func(key string, value types.NFT) (bool, error) {
                if value.CollectionId == req.CollectionId {
                        nfts = append(nfts, value)
                }
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryNFTsByCollectionResponse{Nfts: nfts}, nil
}

// Listing queries a specific listing
func (q queryServer) Listing(ctx context.Context, req *types.QueryListingRequest) (*types.QueryListingResponse, error) {
        listing, err := q.Keeper.Listings.Get(ctx, req.Id)
        if err != nil {
                return nil, types.ErrListingNotFound
        }

        return &types.QueryListingResponse{Listing: listing}, nil
}

// Listings queries all listings
func (q queryServer) Listings(ctx context.Context, req *types.QueryListingsRequest) (*types.QueryListingsResponse, error) {
        var listings []types.Listing

        err := q.Keeper.Listings.Walk(ctx, nil, func(key string, value types.Listing) (bool, error) {
                // Apply filters if provided
                if req.Status != types.ListingStatus_LISTING_STATUS_UNSPECIFIED && value.Status != req.Status {
                        return false, nil
                }
                listings = append(listings, value)
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryListingsResponse{Listings: listings}, nil
}

// Collection queries a specific collection
func (q queryServer) Collection(ctx context.Context, req *types.QueryCollectionRequest) (*types.QueryCollectionResponse, error) {
        collection, err := q.Keeper.Collections.Get(ctx, req.Id)
        if err != nil {
                return nil, types.ErrCollectionNotFound
        }

        return &types.QueryCollectionResponse{Collection: collection}, nil
}

// Collections queries all collections
func (q queryServer) Collections(ctx context.Context, req *types.QueryCollectionsRequest) (*types.QueryCollectionsResponse, error) {
        var collections []types.Collection

        err := q.Keeper.Collections.Walk(ctx, nil, func(key string, value types.Collection) (bool, error) {
                // Apply category filter if provided
                if req.Category != types.NFTCategory_NFT_CATEGORY_UNSPECIFIED && value.Category != req.Category {
                        return false, nil
                }
                collections = append(collections, value)
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryCollectionsResponse{Collections: collections}, nil
}

// Sales queries recent sales history
func (q queryServer) Sales(ctx context.Context, req *types.QuerySalesRequest) (*types.QuerySalesResponse, error) {
        var sales []types.Sale

        err := q.Keeper.Sales.Walk(ctx, nil, func(key string, value types.Sale) (bool, error) {
                // Apply filters if provided
                if req.NftId != "" && value.NftId != req.NftId {
                        return false, nil
                }
                if req.Buyer != "" && value.Buyer != req.Buyer {
                        return false, nil
                }
                if req.Seller != "" && value.Seller != req.Seller {
                        return false, nil
                }
                sales = append(sales, value)
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QuerySalesResponse{Sales: sales}, nil
}

// Params queries marketplace parameters
func (q queryServer) Params(ctx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
        params, err := q.Keeper.Params.Get(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryParamsResponse{Params: params}, nil
}
