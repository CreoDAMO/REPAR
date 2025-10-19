
package keeper_test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/creodamo/aequitas/x/validatorsubsidy/keeper"
)

func TestDistributeSubsidies(t *testing.T) {
	// Mock setup would be required for full testing
	t.Skip("Requires full app context with bank keeper")

	k := keeper.NewKeeper(nil, nil, nil)
	ctx := sdk.NewContext(nil, false, nil)

	operatorAddr := sdk.AccAddress([]byte("operator"))
	err := k.DistributeSubsidies(ctx, operatorAddr)
	require.NoError(t, err, "should distribute subsidies without error")
}

func TestCheckDistribution(t *testing.T) {
	t.Skip("Requires full app context")

	k := keeper.NewKeeper(nil, nil, nil)
	ctx := sdk.NewContext(nil, false, nil)

	// Set last distribution to 31 days ago
	lastDist := time.Now().Add(-31 * 24 * time.Hour)
	k.SetLastDistribution(ctx, lastDist)

	operatorAddr := sdk.AccAddress([]byte("operator"))
	err := k.CheckDistribution(ctx, operatorAddr)
	require.NoError(t, err, "should trigger distribution after 30 days")
}
