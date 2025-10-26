package types

import (
	"cosmossdk.io/math"
)

// GenesisState defines the nftmarketplace module's genesis state
type GenesisState struct {
	Params        Params         `json:"params"`
	Nfts          []NFT          `json:"nfts"`
	Collections   []Collection   `json:"collections"`
	Listings      []NFTListing   `json:"listings"`
	SalesHistory  []Sale         `json:"sales_history"`
	NextListingId uint64         `json:"next_listing_id"`
}

// NFTListing represents an NFT listed for sale
type NFTListing struct {
	Id       uint64   `json:"id"`
	NftId    string   `json:"nft_id"`
	Seller   string   `json:"seller"`
	Price    math.Int `json:"price"`
	ListedAt int64    `json:"listed_at"`
}

// Sale represents a completed NFT sale
type Sale struct {
	Id        uint64   `json:"id"`
	NftId     string   `json:"nft_id"`
	Seller    string   `json:"seller"`
	Buyer     string   `json:"buyer"`
	Price     math.Int `json:"price"`
	Timestamp int64    `json:"timestamp"`
}

// NFT represents an NFT in the marketplace
type NFT struct {
	Id           string `json:"id"`
	CollectionId string `json:"collection_id"`
	Owner        string `json:"owner"`
	TokenUri     string `json:"token_uri"`
	CreatedAt    int64  `json:"created_at"`
}

// Collection represents an NFT collection
type Collection struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Creator     string `json:"creator"`
	Description string `json:"description"`
	CreatedAt   int64  `json:"created_at"`
}

// Params defines the parameters for the nftmarketplace module
type Params struct {
	MarketplaceFeePercent string `json:"marketplace_fee_percent"`
	MinimumListingPrice   string `json:"minimum_listing_price"`
}

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params: Params{
			MarketplaceFeePercent: "2.5",
			MinimumListingPrice:   "1000",
		},
		Nfts:          []NFT{},
		Collections:   []Collection{},
		Listings:      []NFTListing{},
		SalesHistory:  []Sale{},
		NextListingId: 1,
	}
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
	return nil
}
