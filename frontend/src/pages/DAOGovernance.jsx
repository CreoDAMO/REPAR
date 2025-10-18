import React, { useState } from 'react';
import { Vote, Users, TrendingUp, CheckCircle, Clock, AlertCircle, ArrowLeftRight, DollarSign, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DAOGovernance() {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [votingPower, setVotingPower] = useState(0);

  const proposals = [
    {
      id: 1,
      title: "Increase Descendant Allocation from 70% to 75%",
      description: "Proposal to increase total supply allocated to verified descendants by 5 percentage points",
      status: "Active",
      votesFor: 125000000,
      votesAgainst: 23000000,
      totalVotes: 148000000,
      quorumRequired: 100000000,
      endsIn: "3 days",
      proposer: "Descendant Council Representative #47"
    },
    {
      id: 2,
      title: "Add New Defendant: Dutch West India Company Successors",
      description: "Vote to add 5 Dutch banking institutions with documented WIC slavery ties",
      status: "Active",
      votesFor: 89000000,
      votesAgainst: 12000000,
      totalVotes: 101000000,
      quorumRequired: 100000000,
      endsIn: "5 days",
      proposer: "Forensic Audit Team"
    },
    {
      id: 3,
      title: "Launch Descendant Education Fund",
      description: "Allocate 2% of annual protocol revenue to scholarship program",
      status: "Passed",
      votesFor: 187000000,
      votesAgainst: 8000000,
      totalVotes: 195000000,
      quorumRequired: 100000000,
      endsIn: "Closed",
      proposer: "Community Initiative #12"
    }
  ];

  const stats = [
    { label: "Total $REPAR Holders", value: "385,429", icon: Users, colorClass: "text-blue-600" },
    { label: "Active Voters (30d)", value: "142,851", icon: Vote, colorClass: "text-green-600" },
    { label: "Proposals This Quarter", value: "18", icon: TrendingUp, colorClass: "text-purple-600" },
    { label: "Governance Participation", value: "37.1%", icon: CheckCircle, colorClass: "text-amber-600" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Passed': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Vote className="h-12 w-12 text-blue-400" />
            <div>
              <h1 className="text-4xl font-bold">DAO Governance</h1>
              <p className="text-xl text-blue-200">$REPAR Holder Voting & Proposals</p>
            </div>
          </div>
          <p className="text-sm text-blue-300 mt-2">
            Decentralized governance by descendants and $REPAR native coin holders
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <Icon className={`h-8 w-8 ${stat.colorClass} mb-3`} />
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Wallet Connection */}
        {!walletConnected && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 mb-2">Connect Wallet to Vote</h3>
                <p className="text-amber-800 text-sm mb-3">
                  Connect your Keplr, MetaMask, or Coinbase wallet to participate in governance votes.
                  Your voting power is proportional to your $REPAR holdings.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setWalletConnected(true);
                      setVotingPower(125000);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
                  >
                    Coinbase
                  </button>
                  <button 
                    onClick={() => {
                      setWalletConnected(true);
                      setVotingPower(125000);
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-semibold transition"
                  >
                    MetaMask
                  </button>
                  <button 
                    onClick={() => {
                      setWalletConnected(true);
                      setVotingPower(125000);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-semibold transition"
                  >
                    Keplr
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {walletConnected && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-bold text-green-900">Wallet Connected</h3>
                  <p className="text-sm text-green-700">Your voting power: {votingPower.toLocaleString()} $REPAR</p>
                </div>
              </div>
              <button 
                onClick={() => setWalletConnected(false)}
                className="text-green-700 hover:text-green-900 text-sm font-semibold"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}

        {/* Financial Tools Integration */}
        {walletConnected && (
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Manage Your $REPAR Holdings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/dex')}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition text-left"
              >
                <ArrowLeftRight className="h-8 w-8 text-cyan-400 mb-2" />
                <h4 className="font-bold mb-1">Trade on DEX</h4>
                <p className="text-sm text-gray-300">Swap $REPAR with BTC, ETH, SOL, POL</p>
              </button>
              
              <button
                onClick={() => navigate('/onramper')}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition text-left"
              >
                <DollarSign className="h-8 w-8 text-green-400 mb-2" />
                <h4 className="font-bold mb-1">Buy More $REPAR</h4>
                <p className="text-sm text-gray-300">On-ramp fiat via Coinbase</p>
              </button>
              
              <button
                onClick={() => navigate('/superpay')}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition text-left"
              >
                <Send className="h-8 w-8 text-purple-400 mb-2" />
                <h4 className="font-bold mb-1">Send Payments</h4>
                <p className="text-sm text-gray-300">Batch transfers with SuperPay</p>
              </button>
            </div>
          </div>
        )}

        {/* Active Proposals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Active Proposals</h2>
          <div className="space-y-6">
            {proposals.map((proposal) => {
              const votePercentage = (proposal.votesFor / proposal.totalVotes * 100).toFixed(1);
              const quorumMet = proposal.totalVotes >= proposal.quorumRequired;
              
              return (
                <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{proposal.title}</h3>
                      <p className="text-gray-700 mb-3">{proposal.description}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(proposal.status)}`}>
                          {proposal.status}
                        </span>
                        <span className="text-gray-600">Proposed by: {proposal.proposer}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <Clock className="h-5 w-5 text-gray-400 inline mr-1" />
                      <span className="text-sm text-gray-600">{proposal.endsIn}</span>
                    </div>
                  </div>

                  {/* Vote Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">For: {proposal.votesFor.toLocaleString()}</span>
                      <span className="text-gray-600">Against: {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-green-600 h-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${votePercentage}%` }}
                      >
                        {votePercentage}%
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Quorum: {quorumMet ? '✓ Met' : 'Not Met'} ({proposal.quorumRequired.toLocaleString()} required)</span>
                      <span>Total Votes: {proposal.totalVotes.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Vote Buttons */}
                  {proposal.status === 'Active' && (
                    <div className="flex gap-3">
                      <button 
                        disabled={!walletConnected}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Vote For
                      </button>
                      <button 
                        disabled={!walletConnected}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Vote Against
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                        Details
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Governance Info */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-3">How DAO Governance Works</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Voting Power:</strong> 1 $REPAR = 1 vote. Verified descendants receive weighted voting power (1.5x multiplier).
            </p>
            <p>
              <strong>Proposal Submission:</strong> Any holder with 1M+ $REPAR can submit proposals. Requires 5M $REPAR to reach voting stage.
            </p>
            <p>
              <strong>Quorum:</strong> 100M votes required for proposal validity. Voting period: 7 days.
            </p>
            <p>
              <strong>Execution:</strong> Passed proposals are automatically executed via smart contracts within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
