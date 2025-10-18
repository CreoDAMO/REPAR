package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.LegacyAmino) {
	// Register any messages here if needed
}

// RegisterInterfaces registers the interfaces types with the interface registry
func RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	// Register interfaces here if needed
}
