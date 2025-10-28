#!/usr/bin/env python3
"""
Genesis Allocation Generator for Aequitas Protocol
Generates proper coin distribution for testnet and mainnet genesis files
Based on allocation-structure.json specifications
"""

import json
import sys
from pathlib import Path
from typing import Dict, List, Any

def load_allocation_structure(allocation_file: str) -> Dict:
    """Load and validate the allocation structure"""
    with open(allocation_file, 'r') as f:
        allocation = json.load(f)
    
    total = int(allocation['total_supply'])
    allocated = sum(int(a['amount']) for a in allocation['allocations'])
    
    if allocated != total:
        raise ValueError(f"Allocation mismatch: {allocated} != {total}")
    
    print(f"✅ Allocation structure validated: {total} REPAR")
    return allocation

def create_module_account(name: str, address: str) -> Dict:
    """Create a module account entry"""
    return {
        "@type": "/cosmos.auth.v1beta1.ModuleAccount",
        "base_account": {
            "address": address,
            "pub_key": None,
            "account_number": "0",
            "sequence": "0"
        },
        "name": name,
        "permissions": ["minter", "burner"]
    }

def create_base_account(address: str, account_number: str = "0") -> Dict:
    """Create a base account entry"""
    return {
        "@type": "/cosmos.auth.v1beta1.BaseAccount",
        "address": address,
        "pub_key": None,
        "account_number": account_number,
        "sequence": "0"
    }

def create_balance(address: str, amount: str, denom: str = "repar") -> Dict:
    """Create a balance entry"""
    return {
        "address": address,
        "coins": [{"denom": denom, "amount": amount}]
    }

def generate_module_addresses() -> Dict[str, str]:
    """Generate standard module account addresses for Aequitas"""
    modules = {
        "descendant_fund": "repar17xpfvakm2amg962yls6f84z3kell8c5lc66g0s",
        "claims_fund": "repar1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8lyv94w",
        "founderendowment": "repar10d07y265gmmuvt4z0w9aw880jnsr700j6z2zm3",
        "enforcement_treasury": "repar1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3h6cprl",
        "foundation_treasury": "repar1tygms3xhhs3yv487phx3dw4a95jn7t7lr6yxtq"
    }
    return modules

def generate_accounts_and_balances(allocation: Dict, module_addresses: Dict) -> tuple:
    """Generate all accounts and balances from allocation structure"""
    accounts = []
    balances = []
    founder_address = allocation['founder_address']
    denom = allocation['native_coin']
    
    founder_wallet_total = 0
    
    accounts.append(create_base_account(founder_address, "0"))
    
    for alloc in allocation['allocations']:
        if 'module_account' in alloc:
            module_name = alloc['module_account']
            if module_name in module_addresses:
                module_addr = module_addresses[module_name]
                accounts.append(create_module_account(module_name, module_addr))
                balances.append(create_balance(module_addr, alloc['amount'], denom))
                print(f"  📦 Module {module_name}: {int(alloc['amount']):,} {denom}")
        
        if 'address' in alloc and alloc['address'] == founder_address:
            founder_wallet_total += int(alloc['amount'])
        
        if 'breakdown' in alloc:
            for item in alloc['breakdown']:
                if 'module_account' in item:
                    module_name = item['module_account']
                    if module_name in module_addresses:
                        module_addr = module_addresses[module_name]
                        if not any(a.get('name') == module_name for a in accounts):
                            accounts.append(create_module_account(module_name, module_addr))
                        balances.append(create_balance(module_addr, item['amount'], denom))
                        print(f"  📦 Module {module_name}: {int(item['amount']):,} {denom}")
                
                if 'address' in item and item['address'] == founder_address:
                    founder_wallet_total += int(item['amount'])
    
    balances.insert(0, create_balance(founder_address, str(founder_wallet_total), denom))
    print(f"  👤 Founder wallet: {founder_wallet_total:,} {denom} ({founder_wallet_total/int(allocation['total_supply'])*100:.2f}%)")
    
    return accounts, balances

def update_genesis_file(genesis_path: str, allocation: Dict, network: str = "mainnet"):
    """Update genesis file with proper allocations"""
    
    print(f"\n🔧 Generating {network} genesis allocations...")
    
    with open(genesis_path, 'r') as f:
        genesis = json.load(f)
    
    module_addresses = generate_module_addresses()
    
    accounts, balances = generate_accounts_and_balances(allocation, module_addresses)
    
    genesis['app_state']['auth']['accounts'] = accounts
    genesis['app_state']['bank']['balances'] = balances
    
    total_supply = allocation['total_supply']
    genesis['app_state']['bank']['supply'] = [
        {"denom": allocation['native_coin'], "amount": total_supply}
    ]
    
    if 'founderendowment' in genesis['app_state']:
        endowment_amount = next(
            (item['amount'] for alloc in allocation['allocations'] 
             if 'breakdown' in alloc 
             for item in alloc['breakdown'] 
             if item.get('module_account') == 'founderendowment'),
            "0"
        )
        
        genesis['app_state']['founderendowment']['endowment']['principal'] = endowment_amount
        genesis['app_state']['founderendowment']['endowment']['founder_address'] = allocation['founder_address']
    
    with open(genesis_path, 'w') as f:
        json.dump(genesis, f, indent=2)
    
    print(f"✅ {network.capitalize()} genesis file updated: {genesis_path}")
    
    total_in_balances = sum(int(coin['amount']) for balance in balances for coin in balance['coins'])
    print(f"  Total allocated: {total_in_balances:,} {allocation['native_coin']}")
    print(f"  Matches supply: {total_in_balances == int(total_supply)}")
    
    return genesis

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 generate_genesis_allocations.py <network>")
        print("  network: 'testnet' or 'mainnet'")
        sys.exit(1)
    
    network = sys.argv[1].lower()
    if network not in ['testnet', 'mainnet']:
        print("Error: network must be 'testnet' or 'mainnet'")
        sys.exit(1)
    
    allocation_file = 'chain-config/allocation-structure.json'
    
    if network == 'testnet':
        genesis_file = 'chain-config/testnet/genesis-testnet.json'
    else:
        genesis_file = 'chain-config/mainnet/genesis-mainnet.json'
    
    print(f"╔═══════════════════════════════════════════════════════════╗")
    print(f"║  Aequitas Genesis Allocation Generator - {network.upper():<9}          ║")
    print(f"╚═══════════════════════════════════════════════════════════╝")
    
    allocation = load_allocation_structure(allocation_file)
    
    genesis = update_genesis_file(genesis_file, allocation, network)
    
    print(f"\n🎉 {network.capitalize()} genesis allocation complete!")
    print(f"   Total supply: {int(allocation['total_supply']):,} REPAR")
    print(f"   Founder total: {int(allocation['founder_total']['total']):,} REPAR (18%)")
    print(f"   - Wallet: {int(allocation['founder_total']['direct_wallet']):,} REPAR (12%)")
    print(f"   - Endowment: {int(allocation['founder_total']['endowment']):,} REPAR (6%)")

if __name__ == "__main__":
    main()
