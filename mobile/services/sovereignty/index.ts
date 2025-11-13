/**
 * Sovereign Validator Infrastructure - Public API
 * 
 * Export all sovereignty components for easy import:
 * import { SovereignNetworkManager, GNSSValidator } from '../services/sovereignty'
 */

export { SovereignNetworkManager } from './SovereignNetworkManager'
export { GNSSValidator } from './GNSSValidator'

export { InternetAdapter } from './adapters/InternetAdapter'
export { SatelliteAdapter } from './adapters/SatelliteAdapter'
export { LoRaMeshAdapter } from './adapters/LoRaMeshAdapter'

export type {
  ISovereignNetwork,
  SendResult,
  NetworkMessage,
  NetworkStatus,
  NetworkCapabilities,
  SendOptions,
  NetworkPerformance,
  NetworkType,
  NetworkMode,
  GNSSPosition,
  GNSSConstellation,
  GNSSProof
} from './NetworkAbstraction'
