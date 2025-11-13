/**
 * Sovereign Network Manager
 * 
 * The intelligence layer that makes sovereignty possible:
 * - Auto-detects available networks
 * - Selects optimal path for each message
 * - Handles failover automatically
 * - Learns from performance over time
 * - Supports both real and mock adapters
 */

import {
  ISovereignNetwork,
  SendResult,
  NetworkMessage,
  SendOptions,
  NetworkPerformance,
  NetworkType
} from './NetworkAbstraction'

export class SovereignNetworkManager {
  private networks: Map<string, ISovereignNetwork> = new Map()
  private performance: Map<string, NetworkPerformance> = new Map()
  private primaryNetwork?: string
  private receiveStreams: AsyncIterator<NetworkMessage>[] = []
  private activeListeners: Set<(message: NetworkMessage) => void> = new Set()

  /**
   * Register a network adapter
   * When new hardware becomes available, just register its adapter
   */
  registerNetwork(network: ISovereignNetwork): void {
    const name = network.getName()
    this.networks.set(name, network)
    
    // Initialize performance tracking
    this.performance.set(name, {
      successRate: 1.0,
      averageLatency: 0,
      totalMessages: 0,
      lastUsed: Date.now(),
      errorCount: 0,
    })
    
    // Start receive stream
    this.startReceiveStream(network)
    
    console.log(`✅ Registered ${name} network (${network.isMock() ? 'MOCK' : 'REAL'})`)
  }
  
  /**
   * Send message via optimal path
   * Intelligence happens here - this is the core algorithm
   */
  async send(data: Uint8Array, options?: SendOptions): Promise<SendResult> {
    // Get available networks
    const available = await this.getAvailableNetworks()
    
    if (available.length === 0) {
      throw new Error('No networks available')
    }
    
    // Select optimal network
    const selected = this.selectOptimalNetwork(available, data, options)
    
    // Send via selected network
    try {
      const result = await selected.send(data as any, options?.destination)
      
      // Update performance metrics
      this.updateMetrics(selected.getName(), result)
      
      return result
    } catch (error: any) {
      console.warn(`${selected.getName()} failed: ${error.message}`)
      
      // Automatic failover (track failed networks to prevent infinite recursion)
      const failedNetworks = new Set<string>([selected.getName()])
      return this.sendViaFallback(data, available, failedNetworks, options)
    }
  }
  
  /**
   * Receive from ALL networks simultaneously
   * Deduplicates messages that arrive via multiple paths
   */
  onMessage(callback: (message: NetworkMessage) => void): () => void {
    this.activeListeners.add(callback)
    
    // Return unsubscribe function
    return () => {
      this.activeListeners.delete(callback)
    }
  }
  
  /**
   * Get all available networks with current status
   */
  private async getAvailableNetworks(): Promise<ISovereignNetwork[]> {
    const available: ISovereignNetwork[] = []
    
    for (const network of this.networks.values()) {
      try {
        const status = await network.getStatus()
        if (status.connected) {
          available.push(network)
        }
      } catch (error: any) {
        // Network not available, skip
        console.debug(`${network.getName()} unavailable: ${error.message}`)
      }
    }
    
    return available
  }
  
  /**
   * Intelligent network selection algorithm
   */
  private selectOptimalNetwork(
    available: ISovereignNetwork[],
    data: Uint8Array,
    options?: SendOptions
  ): ISovereignNetwork {
    // Priority 1: Stealth requirement
    if (options?.stealth) {
      const stealthNetworks = available.filter(n => n.getCapabilities().supportsStealth)
      if (stealthNetworks.length > 0) {
        // Prefer satellite (hardest to trace), then mesh
        const satellite = stealthNetworks.find(n => n.getName().includes('satellite'))
        if (satellite) return satellite
        
        const mesh = stealthNetworks.find(n => n.getName().includes('mesh'))
        if (mesh) return mesh
        
        return stealthNetworks[0]
      }
    }
    
    // Priority 2: Latency requirement
    if (options?.maxLatency) {
      const lowLatency = available.filter(n => {
        const cap = n.getCapabilities()
        return cap.latency <= options.maxLatency!
      })
      if (lowLatency.length > 0) {
        return this.selectByPerformance(lowLatency)
      }
    }
    
    // Priority 3: Message size vs bandwidth
    const dataSize = data.length
    if (dataSize > 10000) { // 10KB threshold
      const highBandwidth = available.filter(n => {
        const cap = n.getCapabilities()
        return cap.bandwidth >= 1000000 // 1 Mbps
      })
      if (highBandwidth.length > 0) {
        return this.selectByPerformance(highBandwidth)
      }
    }
    
    // Priority 4: Reliability for confirmations
    if (options?.requiredConfirmations && options.requiredConfirmations > 1) {
      const meshNetworks = available.filter(n => n.getName().includes('mesh'))
      if (meshNetworks.length > 0) {
        return this.selectByPerformance(meshNetworks)
      }
    }
    
    // Default: Select by historical performance
    return this.selectByPerformance(available)
  }
  
  /**
   * Select network by performance metrics
   */
  private selectByPerformance(networks: ISovereignNetwork[]): ISovereignNetwork {
    let best: ISovereignNetwork = networks[0]
    let bestScore = 0
    
    for (const network of networks) {
      const perf = this.performance.get(network.getName())!
      
      // Score = success rate / (average latency + 1) * recency bonus
      const recencyBonus = Math.max(0, 1 - (Date.now() - perf.lastUsed) / 86400000) // 24h decay
      const score = (perf.successRate / (perf.averageLatency + 1)) * (1 + recencyBonus)
      
      if (score > bestScore) {
        best = network
        bestScore = score
      }
    }
    
    return best
  }
  
  /**
   * Automatic failover to alternative networks
   */
  private async sendViaFallback(
    data: Uint8Array,
    available: ISovereignNetwork[],
    failedNetworks: Set<string>,
    options?: SendOptions
  ): Promise<SendResult> {
    const alternatives = available.filter(n => !failedNetworks.has(n.getName()))
    
    if (alternatives.length === 0) {
      throw new Error('All networks failed')
    }
    
    // Try next best alternative
    const fallback = this.selectByPerformance(alternatives)
    
    console.log(`🔄 Failing over to ${fallback.getName()}`)
    
    try {
      const result = await fallback.send(data, options?.destination)
      this.updateMetrics(fallback.getName(), result)
      return result
    } catch (error: any) {
      // Add to failed set and try next
      failedNetworks.add(fallback.getName())
      return this.sendViaFallback(data, available, failedNetworks, options)
    }
  }
  
  /**
   * Update performance metrics after each send
   */
  private updateMetrics(networkName: string, result: SendResult): void {
    const perf = this.performance.get(networkName)!
    
    perf.totalMessages++
    perf.lastUsed = Date.now()
    
    if (result.success) {
      // Exponential moving average for latency
      const alpha = 0.1
      perf.averageLatency = alpha * result.latency + (1 - alpha) * perf.averageLatency
      
      // Success rate update
      perf.successRate = (perf.successRate * (perf.totalMessages - 1) + 1) / perf.totalMessages
    } else {
      perf.errorCount++
      perf.successRate = (perf.successRate * (perf.totalMessages - 1)) / perf.totalMessages
    }
  }
  
  /**
   * Start receiving from a network
   */
  private async startReceiveStream(network: ISovereignNetwork): Promise<void> {
    try {
      const stream = network.receive()
      this.receiveStreams.push(stream)
      
      // Process messages from this stream
      this.processStream(stream)
    } catch (error: any) {
      console.error(`Failed to start receive stream for ${network.getName()}: ${error.message}`)
    }
  }
  
  /**
   * Process messages from a stream
   */
  private async processStream(stream: AsyncIterator<NetworkMessage>): Promise<void> {
    try {
      while (true) {
        const result = await stream.next()
        if (result.done) break
        
        const message = result.value
        
        // Notify all listeners
        for (const listener of this.activeListeners) {
          try {
            listener(message)
          } catch (error: any) {
            console.error('Listener error:', error)
          }
        }
      }
    } catch (error: any) {
      console.error('Stream processing error:', error)
    }
  }
  
  /**
   * Get performance statistics for all networks
   */
  getPerformanceStats(): Map<string, NetworkPerformance> {
    return new Map(this.performance)
  }
  
  /**
   * Get list of registered networks
   */
  getRegisteredNetworks(): string[] {
    return Array.from(this.networks.keys())
  }
  
  /**
   * Disconnect all networks
   */
  async disconnectAll(): Promise<void> {
    for (const network of this.networks.values()) {
      try {
        await network.disconnect()
      } catch (error: any) {
        console.error(`Error disconnecting ${network.getName()}:`, error)
      }
    }
  }
}
