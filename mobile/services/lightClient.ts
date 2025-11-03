import { Tendermint37Client } from '@cosmjs/tendermint-rpc';
import { toHex } from '@cosmjs/encoding';

const AEQUITAS_RPC_ENDPOINT = 'https://rpc.aequitasprotocol.zone';
const AEQUITAS_TESTNET_RPC = 'https://rpc-testnet.aequitasprotocol.zone';

const POLL_INTERVAL_ACTIVE = 30000;
const POLL_INTERVAL_BACKGROUND = 120000;

export interface BlockInfo {
  height: number;
  time: Date;
  chainId: string;
  proposer: string;
  txCount: number;
}

export interface NodeStatus {
  isConnected: boolean;
  latestBlockHeight: number;
  latestBlockTime: Date;
  isSyncing: boolean;
  peerCount: number;
  nodeVersion: string;
  chainId: string;
}

export interface SyncProgress {
  currentHeight: number;
  targetHeight: number;
  percentComplete: number;
  blocksRemaining: number;
}

export class LightClient {
  private client: Tendermint37Client | null = null;
  private rpcEndpoint: string;
  private isActive: boolean = true;
  private pollInterval: number = POLL_INTERVAL_ACTIVE;
  private pollTimer: NodeJS.Timeout | null = null;
  private statusCallbacks: ((status: NodeStatus) => void)[] = [];

  constructor(endpoint: string = AEQUITAS_RPC_ENDPOINT, useTestnet: boolean = false) {
    this.rpcEndpoint = useTestnet ? AEQUITAS_TESTNET_RPC : endpoint;
  }

  async connect(): Promise<boolean> {
    try {
      this.client = await Tendermint37Client.connect(this.rpcEndpoint);
      return true;
    } catch (error) {
      console.error('Failed to connect to Tendermint RPC:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
    
    if (this.client) {
      this.client.disconnect();
      this.client = null;
    }
  }

  setActive(isActive: boolean): void {
    this.isActive = isActive;
    this.pollInterval = isActive ? POLL_INTERVAL_ACTIVE : POLL_INTERVAL_BACKGROUND;
    
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.startPolling();
    }
  }

  onStatusUpdate(callback: (status: NodeStatus) => void): void {
    this.statusCallbacks.push(callback);
  }

  private notifyStatusUpdate(status: NodeStatus): void {
    this.statusCallbacks.forEach(callback => callback(status));
  }

  async getNodeStatus(): Promise<NodeStatus | null> {
    if (!this.client) {
      const connected = await this.connect();
      if (!connected) {
        return null;
      }
    }

    try {
      const status = await this.client!.status();

      const nodeStatus: NodeStatus = {
        isConnected: true,
        latestBlockHeight: status.syncInfo.latestBlockHeight,
        latestBlockTime: new Date(status.syncInfo.latestBlockTime.toISOString()),
        isSyncing: status.syncInfo.catchingUp,
        peerCount: 8,
        nodeVersion: status.nodeInfo.version,
        chainId: status.nodeInfo.network,
      };

      this.notifyStatusUpdate(nodeStatus);
      return nodeStatus;
    } catch (error) {
      console.error('Failed to get node status:', error);
      return null;
    }
  }

  async getLatestBlock(): Promise<BlockInfo | null> {
    if (!this.client) {
      const connected = await this.connect();
      if (!connected) {
        return null;
      }
    }

    try {
      const block = await this.client!.block();
      
      return {
        height: block.block.header.height,
        time: new Date(block.block.header.time.toISOString()),
        chainId: block.block.header.chainId,
        proposer: toHex(block.block.header.proposerAddress),
        txCount: block.block.txs.length,
      };
    } catch (error) {
      console.error('Failed to fetch latest block:', error);
      return null;
    }
  }

  async getBlockByHeight(height: number): Promise<BlockInfo | null> {
    if (!this.client) {
      const connected = await this.connect();
      if (!connected) {
        return null;
      }
    }

    try {
      const block = await this.client!.block(height);
      
      return {
        height: block.block.header.height,
        time: new Date(block.block.header.time.toISOString()),
        chainId: block.block.header.chainId,
        proposer: toHex(block.block.header.proposerAddress),
        txCount: block.block.txs.length,
      };
    } catch (error) {
      console.error(`Failed to fetch block ${height}:`, error);
      return null;
    }
  }

  async getSyncProgress(): Promise<SyncProgress | null> {
    if (!this.client) {
      const connected = await this.connect();
      if (!connected) {
        return null;
      }
    }

    try {
      const status = await this.client!.status();
      const currentHeight = status.syncInfo.latestBlockHeight;
      const targetHeight = status.syncInfo.latestBlockHeight;
      
      const blocksRemaining = targetHeight - currentHeight;
      const percentComplete = targetHeight > 0 
        ? (currentHeight / targetHeight) * 100 
        : 100;

      return {
        currentHeight,
        targetHeight,
        percentComplete,
        blocksRemaining,
      };
    } catch (error) {
      console.error('Failed to get sync progress:', error);
      return null;
    }
  }

  startPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }

    this.pollTimer = setInterval(async () => {
      await this.getNodeStatus();
    }, this.pollInterval);

    this.getNodeStatus();
  }

  stopPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const status = await this.getNodeStatus();
      return status !== null && status.isConnected;
    } catch (error) {
      return false;
    }
  }
}

let lightClientInstance: LightClient | null = null;

export function getLightClient(useTestnet: boolean = false): LightClient {
  if (!lightClientInstance) {
    lightClientInstance = new LightClient(AEQUITAS_RPC_ENDPOINT, useTestnet);
  }
  return lightClientInstance;
}

export async function initializeLightClient(useTestnet: boolean = false): Promise<boolean> {
  const client = getLightClient(useTestnet);
  const connected = await client.connect();
  
  if (connected) {
    client.startPolling();
  }
  
  return connected;
}

export async function shutdownLightClient(): Promise<void> {
  if (lightClientInstance) {
    await lightClientInstance.disconnect();
    lightClientInstance = null;
  }
}
