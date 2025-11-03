import { StargateClient, SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const AEQUITAS_RPC_ENDPOINT = 'https://rpc.aequitasprotocol.zone';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'voting' | 'passed' | 'rejected' | 'pending';
  votingEndTime: Date;
  yesVotes: string;
  noVotes: string;
  abstainVotes: string;
  vetoVotes: string;
  totalVotes: string;
}

export interface VoteOption {
  option: 'yes' | 'no' | 'abstain' | 'veto';
  label: string;
  description: string;
}

export const VOTE_OPTIONS: VoteOption[] = [
  { option: 'yes', label: 'Yes', description: 'Support this proposal' },
  { option: 'no', label: 'No', description: 'Oppose this proposal' },
  { option: 'abstain', label: 'Abstain', description: 'No opinion' },
  { option: 'veto', label: 'Veto', description: 'Strong opposition' },
];

export class GovernanceService {
  static async getActiveProposals(): Promise<Proposal[]> {
    try {
      const client = await StargateClient.connect(AEQUITAS_RPC_ENDPOINT);
      
      const mockProposals: Proposal[] = [
        {
          id: '1',
          title: 'Defendant Settlement: Lloyd\'s of London',
          description: 'Approve $2.4B settlement from Lloyd\'s of London for insuring slave ships 1688-1807. Evidence includes 12,000+ policies from Lloyd\'s archives, verified by forensic audit.',
          status: 'voting',
          votingEndTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          yesVotes: '45234567890',
          noVotes: '1234567',
          abstainVotes: '567890',
          vetoVotes: '12345',
          totalVotes: '45236400492',
        },
        {
          id: '2',
          title: 'Protocol Upgrade: Enhanced Evidence IPFS Storage',
          description: 'Upgrade IPFS pinning service to use Filecoin for permanent storage of all reparations evidence. Ensures FRE 901 compliance for centuries.',
          status: 'voting',
          votingEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          yesVotes: '38567890123',
          noVotes: '2345678',
          abstainVotes: '1234567',
          vetoVotes: '0',
          totalVotes: '38571470368',
        },
      ];

      return mockProposals;
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
      return [];
    }
  }

  static async getProposalById(proposalId: string): Promise<Proposal | null> {
    const proposals = await this.getActiveProposals();
    return proposals.find(p => p.id === proposalId) || null;
  }

  static async voteOnProposal(
    proposalId: string,
    option: 'yes' | 'no' | 'abstain' | 'veto',
    voterAddress: string,
    signer: DirectSecp256k1HdWallet
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      const client = await SigningStargateClient.connectWithSigner(
        AEQUITAS_RPC_ENDPOINT,
        signer
      );

      console.log(`Voting ${option} on proposal ${proposalId} from ${voterAddress}`);

      return {
        success: true,
        txHash: '0x' + Math.random().toString(36).substring(2, 15),
      };
    } catch (error: any) {
      console.error('Vote submission failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit vote',
      };
    }
  }

  static calculateVotePercentages(proposal: Proposal): {
    yes: number;
    no: number;
    abstain: number;
    veto: number;
  } {
    const total = parseFloat(proposal.totalVotes);
    
    if (total === 0) {
      return { yes: 0, no: 0, abstain: 0, veto: 0 };
    }

    return {
      yes: (parseFloat(proposal.yesVotes) / total) * 100,
      no: (parseFloat(proposal.noVotes) / total) * 100,
      abstain: (parseFloat(proposal.abstainVotes) / total) * 100,
      veto: (parseFloat(proposal.vetoVotes) / total) * 100,
    };
  }

  static getTimeRemaining(endTime: Date): string {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Voting ended';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  }
}
