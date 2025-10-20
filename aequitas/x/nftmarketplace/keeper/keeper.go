package keeper

import (
	"context"
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/aequitas/aequitas/x/nftmarketplace/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	authority    string
	bankKeeper   types.BankKeeper

	// Collections for state management
	NFTs        collections.Map[string, types.NFT]
	Collections collections.Map[string, types.Collection]
	Listings    collections.Map[string, types.Listing]
	Sales       collections.Map[string, types.Sale]
	Params      collections.Item[types.MarketplaceParams]
	NextNFTID   collections.Sequence
	NextListingID collections.Sequence
	NextSaleID    collections.Sequence
	NextCollectionID collections.Sequence
	Schema      collections.Schema
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	authority string,
	bankKeeper types.BankKeeper,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		bankKeeper:   bankKeeper,
		NFTs:         collections.NewMap(sb, collections.NewPrefix(0), "nfts", collections.StringKey, codec.CollValue[types.NFT](cdc)),
		Collections:  collections.NewMap(sb, collections.NewPrefix(1), "collections", collections.StringKey, codec.CollValue[types.Collection](cdc)),
		Listings:     collections.NewMap(sb, collections.NewPrefix(2), "listings", collections.StringKey, codec.CollValue[types.Listing](cdc)),
		Sales:        collections.NewMap(sb, collections.NewPrefix(3), "sales", collections.StringKey, codec.CollValue[types.Sale](cdc)),
		Params:       collections.NewItem(sb, collections.NewPrefix(4), "params", codec.CollValue[types.MarketplaceParams](cdc)),
		NextNFTID:    collections.NewSequence(sb, collections.NewPrefix(5), "next_nft_id"),
		NextListingID: collections.NewSequence(sb, collections.NewPrefix(6), "next_listing_id"),
		NextSaleID:    collections.NewSequence(sb, collections.NewPrefix(7), "next_sale_id"),
		NextCollectionID: collections.NewSequence(sb, collections.NewPrefix(8), "next_collection_id"),
	}

	schema, err := sb.Build()
	if err != nil {
		panic(err)
	}
	k.Schema = schema

	return k
}

func (k Keeper) Logger(ctx context.Context) log.Logger {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	return sdkCtx.Logger().With("module", "x/nftmarketplace")
}

// MintNFT mints a new NFT
func (k Keeper) MintNFT(
	ctx context.Context,
	creator string,
	collectionID string,
	recipient string,
	category types.NFTCategory,
	name string,
	description string,
	metadataURI string,
	imageURI string,
	royaltyPercentage uint32,
	attributes []*types.NFTAttribute,
	defendantID string,
	claimID string,
	burnAmount math.Int,
	burnTxHash string,
) (string, string, error) {
	// Validate royalty percentage
	params, err := k.Params.Get(ctx)
	if err != nil {
		return "", "", err
	}
	if royaltyPercentage > params.MaxRoyaltyPercentage {
		return "", "", fmt.Errorf("royalty percentage exceeds maximum: %d > %d", royaltyPercentage, params.MaxRoyaltyPercentage)
	}

	// Generate NFT ID
	nftID, err := k.NextNFTID.Next(ctx)
	if err != nil {
		return "", "", err
	}
	nftIDStr := fmt.Sprintf("nft-%d", nftID)

	// Generate token ID within collection
	tokenID := fmt.Sprintf("%s-%d", collectionID, nftID)

	now := sdk.UnwrapSDKContext(ctx).BlockTime().Unix()

	nft := types.NFT{
		Id:                nftIDStr,
		TokenId:           tokenID,
		CollectionId:      collectionID,
		Owner:             recipient,
		Creator:           creator,
		Category:          category,
		Name:              name,
		Description:       description,
		MetadataUri:       metadataURI,
		ImageUri:          imageURI,
		CreatedAt:         now,
		UpdatedAt:         now,
		DefendantId:       defendantID,
		ClaimId:           claimID,
		Certified:         false,
		Certifier:         "",
		BurnAmount:        burnAmount,
		BurnTxHash:        burnTxHash,
		RoyaltyPercentage: royaltyPercentage,
		Attributes:        attributes,
	}

	if err := k.NFTs.Set(ctx, nftIDStr, nft); err != nil {
		return "", "", err
	}

	// Update collection supply if it exists
	if collectionID != "" {
		collection, err := k.Collections.Get(ctx, collectionID)
		if err == nil {
			collection.TotalSupply++
			_ = k.Collections.Set(ctx, collectionID, collection)
		}
	}

	return nftIDStr, tokenID, nil
}

// TransferNFT transfers ownership of an NFT
func (k Keeper) TransferNFT(ctx context.Context, sender string, recipient string, nftID string) error {
	nft, err := k.NFTs.Get(ctx, nftID)
	if err != nil {
		return types.ErrNFTNotFound
	}

	if nft.Owner != sender {
		return types.ErrNotNFTOwner
	}

	nft.Owner = recipient
	nft.UpdatedAt = sdk.UnwrapSDKContext(ctx).BlockTime().Unix()

	return k.NFTs.Set(ctx, nftID, nft)
}

// BurnNFT permanently destroys an NFT
func (k Keeper) BurnNFT(ctx context.Context, owner string, nftID string) error {
	nft, err := k.NFTs.Get(ctx, nftID)
	if err != nil {
		return types.ErrNFTNotFound
	}

	if nft.Owner != owner {
		return types.ErrNotNFTOwner
	}

	// Update collection supply
	if nft.CollectionId != "" {
		collection, err := k.Collections.Get(ctx, nft.CollectionId)
		if err == nil && collection.TotalSupply > 0 {
			collection.TotalSupply--
			_ = k.Collections.Set(ctx, nft.CollectionId, collection)
		}
	}

	return k.NFTs.Remove(ctx, nftID)
}

// ListNFT creates a marketplace listing
func (k Keeper) ListNFT(ctx context.Context, seller string, nftID string, price math.Int, expiresAt int64) (string, error) {
	// Verify NFT ownership
	nft, err := k.NFTs.Get(ctx, nftID)
	if err != nil {
		return "", types.ErrNFTNotFound
	}
	if nft.Owner != seller {
		return "", types.ErrNotNFTOwner
	}

	// Generate listing ID
	listingID, err := k.NextListingID.Next(ctx)
	if err != nil {
		return "", err
	}
	listingIDStr := fmt.Sprintf("listing-%d", listingID)

	now := sdk.UnwrapSDKContext(ctx).BlockTime().Unix()

	listing := types.Listing{
		Id:        listingIDStr,
		NftId:     nftID,
		Seller:    seller,
		Price:     price,
		Status:    types.ListingStatus_LISTING_STATUS_ACTIVE,
		CreatedAt: now,
		ExpiresAt: expiresAt,
	}

	return listingIDStr, k.Listings.Set(ctx, listingIDStr, listing)
}

// DelistNFT cancels a listing
func (k Keeper) DelistNFT(ctx context.Context, seller string, listingID string) error {
	listing, err := k.Listings.Get(ctx, listingID)
	if err != nil {
		return types.ErrListingNotFound
	}

	if listing.Seller != seller {
		return types.ErrNotListingSeller
	}

	if listing.Status != types.ListingStatus_LISTING_STATUS_ACTIVE {
		return types.ErrListingNotActive
	}

	listing.Status = types.ListingStatus_LISTING_STATUS_CANCELLED
	return k.Listings.Set(ctx, listingID, listing)
}

// BuyNFT purchases a listed NFT
func (k Keeper) BuyNFT(ctx context.Context, buyer string, listingID string) (string, string, error) {
	listing, err := k.Listings.Get(ctx, listingID)
	if err != nil {
		return "", "", types.ErrListingNotFound
	}

	if listing.Status != types.ListingStatus_LISTING_STATUS_ACTIVE {
		return "", "", types.ErrListingNotActive
	}

	// Check expiration
	now := sdk.UnwrapSDKContext(ctx).BlockTime().Unix()
	if listing.ExpiresAt > 0 && now > listing.ExpiresAt {
		listing.Status = types.ListingStatus_LISTING_STATUS_EXPIRED
		_ = k.Listings.Set(ctx, listingID, listing)
		return "", "", types.ErrListingExpired
	}

	nft, err := k.NFTs.Get(ctx, listing.NftId)
	if err != nil {
		return "", "", types.ErrNFTNotFound
	}

	// Calculate fees
	params, err := k.Params.Get(ctx)
	if err != nil {
		return "", "", err
	}

	// Marketplace fee
	marketplaceFee := listing.Price.MulRaw(int64(params.MarketplaceFeePercentage)).QuoRaw(10000)
	
	// Royalty fee
	royaltyFee := listing.Price.MulRaw(int64(nft.RoyaltyPercentage)).QuoRaw(10000)
	
	// Seller receives the rest
	sellerAmount := listing.Price.Sub(marketplaceFee).Sub(royaltyFee)

	// Transfer funds (simplified - in production, use proper SDK bank transfers)
	buyerAddr, _ := sdk.AccAddressFromBech32(buyer)
	sellerAddr, _ := sdk.AccAddressFromBech32(listing.Seller)
	creatorAddr, _ := sdk.AccAddressFromBech32(nft.Creator)
	feeCollectorAddr, _ := sdk.AccAddressFromBech32(params.FeeCollector)

	// Transfer payment from buyer to seller
	if err := k.bankKeeper.SendCoins(ctx, buyerAddr, sellerAddr, sdk.NewCoins(sdk.NewCoin("urepar", sellerAmount))); err != nil {
		return "", "", err
	}

	// Transfer marketplace fee
	if marketplaceFee.GT(math.ZeroInt()) {
		if err := k.bankKeeper.SendCoins(ctx, buyerAddr, feeCollectorAddr, sdk.NewCoins(sdk.NewCoin("urepar", marketplaceFee))); err != nil {
			return "", "", err
		}
	}

	// Transfer royalty to creator
	if royaltyFee.GT(math.ZeroInt()) {
		if err := k.bankKeeper.SendCoins(ctx, buyerAddr, creatorAddr, sdk.NewCoins(sdk.NewCoin("urepar", royaltyFee))); err != nil {
			return "", "", err
		}
	}

	// Transfer NFT ownership
	nft.Owner = buyer
	nft.UpdatedAt = now
	if err := k.NFTs.Set(ctx, nft.Id, nft); err != nil {
		return "", "", err
	}

	// Mark listing as sold
	listing.Status = types.ListingStatus_LISTING_STATUS_SOLD
	if err := k.Listings.Set(ctx, listingID, listing); err != nil {
		return "", "", err
	}

	// Record sale
	saleID, err := k.NextSaleID.Next(ctx)
	if err != nil {
		return "", "", err
	}
	saleIDStr := fmt.Sprintf("sale-%d", saleID)

	sale := types.Sale{
		Id:              saleIDStr,
		NftId:           nft.Id,
		ListingId:       listingID,
		Seller:          listing.Seller,
		Buyer:           buyer,
		Price:           listing.Price,
		RoyaltyAmount:   royaltyFee,
		MarketplaceFee:  marketplaceFee,
		Timestamp:       now,
		TxHash:          "", // Will be filled by transaction hash
	}

	if err := k.Sales.Set(ctx, saleIDStr, sale); err != nil {
		return "", "", err
	}

	return nft.Id, saleIDStr, nil
}

// CreateCollection creates a new NFT collection
func (k Keeper) CreateCollection(
	ctx context.Context,
	creator string,
	name string,
	symbol string,
	description string,
	imageURI string,
	category types.NFTCategory,
	royaltyPercentage uint32,
) (string, error) {
	collectionID, err := k.NextCollectionID.Next(ctx)
	if err != nil {
		return "", err
	}
	collectionIDStr := fmt.Sprintf("collection-%d", collectionID)

	now := sdk.UnwrapSDKContext(ctx).BlockTime().Unix()

	collection := types.Collection{
		Id:                collectionIDStr,
		Name:              name,
		Symbol:            symbol,
		Description:       description,
		Creator:           creator,
		ImageUri:          imageURI,
		Category:          category,
		RoyaltyPercentage: royaltyPercentage,
		CreatedAt:         now,
		TotalSupply:       0,
		Verified:          false,
	}

	return collectionIDStr, k.Collections.Set(ctx, collectionIDStr, collection)
}

// CertifyEvidence certifies an evidence NFT for FRE 901 compliance
func (k Keeper) CertifyEvidence(ctx context.Context, certifier string, nftID string) error {
	nft, err := k.NFTs.Get(ctx, nftID)
	if err != nil {
		return types.ErrNFTNotFound
	}

	if nft.Category != types.NFTCategory_NFT_CATEGORY_EVIDENCE {
		return types.ErrNotEvidenceNFT
	}

	nft.Certified = true
	nft.Certifier = certifier
	nft.UpdatedAt = sdk.UnwrapSDKContext(ctx).BlockTime().Unix()

	return k.NFTs.Set(ctx, nftID, nft)
}

// UpdateMetadata updates NFT metadata
func (k Keeper) UpdateMetadata(ctx context.Context, owner string, nftID string, metadataURI string, description string) error {
	nft, err := k.NFTs.Get(ctx, nftID)
	if err != nil {
		return types.ErrNFTNotFound
	}

	if nft.Owner != owner {
		return types.ErrNotNFTOwner
	}

	if metadataURI != "" {
		nft.MetadataUri = metadataURI
	}
	if description != "" {
		nft.Description = description
	}
	nft.UpdatedAt = sdk.UnwrapSDKContext(ctx).BlockTime().Unix()

	return k.NFTs.Set(ctx, nftID, nft)
}
