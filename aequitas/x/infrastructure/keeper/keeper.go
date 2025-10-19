package keeper

import (
        "context"
        "fmt"

        "cosmossdk.io/collections"
        "cosmossdk.io/core/store"
        "cosmossdk.io/log"
        "github.com/cosmos/cosmos-sdk/codec"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/digitalocean/godo"
        "golang.org/x/oauth2"

        "github.com/aequitas/aequitas/x/infrastructure/types"
)

type Keeper struct {
        cdc          codec.BinaryCodec
        storeService store.KVStoreService
        authority    string
        bankKeeper   types.BankKeeper
        stakingKeeper types.StakingKeeper

        Droplets collections.Map[string, string]
        Schema   collections.Schema
}

func NewKeeper(
        cdc codec.BinaryCodec,
        storeService store.KVStoreService,
        authority string,
        bankKeeper types.BankKeeper,
        stakingKeeper types.StakingKeeper,
) Keeper {
        sb := collections.NewSchemaBuilder(storeService)

        k := Keeper{
                cdc:           cdc,
                storeService:  storeService,
                authority:     authority,
                bankKeeper:    bankKeeper,
                stakingKeeper: stakingKeeper,
                Droplets:      collections.NewMap(sb, collections.NewPrefix(0), "droplets", collections.StringKey, collections.StringValue),
        }

        schema, err := sb.Build()
        if err != nil {
                panic(err)
        }
        k.Schema = schema

        return k
}

func (k Keeper) Logger(ctx context.Context) log.Logger {
        sdkCtx := sdk.UnwrapSDKContext(ctx)
        return sdkCtx.Logger().With("module", "x/infrastructure")
}

func (k Keeper) createDOClient(ctx context.Context, apiToken string) (*godo.Client, error) {
        if apiToken == "" {
                return nil, fmt.Errorf("DigitalOcean API token not provided")
        }

        tokenSource := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: apiToken})
        oauthClient := oauth2.NewClient(context.Background(), tokenSource)
        client := godo.NewClient(oauthClient)
        
        return client, nil
}

func (k Keeper) ProvisionValidator(ctx context.Context, apiToken, name, region, size string, sshKeyID int) error {
        client, err := k.createDOClient(ctx, apiToken)
        if err != nil {
                return fmt.Errorf("failed to create DO client: %w", err)
        }

        createRequest := &godo.DropletCreateRequest{
                Name:   name,
                Region: region,
                Size:   size,
                Image: godo.DropletCreateImage{
                        Slug: "ubuntu-22-04-x64",
                },
                SSHKeys: []godo.DropletCreateSSHKey{
                        {ID: sshKeyID},
                },
                UserData: `#!/bin/bash
curl -sSfL https://github.com/creodamo/REPAR/releases/latest/download/aequitasd-linux-amd64.tar.gz | tar -xz
mv aequitasd /usr/local/bin/
aequitasd init ` + name + ` --chain-id aequitas-1
wget -O ~/.aequitasd/config/genesis.json https://aequitasprotocol.zone/genesis.json
aequitasd start`,
        }

        droplet, _, err := client.Droplets.Create(context.Background(), createRequest)
        if err != nil {
                return fmt.Errorf("failed to create droplet: %w", err)
        }

        dropletID := fmt.Sprintf("%d", droplet.ID)
        err = k.Droplets.Set(ctx, dropletID, name)
        if err != nil {
                return fmt.Errorf("failed to store droplet info: %w", err)
        }

        ipAddress := "pending"
        if droplet.Networks != nil && len(droplet.Networks.V4) > 0 {
                ipAddress = droplet.Networks.V4[0].IPAddress
        }

        sdkCtx := sdk.UnwrapSDKContext(ctx)
        sdkCtx.EventManager().EmitEvent(
                sdk.NewEvent(
                        types.EventTypeDropletProvisioned,
                        sdk.NewAttribute(types.AttributeKeyDropletID, dropletID),
                        sdk.NewAttribute(types.AttributeKeyDropletName, name),
                        sdk.NewAttribute(types.AttributeKeyDropletIP, ipAddress),
                ),
        )

        k.Logger(ctx).Info("provisioned validator droplet",
                "id", droplet.ID,
                "name", name,
                "ip", ipAddress,
        )

        return nil
}

func (k Keeper) CheckAndProvision(ctx context.Context) error {
        return nil
}

func (k Keeper) ListDroplets(ctx context.Context) (map[string]string, error) {
        droplets := make(map[string]string)
        err := k.Droplets.Walk(ctx, nil, func(key, value string) (bool, error) {
                droplets[key] = value
                return false, nil
        })
        return droplets, err
}
