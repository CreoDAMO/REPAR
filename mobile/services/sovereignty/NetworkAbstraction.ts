/**
 * Sovereign Network Abstraction Layer (SNAL)
 * 
 * Hardware-agnostic interfaces for sovereign communication.
 * Apps code against these interfaces - hardware implementations plug in.
 * 
 * Philosophy: Software defines capability, hardware merely implements.
 */

export interface ISovereignNetwork {
  // Core Methods (Hardware-Agnostic)
  connect(): Promise<void>
  disconnect(): Promise<void>
  send(data: Uint8Array, destination?: string): Promise<SendResult>
  receive(): AsyncIterableIterator<NetworkMessage>
  getStatus(): Promise<NetworkStatus>
  
  // Capabilities (Hardware reports what it can do)
  getCapabilities(): NetworkCapabilities
  
  // Metadata
  getName(): string
  isMock(): boolean
}

export interface SendResult {
  success: boolean
  path: string              // Which network was used
  latency: number           // milliseconds
  confirmations?: number    // For mesh networks (hops)
  error?: string            // If failed
}

export interface NetworkMessage {
  data: Uint8Array
  source: string
  timestamp: number
  path: string              // Which network delivered it
  metadata: NetworkMetadata
}

export interface NetworkMetadata {
  hopCount?: number         // Mesh hops
  satelliteId?: string      // For satellite messages
  signalStrength?: number   // For radio links
  simulated?: boolean       // For mock adapters
  [key: string]: any
}

export interface NetworkStatus {
  connected: boolean
  blockHeight?: number      // If blockchain-capable
  peers?: number           // Connected validators
  latency?: number         // Average ping
  lastBlock?: number       // Timestamp of last activity
}

export interface NetworkCapabilities {
  bandwidth: number         // bits per second
  latency: number           // milliseconds
  range: number             // meters (or Infinity for satellite)
  powerConsumption: number  // mW
  supportsMulticast: boolean
  supportsStealth: boolean
  requiresLicense: boolean
  geographicLimitation?: string // e.g., "line-of-sight", "urban-only"
}

export interface SendOptions {
  priority?: 'low' | 'normal' | 'high'
  stealth?: boolean         // Prefer anonymous paths
  maxLatency?: number       // milliseconds
  requiredConfirmations?: number // For mesh reliability
  destination?: string      // Target validator address
}

export interface NetworkPerformance {
  successRate: number       // 0.0 - 1.0
  averageLatency: number    // milliseconds
  totalMessages: number
  lastUsed: number          // timestamp
  errorCount: number
}

// Utility Types
export type NetworkType = 'internet' | 'satellite' | 'lora-mesh' | 'bluetooth-mesh' | 'wifi-direct'
export type NetworkMode = 'real' | 'mock'

// GNSS Position Proof Types
export interface GNSSPosition {
  latitude: number
  longitude: number
  altitude: number
  accuracy: number          // meters
  timestamp: number
  constellations: GNSSConstellation[]
  authenticated: boolean    // Galileo OSNMA verification
}

export interface GNSSConstellation {
  system: 'GPS' | 'GLONASS' | 'Galileo' | 'BeiDou'
  satelliteCount: number
  signalStrength: number    // dBm
  authenticated?: boolean   // OSNMA signature valid
}

export interface GNSSProof {
  position: GNSSPosition
  signature: string         // Galileo OSNMA signature
  imuCrossCheck: boolean    // Inertial measurement agrees
  nearbyValidators: string[]  // Crowd-sourced confirmation
  spoofingDetected: boolean
}
