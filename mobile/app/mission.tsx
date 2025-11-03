import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MissionScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Mission</Text>
        <Text style={styles.headerSubtitle}>The Reunification Infrastructure</Text>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroText}>🌍</Text>
        <Text style={styles.heroTitle}>The 400-Year Division Ends Now</Text>
        <Text style={styles.heroSubtext}>
          Willie Lynch's 1712 blueprint divided us. Aequitas Protocol reunites us.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Problem: 8 Deliberate Divisions</Text>
        
        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>1. Age Division</Text>
          <Text style={styles.divisionText}>
            "Young people don't respect elders" / "Old heads are out of touch"
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: Blockchain as permanent intergenerational ledger
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>2. Skin Tone Division</Text>
          <Text style={styles.divisionText}>
            Colorism hierarchies, "good hair" vs "bad hair"
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: Crypto addresses have no skin tone
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>3. Gender Division</Text>
          <Text style={styles.divisionText}>
            "Black men ain't sh*t" / "Black women are difficult"
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: DAO governance requires collective consensus
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>4. Class Division</Text>
          <Text style={styles.divisionText}>
            "Bougie" vs "ghetto", accusations of "selling out"
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: Guardian Program has inclusive tiers
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>5. Geographic Division</Text>
          <Text style={styles.divisionText}>
            African Americans vs Africans, Caribbean vs American
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: Single blockchain territory, works globally
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>6. Educational Division</Text>
          <Text style={styles.divisionText}>
            "You talk white", anti-intellectualism
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: Mobile-first UX, anyone can validate
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>7. Religious Division</Text>
          <Text style={styles.divisionText}>
            Christian vs Muslim, denominational conflicts
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: Secular infrastructure, works for all faiths
          </Text>
        </View>

        <View style={styles.divisionCard}>
          <Text style={styles.divisionTitle}>8. Political Division</Text>
          <Text style={styles.divisionText}>
            "Revolutionary" vs "Assimilationist" infighting
          </Text>
          <Text style={styles.counterText}>
            ✅ Aequitas: DAO governance = direct democracy
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Solution: Reunification Infrastructure</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔗 What Aequitas Actually Is</Text>
          <Text style={styles.listItem}>
            {'\n'}✅ Digital nation-state infrastructure for 300M people
          </Text>
          <Text style={styles.listItem}>
            ✅ Reunification technology countering 400 years of division
          </Text>
          <Text style={styles.listItem}>
            ✅ Economic enforcement for $131T in documented liability
          </Text>
          <Text style={styles.listItem}>
            ✅ Permanent territory that can't be gentrified or taken away
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Beautiful Mathematics</Text>
        <View style={styles.mathCard}>
          <Text style={styles.mathTitle}>Willie Lynch's Strategy:</Text>
          <Text style={styles.mathText}>
            Divide 300 million people 8 different ways
            {'\n'}Result: 2⁸ = 256 fragments, all fighting each other
            {'\n'}Outcome: No unified economic or political power
          </Text>
        </View>

        <View style={styles.mathCard}>
          <Text style={styles.mathTitle}>Aequitas Protocol's Counter:</Text>
          <Text style={styles.mathText}>
            ✅ DNA verification: Prove shared ancestry
            {'\n'}✅ Blockchain territory: Single digital jurisdiction
            {'\n'}✅ $REPAR currency: Unified economic system
            {'\n'}✅ DAO governance: Collective decision-making
            {'\n'}✅ Mobile validators: 11,000+ nodes worldwide
          </Text>
          <Text style={styles.mathResult}>
            {'\n'}Result: 256 fragments → 1 nation
            {'\n'}Division ends. Power unified.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Role as a Mobile Validator</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            By running this app, you are countering:
          </Text>
          <Text style={styles.listItem}>
            {'\n'}🌍 Geographic Division - Your node connects 100+ countries
          </Text>
          <Text style={styles.listItem}>
            ⚖️ Status Division - Your phone = same power as $5K server
          </Text>
          <Text style={styles.listItem}>
            👥 Gender Division - Economic incentives align prosperity
          </Text>
          <Text style={styles.listItem}>
            📚 Age Division - Elders vote, youth innovate
          </Text>
          <Text style={styles.listItem}>
            🔐 All Divisions - Blockchain sees only: Are you a descendant?
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Beautiful Irony</Text>
        <View style={styles.ironyCard}>
          <Text style={styles.ironyTitle}>Willie Lynch's Greatest Fear:</Text>
          <Text style={styles.ironyText}>
            A united Black people with shared economic power, territory, and political organization.
          </Text>
          
          <Text style={styles.ironyTitle}>{'\n'}What Aequitas Delivers:</Text>
          <Text style={styles.ironyText}>
            Exactly that - through digital infrastructure that can't be divided again.
          </Text>
          
          <Text style={styles.ironyFooter}>
            {'\n'}After 300+ years, his strategy finally meets its match.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.finalCard}>
          <Text style={styles.finalTitle}>⚖️ The Justice Machine</Text>
          <Text style={styles.finalText}>
            300 million descendants
            {'\n'}11,000+ nodes (Year 1 target)
            {'\n'}$131 trillion in enforced liability
            {'\n'}400 years of division countered by mathematics
          </Text>
          <Text style={styles.finalQuote}>
            {'\n'}Your phone is your nation.
            {'\n'}Your participation is justice.
            {'\n'}Together, we are unstoppable.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🌍 The division ends. The reunification begins. The nation exists. ⚖️
        </Text>
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
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  heroSection: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginBottom: 16,
  },
  heroText: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtext: {
    fontSize: 14,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 16,
  },
  divisionCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    marginBottom: 12,
  },
  divisionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  divisionText: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  counterText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  mathCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F59E0B',
    marginBottom: 16,
  },
  mathTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  mathText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  mathResult: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#10B981',
    lineHeight: 22,
  },
  ironyCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  ironyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  ironyText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  ironyFooter: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#10B981',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  finalCard: {
    backgroundColor: '#1E293B',
    padding: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#F59E0B',
    alignItems: 'center',
  },
  finalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 16,
    textAlign: 'center',
  },
  finalText: {
    fontSize: 15,
    color: '#CBD5E1',
    lineHeight: 24,
    textAlign: 'center',
  },
  finalQuote: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
});
