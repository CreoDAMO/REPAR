import { StargateClient } from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

const RPC_ENDPOINT = import.meta.env.VITE_COSMOS_RPC_URL || "https://rpc.aequitas.zone";

let stargateClient = null;
let tmClient = null;

const getStargateClient = async () => {
  if (!stargateClient) {
    try {
      tmClient = await Tendermint37Client.connect(RPC_ENDPOINT);
      stargateClient = await StargateClient.create(tmClient);
      console.log("✅ Cosmos client connected to Aequitas Zone");
      return stargateClient;
    } catch (error) {
      console.warn("⚠️ Aequitas Zone not available, using mock data:", error.message);
      return null;
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

export const cosmosClient = {
  queryTotalLiability,
  queryActiveDefendants,
  queryDefendantDetails,
  getStargateClient,
  getTotalOwed: queryTotalLiability // Alias for compatibility
};

export default cosmosClient;