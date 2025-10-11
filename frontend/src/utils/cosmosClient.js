import { StargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

const RPC_ENDPOINT = import.meta.env.VITE_COSMOS_RPC_URL || "http://0.0.0.0:26657";

let stargateClient = null;

const getStargateClient = async () => {
  if (!stargateClient) {
    try {
      const tmClient = await Tendermint34Client.connect(RPC_ENDPOINT);
      stargateClient = await StargateClient.create(tmClient);
      console.log("Cosmos client connected successfully.");
    } catch (error) {
      console.error("Failed to connect to Cosmos client:", error);
      return null;
    }
  }
  return stargateClient;
};

export const queryTotalLiability = async () => {
  const client = await getStargateClient();
  if (!client) return "131000000000000";

  try {
    const queryPath = "/repar.ledger.Query/TotalLiability";
    const response = await client.queryAbci(queryPath, new Uint8Array());
    const parsedResponse = JSON.parse(new TextDecoder().decode(response.value));
    return parsedResponse.totalLiability?.amount || "131000000000000";
  } catch (error) {
    console.warn("Query failed, using mock data:", error);
    return "131000000000000";
  }
};

export const queryActiveDefendants = async () => {
  const client = await getStargateClient();
  if (!client) return 200;

  try {
    const queryPath = "/repar.ledger.Query/ActiveDefendants";
    const response = await client.queryAbci(queryPath, new Uint8Array());
    const parsedResponse = JSON.parse(new TextDecoder().decode(response.value));
    return parseInt(parsedResponse.count, 10);
  } catch (error) {
    console.warn("Query failed, using mock data:", error);
    return 200;
  }
};

export const queryDefendantDetails = async (defendantId) => {
  const client = await getStargateClient();
  if (!client) return null;

  try {
    const queryPath = `/repar.ledger.Query/DefendantDetails`;
    const request = new TextEncoder().encode(JSON.stringify({ id: defendantId }));
    const response = await client.queryAbci(queryPath, request);
    return JSON.parse(new TextDecoder().decode(response.value));
  } catch (error) {
    console.warn("Query failed:", error);
    return null;
  }
};

export default {
  queryTotalLiability,
  queryActiveDefendants,
  queryDefendantDetails,
  getStargateClient
};