import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ClaimsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>File Arbitration Demand</Text>
        <Text style={styles.headerSubtitle}>Verify descendant status & submit claims</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descendant Verification</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            To file a claim, you must first verify your descendant status.
          </Text>
          <Text style={styles.cardText}>
            {'\n'}Required documentation:
          </Text>
          <Text style={styles.listItem}>{'\n'}• Birth certificate</Text>
          <Text style={styles.listItem}>• Parent/grandparent documentation</Text>
          <Text style={styles.listItem}>• Genealogical evidence</Text>
          <Text style={styles.listItem}>• Optional: DNA test results</Text>
        </View>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Start Verification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Claims</Text>
        <View style={styles.card}>
          <Text style={styles.cardTextBold}>Legal Framework</Text>
          <Text style={styles.cardText}>
            {'\n'}Claims are filed as arbitration demands under:
          </Text>
          <Text style={styles.listItem}>{'\n'}• International Law (Genocide Convention)</Text>
          <Text style={styles.listItem}>• Jus cogens (peremptory norms)</Text>
          <Text style={styles.listItem}>• UCC Article 9</Text>
          <Text style={styles.listItem}>• International arbitration</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Claim Types</Text>
        <View style={styles.card}>
          <Text style={styles.cardTextBold}>1. Direct Reparations</Text>
          <Text style={styles.cardText}>
            Individual claims against liable defendants
          </Text>
          
          <Text style={styles.cardTextBold}>{'\n\n'}2. Collective Claims</Text>
          <Text style={styles.cardText}>
            Community-based claims for systemic harm
          </Text>
          
          <Text style={styles.cardTextBold}>{'\n\n'}3. Evidence Submission</Text>
          <Text style={styles.cardText}>
            Submit additional evidence for existing claims
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Defendant Database</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Over 200 documented defendants including:
          </Text>
          <Text style={styles.listItem}>{'\n'}• 47 nations</Text>
          <Text style={styles.listItem}>• 89 corporations</Text>
          <Text style={styles.listItem}>• 67 financial institutions</Text>
          <Text style={styles.listItem}>• 23 universities</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Evidence Storage</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            All evidence is stored on IPFS (InterPlanetary File System) for:
          </Text>
          <Text style={styles.listItem}>{'\n'}✓ Permanent preservation</Text>
          <Text style={styles.listItem}>✓ Tamper-proof records</Text>
          <Text style={styles.listItem}>✓ FRE 901 compliance</Text>
          <Text style={styles.listItem}>✓ Global accessibility</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.primaryButton, styles.disabledButton]} disabled>
          <Text style={styles.primaryButtonText}>File Claim (Verification Required)</Text>
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
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  cardTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  listItem: {
    fontSize: 14,
    color: '#CBD5E1',
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#D97706',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#475569',
  },
});
