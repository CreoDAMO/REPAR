import { StargateClient, SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const AEQUITAS_RPC_ENDPOINT = 'https://rpc.aequitasprotocol.zone';
const AEQUITAS_REST_ENDPOINT = 'https://api.aequitasprotocol.zone:1317';

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
      
      const response = await fetch(`${AEQUITAS_REST_ENDPOINT}/cosmos/gov/v1beta1/proposals?proposal_status=2`);
      
      if (!response.ok) {
        console.warn('Failed to fetch on-chain proposals, using examples');
        return this.getExampleProposals();
      }

      const data = await response.json();
      
      if (!data.proposals || data.proposals.length === 0) {
        return this.getExampleProposals();
      }

      const proposals: Proposal[] = await Promise.all(
        data.proposals.map(async (prop: any) => {
          const tallyResponse = await fetch(
            `${AEQUITAS_REST_ENDPOINT}/cosmos/gov/v1beta1/proposals/${prop.proposal_id}/tally`
          );
          const tally = tallyResponse.ok ? await tallyResponse.json() : null;

          return {
            id: prop.proposal_id.toString(),
            title: prop.content?.title || `Proposal #${prop.proposal_id}`,
            description: prop.content?.description || '',
            status: this.mapProposalStatus(prop.status),
            votingEndTime: new Date(prop.voting_end_time),
            yesVotes: tally?.tally?.yes || '0',
            noVotes: tally?.tally?.no || '0',
            abstainVotes: tally?.tally?.abstain || '0',
            vetoVotes: tally?.tally?.no_with_veto || '0',
            totalVotes: this.calculateTotal(tally?.tally),
          };
        })
      );

      return proposals.length > 0 ? proposals : this.getExampleProposals();
    } catch (error) {
      console.error('Failed to fetch proposals from chain:', error);
      return this.getExampleProposals();
    }
  }

  private static getExampleProposals(): Proposal[] {
    return [
      {
        id: 'example-1',
        title: 'Defendant Settlement: Lloyd\'s of London',
        description: 'Approve $2.4B settlement from Lloyd\'s of London for insuring slave ships 1688-1807. Evidence includes 12,000+ policies from Lloyd\'s archives, verified by forensic audit.\n\n[Example proposal - connect to live chain for real governance]',
        status: 'voting',
        votingEndTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        yesVotes: '45234567890',
        noVotes: '1234567',
        abstainVotes: '567890',
        vetoVotes: '12345',
        totalVotes: '45236400492',
      },
      {
        id: 'example-2',
        title: 'Protocol Upgrade: Enhanced Evidence IPFS Storage',
        description: 'Upgrade IPFS pinning service to use Filecoin for permanent storage of all reparations evidence. Ensures FRE 901 compliance for centuries.\n\n[Example proposal - connect to live chain for real governance]',
        status: 'voting',
        votingEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        yesVotes: '38567890123',
        noVotes: '2345678',
        abstainVotes: '1234567',
        vetoVotes: '0',
        totalVotes: '38571470368',
      },
    ];
  }

  private static mapProposalStatus(status: string): 'voting' | 'passed' | 'rejected' | 'pending' {
    switch (status) {
      case 'PROPOSAL_STATUS_VOTING_PERIOD':
        return 'voting';
      case 'PROPOSAL_STATUS_PASSED':
        return 'passed';
      case 'PROPOSAL_STATUS_REJECTED':
        return 'rejected';
      default:
        return 'pending';
    }
  }

  private static calculateTotal(tally: any): string {
    if (!tally) return '0';
    const yes = BigInt(tally.yes || '0');
    const no = BigInt(tally.no || '0');
    const abstain = BigInt(tally.abstain || '0');
    const veto = BigInt(tally.no_with_veto || '0');
    return (yes + no + abstain + veto).toString();
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
    if (proposalId.startsWith('example-')) {
      return {
        success: false,
        error: 'Cannot vote on example proposals. Connect to live chain for real governance.',
      };
    }

    try {
      const client = await SigningStargateClient.connectWithSigner(
        AEQUITAS_RPC_ENDPOINT,
        signer
      );

      const voteOptionMap = {
        yes: 1,
        abstain: 2,
        no: 3,
        veto: 4,
      };

      const voteMsg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: {
          proposalId: proposalId,
          voter: voterAddress,
          option: voteOptionMap[option],
        },
      };

      const fee = {
        amount: [{ denom: 'urepar', amount: '5000' }],
        gas: '200000',
      };

      const result = await client.signAndBroadcast(
        voterAddress,
        [voteMsg],
        fee,
        `Vote ${option} on proposal ${proposalId}`
      );

      if (result.code !== 0) {
        return {
          success: false,
          error: `Transaction failed: ${result.rawLog}`,
        };
      }

      return {
        success: true,
        txHash: result.transactionHash,
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
