import { StargateClient } from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

const RPC_ENDPOINT = import.meta.env.VITE_COSMOS_RPC_URL || "http://0.0.0.0:26657";
const FALLBACK_RPC = "https://rpc.aequitas.zone"; // Production fallback

let stargateClient = null;
let tmClient = null;
let isChainAvailable = false;

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
  getTotalOwed: queryTotalLiability // Alias for compatibility
};

export default cosmosClient;