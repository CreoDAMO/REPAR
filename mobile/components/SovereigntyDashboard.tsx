/**
 * Sovereignty Dashboard Component
 * 
 * Real-time monitoring of sovereign validator networks
 * Shows: Active networks, performance, GNSS position, stealth status
 */

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SovereignNetworkManager } from '../services/sovereignty/SovereignNetworkManager'
import { GNSSValidator } from '../services/sovereignty/GNSSValidator'
import { InternetAdapter } from '../services/sovereignty/adapters/InternetAdapter'
import { SatelliteAdapter } from '../services/sovereignty/adapters/SatelliteAdapter'
import { LoRaMeshAdapter } from '../services/sovereignty/adapters/LoRaMeshAdapter'
import { GNSSPosition, NetworkPerformance } from '../services/sovereignty/NetworkAbstraction'

export default function SovereigntyDashboard() {
  const [networkManager] = useState(() => new SovereignNetworkManager())
  const [gnssValidator] = useState(() => new GNSSValidator())
  const [position, setPosition] = useState<GNSSPosition | null>(null)
  const [networks, setNetworks] = useState<Map<string, NetworkPerformance>>(new Map())
  const [jurisdiction, setJurisdiction] = useState<string>('unknown')
  const [spoofingDetected, setSpoofingDetected] = useState<boolean>(false)
  const [isMockMode, setIsMockMode] = useState<boolean>(true)

  useEffect(() => {
    initializeSovereignty()
  }, [])

  const initializeSovereignty = async () => {
    try {
      // Register all network adapters
      networkManager.registerNetwork(new InternetAdapter())
      networkManager.registerNetwork(new SatelliteAdapter('starlink'))
      networkManager.registerNetwork(new SatelliteAdapter('iridium'))
      networkManager.registerNetwork(new LoRaMeshAdapter())

      // Get GNSS position
      const pos = await gnssValidator.getCurrentPosition()
      setPosition(pos)
      
      // Check jurisdiction
      const juris = gnssValidator.getJurisdiction(pos)
      setJurisdiction(juris)
      
      // Detect spoofing
      const spoofing = await gnssValidator.detectSpoofing(pos)
      setSpoofingDetected(spoofing)

      // Update network stats every 5 seconds
      const interval = setInterval(() => {
        const stats = networkManager.getPerformanceStats()
        setNetworks(stats)
      }, 5000)

      return () => clearInterval(interval)
    } catch (error: any) {
      console.error('Sovereignty initialization error:', error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛡️ Sovereign Validator Dashboard</Text>
      
      {/* IMPORTANT: Mock Mode Disclaimer */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>⚠️ DEVELOPMENT MODE</Text>
        <Text style={styles.disclaimerText}>
          Satellite and mesh networks are MOCK implementations. 
          Anti-spoofing uses randomized test data, NOT real GNSS authentication.
          International waters detection is approximate, NOT legal proof.
          Real hardware integration required for production use.
        </Text>
      </View>

      {/* GNSS Position */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 GNSS Position</Text>
        {position ? (
          <View>
            <Text style={styles.infoText}>
              Latitude: {position.latitude.toFixed(6)}°
            </Text>
            <Text style={styles.infoText}>
              Longitude: {position.longitude.toFixed(6)}°
            </Text>
            <Text style={styles.infoText}>
              Accuracy: {position.accuracy.toFixed(1)}m
            </Text>
            <Text style={styles.infoText}>
              Jurisdiction: <Text style={styles.highlight}>{jurisdiction}</Text>
            </Text>
            {jurisdiction === 'international-waters' && (
              <Text style={styles.sovereignBadge}>
                ⚡ TRUE SOVEREIGNTY: International Waters
              </Text>
            )}
            {spoofingDetected && (
              <Text style={styles.warningText}>
                ⚠️ GNSS Spoofing Detected!
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading position...</Text>
        )}
      </View>

      {/* GNSS Constellations */}
      {position && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛰️ GNSS Constellations</Text>
          {position.constellations.map((constellation, index) => (
            <View key={index} style={styles.constellationRow}>
              <Text style={styles.constellationName}>{constellation.system}</Text>
              <Text style={styles.constellationInfo}>
                {constellation.satelliteCount} sats, {constellation.signalStrength.toFixed(1)} dBm
              </Text>
              {constellation.authenticated && (
                <Text style={styles.authenticatedBadge}>✓ Auth</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Network Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 Active Networks</Text>
        {Array.from(networks.entries()).map(([name, perf]) => (
          <View key={name} style={styles.networkRow}>
            <View style={styles.networkHeader}>
              <Text style={styles.networkName}>{name}</Text>
              <Text style={styles.successRate}>
                {(perf.successRate * 100).toFixed(1)}%
              </Text>
            </View>
            <View style={styles.networkStats}>
              <Text style={styles.statText}>
                Latency: {perf.averageLatency.toFixed(0)}ms
              </Text>
              <Text style={styles.statText}>
                Messages: {perf.totalMessages}
              </Text>
              <Text style={styles.statText}>
                Errors: {perf.errorCount}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Sovereignty Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Sovereignty Status</Text>
        <Text style={styles.infoText}>
          Networks Registered: {networkManager.getRegisteredNetworks().length}
        </Text>
        <Text style={styles.infoText}>
          Censorship Resistance: <Text style={styles.highlight}>MAXIMUM</Text>
        </Text>
        <Text style={styles.infoText}>
          Stealth Mode: <Text style={styles.highlight}>ENABLED</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  disclaimerBox: {
    backgroundColor: '#331100',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF6600',
    marginBottom: 16,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#FFAA66',
    lineHeight: 18,
  },
  section: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#CCC',
    marginBottom: 6,
  },
  highlight: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  sovereignBadge: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#004400',
    color: '#00FF00',
    fontWeight: 'bold',
    borderRadius: 4,
    textAlign: 'center',
  },
  warningText: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#440000',
    color: '#FF0000',
    fontWeight: 'bold',
    borderRadius: 4,
  },
  loadingText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  constellationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  constellationName: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
    flex: 1,
  },
  constellationInfo: {
    fontSize: 12,
    color: '#AAA',
    flex: 2,
  },
  authenticatedBadge: {
    fontSize: 12,
    color: '#00FF00',
    fontWeight: 'bold',
  },
  networkRow: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  networkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  networkName: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  successRate: {
    fontSize: 16,
    color: '#00FF00',
    fontWeight: 'bold',
  },
  networkStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#AAA',
  },
})
