
package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/creodamo/aequitas/x/infrastructure/keeper"
)

func TestProvisionValidator(t *testing.T) {
	// Note: This requires a valid DO API token to test
	// In CI/CD, use mock API or skip if token not available
	t.Skip("Requires DigitalOcean API token")

	k := keeper.NewKeeper(nil, nil)
	ctx := sdk.NewContext(nil, false, nil)

	err := k.ProvisionValidator(ctx, "test-token", 123456)
	require.NoError(t, err, "should provision validator without error")
}

func TestProvisionGpuNode(t *testing.T) {
	t.Skip("Requires DigitalOcean API token")

	k := keeper.NewKeeper(nil, nil)
	ctx := sdk.NewContext(nil, false, nil)

	err := k.ProvisionGpuNode(ctx, "test-token", 123456)
	require.NoError(t, err, "should provision GPU node without error")
}

func TestDestroyDroplet(t *testing.T) {
	t.Skip("Requires DigitalOcean API token")

	k := keeper.NewKeeper(nil, nil)
	ctx := sdk.NewContext(nil, false, nil)

	err := k.DestroyDroplet(ctx, "test-token", 12345)
	require.NoError(t, err, "should destroy droplet without error")
}

func TestCheckAndProvision(t *testing.T) {
	k := keeper.NewKeeper(nil, nil)
	ctx := sdk.NewContext(nil, false, nil)

	err := k.CheckAndProvision(ctx)
	require.NoError(t, err, "should handle no-op safely")
}
