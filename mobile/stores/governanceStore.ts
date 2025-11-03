import { create } from 'zustand';
import { Proposal } from '../services/governance';

export interface GovernanceState {
  proposals: Proposal[];
  selectedProposal: Proposal | null;
  isLoading: boolean;
  error: string | null;
  userVotes: Record<string, string>;
  
  setProposals: (proposals: Proposal[]) => void;
  setSelectedProposal: (proposal: Proposal | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  recordVote: (proposalId: string, option: string) => void;
  reset: () => void;
}

export const useGovernanceStore = create<GovernanceState>((set) => ({
  proposals: [],
  selectedProposal: null,
  isLoading: false,
  error: null,
  userVotes: {},

  setProposals: (proposals) => set({ proposals }),
  setSelectedProposal: (selectedProposal) => set({ selectedProposal }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  recordVote: (proposalId, option) => 
    set((state) => ({ 
      userVotes: { ...state.userVotes, [proposalId]: option } 
    })),
  
  reset: () => set({
    proposals: [],
    selectedProposal: null,
    isLoading: false,
    error: null,
    userVotes: {},
  }),
}));
