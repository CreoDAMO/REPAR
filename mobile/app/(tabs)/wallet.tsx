import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useWalletStore } from '../../stores/walletStore';
import { WalletService } from '../../services/wallet';
import { CreateWalletModal } from '../../components/CreateWalletModal';

export default function WalletScreen() {
  const { address, balance, isConnected, setAddress, setBalance, setConnected } = useWalletStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkExistingWallet();
  }, []);

  useEffect(() => {
    if (address && isConnected) {
      refreshBalance();
    }
  }, [address, isConnected]);

  const checkExistingWallet = async () => {
    setIsLoading(true);
    try {
      const walletAddress = await WalletService.getAddress();
      if (walletAddress) {
        setAddress(walletAddress);
        setConnected(true);
      }
    } catch (error) {
      console.error('Error checking wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = async () => {
    if (!address) return;
    
    setIsRefreshing(true);
    try {
      const newBalance = await WalletService.getBalance(address);
      setBalance(newBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnect = async () => {
    Alert.alert(
      'Disconnect Wallet',
      'Are you sure you want to disconnect? Your wallet will remain secure on this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            setAddress(null);
            setBalance('0.00');
            setConnected(false);
          },
        },
      ]
    );
  };

  const handleWalletCreated = (newAddress: string) => {
    setAddress(newAddress);
    setConnected(true);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Loading wallet...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isConnected ? '✓ Connected' : '○ Not Connected'}
        </Text>
        {isConnected && address && (
          <Text style={styles.addressText}>
            {address.slice(0, 12)}...{address.slice(-8)}
          </Text>
        )}
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>$REPAR Balance</Text>
        <Text style={styles.balanceValue}>{balance}</Text>
        <Text style={styles.balanceUsd}>≈ $0.00 USD</Text>
        {isConnected && (
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={refreshBalance}
            disabled={isRefreshing}
          >
            <Text style={styles.refreshButtonText}>
              {isRefreshing ? 'Refreshing...' : '🔄 Refresh'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actions}>
        {!isConnected ? (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Text style={styles.actionButtonText}>Connect Wallet</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Send', 'Send feature coming soon')}
            >
              <Text style={styles.actionButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={() => Alert.alert('Receive', 'Receive feature coming soon')}
            >
              <Text style={styles.actionButtonTextSecondary}>Receive</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {isConnected && (
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.disconnectButton}
            onPress={handleDisconnect}
          >
            <Text style={styles.disconnectButtonText}>Disconnect Wallet</Text>
          </TouchableOpacity>
        </View>
      )}

      <CreateWalletModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleWalletCreated}
      />

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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#94A3B8',
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
  addressText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'monospace',
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
  refreshButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderRadius: 6,
  },
  refreshButtonText: {
    fontSize: 14,
    color: '#F59E0B',
  },
  disconnectButton: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disconnectButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
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
