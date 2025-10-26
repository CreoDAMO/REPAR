
package keeper

import (
        "context"
        "fmt"
        "time"

        storetypes "cosmossdk.io/store/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/digitalocean/godo"

        "github.com/CreoDAMO/REPAR/aequitas/x/infrastructure/types"
)

type Keeper struct {
        storeKey   storetypes.StoreKey
        bankKeeper types.BankKeeper
}

func NewKeeper(storeKey storetypes.StoreKey, bankKeeper types.BankKeeper) *Keeper {
        return &Keeper{
                storeKey:   storeKey,
                bankKeeper: bankKeeper,
        }
}

// ProvisionValidator creates a CPU-Optimized Droplet for validator operations
func (k Keeper) ProvisionValidator(ctx sdk.Context, apiToken string, sshKeyID int) error {
        if apiToken == "" {
                return fmt.Errorf("API token not provided")
        }

        client := godo.NewFromToken(apiToken)
        ctxDO := context.Background()

        createRequest := &godo.DropletCreateRequest{
                Name:   fmt.Sprintf("aequitas-validator-%d", time.Now().Unix()),
                Region: "nyc3",
                Size:   "c-8", // 8 vCPU, 16GB RAM - $168/month
                Image: godo.DropletCreateImage{
                        Slug: "ubuntu-22-04-x64",
                },
                SSHKeys: []godo.DropletCreateSSHKey{
                        {ID: sshKeyID},
                },
                UserData: `#!/bin/bash
# Install Aequitas validator
curl -sSfL https://github.com/creodamo/REPAR/releases/latest/download/aequitasd-linux-amd64.tar.gz | tar -xz
mv aequitasd /usr/local/bin/
aequitasd init aequitas-validator-$(date +%s) --chain-id aequitas-1
wget -O ~/.aequitasd/config/genesis.json https://aequitasprotocol.zone/genesis.json
aequitasd start`,
        }

        droplet, _, err := client.Droplets.Create(ctxDO, createRequest)
        if err != nil {
                return fmt.Errorf("failed to create validator droplet: %w", err)
        }

        // Wait for IP assignment (up to 30 seconds)
        var ipAddress string
        for i := 0; i < 30; i++ {
                d, _, err := client.Droplets.Get(ctxDO, droplet.ID)
                if err == nil && len(d.Networks.V4) > 0 {
                        ipAddress = d.Networks.V4[0].IPAddress
                        break
                }
                time.Sleep(1 * time.Second)
        }

        if ipAddress == "" {
                ipAddress = "pending"
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent("validator_provisioned",
                        sdk.NewAttribute("droplet_id", fmt.Sprintf("%d", droplet.ID)),
                        sdk.NewAttribute("ip_address", ipAddress),
                        sdk.NewAttribute("cost_monthly", "168"),
                ),
        )

        return nil
}

// ProvisionGpuNode creates a GPU-Optimized Droplet for AI operations
func (k Keeper) ProvisionGpuNode(ctx sdk.Context, apiToken string, sshKeyID int) error {
        if apiToken == "" {
                return fmt.Errorf("API token not provided")
        }

        client := godo.NewFromToken(apiToken)
        ctxDO := context.Background()

        createRequest := &godo.DropletCreateRequest{
                Name:   fmt.Sprintf("aequitas-gpu-%d", time.Now().Unix()),
                Region: "nyc3",
                Size:   "g-8vcpu-80gb-2h100", // 8 vCPU, 80GB RAM, 2x H100 - $3,654/month
                Image: godo.DropletCreateImage{
                        Slug: "ubuntu-22-04-x64",
                },
                SSHKeys: []godo.DropletCreateSSHKey{
                        {ID: sshKeyID},
                },
                UserData: `#!/bin/bash
# Install NVIDIA drivers
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.0-1_all.deb
dpkg -i cuda-keyring_1.0-1_all.deb
apt-get update
apt-get -y install cuda

# Verify GPU
nvidia-smi

# Install Aequitas AI node
curl -sSfL https://github.com/creodamo/REPAR/releases/latest/download/aequitas-ai-linux-amd64.tar.gz | tar -xz
mv aequitas-ai /usr/local/bin/
aequitas-ai start`,
        }

        droplet, _, err := client.Droplets.Create(ctxDO, createRequest)
        if err != nil {
                return fmt.Errorf("failed to create GPU droplet: %w", err)
        }

        var ipAddress string
        for i := 0; i < 30; i++ {
                d, _, err := client.Droplets.Get(ctxDO, droplet.ID)
                if err == nil && len(d.Networks.V4) > 0 {
                        ipAddress = d.Networks.V4[0].IPAddress
                        break
                }
                time.Sleep(1 * time.Second)
        }

        if ipAddress == "" {
                ipAddress = "pending"
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent("gpu_provisioned",
                        sdk.NewAttribute("droplet_id", fmt.Sprintf("%d", droplet.ID)),
                        sdk.NewAttribute("ip_address", ipAddress),
                        sdk.NewAttribute("cost_monthly", "3654"),
                ),
        )

        return nil
}

// ProvisionRpcNode creates a General Purpose Droplet for RPC operations
func (k Keeper) ProvisionRpcNode(ctx sdk.Context, apiToken string, sshKeyID int) error {
        if apiToken == "" {
                return fmt.Errorf("API token not provided")
        }

        client := godo.NewFromToken(apiToken)
        ctxDO := context.Background()

        createRequest := &godo.DropletCreateRequest{
                Name:   fmt.Sprintf("aequitas-rpc-%d", time.Now().Unix()),
                Region: "nyc3",
                Size:   "s-4vcpu-8gb", // 4 vCPU, 8GB RAM - $74/month
                Image: godo.DropletCreateImage{
                        Slug: "ubuntu-22-04-x64",
                },
                SSHKeys: []godo.DropletCreateSSHKey{
                        {ID: sshKeyID},
                },
                UserData: `#!/bin/bash
# Install Aequitas RPC node
curl -sSfL https://github.com/creodamo/REPAR/releases/latest/download/aequitasd-linux-amd64.tar.gz | tar -xz
mv aequitasd /usr/local/bin/
aequitasd init aequitas-rpc-$(date +%s) --chain-id aequitas-1
wget -O ~/.aequitasd/config/genesis.json https://aequitasprotocol.zone/genesis.json

# Configure RPC
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26657"/' ~/.aequitasd/config/config.toml

aequitasd start`,
        }

        droplet, _, err := client.Droplets.Create(ctxDO, createRequest)
        if err != nil {
                return fmt.Errorf("failed to create RPC droplet: %w", err)
        }

        var ipAddress string
        for i := 0; i < 30; i++ {
                d, _, err := client.Droplets.Get(ctxDO, droplet.ID)
                if err == nil && len(d.Networks.V4) > 0 {
                        ipAddress = d.Networks.V4[0].IPAddress
                        break
                }
                time.Sleep(1 * time.Second)
        }

        if ipAddress == "" {
                ipAddress = "pending"
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent("rpc_provisioned",
                        sdk.NewAttribute("droplet_id", fmt.Sprintf("%d", droplet.ID)),
                        sdk.NewAttribute("ip_address", ipAddress),
                        sdk.NewAttribute("cost_monthly", "74"),
                ),
        )

        return nil
}

// DestroyDroplet removes a Droplet by ID
func (k Keeper) DestroyDroplet(ctx sdk.Context, apiToken string, dropletID int) error {
        if apiToken == "" {
                return fmt.Errorf("API token not provided")
        }

        client := godo.NewFromToken(apiToken)
        ctxDO := context.Background()

        _, err := client.Droplets.Delete(ctxDO, dropletID)
        if err != nil {
                return fmt.Errorf("failed to destroy droplet: %w", err)
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent("droplet_destroyed",
                        sdk.NewAttribute("droplet_id", fmt.Sprintf("%d", dropletID)),
                ),
        )

        return nil
}

// CheckAndProvision is a safe no-op function to prevent chain halts
// Remove this once provisioning logic is fully tested
func (k Keeper) CheckAndProvision(ctx sdk.Context) error {
        ctx.Logger().Info("CheckAndProvision called - no-op for safety")
        return nil
}
