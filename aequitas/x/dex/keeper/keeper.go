
package keeper

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"aequitas/x/dex/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	logger       log.Logger

	// State management
	Schema      collections.Schema
	Params      collections.Item[types.Params]
	OrderBooks  collections.Map[string, types.OrderBook]
	Orders      collections.Map[uint64, types.Order]
	NextOrderID collections.Sequence

	// Module authorities
	authority string

	// Expected keepers
	bankKeeper    types.BankKeeper
	accountKeeper types.AccountKeeper
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	bankKeeper types.BankKeeper,
	accountKeeper types.AccountKeeper,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:           cdc,
		storeService:  storeService,
		authority:     authority,
		logger:        logger,
		bankKeeper:    bankKeeper,
		accountKeeper: accountKeeper,
		Params:        collections.NewItem(sb, types.ParamsKey, "params", codec.CollValue[types.Params](cdc)),
		OrderBooks:    collections.NewMap(sb, types.OrderBookKey, "order_books", collections.StringKey, codec.CollValue[types.OrderBook](cdc)),
		Orders:        collections.NewMap(sb, types.OrderKey, "orders", collections.Uint64Key, codec.CollValue[types.Order](cdc)),
		NextOrderID:   collections.NewSequence(sb, types.NextOrderIDKey, "next_order_id"),
	}

	schema, err := sb.Build()
	if err != nil {
		panic(err)
	}
	k.Schema = schema

	return k
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// CreateOrderBook creates a new trading pair order book
func (k Keeper) CreateOrderBook(ctx sdk.Context, baseDenom, quoteDenom string) error {
	pairID := types.GetPairID(baseDenom, quoteDenom)
	
	// Check if order book already exists
	exists, err := k.OrderBooks.Has(ctx, pairID)
	if err != nil {
		return err
	}
	if exists {
		return types.ErrOrderBookExists
	}

	orderBook := types.OrderBook{
		PairId:     pairID,
		BaseDenom:  baseDenom,
		QuoteDenom: quoteDenom,
		BuyOrders:  []uint64{},
		SellOrders: []uint64{},
	}

	return k.OrderBooks.Set(ctx, pairID, orderBook)
}

// PlaceOrder creates a new buy or sell order
func (k Keeper) PlaceOrder(ctx sdk.Context, creator string, orderType types.OrderType, baseDenom, quoteDenom string, amount, price sdk.Int) (uint64, error) {
	pairID := types.GetPairID(baseDenom, quoteDenom)
	
	// Get order book
	orderBook, err := k.OrderBooks.Get(ctx, pairID)
	if err != nil {
		return 0, types.ErrOrderBookNotFound
	}

	// Generate order ID
	orderID, err := k.NextOrderID.Next(ctx)
	if err != nil {
		return 0, err
	}

	// Calculate total cost
	totalCost := amount.Mul(price).Quo(sdk.NewInt(1000000)) // Price normalization

	// Lock funds based on order type
	creatorAddr, err := sdk.AccAddressFromBech32(creator)
	if err != nil {
		return 0, err
	}

	if orderType == types.OrderType_BUY {
		// Lock quote denom for buy orders
		if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, creatorAddr, types.ModuleName, sdk.NewCoins(sdk.NewCoin(quoteDenom, totalCost))); err != nil {
			return 0, err
		}
	} else {
		// Lock base denom for sell orders
		if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, creatorAddr, types.ModuleName, sdk.NewCoins(sdk.NewCoin(baseDenom, amount))); err != nil {
			return 0, err
		}
	}

	// Create order
	order := types.Order{
		OrderId:       orderID,
		Creator:       creator,
		OrderType:     orderType,
		BaseDenom:     baseDenom,
		QuoteDenom:    quoteDenom,
		Amount:        amount,
		Price:         price,
		FilledAmount:  sdk.ZeroInt(),
		Status:        types.OrderStatus_ACTIVE,
		CreatedHeight: ctx.BlockHeight(),
	}

	// Save order
	if err := k.Orders.Set(ctx, orderID, order); err != nil {
		return 0, err
	}

	// Add to order book
	if orderType == types.OrderType_BUY {
		orderBook.BuyOrders = append(orderBook.BuyOrders, orderID)
	} else {
		orderBook.SellOrders = append(orderBook.SellOrders, orderID)
	}

	if err := k.OrderBooks.Set(ctx, pairID, orderBook); err != nil {
		return 0, err
	}

	// Attempt to match orders
	if err := k.MatchOrders(ctx, pairID); err != nil {
		k.Logger().Error("failed to match orders", "error", err)
	}

	return orderID, nil
}

// MatchOrders attempts to match buy and sell orders in an order book
func (k Keeper) MatchOrders(ctx sdk.Context, pairID string) error {
	orderBook, err := k.OrderBooks.Get(ctx, pairID)
	if err != nil {
		return err
	}

	// Sort orders by price (buy orders descending, sell orders ascending)
	// For simplicity, we'll do basic matching - in production use a proper matching engine
	
	for i := 0; i < len(orderBook.BuyOrders); i++ {
		buyOrder, err := k.Orders.Get(ctx, orderBook.BuyOrders[i])
		if err != nil || buyOrder.Status != types.OrderStatus_ACTIVE {
			continue
		}

		for j := 0; j < len(orderBook.SellOrders); j++ {
			sellOrder, err := k.Orders.Get(ctx, orderBook.SellOrders[j])
			if err != nil || sellOrder.Status != types.OrderStatus_ACTIVE {
				continue
			}

			// Check if prices match (buy price >= sell price)
			if buyOrder.Price.GTE(sellOrder.Price) {
				// Execute trade
				if err := k.ExecuteTrade(ctx, &buyOrder, &sellOrder); err != nil {
					k.Logger().Error("failed to execute trade", "error", err)
					continue
				}

				// Update orders
				if err := k.Orders.Set(ctx, buyOrder.OrderId, buyOrder); err != nil {
					return err
				}
				if err := k.Orders.Set(ctx, sellOrder.OrderId, sellOrder); err != nil {
					return err
				}
			}
		}
	}

	return nil
}

// ExecuteTrade executes a matched trade between buy and sell orders
func (k Keeper) ExecuteTrade(ctx sdk.Context, buyOrder, sellOrder *types.Order) error {
	// Calculate trade amount (minimum of remaining amounts)
	buyRemaining := buyOrder.Amount.Sub(buyOrder.FilledAmount)
	sellRemaining := sellOrder.Amount.Sub(sellOrder.FilledAmount)
	
	tradeAmount := buyRemaining
	if sellRemaining.LT(buyRemaining) {
		tradeAmount = sellRemaining
	}

	// Use sell order price (price improvement for buyer)
	tradePrice := sellOrder.Price
	totalCost := tradeAmount.Mul(tradePrice).Quo(sdk.NewInt(1000000))

	// Transfer base denom to buyer
	buyerAddr, _ := sdk.AccAddressFromBech32(buyOrder.Creator)
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, buyerAddr, sdk.NewCoins(sdk.NewCoin(buyOrder.BaseDenom, tradeAmount))); err != nil {
		return err
	}

	// Transfer quote denom to seller
	sellerAddr, _ := sdk.AccAddressFromBech32(sellOrder.Creator)
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, sellerAddr, sdk.NewCoins(sdk.NewCoin(sellOrder.QuoteDenom, totalCost))); err != nil {
		return err
	}

	// Update filled amounts
	buyOrder.FilledAmount = buyOrder.FilledAmount.Add(tradeAmount)
	sellOrder.FilledAmount = sellOrder.FilledAmount.Add(tradeAmount)

	// Update order statuses
	if buyOrder.FilledAmount.Equal(buyOrder.Amount) {
		buyOrder.Status = types.OrderStatus_FILLED
	}
	if sellOrder.FilledAmount.Equal(sellOrder.Amount) {
		sellOrder.Status = types.OrderStatus_FILLED
	}

	return nil
}

// CancelOrder cancels an active order and returns locked funds
func (k Keeper) CancelOrder(ctx sdk.Context, orderID uint64, creator string) error {
	order, err := k.Orders.Get(ctx, orderID)
	if err != nil {
		return types.ErrOrderNotFound
	}

	if order.Creator != creator {
		return types.ErrUnauthorized
	}

	if order.Status != types.OrderStatus_ACTIVE {
		return types.ErrInvalidOrderStatus
	}

	// Calculate unfilled amount
	unfilledAmount := order.Amount.Sub(order.FilledAmount)
	
	// Return locked funds
	creatorAddr, _ := sdk.AccAddressFromBech32(creator)
	
	if order.OrderType == types.OrderType_BUY {
		totalCost := unfilledAmount.Mul(order.Price).Quo(sdk.NewInt(1000000))
		if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, creatorAddr, sdk.NewCoins(sdk.NewCoin(order.QuoteDenom, totalCost))); err != nil {
			return err
		}
	} else {
		if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, creatorAddr, sdk.NewCoins(sdk.NewCoin(order.BaseDenom, unfilledAmount))); err != nil {
			return err
		}
	}

	// Update order status
	order.Status = types.OrderStatus_CANCELLED
	return k.Orders.Set(ctx, orderID, order)
}
