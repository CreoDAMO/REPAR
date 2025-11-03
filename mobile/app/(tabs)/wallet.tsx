import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function WalletScreen() {
  const [balance] = useState('0.00');
  const [isConnected] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isConnected ? 'Connected' : 'Not Connected'}
        </Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>$REPAR Balance</Text>
        <Text style={styles.balanceValue}>{balance}</Text>
        <Text style={styles.balanceUsd}>≈ $0.00 USD</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Connect Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
          <Text style={styles.actionButtonTextSecondary}>Scan QR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About $REPAR</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>$REPAR</Text> is the native coin (NOT token) of the Aequitas Zone blockchain.
          </Text>
          <Text style={styles.cardText}>
            {'\n'}Total Supply: 131 trillion REPAR
          </Text>
          <Text style={styles.cardText}>
            Purpose: Enforce $131T reparations debt
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.card}>
          <Text style={styles.emptyState}>No transactions yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Connect your wallet to view transaction history
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.card}>
          <Text style={styles.listItem}>✓ Send/receive $REPAR</Text>
          <Text style={styles.listItem}>✓ Biometric security</Text>
          <Text style={styles.listItem}>✓ Transaction history</Text>
          <Text style={styles.listItem}>✓ WalletConnect support</Text>
          <Text style={styles.listItem}>✓ QR code payments</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  balanceCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D97706',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  balanceUsd: {
    fontSize: 16,
    color: '#64748B',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#D97706',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonSecondary: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#D97706',
  },
  actionButtonTextSecondary: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: 'bold',
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
    lineHeight: 20,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  emptyState: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
  },
  listItem: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 8,
  },
});
