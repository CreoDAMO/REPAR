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
      name: FOUNDER_WALLETS.layer1.name,
      subtitle: FOUNDER_WALLETS.layer1.description,
      address: connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? connectedWallet.address : FOUNDER_WALLETS.layer1.address,
      purpose: 'Mass adoption, fiat on-ramp, EVM bridge',
      status: connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? 'active' : FOUNDER_WALLETS.layer1.status,
      statusText: connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? 'Connected' : 'Active',
      icon: Wallet,
      color: 'blue',
      allocation: '0%',
      features: [
        '✓ Coinbase Wallet SDK integrated (@coinbase/wallet-sdk)',
        '✓ MetaMask SDK integrated (window.ethereum)',
        '✓ Multi-wallet support in navigation bar',
        '✓ Address: ' + (connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? connectedWallet.address : walletAddresses.layer1).slice(0, 10) + '...' + (connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? connectedWallet.address : walletAddresses.layer1).slice(-8),
        connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? '✓ Connected & Active' : '⏳ Awaiting connection'
      ],
      implementation: connectedWallet?.wallet === 'coinbase' || connectedWallet?.wallet === 'metamask' ? 'Connected! Use quick actions below for DEX, DAO, etc.' : 'Connect Coinbase or MetaMask wallet using button above',
    },
    {
      id: 2,
      name: FOUNDER_WALLETS.layer2.name,
      subtitle: FOUNDER_WALLETS.layer2.description,
      address: connectedWallet?.wallet === 'keplr' ? connectedWallet.address : FOUNDER_WALLETS.layer2.address,
      purpose: 'Full Cosmos ecosystem access',
      status: connectedWallet?.wallet === 'keplr' ? 'active' : FOUNDER_WALLETS.layer2.status,
      statusText: connectedWallet?.wallet === 'keplr' ? 'Connected' : 'Active',
      icon: Key,
      color: 'green',
      allocation: '< 0.1%',
      features: [
        '✓ Staking & governance participation',
        '✓ IBC transfers to Osmosis, Akash, etc.',
        '✓ Native Cosmos SDK module interaction',
        '✓ Address: ' + (connectedWallet?.wallet === 'keplr' ? connectedWallet.address : walletAddresses.layer2).slice(0, 10) + '...' + (connectedWallet?.wallet === 'keplr' ? connectedWallet.address : walletAddresses.layer2).slice(-8),
        connectedWallet?.wallet === 'keplr' ? '✓ Connected with Ledger support' : '⏳ Awaiting Keplr connection'
      ],
      implementation: connectedWallet?.wallet === 'keplr' ? 'Connected! Full Cosmos features available' : 'Connect Keplr wallet using button above',
    },
    {
      id: 3,
      name: FOUNDER_WALLETS.layer3.name,
      subtitle: FOUNDER_WALLETS.layer3.description,
      address: FOUNDER_WALLETS.layer3.address,
      purpose: 'Secure operational funds',
      status: FOUNDER_WALLETS.layer3.status,
      statusText: 'Pending Setup',
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
      name: FOUNDER_WALLETS.layer4.name,
      subtitle: FOUNDER_WALLETS.layer4.description,
      address: FOUNDER_WALLETS.layer4.address,
      purpose: 'Air-gapped security for vested funds',
      status: FOUNDER_WALLETS.layer4.status,
      statusText: 'Coming Soon',
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

            {/* Security Best Practices */}
            <div className="bg-slate-900 text-white rounded-lg p-6">
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