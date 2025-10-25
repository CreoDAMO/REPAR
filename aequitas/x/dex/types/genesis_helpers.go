package types

// ValidateGenesis validates the genesis state
func ValidateGenesis(data *GenesisState) error {
	if data == nil {
		return nil
	}
	// Add validation logic here
	return nil
}
