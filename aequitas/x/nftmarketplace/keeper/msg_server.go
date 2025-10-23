package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/nftmarketplace/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

// MintNFT mints a new NFT
func (m msgServer) MintNFT(ctx context.Context, msg *types.MsgMintNFT) (*types.MsgMintNFTResponse, error) {
	nftID, tokenID, err := m.Keeper.MintNFT(
		ctx,
		msg.Creator,
		msg.CollectionId,
		msg.Recipient,
		msg.Category,
		msg.Name,
		msg.Description,
		msg.MetadataUri,
		msg.ImageUri,
		msg.RoyaltyPercentage,
		msg.Attributes,
		msg.DefendantId,
		msg.ClaimId,
		msg.BurnAmount,
		msg.BurnTxHash,
	)
	if err != nil {
		return nil, err
	}

	return &types.MsgMintNFTResponse{
		NftId:   nftID,
		TokenId: tokenID,
	}, nil
}

// TransferNFT transfers NFT ownership
func (m msgServer) TransferNFT(ctx context.Context, msg *types.MsgTransferNFT) (*types.MsgTransferNFTResponse, error) {
	if err := m.Keeper.TransferNFT(ctx, msg.Sender, msg.Recipient, msg.NftId); err != nil {
		return nil, err
	}

	return &types.MsgTransferNFTResponse{}, nil
}

// BurnNFT permanently destroys an NFT
func (m msgServer) BurnNFT(ctx context.Context, msg *types.MsgBurnNFT) (*types.MsgBurnNFTResponse, error) {
	if err := m.Keeper.BurnNFT(ctx, msg.Owner, msg.NftId); err != nil {
		return nil, err
	}

	return &types.MsgBurnNFTResponse{}, nil
}

// ListNFT creates a marketplace listing
func (m msgServer) ListNFT(ctx context.Context, msg *types.MsgListNFT) (*types.MsgListNFTResponse, error) {
	listingID, err := m.Keeper.ListNFT(ctx, msg.Seller, msg.NftId, msg.Price, msg.ExpiresAt)
	if err != nil {
		return nil, err
	}

	return &types.MsgListNFTResponse{
		ListingId: listingID,
	}, nil
}

// DelistNFT cancels a marketplace listing
func (m msgServer) DelistNFT(ctx context.Context, msg *types.MsgDelistNFT) (*types.MsgDelistNFTResponse, error) {
	if err := m.Keeper.DelistNFT(ctx, msg.Seller, msg.ListingId); err != nil {
		return nil, err
	}

	return &types.MsgDelistNFTResponse{}, nil
}

// BuyNFT purchases a listed NFT
func (m msgServer) BuyNFT(ctx context.Context, msg *types.MsgBuyNFT) (*types.MsgBuyNFTResponse, error) {
	nftID, saleID, err := m.Keeper.BuyNFT(ctx, msg.Buyer, msg.ListingId)
	if err != nil {
		return nil, err
	}

	return &types.MsgBuyNFTResponse{
		NftId:  nftID,
		SaleId: saleID,
	}, nil
}

// UpdateMetadata updates NFT metadata
func (m msgServer) UpdateMetadata(ctx context.Context, msg *types.MsgUpdateMetadata) (*types.MsgUpdateMetadataResponse, error) {
	if err := m.Keeper.UpdateMetadata(ctx, msg.Owner, msg.NftId, msg.MetadataUri, msg.Description); err != nil {
		return nil, err
	}

	return &types.MsgUpdateMetadataResponse{}, nil
}

// CreateCollection creates a new NFT collection
func (m msgServer) CreateCollection(ctx context.Context, msg *types.MsgCreateCollection) (*types.MsgCreateCollectionResponse, error) {
	collectionID, err := m.Keeper.CreateCollection(
		ctx,
		msg.Creator,
		msg.Name,
		msg.Symbol,
		msg.Description,
		msg.ImageUri,
		msg.Category,
		msg.RoyaltyPercentage,
	)
	if err != nil {
		return nil, err
	}

	return &types.MsgCreateCollectionResponse{
		CollectionId: collectionID,
	}, nil
}

// CertifyEvidence certifies an evidence NFT
func (m msgServer) CertifyEvidence(ctx context.Context, msg *types.MsgCertifyEvidence) (*types.MsgCertifyEvidenceResponse, error) {
	if err := m.Keeper.CertifyEvidence(ctx, msg.Certifier, msg.NftId); err != nil {
		return nil, err
	}

	return &types.MsgCertifyEvidenceResponse{}, nil
}
