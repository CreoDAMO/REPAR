/**
 * Internet Network Adapter (Real Implementation)
 * 
 * Uses standard HTTP/WebSocket for blockchain communication
 * This is the DEFAULT adapter - always available on smartphones
 */

import NetInfo from '@react-native-community/netinfo'
import * as Crypto from 'expo-crypto'
import {
  ISovereignNetwork,
  SendResult,
  NetworkMessage,
  NetworkStatus,
  NetworkCapabilities
} from '../NetworkAbstraction'

export class InternetAdapter implements ISovereignNetwork {
  private connected: boolean = false
  private rpcEndpoint: string
  private websocket?: WebSocket
  private messageHandlers: Set<(message: NetworkMessage) => void> = new Set()

  constructor(rpcEndpoint: string = 'https://rpc.aequitas.zone') {
    this.rpcEndpoint = rpcEndpoint
  }

  async connect(): Promise<void> {
    // Check network connectivity
    const netState = await NetInfo.fetch()
    
    if (!netState.isConnected) {
      throw new Error('No internet connection available')
    }
    
    // Connect WebSocket for real-time updates
    this.websocket = new WebSocket(this.rpcEndpoint.replace('https', 'wss') + '/websocket')
    
    this.websocket.onopen = () => {
      this.connected = true
      console.log('✅ Internet adapter connected')
    }
    
    this.websocket.onmessage = (event) => {
      // React Native compatible decoding (no Buffer dependency)
      let dataBytes: Uint8Array
      if (typeof event.data === 'string') {
        // Text message - encode to bytes
        const encoder = new TextEncoder()
        dataBytes = encoder.encode(event.data)
      } else if (event.data instanceof ArrayBuffer) {
        // Binary message
        dataBytes = new Uint8Array(event.data)
      } else {
        // Fallback for Blob or other types
        dataBytes = new Uint8Array(0)
      }
      
      const message: NetworkMessage = {
        data: dataBytes,
        source: this.rpcEndpoint,
        timestamp: Date.now(),
        path: 'internet',
        metadata: { simulated: false }
      }
      
      // Notify all handlers
      this.messageHandlers.forEach(handler => handler(message))
    }
    
    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.connected = false
    }
    
    this.websocket.onclose = () => {
      this.connected = false
      console.log('WebSocket closed')
    }
  }

  async disconnect(): Promise<void> {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = undefined
    }
    this.connected = false
  }

  async send(data: Uint8Array, destination?: string): Promise<SendResult> {
    const startTime = Date.now()
    
    try {
      // Send via HTTP POST to RPC endpoint
      // React Native compatible base64 encoding (no Buffer dependency)
      const base64Tx = this.uint8ArrayToBase64(data)
      
      const response = await fetch(`${this.rpcEndpoint}/broadcast_tx_sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tx: base64Tx
        })
      })
      
      const latency = Date.now() - startTime
      
      if (!response.ok) {
        return {
          success: false,
          path: 'internet',
          latency,
          error: `HTTP ${response.status}: ${response.statusText}`
        }
      }
      
      const result = await response.json()
      
      return {
        success: result.code === 0,
        path: 'internet',
        latency,
        error: result.code !== 0 ? result.log : undefined
      }
    } catch (error: any) {
      return {
        success: false,
        path: 'internet',
        latency: Date.now() - startTime,
        error: error.message
      }
    }
  }

  async *receive(): AsyncIterableIterator<NetworkMessage> {
    // This is handled by WebSocket onmessage
    // For consistency with the interface, we yield from a queue
    const messageQueue: NetworkMessage[] = []
    let resolveNext: ((value: IteratorResult<NetworkMessage>) => void) | null = null
    
    const handler = (message: NetworkMessage) => {
      if (resolveNext) {
        resolveNext({ value: message, done: false })
        resolveNext = null
      } else {
        messageQueue.push(message)
      }
    }
    
    this.messageHandlers.add(handler)
    
    try {
      while (true) {
        if (messageQueue.length > 0) {
          yield messageQueue.shift()!
        } else {
          // Wait for next message
          await new Promise<IteratorResult<NetworkMessage>>((resolve) => {
            resolveNext = resolve
          })
        }
      }
    } finally {
      this.messageHandlers.delete(handler)
    }
  }

  async getStatus(): Promise<NetworkStatus> {
    try {
      const response = await fetch(`${this.rpcEndpoint}/status`)
      const status = await response.json()
      
      return {
        connected: this.connected,
        blockHeight: parseInt(status.result.sync_info.latest_block_height),
        peers: status.result.node_info.network === 'aequitas-1' ? 100 : 0,
        latency: 50, // Typical internet latency
        lastBlock: parseInt(status.result.sync_info.latest_block_time)
      }
    } catch (error) {
      return {
        connected: false
      }
    }
  }

  getCapabilities(): NetworkCapabilities {
    return {
      bandwidth: 10_000_000, // 10 Mbps (typical 4G/5G)
      latency: 50,           // 50ms typical
      range: Infinity,       // Global coverage
      powerConsumption: 500, // 500mW typical for cellular
      supportsMulticast: false,
      supportsStealth: false,
      requiresLicense: false,
      geographicLimitation: 'cellular-coverage'
    }
  }

  getName(): string {
    return 'internet'
  }

  isMock(): boolean {
    return false
  }
  
  /**
   * Convert Uint8Array to base64 (React Native compatible using expo-crypto)
   */
  private uint8ArrayToBase64(bytes: Uint8Array): string {
    // expo-crypto.digest returns hex, but we can manually convert to base64
    // Simpler: use base64 conversion via binary string (works in RN)
    let binary = ''
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    // Use built-in atob/btoa polyfill from react-native-get-random-values
    // OR manual base64 encoding
    return this.base64Encode(binary)
  }
  
  /**
   * Manual base64 encoding (works everywhere including React Native)
   */
  private base64Encode(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    let result = ''
    let i = 0
    
    while (i < str.length) {
      const a = str.charCodeAt(i++)
      const b = str.charCodeAt(i++)
      const c = str.charCodeAt(i++)
      
      const bitmap = (a << 16) | (b << 8) | c
      
      result += chars[(bitmap >> 18) & 63]
      result += chars[(bitmap >> 12) & 63]
      result += isNaN(b) ? '=' : chars[(bitmap >> 6) & 63]
      result += isNaN(c) ? '=' : chars[bitmap & 63]
    }
    
    return result
  }
}
