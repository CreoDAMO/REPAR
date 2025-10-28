#!/usr/bin/env python3
"""
Fix genesis allocation for Aequitas Protocol
Total Supply: 131 Trillion REPAR

Founder Allocation (18%):
- Founder Endowment: 6% = 7.86T (8-year lock, 90% profits to protocol, 10% to founder)
- Founder Wallet: 12% = 15.72T (3% discretionary + 9% vested)

Remaining (82%): 107.42T for protocol operations
"""

import json
import sys

TOTAL_SUPPLY = 131_000_000_000_000  # 131 Trillion REPAR

# Founder allocation (18%)
FOUNDER_ENDOWMENT = 7_860_000_000_000  # 6% - already in founderendowment module
FOUNDER_WALLET = 15_720_000_000_000    # 12% - direct to founder wallet

# Remaining 82% = 107.42T for protocol
REMAINING = TOTAL_SUPPLY - FOUNDER_ENDOWMENT - FOUNDER_WALLET  # 107,420,000,000,000

# Allocation of remaining 82% to protocol modules
# Based on the protocol's operational needs
VALIDATOR_SUBSIDY_POOL = 10_000_000_000_000  # ~7.6% - Monthly validator payments + emergency reserve
COMMUNITY_POOL = 30_000_000_000_000          # ~22.9% - DAO Treasury for governance
ENDOWMENT_MODULE = 30_000_000_000_000        # ~22.9% - Social programs & LP strategies
DISTRIBUTION_MODULE = 37_420_000_000_000     # ~28.6% - Reparations distribution to descendants

print("="*70)
print("AEQUITAS GENESIS ALLOCATION")
print("="*70)
print(f"\nTotal Supply: {TOTAL_SUPPLY:,} REPAR (131 Trillion)")
print(f"\n{'Category':<40} {'Amount (REPAR)':<20} {'%'}")
print("-"*70)

# Founder Allocation (18%)
print(f"\n{'FOUNDER ALLOCATION (18%)':<40} {FOUNDER_ENDOWMENT + FOUNDER_WALLET:,}")
print(f"  {'Founder Endowment (6%)':<38} {FOUNDER_ENDOWMENT:,} {FOUNDER_ENDOWMENT/TOTAL_SUPPLY*100:.2f}%")
print(f"  {'Founder Wallet (12%)':<38} {FOUNDER_WALLET:,} {FOUNDER_WALLET/TOTAL_SUPPLY*100:.2f}%")

# Protocol Allocation (82%)
print(f"\n{'PROTOCOL ALLOCATION (82%)':<40} {REMAINING:,}")
print(f"  {'Validator Subsidy Pool':<38} {VALIDATOR_SUBSIDY_POOL:,} {VALIDATOR_SUBSIDY_POOL/TOTAL_SUPPLY*100:.2f}%")
print(f"  {'Community Pool (DAO)':<38} {COMMUNITY_POOL:,} {COMMUNITY_POOL/TOTAL_SUPPLY*100:.2f}%")
print(f"  {'Endowment Module':<38} {ENDOWMENT_MODULE:,} {ENDOWMENT_MODULE/TOTAL_SUPPLY*100:.2f}%")
print(f"  {'Distribution Module':<38} {DISTRIBUTION_MODULE:,} {DISTRIBUTION_MODULE/TOTAL_SUPPLY*100:.2f}%")

print("\n" + "="*70)
print(f"TOTAL: {FOUNDER_ENDOWMENT + FOUNDER_WALLET + VALIDATOR_SUBSIDY_POOL + COMMUNITY_POOL + ENDOWMENT_MODULE + DISTRIBUTION_MODULE:,} REPAR")
print("="*70)

# Verify total
total_check = FOUNDER_ENDOWMENT + FOUNDER_WALLET + VALIDATOR_SUBSIDY_POOL + COMMUNITY_POOL + ENDOWMENT_MODULE + DISTRIBUTION_MODULE
if total_check == TOTAL_SUPPLY:
    print("\n✓ Allocation verified: Total equals 131 Trillion REPAR")
else:
    print(f"\n✗ ERROR: Total {total_check:,} does not equal {TOTAL_SUPPLY:,}")
    sys.exit(1)

def update_genesis_file(filepath, chain_id):
    """Update a genesis file with corrected allocations"""
    print(f"\n\nUpdating {filepath}...")
    
    with open(filepath, 'r') as f:
        genesis = json.load(f)
    
    # Update founder wallet balance (12% = 15.72T)
    genesis['app_state']['bank']['balances'] = [
        {
            "address": "repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun",
            "coins": [{"denom": "repar", "amount": str(FOUNDER_WALLET)}]
        }
    ]
    
    # Keep total supply at 131T
    genesis['app_state']['bank']['supply'] = [
        {"denom": "repar", "amount": str(TOTAL_SUPPLY)}
    ]
    
    # Founder Endowment remains at 7.86T (6%)
    genesis['app_state']['founderendowment']['endowment']['principal'] = str(FOUNDER_ENDOWMENT)
    
    # Update Validator Subsidy Pool
    genesis['app_state']['validatorsubsidy']['pool']['monthly_budget'] = str(1_000_000_000_000)  # 1T/month
    genesis['app_state']['validatorsubsidy']['pool']['emergency_reserve'] = str(500_000_000_000)  # 500B reserve
    genesis['app_state']['validatorsubsidy']['pool']['total_allocated'] = str(VALIDATOR_SUBSIDY_POOL)
    
    # Write updated genesis
    with open(filepath, 'w') as f:
        json.dump(genesis, f, indent=2)
    
    print(f"✓ Updated {filepath}")
    print(f"  - Founder Wallet: {FOUNDER_WALLET:,} REPAR")
    print(f"  - Founder Endowment: {FOUNDER_ENDOWMENT:,} REPAR")
    print(f"  - Validator Subsidy Pool: {VALIDATOR_SUBSIDY_POOL:,} REPAR")

# Update both testnet and mainnet genesis files
update_genesis_file('chain-config/testnet/genesis-testnet.json', 'aequitas-testnet-1')
update_genesis_file('chain-config/mainnet/genesis-mainnet.json', 'aequitas-1')

print("\n" + "="*70)
print("Genesis files updated successfully!")
print("="*70)
