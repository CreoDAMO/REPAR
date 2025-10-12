
import { useState } from 'react';
import { Shield, Lock, Key, Vault, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import MultiSigWallet from '../components/MultiSigWallet';

const FounderWallet = () => {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [showMultiSig, setShowMultiSig] = useState(false);

  const layers = [
    {
      id: 1,
      name: 'Access Layer',
      subtitle: 'Coinbase SDK & MetaMask SDK',
      purpose: 'Mass adoption, fiat on-ramp, EVM bridge',
      status: 'pending',
      statusText: 'Requires Ethermint',
      icon: ChevronRight,
      color: 'blue',
      allocation: '0%',
      features: [
        'One-click onboarding for Coinbase/MetaMask users',
        'Fiat-to-crypto conversion via Coinbase Onramp',
        'EVM compatibility through Ethermint module',
        'Automatic 0x... to repar... address mapping'
      ],
      implementation: 'Install Ethermint module → Configure EVM RPC → Integrate Coinbase SDK v4.3.7+',
    },
    {
      id: 2,
      name: 'Native Interaction Layer',
      subtitle: 'Keplr & Leap Wallets',
      purpose: 'Full Cosmos ecosystem access',
      status: 'active',
      statusText: 'Ready to Use',
      icon: Key,
      color: 'green',
      allocation: '< 0.1%',
      features: [
        'Staking & governance participation',
        'IBC transfers to Osmosis, Akash, etc.',
        'Native Cosmos SDK module interaction',
        'Hardware wallet support (Ledger via Keplr)'
      ],
      implementation: 'Already implemented - Click "Connect Keplr" in navigation',
    },
    {
      id: 3,
      name: 'Operational Treasury',
      subtitle: '2-of-3 Multi-Signature',
      purpose: 'Secure operational funds',
      status: 'planned',
      statusText: 'Ready to Deploy',
      icon: Shield,
      color: 'amber',
      allocation: '1% (1.31T $REPAR)',
      features: [
        'Holds immediate 1% founder allocation',
        'Requires 2-of-3 signatures for transactions',
        'Key 1: Founder\'s operational key (Keplr + Ledger)',
        'Key 2: Foundation CFO/COO key',
        'Key 3: Automated policy smart contract'
      ],
      implementation: 'Deploy CosmWasm multisig contract → Fund with 1% allocation → Configure keyholders',
    },
    {
      id: 4,
      name: 'Deep Vault',
      subtitle: 'Hardware Wallet + Shamir\'s Secret',
      purpose: 'Air-gapped security for vested funds',
      status: 'planned',
      statusText: 'Ultimate Security',
      icon: Vault,
      color: 'purple',
      allocation: '9% (11.79T $REPAR)',
      features: [
        'Receives 9% vested allocation (5yr, 1yr cliff)',
        'Hardware wallet (Ledger/Trezor) never connected online',
        '3-of-5 Shamir\'s Secret Sharing for seed phrase',
        'Metal plates in geographically distributed vaults',
        'Hardware device is disposable - seed is eternal'
      ],
      implementation: 'Generate seed → Split with SSS → Distribute 5 shards → Program vesting contract → Hardware stays offline',
    },
  ];

  const totalAllocation = {
    immediate: '1.31T $REPAR',
    vested: '11.79T $REPAR',
    total: '13.1T $REPAR',
    usdValue: '$240.1B @ $18.33'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Founder Wallet Architecture</h1>
        <p className="text-gray-600">The Aequitas Citadel: Multi-Layer Custody Stack</p>
      </div>

      {/* Allocation Summary */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <Lock className="h-8 w-8 text-amber-600 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Total Founder Allocation: 10%</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Immediate (Layer 3)</p>
                <p className="text-lg font-bold text-amber-700">{totalAllocation.immediate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vested (Layer 4)</p>
                <p className="text-lg font-bold text-purple-700">{totalAllocation.vested}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total $REPAR</p>
                <p className="text-lg font-bold text-gray-900">{totalAllocation.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">USD Value</p>
                <p className="text-lg font-bold text-green-700">{totalAllocation.usdValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Layers */}
      <div className="space-y-4">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isExpanded = selectedLayer === layer.id;
          
          return (
            <div key={layer.id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              <button
                onClick={() => setSelectedLayer(isExpanded ? null : layer.id)}
                className="w-full p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 rounded-lg bg-${layer.color}-100`}>
                  <Icon className={`h-6 w-6 text-${layer.color}-600`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">Layer {layer.id}: {layer.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      layer.status === 'active' ? 'bg-green-100 text-green-700' :
                      layer.status === 'planned' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {layer.statusText}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{layer.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{layer.allocation}</p>
                  <p className="text-xs text-gray-500">{layer.purpose}</p>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="space-y-2">
                      {layer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className={`h-4 w-4 text-${layer.color}-500 flex-shrink-0 mt-0.5`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Implementation Steps
                    </h4>
                    <p className="text-sm text-gray-700 font-mono">{layer.implementation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Multi-Sig Treasury Interface */}
      {showMultiSig && (
        <div className="mt-8">
          <MultiSigWallet />
        </div>
      )}

      {/* Quick Access Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowMultiSig(!showMultiSig)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-colors"
        >
          <Shield className="h-5 w-5" />
          <span>{showMultiSig ? 'Hide' : 'Access'} Multi-Sig Treasury (Layer 3)</span>
        </button>
      </div>

      {/* Security Best Practices */}
      <div className="mt-8 bg-slate-900 text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Security Principles</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-amber-400 mb-2">Defense in Depth</h4>
            <p className="text-slate-300">Each layer serves a specific purpose. Public access → Native power → Operational security → Deep vault.</p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-400 mb-2">Zero Single Points of Failure</h4>
            <p className="text-slate-300">Multisig for operations. Shamir's Secret for deep storage. No single key controls the kingdom.</p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-400 mb-2">Mathematical Sovereignty</h4>
            <p className="text-slate-300">"The hardware is disposable; the decentralized seed is eternal." - Your seed phrase outlives any device.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderWallet;
