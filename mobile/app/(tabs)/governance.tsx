import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useGovernanceStore } from '../../stores/governanceStore';
import { GovernanceService, Proposal } from '../../services/governance';

export default function GovernanceScreen() {
  const { proposals, userVotes, setProposals, setLoading, recordVote } = useGovernanceStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      const activeProposals = await GovernanceService.getActiveProposals();
      setProposals(activeProposals);
    } catch (error) {
      console.error('Failed to load proposals:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleVote = (proposal: Proposal, option: 'yes' | 'no' | 'abstain' | 'veto') => {
    Alert.alert(
      `Vote ${option.toUpperCase()}`,
      `Confirm your ${option} vote on:\n\n"${proposal.title}"`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Vote',
          onPress: () => {
            recordVote(proposal.id, option);
            Alert.alert('Success', 'Your vote has been recorded!');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DAO Governance</Text>
        <Text style={styles.headerSubtitle}>Participate in nation-building</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{proposals.length}</Text>
          <Text style={styles.statLabel}>Active Proposals</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{Object.keys(userVotes).length}</Text>
          <Text style={styles.statLabel}>Your Votes</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Proposals</Text>
          <TouchableOpacity onPress={loadProposals} disabled={isRefreshing}>
            <Text style={styles.refreshButton}>
              {isRefreshing ? '...' : '🔄'}
            </Text>
          </TouchableOpacity>
        </View>

        {proposals.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.emptyState}>No active proposals</Text>
            <Text style={styles.emptyStateSubtext}>
              Check back soon for governance proposals
            </Text>
          </View>
        ) : (
          proposals.map((proposal) => (
            <View key={proposal.id} style={styles.proposalCard}>
              <Text style={styles.proposalTitle}>{proposal.title}</Text>
              <Text style={styles.proposalDescription} numberOfLines={3}>
                {proposal.description}
              </Text>
              
              <View style={styles.voteStats}>
                <Text style={styles.voteStatText}>
                  ✓ {GovernanceService.calculateVotePercentages(proposal).yes.toFixed(1)}% Yes
                </Text>
                <Text style={styles.voteStatText}>
                  ✗ {GovernanceService.calculateVotePercentages(proposal).no.toFixed(1)}% No
                </Text>
              </View>

              <Text style={styles.timeRemaining}>
                ⏱ {GovernanceService.getTimeRemaining(proposal.votingEndTime)}
              </Text>

              {userVotes[proposal.id] ? (
                <View style={styles.votedBadge}>
                  <Text style={styles.votedText}>✓ You voted: {userVotes[proposal.id].toUpperCase()}</Text>
                </View>
              ) : (
                <View style={styles.voteButtons}>
                  <TouchableOpacity
                    style={[styles.voteButton, styles.voteYes]}
                    onPress={() => handleVote(proposal, 'yes')}
                  >
                    <Text style={styles.voteButtonText}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.voteButton, styles.voteNo]}
                    onPress={() => handleVote(proposal, 'no')}
                  >
                    <Text style={styles.voteButtonText}>NO</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  refreshButton: {
    fontSize: 20,
    color: '#F59E0B',
  },
  proposalCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  proposalDescription: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: 12,
  },
  voteStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  voteStatText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  timeRemaining: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  voteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  voteYes: {
    backgroundColor: '#10B981',
  },
  voteNo: {
    backgroundColor: '#EF4444',
  },
  voteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  votedBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#10B981',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  votedText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
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
