
import React, { useState } from 'react';
import { FiCpu, FiTarget, FiDollarSign } from 'react-icons/fi';

const AgentFactory = () => {
  const [objective, setObjective] = useState('');
  const [budget, setBudget] = useState('10000');
  const [rules, setRules] = useState([
    'no_settle_below_90%',
    'report_weekly',
    'auto_approve_minor_actions'
  ]);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeployAgent = async () => {
    setIsDeploying(true);
    try {
      // API call to deploy agent
      const response = await fetch('/api/agentkit/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective,
          budget: parseInt(budget),
          rules
        })
      });
      
      const data = await response.json();
      alert(`Justice Agent deployed! ID: ${data.agentId}`);
    } catch (error) {
      console.error('Failed to deploy agent:', error);
      alert('Failed to deploy agent');
    } finally {
      setIsDeploying(false);
    }
  };

  const exampleObjectives = [
    "Enforce the $850M liability of the Gladstone Dynasty",
    "Monitor and report Barclays asset dissipation",
    "File arbitration demands in optimal jurisdictions"
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-yellow-500/30">
      <div className="flex items-center gap-3 mb-6">
        <FiCpu className="text-yellow-500 text-3xl" />
        <h2 className="text-2xl font-bold text-yellow-500">Aequitas AgentKit</h2>
      </div>
      
      <p className="text-gray-300 mb-6">
        Deploy autonomous Justice Agents powered by AI to enforce your claims across jurisdictions.
      </p>

      {/* Objective */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-yellow-500 mb-2">
          <FiTarget />
          <span className="font-semibold">Agent Objective</span>
        </label>
        <textarea
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Enter the agent's mission objective..."
          className="w-full bg-gray-800 text-white p-3 rounded border border-yellow-500/30 focus:border-yellow-500 focus:outline-none"
          rows="3"
        />
        <div className="mt-2 text-xs text-gray-400">
          <p className="mb-1">Example objectives:</p>
          {exampleObjectives.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setObjective(ex)}
              className="block text-yellow-500 hover:text-yellow-400 mb-1"
            >
              • {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-yellow-500 mb-2">
          <FiDollarSign />
          <span className="font-semibold">REPAR Budget</span>
        </label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded border border-yellow-500/30 focus:border-yellow-500 focus:outline-none"
          placeholder="10000"
        />
        <p className="mt-1 text-xs text-gray-400">
          Amount of $REPAR to allocate to this agent's mission
        </p>
      </div>

      {/* Rules */}
      <div className="mb-6">
        <label className="text-yellow-500 font-semibold mb-2 block">
          Agent Rules
        </label>
        <div className="space-y-2">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={true}
                className="w-4 h-4"
                readOnly
              />
              <span className="text-gray-300 text-sm">{rule.replace(/_/g, ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy Button */}
      <button
        onClick={handleDeployAgent}
        disabled={isDeploying || !objective || !budget}
        className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
      >
        {isDeploying ? 'Deploying Agent...' : 'Deploy Justice Agent'}
      </button>

      {/* Info */}
      <div className="mt-6 p-4 bg-yellow-500/10 rounded border border-yellow-500/30">
        <h3 className="text-yellow-500 font-semibold mb-2">Why AgentKit is Superior:</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>✓ Native to Aequitas L1 (cannot be shut down)</li>
          <li>✓ Specialized Justice Tools (file claims, freeze assets)</li>
          <li>✓ NVIDIA NIM AI Brain (advanced reasoning)</li>
          <li>✓ Fully autonomous on-chain agents</li>
          <li>✓ Multi-chain via IBC + CCTP</li>
        </ul>
      </div>
    </div>
  );
};

export default AgentFactory;
