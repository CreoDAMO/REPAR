package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/adns/types"
)

type msgServer struct {
	Keeper *Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
func NewMsgServerImpl(keeper *Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

// RegisterDomain handles domain registration
func (m msgServer) RegisterDomain(goCtx context.Context, msg *types.MsgRegisterDomain) (*types.MsgRegisterDomainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	record, tokenID, err := m.Keeper.RegisterDomain(
		ctx,
		msg.Creator,
		msg.Domain,
		msg.RecordType,
		msg.Values,
		msg.Ttl,
		msg.Category,
	)
	if err != nil {
		return nil, err
	}

	return &types.MsgRegisterDomainResponse{
		Domain:    msg.Domain,
		TokenId:   tokenID,
		Signature: record.Signature,
	}, nil
}

// UpdateRecord handles record updates
func (m msgServer) UpdateRecord(goCtx context.Context, msg *types.MsgUpdateRecord) (*types.MsgUpdateRecordResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get existing record
	record, err := m.Keeper.GetDNSRecord(ctx, msg.Domain)
	if err != nil {
		return nil, err
	}

	// Verify ownership
	if record.Owner != msg.Creator {
		return nil, types.ErrUnauthorized.Wrapf("not owner of %s", msg.Domain)
	}

	// Check if frozen
	if record.Frozen {
		return nil, types.ErrFrozenDomain.Wrapf("domain %s is frozen", msg.Domain)
	}

	// Update values
	record.Values = msg.Values
	if msg.Ttl > 0 {
		record.Ttl = msg.Ttl
	}

	// Re-encrypt and re-sign
	if err := m.Keeper.SetDNSRecord(ctx, *record); err != nil {
		return nil, err
	}

	return &types.MsgUpdateRecordResponse{
		NewSignature: record.Signature,
	}, nil
}

// TransferDomain handles domain transfers
func (m msgServer) TransferDomain(goCtx context.Context, msg *types.MsgTransferDomain) (*types.MsgTransferDomainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := m.Keeper.TransferDomain(ctx, msg.Creator, msg.Domain, msg.NewOwner); err != nil {
		return nil, err
	}

	// Get new token ID
	nft, err := m.Keeper.NFTs.Get(ctx, msg.Domain)
	if err != nil {
		return nil, types.ErrNFTMintFailed.Wrap(err.Error())
	}

	return &types.MsgTransferDomainResponse{
		NewTokenId: nft.TokenId,
	}, nil
}

// FreezeDomain handles domain freezing
func (m msgServer) FreezeDomain(goCtx context.Context, msg *types.MsgFreezeDomain) (*types.MsgFreezeDomainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := m.Keeper.FreezeDomain(ctx, msg.Creator, msg.Domain, msg.Reason, msg.AxiomReference); err != nil {
		return nil, err
	}

	return &types.MsgFreezeDomainResponse{
		Frozen: true,
	}, nil
}
