
import React, { useState, useEffect } from 'react';
import AgentFactory from '../components/ai/AgentFactory';
import { FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi';

const AgentKit = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agentkit');
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">
            Aequitas AgentKit
          </h1>
          <p className="text-gray-400">
            Deploy autonomous AI-powered Justice Agents to enforce claims globally
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Factory */}
          <div>
            <AgentFactory />
          </div>

          {/* Active Agents */}
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
              <FiActivity />
              Active Agents
            </h2>

            {loading ? (
              <p className="text-gray-400">Loading agents...</p>
            ) : agents.length === 0 ? (
              <p className="text-gray-400">No agents deployed yet. Create your first Justice Agent!</p>
            ) : (
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-gray-800 p-4 rounded border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-gray-400">
                        {agent.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-green-500" />
                        <span className="text-xs text-green-500">
                          {agent.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white mb-2">
                      {agent.objective}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <FiClock />
                        <span>
                          {new Date(agent.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        Budget: {agent.budget} $REPAR
                      </div>
                    </div>

                    {agent.missionLog && agent.missionLog.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-xs text-gray-500 mb-1">
                          Latest Action:
                        </p>
                        <p className="text-xs text-yellow-500">
                          {agent.missionLog[agent.missionLog.length - 1].result}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-yellow-500/30">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            AgentKit Comparison: Aequitas vs Coinbase
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-yellow-500/30">
                  <th className="p-3 text-yellow-500">Feature</th>
                  <th className="p-3 text-yellow-500">Coinbase AgentKit</th>
                  <th className="p-3 text-yellow-500">Aequitas AgentKit</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Sovereignty</td>
                  <td className="p-3">Coinbase-dependent</td>
                  <td className="p-3 text-green-500">✓ Native to Aequitas L1</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Tools</td>
                  <td className="p-3">Generic DeFi (swap, send)</td>
                  <td className="p-3 text-green-500">✓ Justice-specific (arbitration, freeze assets)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Intelligence</td>
                  <td className="p-3">Standard LLMs</td>
                  <td className="p-3 text-green-500">✓ NVIDIA NIM + Poly-Mind</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Autonomy</td>
                  <td className="p-3">Semi-autonomous</td>
                  <td className="p-3 text-green-500">✓ Fully on-chain agents</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Multi-Chain</td>
                  <td className="p-3">EVM-only</td>
                  <td className="p-3 text-green-500">✓ IBC + CCTP native</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Purpose</td>
                  <td className="p-3">DeFi tasks</td>
                  <td className="p-3 text-green-500">✓ Global justice enforcement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentKit;
