import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function GovernanceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DAO Governance</Text>
        <Text style={styles.headerSubtitle}>Participate in nation-building</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Active Proposals</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Your Votes</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Proposals</Text>
        <View style={styles.card}>
          <Text style={styles.emptyState}>No active proposals</Text>
          <Text style={styles.emptyStateSubtext}>
            Check back soon for governance proposals
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Voting Power</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            As a <Text style={styles.bold}>Bronze Guardian</Text>, you have voting rights on:
          </Text>
          <Text style={styles.listItem}>{'\n'}• Governance proposals</Text>
          <Text style={styles.listItem}>• Defendant settlements</Text>
          <Text style={styles.listItem}>• Protocol upgrades</Text>
          <Text style={styles.listItem}>• Treasury allocations</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How Voting Works</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            1. Proposals are submitted by the community
          </Text>
          <Text style={styles.cardText}>
            {'\n'}2. Voting period: 7 days
          </Text>
          <Text style={styles.cardText}>
            {'\n'}3. Quorum: 33% of voting power
          </Text>
          <Text style={styles.cardText}>
            {'\n'}4. Passage: Simple majority
          </Text>
          <Text style={styles.cardText}>
            {'\n'}5. Implementation: Automatic on-chain execution
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.card}>
          <Text style={styles.emptyState}>No recent votes</Text>
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
    padding: 24,
    backgroundColor: '#1E293B',
    borderBottomWidth: 2,
    borderBottomColor: '#D97706',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
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
    lineHeight: 20,
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
    marginLeft: 8,
  },
});
