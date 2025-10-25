package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCreateNFT{}, "nftmarketplace/CreateNFT", nil)
	cdc.RegisterConcrete(&MsgMintNFT{}, "nftmarketplace/MintNFT", nil)
	cdc.RegisterConcrete(&MsgListNFT{}, "nftmarketplace/ListNFT", nil)
	cdc.RegisterConcrete(&MsgBuyNFT{}, "nftmarketplace/BuyNFT", nil)
	cdc.RegisterConcrete(&MsgCancelListing{}, "nftmarketplace/CancelListing", nil)
	cdc.RegisterConcrete(&MsgUpdatePrice{}, "nftmarketplace/UpdatePrice", nil)
}

// RegisterInterfaces registers the interfaces types with the interface registry
func RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateNFT{},
		&MsgMintNFT{},
		&MsgListNFT{},
		&MsgBuyNFT{},
		&MsgCancelListing{},
		&MsgUpdatePrice{},
	)
	
	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(codectypes.NewInterfaceRegistry())
)

func init() {
	RegisterCodec(amino)
	sdk.RegisterLegacyAminoCodec(amino)
	amino.Seal()
}