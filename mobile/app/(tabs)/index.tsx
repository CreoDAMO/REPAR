import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Your Phone Is Your Nation</Text>
        <Text style={styles.heroSubtitle}>
          The Reunification Infrastructure
        </Text>
        <Text style={styles.heroMessage}>
          Countering 400 years of Willie Lynch division
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
        <Text style={styles.sectionTitle}>🌍 The Reunification Mission</Text>
        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>Willie Lynch Divided Us. We're Reuniting.</Text>
          <Text style={styles.missionText}>
            For 400 years, we've been divided by:
          </Text>
          <Text style={styles.divisionList}>
            {'\n'}• Geography (scattered across continents)
            {'\n'}• Skin tone (colorism hierarchies)
            {'\n'}• Gender (distrust between men & women)
            {'\n'}• Class (house vs field mentalities)
            {'\n'}• Generation (broken knowledge transfer)
          </Text>
          <Text style={styles.missionSolution}>
            {'\n'}Aequitas Protocol is the reunification infrastructure:
          </Text>
          <Text style={styles.solutionList}>
            {'\n'}✅ DNA verification proves we're one people
            {'\n'}✅ Blockchain territory = undivided ground
            {'\n'}✅ $REPAR currency unifies economic power
            {'\n'}✅ Mobile app = shared citizenship
            {'\n'}✅ 11,000+ nodes = unstoppable network
          </Text>
          
          <TouchableOpacity 
            style={styles.missionButton}
            onPress={() => router.push('/mission')}
          >
            <Text style={styles.missionButtonText}>Read Full Mission →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚖️ The Beautiful Irony</Text>
        <View style={styles.card}>
          <Text style={styles.cardTextBold}>Willie Lynch's Greatest Fear:</Text>
          <Text style={styles.cardText}>
            {'\n'}A united Black people with shared economic power, territory, and political organization.
          </Text>
          <Text style={styles.cardTextBold}>
            {'\n'}What Aequitas Delivers:
          </Text>
          <Text style={styles.cardText}>
            {'\n'}Exactly that - through digital infrastructure that can't be divided again.
          </Text>
          <Text style={styles.ironyFooter}>
            {'\n'}After 300+ years, his strategy finally meets its match.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Your Impact</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            By running this mobile validator, you are:
          </Text>
          <Text style={styles.impactList}>
            {'\n'}🌍 Connecting 100+ countries in real-time
            {'\n'}⚖️ Making the network unstoppable
            {'\n'}💪 Countering geographic division
            {'\n'}🔗 Proving: 300M descendants = 1 nation
          </Text>
          <Text style={styles.impactFooter}>
            {'\n'}The division ends. The reunification begins. The nation exists.
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
    marginBottom: 8,
  },
  heroMessage: {
    fontSize: 13,
    color: '#10B981',
    fontStyle: 'italic',
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
  missionCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 12,
  },
  missionText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  divisionList: {
    fontSize: 13,
    color: '#EF4444',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  missionSolution: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 4,
  },
  solutionList: {
    fontSize: 13,
    color: '#10B981',
    lineHeight: 22,
    fontWeight: 'bold',
  },
  missionButton: {
    backgroundColor: '#F59E0B',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  missionButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  ironyFooter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
    fontStyle: 'italic',
    marginTop: 4,
  },
  impactList: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 24,
  },
  impactFooter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
