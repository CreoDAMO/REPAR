import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Your Phone Is Your Nation</Text>
        <Text style={styles.heroSubtitle}>
          The Mobile Sovereign Network
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>11,000+</Text>
          <Text style={styles.statLabel}>Network Nodes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$131T</Text>
          <Text style={styles.statLabel}>Documented Debt</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>300M</Text>
          <Text style={styles.statLabel}>Descendants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>100+</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Guardian Status</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bronze Guardian</Text>
          <Text style={styles.cardText}>Running mobile light node</Text>
          <Text style={styles.cardText}>Governance voting enabled</Text>
          <Text style={styles.cardText}>⚖️ Building digital sovereignty</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Quick Stats</Text>
        <View style={styles.card}>
          <Text style={styles.listItem}>✓ Node Status: Syncing</Text>
          <Text style={styles.listItem}>✓ Battery Usage: &lt;5% per day</Text>
          <Text style={styles.listItem}>✓ Data Usage: ~200MB this month</Text>
          <Text style={styles.listItem}>✓ Uptime: 98.5%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 The Mission</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Enforce $131 trillion in reparations for the transatlantic slave trade.
            Your mobile node makes this network unstoppable.
          </Text>
          <Text style={styles.cardTextBold}>
            {'\n'}Can't shut down 11,000 nodes across 100 countries.
          </Text>
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
  hero: {
    padding: 24,
    backgroundColor: '#1E293B',
    borderBottomWidth: 2,
    borderBottomColor: '#D97706',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
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
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: 4,
  },
  cardTextBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 8,
  },
});
