# Infrastructure Module

## Overview

The Infrastructure module provides the foundation for Aequitas Protocol to manage its own infrastructure using the DigitalOcean API. This module provides manual provisioning capabilities that can be triggered via governance proposals or CLI commands.

## Features

- **Manual Provisioning**: Provision new validator Droplets via governance or CLI
- **DigitalOcean Integration**: Native integration with DigitalOcean API using the official Go SDK
- **Event Tracking**: Emits events for all infrastructure changes for monitoring and auditing
- **State Management**: Tracks all provisioned Droplets in blockchain state
- **Safe Error Handling**: Gracefully handles missing credentials without halting the chain

## Usage

### Prerequisites

1. DigitalOcean API Token (must be provided when calling ProvisionValidator)
2. SSH Key ID registered in your DigitalOcean account

### Manual Provisioning

To manually provision a validator, you must provide the DigitalOcean API token:

```go
apiToken := os.Getenv("DO_API_TOKEN")  // Or from secure config
err := keeper.ProvisionValidator(ctx, apiToken, "validator-name", "nyc3", "c-8", sshKeyID)
```

**Security Note**: Never store API tokens in blockchain state or pass them through transactions. The token should be:
- Provided via secure environment variables
- Managed by the node operator
- Used only in server-side operations (not exposed to clients)

### Listing Droplets

To list all provisioned Droplets:

```go
droplets, err := keeper.ListDroplets(ctx)
```

## Integration with Validator Subsidy Protocol

This module works in tandem with the `x/validatorsubsidy` module:
- Infrastructure costs are tracked and funded through the Validator Subsidy Protocol
- Monthly budget of $6,456 USDC from DEX Treasury covers infrastructure costs
- Emergency reserve of $2,152 USDC available for scaling needs

## Architecture

The module follows the standard Cosmos SDK module structure:

```
x/infrastructure/
├── keeper/
│   └── keeper.go       # Core business logic and DO SDK integration
├── types/
│   ├── keys.go         # Module constants and event types
│   └── expected_keepers.go  # Interface definitions
└── module.go           # Module definition and lifecycle hooks
```

## Current Limitations

- **No Auto-Provisioning**: The CheckAndProvision function is currently a no-op. Auto-provisioning would require proper validator count tracking and governance-approved automation logic.
- **Manual Token Management**: API tokens must be managed securely by node operators, not stored on-chain.
- **IP Address Handling**: Newly created Droplets may not have IP addresses immediately; the module marks them as "pending" until available.

## Future Enhancements

- Governance-controlled auto-provisioning based on actual validator count
- GPU Droplet provisioning for AI workloads (NVIDIA Omniverse, Morpheus)
- Automatic Cloudflare DNS updates
- Load-based scaling triggers
- Cost tracking integration with x/costs module
- Multi-region deployment support
- Secure parameter storage for SSH keys and configuration
