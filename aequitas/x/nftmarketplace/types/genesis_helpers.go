package types

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Listings: []Listing{},
		Bids:     []Bid{},
		Sales:    []Sale{},
	}
}

// Validate validates the genesis state
func (gs GenesisState) Validate() error {
	// Add validation logic here
	return nil
}
