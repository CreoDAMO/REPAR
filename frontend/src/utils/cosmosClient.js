
// Cosmos SDK Client Utilities
// This will connect to your Cosmos chain once it's deployed

export class CosmosClient {
  constructor(config = {}) {
    this.rpcUrl = config.rpcUrl || 'http://localhost:26657';
    this.restUrl = config.restUrl || 'http://localhost:1317';
    this.chainId = config.chainId || 'reparations-testnet-1';
    this.prefix = config.prefix || 'cosmos';
  }

  // Query total owed from ledger module
  async getTotalOwed() {
    try {
      const response = await fetch(`${this.restUrl}/reparations/ledger/total`);
      if (!response.ok) {
        throw new Error('Failed to fetch total owed');
      }
      const data = await response.json();
      return data.total_owed;
    } catch (error) {
      console.error('Error fetching total owed:', error);
      // Return mock data for development
      return '920000000000'; // $920B in micro-units
    }
  }

  // Query defendant claim
  async getDefendantClaim(defendant) {
    try {
      const response = await fetch(`${this.restUrl}/reparations/ledger/defendant/${defendant}`);
      if (!response.ok) {
        throw new Error('Failed to fetch defendant claim');
      }
      const data = await response.json();
      return data.claim;
    } catch (error) {
      console.error('Error fetching defendant claim:', error);
      return null;
    }
  }

  // Query transactions
  async getTransactions(page = 1, limit = 10) {
    try {
      const response = await fetch(`${this.restUrl}/reparations/ledger/transactions?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      return data.transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  // File a claim (requires wallet signature)
  async fileClaim(walletAddress, defendant, amount) {
    // TODO: Implement with actual Cosmos SDK signing
    console.log('Filing claim:', { walletAddress, defendant, amount });
    
    const msg = {
      typeUrl: '/reparations.ledger.MsgFileClaim',
      value: {
        creator: walletAddress,
        defendant: defendant,
        amount: amount.toString()
      }
    };

    // Mock transaction for development
    return {
      code: 0,
      transactionHash: '0x' + Math.random().toString(16).substring(2),
      rawLog: 'Claim filed successfully'
    };
  }

  // Stake REPAR tokens
  async stakeTokens(walletAddress, amount) {
    // TODO: Implement with actual Cosmos SDK signing
    console.log('Staking tokens:', { walletAddress, amount });
    
    const msg = {
      typeUrl: '/reparations.staking.MsgStakeTokens',
      value: {
        creator: walletAddress,
        amount: amount.toString()
      }
    };

    // Mock transaction for development
    return {
      code: 0,
      transactionHash: '0x' + Math.random().toString(16).substring(2),
      rawLog: 'Tokens staked successfully'
    };
  }

  // Get account balance
  async getBalance(address) {
    try {
      const response = await fetch(`${this.restUrl}/cosmos/bank/v1beta1/balances/${address}`);
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data = await response.json();
      return data.balances;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return [];
    }
  }
}

// Export singleton instance
export const cosmosClient = new CosmosClient();
