import React, { useState, useEffect } from 'react';
import { Shield, Wallet, Lock, Key, ChevronRight, AlertTriangle, CheckCircle2, FileText, Vault, ArrowLeftRight, Users, Send, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MultiSigWallet from '../components/MultiSigWallet';
import WalletConnect from '../components/WalletConnect';
import ClaimGenerator from '../components/ClaimGenerator';
import { defendants } from '../data/defendants';
import { FOUNDER_WALLETS, FOUNDER_ALLOCATION } from '../config/wallets';
import { cosmosClient } from '../utils/cosmosClient';

const FounderWallet = () => {
  const navigate = useNavigate();
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [showMultiSig, setShowMultiSig] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDefendant, setSelectedDefendant] = useState(defendants[0]);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [walletBalance, setWalletBalance] = useState('0');

  const [walletAddresses, setWalletAddresses] = useState({
    layer1: FOUNDER_WALLETS.layer1.address,
    layer2: FOUNDER_WALLETS.layer2.address,
    layer3: FOUNDER_WALLETS.layer3.address,
    layer4: FOUNDER_WALLETS.layer4.address,
  });

  // Helper function to format currency, assuming REPAR is represented as a large number
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return '$0.00';
    }
    // Assuming REPAR is in trillions for display purposes
    const trillion = 1e12;
    if (amount >= trillion) {
      return `${(amount / trillion).toFixed(2)}T $REPAR`;
    }
    return `${amount.toLocaleString()} $REPAR`;
  };

  const [endowment, setEndowment] = useState({
    // Founder Allocation: 10% (13.1T REPAR)
    founderVested: 11790000000000, // 9% of 131T = 11.79T REPAR (vested over 4 years)
    founderDiscretionary: 1310000000000, // 1% of 131T = 1.31T REPAR (immediate access)

    // Development Fund: 8% (10.48T REPAR)
    devEndowment: 7860000000000, // 6% of 131T = 7.86T REPAR (locked 8 years, renewable)
    devDiscretionary: 2620000000000, // 2% of 131T = 2.62T REPAR (immediate access)

    // Totals
    totalDiscretionary: 3930000000000, // 3% total immediate (1% founder + 2% dev)
    totalControl: 23580000000000, // 18% total = 23.58T REPAR

    // Endowment specifics
    targetAPY: 4.5,
    yieldAccumulated: 0,
    unlockYear: 8, // 8-year renewal period for dev endowment
    isLocked: true,
    renewalCount: 0
  });


  useEffect(() => {
    if (connectedWallet?.address) {
      fetchWalletBalance(connectedWallet.address);
    }
  }, [connectedWallet]);

  const fetchWalletBalance = async (address) => {
    try {
      // Mock balance for now - integrate with actual blockchain
      setWalletBalance('125,000');
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handleWalletConnected = (wallet) => {
    setConnectedWallet(wallet);
  };

  const quickActions = [
    {
      name: 'Trade on DEX',
      description: 'Swap native coins (BTC, ETH, SOL, POL)',
      icon: ArrowLeftRight,
      color: 'indigo',
      action: () => navigate('/dex'),
      active: !!connectedWallet
    },
    {
      name: 'DAO Governance',
      description: 'Vote on proposals with your $REPAR',
      icon: Users,
      color: 'blue',
      action: () => navigate('/dao'),
      active: !!connectedWallet
    },
    {
      name: 'Buy $REPAR',
      description: 'On-ramp fiat via Coinbase',
      icon: DollarSign,
      color: 'green',
      action: () => navigate('/onramper'),
      active: true
    },
    {
      name: 'SuperPay',
      description: 'Batch payments & transfers',
      icon: Send,
      color: 'purple',
      action: () => navigate('/superpay'),
      active: !!connectedWallet
    }
  ];

  const layers = [
    {
      id: 1,
      name: 'Layer 1 - Coinbase',
      subtitle: 'Onboarding, Onramper, SuperPay, Lightning ⚡ Network',
      address: connectedWallet?.wallet === 'coinbase' ? connectedWallet.address : FOUNDER_WALLETS.layer1.address,
      purpose: 'Onboarding & Payments',
      status: 'active',
      statusText: connectedWallet?.wallet === 'coinbase' ? 'Connected' : 'Active',
      icon: Wallet,
      color: 'blue',
      allocation: 'Operational funds',
      features: [
        '✓ Coinbase Wallet SDK integrated (@coinbase/wallet-sdk)',
        '✓ Fiat on-ramp via Coinbase Onramper',
        '✓ SuperPay for P2P payments',
        '✓ Lightning ⚡ Network integration',
        '✓ Mobile-first convenience',
        '✓ Address: ' + (connectedWallet?.wallet === 'coinbase' ? connectedWallet.address : walletAddresses.layer1).slice(0, 10) + '...' + (connectedWallet?.wallet === 'coinbase' ? connectedWallet.address : walletAddresses.layer1).slice(-8),
        connectedWallet?.wallet === 'coinbase' ? '✓ Connected & Active' : '⏳ Connect for onboarding features'
      ],
      implementation: connectedWallet?.wallet === 'coinbase' ? 'Connected! Access onramper, SuperPay, and Lightning features' : 'Connect Coinbase wallet to access fiat on-ramp and payment features',
    },
    {
      id: 2,
      name: 'Layer 2 - MetaMask',
      subtitle: 'EVM Compatible',
      address: connectedWallet?.wallet === 'metamask' ? connectedWallet.address : FOUNDER_WALLETS.layer2.address,
      purpose: 'EVM Compatibility (Chain ID: 1619)',
      status: 'active',
      statusText: connectedWallet?.wallet === 'metamask' ? 'Connected' : 'Active',
      icon: Key,
      color: 'orange',
      allocation: 'Active positions',
      features: [
        '✓ MetaMask SDK integrated (window.ethereum)',
        '✓ EVM chain interactions (Chain ID: 1619)',
        '✓ DeFi protocol access',
        '✓ NFT management',
        '✓ dApp connectivity',
        '✓ Address: ' + (connectedWallet?.wallet === 'metamask' ? connectedWallet.address : walletAddresses.layer1).slice(0, 10) + '...' + (connectedWallet?.wallet === 'metamask' ? connectedWallet.address : walletAddresses.layer1).slice(-8),
        connectedWallet?.wallet === 'metamask' ? '✓ Connected & Active' : '⏳ Connect for EVM features'
      ],
      implementation: connectedWallet?.wallet === 'metamask' ? 'Connected! Full EVM compatibility active' : 'Connect MetaMask wallet for EVM chain access',
    },
    {
      id: 3,
      name: 'Layer 3 - Multi-Sig',
      subtitle: 'Enhanced Security',
      address: FOUNDER_WALLETS.layer3.address,
      purpose: 'Secure Transactions & Transfer on EVM chains',
      status: 'active',
      statusText: 'Active',
      icon: Shield,
      color: 'amber',
      allocation: 'High-value assets',
      features: [
        '✓ Multiple signature requirements (2-of-3, 3-of-5)',
        '✓ Time-locked transactions for added security',
        '✓ Emergency recovery mechanisms',
        '✓ EVM chain security (Gnosis Safe compatible)',
        '✓ Institutional-grade protection',
        '✓ Smart contract-based approvals'
      ],
      implementation: 'Active multi-signature wallet protecting high-value EVM operations',
    },
    {
      id: 4,
      name: 'Layer 4 - Keplr',
      subtitle: 'Cosmos Native Wallet',
      address: connectedWallet?.wallet === 'keplr' ? connectedWallet.address : 'repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun',
      purpose: 'Primary Custody - Native Cosmos SDK',
      status: 'active',
      statusText: connectedWallet?.wallet === 'keplr' ? 'Connected' : 'Active',
      icon: Vault,
      color: 'green',
      allocation: 'Currently: 13.1T REPAR (100% of founder allocation)',
      allocationFuture: 'Future: 1.31T REPAR (10% when Layer 5 acquired)',
      features: [
        '✓ Currently holds entire 10% founder allocation (13.1T REPAR)',
        '✓ Will hold 1% (1.31T REPAR) when Hardware Wallet acquired',
        '✓ Native Cosmos SDK wallet functionality',
        '✓ IBC transfers to other Cosmos chains',
        '✓ Staking & governance participation',
        '✓ Direct blockchain interaction',
        '✓ 24-word seed phrase backup (secured offline)',
        connectedWallet?.wallet === 'keplr' ? '✓ Connected with full access' : '⏳ Connect for full Cosmos features'
      ],
      implementation: connectedWallet?.wallet === 'keplr' ? 'Connected! Primary custody wallet active' : 'Connect Keplr wallet for native Cosmos functionality',
    },
    {
      id: 5,
      name: 'Layer 5 - Hardware Wallet',
      subtitle: 'Founder Vault',
      address: 'Coming Soon',
      purpose: 'Cold Storage Vault (Maximum Security)',
      status: 'planned',
      statusText: 'Coming Soon',
      icon: Lock,
      color: 'purple',
      allocation: 'Future: 11.79T REPAR (90% of founder allocation)',
      features: [
        '⏳ Offline private key storage (air-gapped)',
        '⏳ Physical transaction signing required',
        '⏳ PIN + recovery phrase protection',
        '⏳ Ledger Nano X / Trezor Model T compatible',
        '⏳ Will receive 11.79T REPAR (90%) from Layer 4',
        '⏳ Maximum security cold storage',
        '⏳ Device is disposable - seed is eternal'
      ],
      implementation: 'Pending hardware wallet acquisition → Transfer 90% from Keplr → Secure offline storage',
    },
  ];

  const totalAllocation = {
    current: '13.1T $REPAR in Layer 4 (Keplr)',
    futureLayer4: '1.31T $REPAR (10%)',
    futureLayer5: '11.79T $REPAR (90%)',
    total: '13.1T $REPAR',
    usdValue: '$240.1B @ $18.33',
    percentOfSupply: '10% of 131T total supply'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Founder Wallet Architecture</h1>
        <p className="text-gray-600">The Aequitas Citadel: Multi-Layer Custody Stack</p>
      </div>

      {/* Wallet Connection Section */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-purple-200">Choose your preferred wallet to activate all features</p>
          </div>
          <WalletConnect onWalletConnected={handleWalletConnected} />
        </div>

        {connectedWallet && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">Connected Wallet</p>
                <p className="text-lg font-bold">{connectedWallet.address.slice(0, 16)}...{connectedWallet.address.slice(-8)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-200">Balance</p>
                <p className="text-lg font-bold">{walletBalance} REPAR</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {connectedWallet && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.name}
                  onClick={action.action}
                  disabled={!action.active}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    action.active
                      ? `border-${action.color}-500 bg-${action.color}-50 hover:bg-${action.color}-100`
                      : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Icon className={`h-8 w-8 text-${action.color}-600 mb-2`} />
                  <h4 className="font-bold text-gray-900">{action.name}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Allocation Summary */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <Lock className="h-8 w-8 text-amber-600 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Total Founder Allocation: {totalAllocation.percentOfSupply}</h2>

            {/* Current State */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="text-md font-semibold text-green-700 mb-2">✅ Current Allocation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Layer 4 (Keplr)</p>
                  <p className="text-lg font-bold text-green-700">{totalAllocation.current}</p>
                  <p className="text-xs text-gray-500">100% of founder share</p>
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

            {/* Future State */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-md font-semibold text-purple-700 mb-2">🔮 Future Distribution (When Layer 5 Active)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Layer 4 (Keplr - Hot)</p>
                  <p className="text-lg font-bold text-amber-700">{totalAllocation.futureLayer4}</p>
                  <p className="text-xs text-gray-500">10% - Active operations</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Layer 5 (Hardware - Cold)</p>
                  <p className="text-lg font-bold text-purple-700">{totalAllocation.futureLayer5}</p>
                  <p className="text-xs text-gray-500">90% - Maximum security</p>
                </div>
              </div>
              <div className="mt-3 bg-purple-50 border border-purple-200 rounded p-2">
                <p className="text-xs text-purple-700 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Transition will occur upon hardware wallet acquisition (Ledger Nano X / Trezor Model T)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Breakdown */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-purple-300">Founder Allocation (10%)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Vested (4 years)</span>
                <span className="font-bold text-purple-400">9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="font-bold">{formatCurrency(endowment.founderVested)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-purple-400/20 pt-2">
                <span className="text-sm text-gray-300">Discretionary</span>
                <span className="font-bold text-green-400">1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="font-bold">{formatCurrency(endowment.founderDiscretionary)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-amber-300">Development Fund (8%)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Endowment (8yr lock)</span>
                <span className="font-bold text-amber-400">6%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="font-bold">{formatCurrency(endowment.devEndowment)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-amber-400/20 pt-2">
                <span className="text-sm text-gray-300">Discretionary</span>
                <span className="font-bold text-green-400">2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="font-bold">{formatCurrency(endowment.devDiscretionary)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Control Summary */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-green-300">Total Control (18%)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Locked (Vested + Endowment)</p>
              <p className="text-2xl font-bold text-purple-400">15%</p>
              <p className="text-xs text-gray-400">{formatCurrency(endowment.founderVested + endowment.devEndowment)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Immediate Access</p>
              <p className="text-2xl font-bold text-green-400">3%</p>
              <p className="text-xs text-gray-400">{formatCurrency(endowment.totalDiscretionary)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Total Allocation</p>
              <p className="text-2xl font-bold text-green-400">18%</p>
              <p className="text-xs text-gray-400">{formatCurrency(endowment.totalControl)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different sections */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('multisig')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            activeTab === 'multisig' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Multi-Sig Security
        </button>
        <button
            onClick={() => setActiveTab('claims')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'claims' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <FileText className="inline w-5 h-5 mr-2" />
            File Claim
          </button>
      </div>

      {/* Content based on active tab */}
      <div>
        {activeTab === 'overview' && (
          <>
            {/* Security Layers */}
            <div className="space-y-4 mb-8">
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

            {/* Security Hierarchy Visualization */}
            <div className="bg-slate-900 text-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">🔐 Security Hierarchy</h3>
              <div className="space-y-3">
                {[
                  { level: 'Maximum', layer: 'Layer 5: Hardware Wallet', security: 'COLD', color: 'purple', holdings: '11.79T (90%)', status: 'Coming Soon' },
                  { level: 'Institutional', layer: 'Layer 3: Multi-Sig', security: 'WARM', color: 'amber', holdings: 'Variable', status: 'Active' },
                  { level: 'High', layer: 'Layer 4: Keplr', security: 'HOT', color: 'green', holdings: '13.1T (100%) → 1.31T (10%)', status: 'Active' },
                  { level: 'Standard', layer: 'Layer 2: MetaMask', security: 'HOT', color: 'orange', holdings: 'Operational', status: 'Active' },
                  { level: 'Convenience', layer: 'Layer 1: Coinbase', security: 'CUSTODIAL', color: 'blue', holdings: 'Minimal', status: 'Active' }
                ].map((item, idx) => (
                  <div key={idx} className={`bg-${item.color}-900/30 border border-${item.color}-500/50 rounded-lg p-4 flex items-center justify-between hover:bg-${item.color}-900/50 transition-all cursor-pointer`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2 py-1 text-xs font-bold rounded bg-${item.color}-600`}>{item.level}</span>
                        <span className="font-semibold">{item.layer}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span>Storage: {item.security}</span>
                        <span>Holdings: {item.holdings}</span>
                        <span className={item.status === 'Active' ? 'text-green-400' : 'text-amber-400'}>
                          {item.status === 'Active' ? '✅' : '⏳'} {item.status}
                        </span>
                      </div>
                    </div>
                    <Shield className={`h-6 w-6 text-${item.color}-400`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Best Practices */}
            <div className="bg-slate-900 text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Security Principles</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Defense in Depth</h4>
                  <p className="text-slate-300">5 layers of progressive security. Convenience → Operations → Institutional → Native → Maximum.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Zero Single Points of Failure</h4>
                  <p className="text-slate-300">Multi-sig for EVM operations. 24-word seed backup. Future hardware vault for 90% of holdings.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Mathematical Sovereignty</h4>
                  <p className="text-slate-300">"The hardware is disposable; the seed is eternal." - Your cryptographic keys outlive any device.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'multisig' && (
          <MultiSigWallet />
        )}

        {activeTab === 'claims' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Select Defendant</h3>
              <select
                value={selectedDefendant.id}
                onChange={(e) => setSelectedDefendant(defendants.find(d => d.id === Number(e.target.value)))}
                className="w-full bg-gray-700 text-white rounded px-4 py-2"
              >
                {defendants.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} - ${d.liability?.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <ClaimGenerator 
              defendant={selectedDefendant} 
              walletAddress={walletAddresses.coinbase || walletAddresses.metamask || walletAddresses.keplr}
            />
          </div>
        )}
      </div>

      {/* Quick Access Button for Multi-Sig (can be conditionally shown or removed based on design) */}
      {/* If you want to keep this button, you might want to adjust its visibility or placement */}
      {/*
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowMultiSig(!showMultiSig)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-colors"
        >
          <Shield className="h-5 w-5" />
          <span>{showMultiSig ? 'Hide' : 'Access'} Multi-Sig Treasury (Layer 3)</span>
        </button>
      </div>
      */}
    </div>
  );
};

export default FounderWallet;