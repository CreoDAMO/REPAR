package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgMintNFT{}, "nftmarketplace/MintNFT", nil)
	cdc.RegisterConcrete(&MsgTransferNFT{}, "nftmarketplace/TransferNFT", nil)
	cdc.RegisterConcrete(&MsgBurnNFT{}, "nftmarketplace/BurnNFT", nil)
	cdc.RegisterConcrete(&MsgListNFT{}, "nftmarketplace/ListNFT", nil)
	cdc.RegisterConcrete(&MsgDelistNFT{}, "nftmarketplace/DelistNFT", nil)
	cdc.RegisterConcrete(&MsgBuyNFT{}, "nftmarketplace/BuyNFT", nil)
	cdc.RegisterConcrete(&MsgUpdateMetadata{}, "nftmarketplace/UpdateMetadata", nil)
	cdc.RegisterConcrete(&MsgCreateCollection{}, "nftmarketplace/CreateCollection", nil)
	cdc.RegisterConcrete(&MsgCertifyEvidence{}, "nftmarketplace/CertifyEvidence", nil)
}

// RegisterInterfaces registers the interfaces types with the interface registry
func RegisterInterfaces(registry types.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMintNFT{},
		&MsgTransferNFT{},
		&MsgBurnNFT{},
		&MsgListNFT{},
		&MsgDelistNFT{},
		&MsgBuyNFT{},
		&MsgUpdateMetadata{},
		&MsgCreateCollection{},
		&MsgCertifyEvidence{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(types.NewInterfaceRegistry())
)

func init() {
	RegisterCodec(Amino)
	Amino.Seal()
}
