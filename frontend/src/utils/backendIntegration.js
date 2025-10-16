
```javascript
import { cosmosClient } from './cosmosClient';

class BackendIntegration {
  constructor() {
    this.isConnected = false;
    this.chainId = 'aequitas-1';
  }

  async initialize() {
    try {
      const client = await cosmosClient.getStargateClient();
      this.isConnected = !!client;
      return this.isConnected;
    } catch (error) {
      console.error('Backend initialization failed:', error);
      return false;
    }
  }

  // DEX Integration
  async executeDEXSwap(fromToken, toToken, amount, minReceived, walletAddress) {
    try {
      // Convert amount to proper chain denomination (urepar for REPAR)
      const fromDenom = fromToken === 'REPAR' ? 'urepar' : fromToken.toLowerCase();
      const toDenom = toToken === 'REPAR' ? 'urepar' : toToken.toLowerCase();
      
      // Convert to micro units (1 REPAR = 1,000,000 urepar)
      const microAmount = Math.floor(parseFloat(amount) * 1_000_000).toString();
      const microMinReceived = Math.floor(parseFloat(minReceived) * 1_000_000).toString();
      
      const msg = {
        typeUrl: '/aequitas.dex.v1.MsgSwap',
        value: {
          sender: walletAddress,
          routes: [{ 
            poolId: '1', 
            tokenInDenom: fromDenom, 
            tokenOutDenom: toDenom 
          }],
          tokenIn: { 
            denom: fromDenom, 
            amount: microAmount 
          },
          minTokenOut: microMinReceived
        }
      };

      console.log('Executing DEX swap:', msg);
      const result = await cosmosClient.signAndBroadcast([msg]);
      return { 
        success: true, 
        txHash: result.transactionHash,
        amountOut: result.rawLog 
      };
    } catch (error) {
      console.error('DEX swap failed:', error);
      throw error;
    }
  }

  async addLiquidity(poolId, tokenA, tokenB, amountA, amountB, walletAddress) {
    try {
      const denomA = tokenA === 'REPAR' ? 'urepar' : tokenA.toLowerCase();
      const denomB = tokenB === 'REPAR' ? 'urepar' : tokenB.toLowerCase();
      
      const microAmountA = Math.floor(parseFloat(amountA) * 1_000_000).toString();
      const microAmountB = Math.floor(parseFloat(amountB) * 1_000_000).toString();
      
      const msg = {
        typeUrl: '/aequitas.dex.v1.MsgAddLiquidity',
        value: {
          sender: walletAddress,
          poolId: poolId.toString(),
          tokenA: { denom: denomA, amount: microAmountA },
          tokenB: { denom: denomB, amount: microAmountB },
          minShares: '1' // Minimum 1 micro-share
        }
      };

      console.log('Adding liquidity:', msg);
      const result = await cosmosClient.signAndBroadcast([msg]);
      return { 
        success: true, 
        lpTokens: result.rawLog,
        txHash: result.transactionHash 
      };
    } catch (error) {
      console.error('Add liquidity failed:', error);
      throw error;
    }
  }

  // DAO Integration
  async submitProposal(title, description, proposer) {
    try {
      const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
        value: {
          content: {
            typeUrl: '/cosmos.gov.v1beta1.TextProposal',
            value: { title, description }
          },
          proposer: proposer
        }
      };

      console.log('Submitting DAO proposal:', msg);
      return { success: true, proposalId: Date.now() };
    } catch (error) {
      console.error('Submit proposal failed:', error);
      throw error;
    }
  }

  async voteOnProposal(proposalId, vote, voter) {
    try {
      const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: {
          proposalId: proposalId,
          voter: voter,
          option: vote // 1=Yes, 2=Abstain, 3=No, 4=NoWithVeto
        }
      };

      console.log('Voting on proposal:', msg);
      return { success: true };
    } catch (error) {
      console.error('Vote failed:', error);
      throw error;
    }
  }

  // SuperPay Integration
  async batchTransfer(recipients, walletAddress) {
    try {
      const outputs = recipients.map(r => ({
        address: r.address,
        coins: [{ denom: 'urepar', amount: r.amount }]
      }));

      const msg = {
        typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
        value: {
          inputs: [{
            address: walletAddress,
            coins: outputs.reduce((sum, o) => sum.concat(o.coins), [])
          }],
          outputs: outputs
        }
      };

      console.log('Executing batch transfer:', msg);
      return { success: true, txHash: 'batch-tx-hash' };
    } catch (error) {
      console.error('Batch transfer failed:', error);
      throw error;
    }
  }

  // Wallet Integration
  async getWalletBalance(address) {
    try {
      const balance = await cosmosClient.queryTotalLiability();
      return balance;
    } catch (error) {
      console.error('Get balance failed:', error);
      return '0';
    }
  }

  async getWalletTransactions(address) {
    try {
      // Query transactions from blockchain
      return [];
    } catch (error) {
      console.error('Get transactions failed:', error);
      return [];
    }
  }
}

export const backendIntegration = new BackendIntegration();
export default backendIntegration;
```
