import { StargateClient } from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

const RPC_ENDPOINT = import.meta.env.VITE_COSMOS_RPC_URL || "http://0.0.0.0:26657";
const FALLBACK_RPC = "https://rpc.aequitas.zone"; // Production fallback

let stargateClient = null;
let tmClient = null;
let isChainAvailable = false;

// Export tmClient for use in other modules
export { tmClient };

const getStargateClient = async () => {
  if (!stargateClient) {
    try {
      // Try local RPC first
      tmClient = await Tendermint37Client.connect(RPC_ENDPOINT);
      stargateClient = await StargateClient.create(tmClient);
      isChainAvailable = true;
      console.log("✅ Cosmos client connected to Aequitas Zone (local)");
      return stargateClient;
    } catch (error) {
      console.warn("⚠️ Local chain not available, trying fallback RPC...");
      try {
        // Try production RPC
        tmClient = await Tendermint37Client.connect(FALLBACK_RPC);
        stargateClient = await StargateClient.create(tmClient);
        isChainAvailable = true;
        console.log("✅ Cosmos client connected to Aequitas Zone (production)");
        return stargateClient;
      } catch (fallbackError) {
        console.warn("⚠️ No chain available, using mock data mode");
        isChainAvailable = false;
        return null;
      }
    }
  }
  return stargateClient;
};

export const queryTotalLiability = async () => {
  const client = await getStargateClient();
  if (!client || !tmClient) return "131000000000000";

  try {
    const queryData = {
      path: "/repar.ledger.Query/TotalLiability",
      data: new Uint8Array(),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      const parsedResponse = JSON.parse(new TextDecoder().decode(response.value));
      return parsedResponse.totalLiability?.amount || "131000000000000";
    }
    return "131000000000000";
  } catch (error) {
    console.warn("⚠️ Query failed, using mock data:", error.message);
    return "131000000000000";
  }
};

export const queryActiveDefendants = async () => {
  const client = await getStargateClient();
  if (!client || !tmClient) return 200;

  try {
    const queryData = {
      path: "/repar.ledger.Query/ActiveDefendants",
      data: new Uint8Array(),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      const parsedResponse = JSON.parse(new TextDecoder().decode(response.value));
      return parseInt(parsedResponse.count, 10);
    }
    return 200;
  } catch (error) {
    console.warn("⚠️ Query failed, using mock data:", error.message);
    return 200;
  }
};

export const queryDefendantDetails = async (defendantId) => {
  const client = await getStargateClient();
  if (!client || !tmClient) return null;

  try {
    const queryData = {
      path: "/repar.ledger.Query/DefendantDetails",
      data: new TextEncoder().encode(JSON.stringify({ id: defendantId })),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      return JSON.parse(new TextDecoder().decode(response.value));
    }
    return null;
  } catch (error) {
    console.warn("⚠️ Query failed:", error.message);
    return null;
  }
};

// Query liability ledger
export const queryDefendantLiability = async (defendantId) => {
  const client = await getStargateClient();
  if (!client || !tmClient) return null;

  try {
    const queryData = {
      path: "/repar.liability.Query/GetLiability",
      data: new TextEncoder().encode(JSON.stringify({ entity: defendantId })),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      return JSON.parse(new TextDecoder().decode(response.value));
    }
    return null;
  } catch (error) {
    console.warn("⚠️ Liability query failed:", error.message);
    return null;
  }
};

// Query threat defense stats
export const queryThreatStats = async () => {
  const client = await getStargateClient();
  if (!client || !tmClient) return { totalThreats: 0, nftsMinted: 0, nightmareActivations: 0 };

  try {
    const queryData = {
      path: "/repar.threatdefense.Query/Stats",
      data: new Uint8Array(),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      return JSON.parse(new TextDecoder().decode(response.value));
    }
    return { totalThreats: 0, nftsMinted: 0, nightmareActivations: 0 };
  } catch (error) {
    console.warn("⚠️ Threat stats query failed:", error.message);
    return { totalThreats: 0, nftsMinted: 0, nightmareActivations: 0 };
  }
};

// DEX Query Functions
export const queryDEXPools = async () => {
  const client = await getStargateClient();
  if (!client || !tmClient) return [];

  try {
    const queryData = {
      path: "/aequitas.dex.v1.Query/Pools",
      data: new Uint8Array(),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      const parsedResponse = JSON.parse(new TextDecoder().decode(response.value));
      return parsedResponse.pools || [];
    }
    return [];
  } catch (error) {
    console.warn("⚠️ DEX pools query failed, using mock data:", error.message);
    return [];
  }
};

export const queryDEXPool = async (poolId) => {
  const client = await getStargateClient();
  if (!client || !tmClient) return null;

  try {
    const queryData = {
      path: "/aequitas.dex.v1.Query/Pool",
      data: new TextEncoder().encode(JSON.stringify({ pool_id: poolId })),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      return JSON.parse(new TextDecoder().decode(response.value)).pool;
    }
    return null;
  } catch (error) {
    console.warn("⚠️ DEX pool query failed:", error.message);
    return null;
  }
};

export const estimateDEXSwap = async (poolId, tokenInDenom, tokenInAmount, tokenOutDenom) => {
  const client = await getStargateClient();
  if (!client || !tmClient) return { token_out_amount: "0", price_impact: "0", swap_fee: "0" };

  try {
    const queryData = {
      path: "/aequitas.dex.v1.Query/EstimateSwap",
      data: new TextEncoder().encode(JSON.stringify({ 
        pool_id: poolId,
        token_in_denom: tokenInDenom,
        token_in_amount: tokenInAmount,
        token_out_denom: tokenOutDenom
      })),
      prove: false,
    };
    const response = await tmClient.abciQuery(queryData);

    if (response.code === 0 && response.value) {
      return JSON.parse(new TextDecoder().decode(response.value));
    }
    return { token_out_amount: "0", price_impact: "0", swap_fee: "0" };
  } catch (error) {
    console.warn("⚠️ DEX swap estimation failed:", error.message);
    return { token_out_amount: "0", price_impact: "0", swap_fee: "0" };
  }
};

export const cosmosClient = {
  queryTotalLiability,
  queryActiveDefendants,
  queryDefendantDetails,
  queryDefendantLiability,
  queryThreatStats,
  queryDEXPools,
  queryDEXPool,
  estimateDEXSwap,
  getStargateClient,
  getTotalOwed: queryTotalLiability, // Alias for compatibility
  signer: null,
  account: null,

  async signAndBroadcast(messages, memo = '') {
    try {
      if (!this.signer || !this.account) {
        throw new Error('Wallet not connected. Please connect Keplr wallet first.');
      }

      if (!isChainAvailable) {
        throw new Error('Chain not available');
      }

      const { SigningStargateClient } = await import("@cosmjs/stargate");
      
      const client = await SigningStargateClient.connectWithSigner(
        RPC_ENDPOINT,
        this.signer
      );

      const fee = {
        amount: [{ denom: 'urepar', amount: '5000' }],
        gas: '200000',
      };

      const result = await client.signAndBroadcast(
        this.account.address,
        messages,
        fee,
        memo
      );

      if (result.code !== 0) {
        throw new Error(`Transaction failed: ${result.rawLog}`);
      }

      return result;
    } catch (error) {
      console.error('Transaction broadcast failed:', error);
      throw error;
    }
  },

  async getAccount() {
    if (this.account) {
      return this.account;
    }
    
    if (window.keplr) {
      const chainId = 'aequitas-1';
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      this.account = accounts[0];
      this.signer = offlineSigner;
      return accounts[0];
    }
    throw new Error('No wallet connected');
  },

  async getBalance(address) {
    const client = await getStargateClient();
    if (!client) return [];
    
    try {
      const balance = await client.getAllBalances(address || this.account?.address);
      return balance;
    } catch (error) {
      console.warn('Failed to fetch balance:', error);
      return [];
    }
  },

  async getTransactionHistory(address, limit = 50) {
    if (!tmClient) return [];
    
    try {
      const query = `tx.height>0 AND (message.sender='${address}' OR transfer.recipient='${address}')`;
      const results = await tmClient.txSearchAll({ query, per_page: limit });
      
      return results.txs.map(tx => ({
        hash: tx.hash,
        height: tx.height,
        result: tx.result,
        timestamp: new Date(tx.tx.time),
      }));
    } catch (error) {
      console.warn('Failed to fetch transaction history:', error);
      return [];
    }
  }
};

export default cosmosClient;