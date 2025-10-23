package types

import (
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	_ sdk.Msg = &MsgCreatePool{}
	_ sdk.Msg = &MsgAddLiquidity{}
	_ sdk.Msg = &MsgRemoveLiquidity{}
	_ sdk.Msg = &MsgSwap{}
)

// Message types
const (
	TypeMsgCreatePool      = "create_pool"
	TypeMsgAddLiquidity    = "add_liquidity"
	TypeMsgRemoveLiquidity = "remove_liquidity"
	TypeMsgSwap            = "swap"
)

// Event types
const (
	EventTypeCreatePool      = "create_pool"
	EventTypeAddLiquidity    = "add_liquidity"
	EventTypeRemoveLiquidity = "remove_liquidity"
	EventTypeSwap            = "swap"

	AttributeKeyPoolID  = "pool_id"
	AttributeKeyCreator = "creator"
	AttributeKeySender  = "sender"
)

// MsgCreatePool - create a new liquidity pool
type MsgCreatePool struct {
	Creator     string
	TokenA      sdk.Coin
	TokenB      sdk.Coin
	SwapFeeRate uint64
}

func (msg *MsgCreatePool) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Creator); err != nil {
		return err
	}
	if !msg.TokenA.IsValid() || !msg.TokenB.IsValid() {
		return ErrInvalidTokenDenom
	}
	if msg.TokenA.Denom == msg.TokenB.Denom {
		return ErrInvalidTokenDenom
	}
	if msg.SwapFeeRate > 10000 {
		return ErrInvalidSwapFeeRate
	}
	return nil
}

// MsgCreatePoolResponse is the return value from creating a pool
type MsgCreatePoolResponse struct {
	PoolId       uint64
	SharesIssued math.Int
}

// MsgAddLiquidity - add liquidity to an existing pool
type MsgAddLiquidity struct {
	Sender    string
	PoolId    uint64
	TokenA    sdk.Coin
	TokenB    sdk.Coin
	MinShares math.Int
}

func (msg *MsgAddLiquidity) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Sender); err != nil {
		return err
	}
	if !msg.TokenA.IsValid() || !msg.TokenB.IsValid() {
		return ErrInvalidTokenDenom
	}
	return nil
}

// MsgAddLiquidityResponse is the return value from adding liquidity
type MsgAddLiquidityResponse struct {
	LpTokens     string
	SharesIssued math.Int
}

// MsgRemoveLiquidity - remove liquidity from a pool
type MsgRemoveLiquidity struct {
	Sender    string
	PoolId    uint64
	Shares    math.Int
	MinTokenA math.Int
	MinTokenB math.Int
}

func (msg *MsgRemoveLiquidity) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Sender); err != nil {
		return err
	}
	if msg.Shares.IsNil() || msg.Shares.IsZero() {
		return ErrZeroAmount
	}
	return nil
}

// MsgRemoveLiquidityResponse is the return value from removing liquidity
type MsgRemoveLiquidityResponse struct {
	AmountA string
	AmountB string
	TokenA  sdk.Coin
	TokenB  sdk.Coin
}

// MsgSwap - execute a token swap
type MsgSwap struct {
	Sender      string
	Routes      []SwapRoute
	TokenIn     sdk.Coin
	MinTokenOut math.Int
}

func (msg *MsgSwap) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Sender); err != nil {
		return err
	}
	if !msg.TokenIn.IsValid() {
		return ErrInvalidTokenDenom
	}
	if len(msg.Routes) == 0 {
		return ErrInvalidSwapRoute
	}
	return nil
}

// MsgSwapResponse is the return value from a swap
type MsgSwapResponse struct {
	AmountOut string
}
