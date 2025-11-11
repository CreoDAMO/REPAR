#!/usr/bin/env python3
"""
Complete Genesis Allocation Fix for Aequitas Protocol
Following the exact structure from frontend/src/data/statistics.js
"""

import json

TOTAL_SUPPLY = 131_000_000_000_000  # 131 Trillion REPAR

# Allocation based on frontend statistics.js
allocations = {
    # Founder allocations (18% total)
    "founder_wallet": 15_720_000_000_000,      # 12% (includes 10% Founder + 2% Dev Discretionary)
    "founder_endowment": 7_860_000_000_000,     # 6% (locked 8 years, 90/10 split)
    
    # Protocol allocations (82% total)
    "community_descendant": 56_330_000_000_000,  # 43%
    "claims_compensation": 32_750_000_000_000,   # 25%
    "ecosystem_treasury": 13_100_000_000_000,    # 10%
    "foundation_reserves": 5_240_000_000_000,    # 4%
}

# Cosmos SDK module account addresses (these are derived from module names)
# Format: cosmos.authtypes.NewModuleAddress("modulename").String()
MODULE_ACCOUNTS = {
    "distribution": "repar1jv65s3grqf6v6jl3dp4t6c9t9rk99cd83d88l9",  # For descendant distributions
    "gov": "repar10d07y265gmmuvt4z0w9aw880jnsr700juxf5qe",  # DAO governance/community pool
    "validatorsubsidy": "repar1v4c4uxzwpxrwuvzj8kpd4sjay2xfqw2nkfjucu",  # Validator subsidy
    "endowment": "repar1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3h6cprl",  # General endowment module
    "founderendowment": "repar1m4q3v8u6c7w8d5h2t9p0k1n6y3x5z4r7e8a2s", # Founder endowment
}

# Founder address
FOUNDER_ADDRESS = "repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun"

def update_genesis(genesis_file, chain_id):
    """Update genesis file with complete allocation"""
    print(f"\n{'='*70}")
    print(f"Updating {genesis_file} ({chain_id})")
    print(f"{'='*70}")
    
    with open(genesis_file, 'r') as f:
        genesis = json.load(f)
    
    # Update chain_id
    genesis['chain_id'] = chain_id
    
    # 1. Auth accounts - Add all module accounts and founder
    genesis['app_state']['auth']['accounts'] = [
        {
            "@type": "/cosmos.auth.v1beta1.BaseAccount",
            "address": FOUNDER_ADDRESS,
            "pub_key": None,
            "account_number": "0",
            "sequence": "0"
        },
        {
            "@type": "/cosmos.auth.v1beta1.ModuleAccount",
            "base_account": {
                "address": MODULE_ACCOUNTS["founderendowment"],
                "pub_key": None,
                "account_number": "1",
                "sequence": "0"
            },
            "name": "founderendowment",
            "permissions": ["burner", "minter"]
        },
        {
            "@type": "/cosmos.auth.v1beta1.ModuleAccount",
            "base_account": {
                "address": MODULE_ACCOUNTS["distribution"],
                "pub_key": None,
                "account_number": "2",
                "sequence": "0"
            },
            "name": "distribution",
            "permissions": ["burner", "minter"]
        },
        {
            "@type": "/cosmos.auth.v1beta1.ModuleAccount",
            "base_account": {
                "address": MODULE_ACCOUNTS["gov"],
                "pub_key": None,
                "account_number": "3",
                "sequence": "0"
            },
            "name": "gov",
            "permissions": ["burner"]
        },
        {
            "@type": "/cosmos.auth.v1beta1.ModuleAccount",
            "base_account": {
                "address": MODULE_ACCOUNTS["validatorsubsidy"],
                "pub_key": None,
                "account_number": "4",
                "sequence": "0"
            },
            "name": "validatorsubsidy",
            "permissions": ["burner", "minter"]
        },
        {
            "@type": "/cosmos.auth.v1beta1.ModuleAccount",
            "base_account": {
                "address": MODULE_ACCOUNTS["endowment"],
                "pub_key": None,
                "account_number": "5",
                "sequence": "0"
            },
            "name": "endowment",
            "permissions": ["burner", "minter"]
        }
    ]
    
    # 2. Bank balances - Distribute to all accounts
    genesis['app_state']['bank']['balances'] = [
        {
            "address": FOUNDER_ADDRESS,
            "coins": [{"denom": "repar", "amount": str(allocations["founder_wallet"])}]
        },
        {
            "address": MODULE_ACCOUNTS["founderendowment"],
            "coins": [{"denom": "repar", "amount": str(allocations["founder_endowment"])}]
        },
        {
            "address": MODULE_ACCOUNTS["distribution"],
            "coins": [{"denom": "repar", "amount": str(allocations["community_descendant"])}]
        },
        {
            "address": MODULE_ACCOUNTS["gov"],
            "coins": [{"denom": "repar", "amount": str(allocations["claims_compensation"])}]
        },
        {
            "address": MODULE_ACCOUNTS["validatorsubsidy"],
            "coins": [{"denom": "repar", "amount": str(allocations["ecosystem_treasury"])}]
        },
        {
            "address": MODULE_ACCOUNTS["endowment"],
            "coins": [{"denom": "repar", "amount": str(allocations["foundation_reserves"])}]
        }
    ]
    
    # 3. Verify total supply
    total_allocated = sum(allocations.values())
    assert total_allocated == TOTAL_SUPPLY, f"Mismatch: {total_allocated} != {TOTAL_SUPPLY}"
    
    # 4. Bank supply (must match total allocated)
    genesis['app_state']['bank']['supply'] = [
        {"denom": "repar", "amount": str(TOTAL_SUPPLY)}
    ]
    
    # 5. Update Founder Endowment module state
    genesis['app_state']['founderendowment']['endowment']['principal'] = str(allocations["founder_endowment"])
    genesis['app_state']['founderendowment']['endowment']['founder_address'] = FOUNDER_ADDRESS
    
    # 6. Update Validator Subsidy pool
    genesis['app_state']['validatorsubsidy']['pool']['total_allocated'] = str(allocations["ecosystem_treasury"])
    
    # Write updated genesis
    with open(genesis_file, 'w') as f:
        json.dump(genesis, f, indent=2)
    
    print(f"\n✅ Updated {genesis_file}")
    print(f"\n{'Module/Account':<30} {'Amount':<20} {'%'}")
    print(f"{'-'*70}")
    print(f"{'Founder Wallet':<30} {allocations['founder_wallet']:>18,} {allocations['founder_wallet']/TOTAL_SUPPLY*100:>6.2f}%")
    print(f"{'Founder Endowment':<30} {allocations['founder_endowment']:>18,} {allocations['founder_endowment']/TOTAL_SUPPLY*100:>6.2f}%")
    print(f"{'Community & Descendant':<30} {allocations['community_descendant']:>18,} {allocations['community_descendant']/TOTAL_SUPPLY*100:>6.2f}%")
    print(f"{'Claims & Compensation':<30} {allocations['claims_compensation']:>18,} {allocations['claims_compensation']/TOTAL_SUPPLY*100:>6.2f}%")
    print(f"{'Ecosystem Treasury':<30} {allocations['ecosystem_treasury']:>18,} {allocations['ecosystem_treasury']/TOTAL_SUPPLY*100:>6.2f}%")
    print(f"{'Foundation Reserves':<30} {allocations['foundation_reserves']:>18,} {allocations['foundation_reserves']/TOTAL_SUPPLY*100:>6.2f}%")
    print(f"{'-'*70}")
    print(f"{'TOTAL':<30} {total_allocated:>18,} {100.00:>6.2f}%")
    print(f"{'='*70}\n")

# Update both testnet and mainnet
update_genesis('chain-config/testnet/genesis-testnet.json', 'aequitas-testnet-1')
update_genesis('chain-config/mainnet/genesis-mainnet.json', 'aequitas-1')

print(f"\n{'='*70}")
print(f"✅ Genesis files updated with complete allocation!")
print(f"{'='*70}")
print(f"\nNext steps:")
print(f"1. Build blockchain binary (aequitasd)")
print(f"2. Run: aequitasd validate-genesis --home ~/.aequitasd")
print(f"3. Initialize testnet and mainnet")
print(f"{'='*70}\n")
