import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useNodeStore } from '../../stores/nodeStore';
import { initializeLightClient, getLightClient } from '../../services/lightClient';
import { BackgroundSyncService } from '../../services/backgroundSync';

export default function NodeScreen() {
  const { status, isRunning, setStatus, setRunning } = useNodeStore();
  const [isLoading, setIsLoading] = useState(true);
  const [batteryUsage, setBatteryUsage] = useState(4.2);
  const [dataUsage, setDataUsage] = useState(0);
  const [uptimePercent, setUptimePercent] = useState(98.5);

  useEffect(() => {
    initializeNode();
    const interval = setInterval(updateNodeStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const initializeNode = async () => {
    setIsLoading(true);
    const connected = await initializeLightClient();
    setRunning(connected);
    
    if (connected) {
      await updateNodeStats();
    }
    
    const battery = await BackgroundSyncService.getBatteryInfo();
    setBatteryUsage(battery.usagePercentPerDay);
    
    setIsLoading(false);
  };

  const updateNodeStats = async () => {
    const client = getLightClient();
    const nodeStatus = await client.getNodeStatus();
    
    if (nodeStatus) {
      setStatus(nodeStatus);
    }
    
    const syncStats = BackgroundSyncService.getSyncStats();
    setDataUsage(syncStats.dataUsageMB);
    setUptimePercent(BackgroundSyncService.getUptimePercentage());
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Initializing node...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, isRunning && styles.statusDotActive]} />
          <Text style={styles.statusText}>
            {isRunning ? 'Node Running' : 'Node Stopped'}
          </Text>
        </View>
      </View>

      <View style={styles.guardianCard}>
        <Text style={styles.guardianBadge}>🥉 BRONZE GUARDIAN</Text>
        <Text style={styles.guardianText}>Mobile Light Node</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{uptimePercent.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Uptime</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{batteryUsage.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Battery/Day</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{dataUsage.toFixed(0)}MB</Text>
          <Text style={styles.statLabel}>Data This Month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{status?.peerCount || 8}</Text>
          <Text style={styles.statLabel}>Network Peers</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sync Status</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Chain Height: {status?.latestBlockHeight.toLocaleString() || 'Connecting...'}
          </Text>
          <Text style={styles.cardText}>
            Sync Status: {status?.isSyncing ? 'Syncing...' : 'Fully Synced'}
          </Text>
          <Text style={styles.cardText}>Sync Mode: Light Client</Text>
          <Text style={styles.cardText}>Peers: {status?.peerCount || 0} connected</Text>
          <TouchableOpacity onPress={updateNodeStats}>
            <Text style={styles.refreshText}>🔄 Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Node Information</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Chain: {status?.chainId || 'aequitas-1'}</Text>
          <Text style={styles.cardText}>Version: {status?.nodeVersion || '1.0.0'}</Text>
          <Text style={styles.cardText}>Type: Mobile Light Node</Text>
          <Text style={styles.cardText}>Status: {isRunning ? 'Active' : 'Stopped'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <View style={styles.card}>
          <Text style={styles.impactText}>
            By running this mobile light node, you are:
          </Text>
          <Text style={styles.listItem}>{'\n'}✓ Securing the Aequitas network</Text>
          <Text style={styles.listItem}>✓ Participating in governance</Text>
          <Text style={styles.listItem}>✓ Making the network unstoppable</Text>
          <Text style={styles.listItem}>✓ Building digital sovereignty</Text>
          <Text style={styles.impactFooter}>
            {'\n'}Your phone is your nation. Your participation is justice.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>🥈 Upgrade to Silver Guardian</Text>
          <Text style={styles.upgradeButtonSubtext}>Run a home/RPi validator for rewards</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#94A3B8',
  },
  refreshText: {
    fontSize: 14,
    color: '#F59E0B',
    marginTop: 12,
  },
  header: {
    padding: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#64748B',
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 16,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  guardianCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CD7F32',
    alignItems: 'center',
  },
  guardianBadge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD7F32',
    marginBottom: 8,
  },
  guardianText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardText: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 8,
  },
  impactText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#CBD5E1',
    marginLeft: 4,
  },
  impactFooter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#C0C0C0',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C0C0C0',
    marginBottom: 4,
  },
  upgradeButtonSubtext: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
