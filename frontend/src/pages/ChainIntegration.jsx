import { Network, Wallet, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import AddToMetaMask from '../components/AddToMetaMask';

export default function ChainIntegration() {
  const [copiedField, setCopiedField] = useState('');

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const networkDetails = {
    cosmos: {
      chainId: 'aequitas-1',
      chainName: 'Aequitas Protocol',
      nativeCurrency: 'REPAR',
      denomination: 'urepar',
      decimals: 6,
      bech32Prefix: 'repar',
      rpc: 'https://rpc.aequitasprotocol.zone',
      rest: 'https://api.aequitasprotocol.zone',
      explorer: 'https://explorer.aequitasprotocol.zone',
    },
    evm: {
      chainId: 1619,
      chainIdHex: '0x653',
      chainName: 'Aequitas Protocol',
      nativeCurrency: 'REPAR',
      decimals: 18,
      rpc: 'https://rpc-evm.aequitasprotocol.zone',
      explorer: 'https://explorer.aequitasprotocol.zone',
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Connect to Aequitas Protocol</h1>
            <p className="text-xl text-gray-100 mb-2">
              Add our network to MetaMask or Keplr with one click
            </p>
            <p className="text-sm text-gray-200">
              EVM Chain ID: 1619 • Cosmos Chain ID: aequitas-1
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Connect Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Quick Connect</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* MetaMask */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Wallet className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">MetaMask</h3>
                    <p className="text-sm text-gray-600">EVM Compatible</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm">
                  Connect with MetaMask, Coinbase Wallet, or any EVM-compatible wallet.
                </p>
                <AddToMetaMask />
              </div>

              {/* Keplr */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Network className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Keplr</h3>
                    <p className="text-sm text-gray-600">Cosmos Ecosystem</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm">
                  Connect with Keplr, Leap, or any Cosmos-compatible wallet.
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all">
                  <Network className="h-5 w-5" />
                  <span>Add to Keplr</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Network Details */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* EVM Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wallet className="h-6 w-6 text-orange-500" />
              EVM Network Details
            </h3>
            <p className="text-sm text-gray-600 mb-4">For MetaMask, Coinbase Wallet, Trust Wallet, etc.</p>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Network Name</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.evm.chainName, 'evm-name')}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    {copiedField === 'evm-name' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.evm.chainName}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Chain ID</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.evm.chainId.toString(), 'evm-chainid')}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    {copiedField === 'evm-chainid' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.evm.chainId} ({networkDetails.evm.chainIdHex})</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Currency</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.evm.nativeCurrency, 'evm-currency')}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    {copiedField === 'evm-currency' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.evm.nativeCurrency} ({networkDetails.evm.decimals} decimals)</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">RPC URL</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.evm.rpc, 'evm-rpc')}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    {copiedField === 'evm-rpc' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs break-all">{networkDetails.evm.rpc}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Block Explorer</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.evm.explorer, 'evm-explorer')}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    {copiedField === 'evm-explorer' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs break-all">{networkDetails.evm.explorer}</div>
              </div>
            </div>
          </div>

          {/* Cosmos Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Network className="h-6 w-6 text-purple-500" />
              Cosmos Network Details
            </h3>
            <p className="text-sm text-gray-600 mb-4">For Keplr, Leap, Cosmostation, etc.</p>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Network Name</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.cosmos.chainName, 'cosmos-name')}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    {copiedField === 'cosmos-name' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.cosmos.chainName}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Chain ID</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.cosmos.chainId, 'cosmos-chainid')}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    {copiedField === 'cosmos-chainid' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.cosmos.chainId}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Currency</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.cosmos.nativeCurrency, 'cosmos-currency')}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    {copiedField === 'cosmos-currency' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.cosmos.nativeCurrency} ({networkDetails.cosmos.denomination})</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">Bech32 Prefix</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.cosmos.bech32Prefix, 'cosmos-prefix')}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    {copiedField === 'cosmos-prefix' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm">{networkDetails.cosmos.bech32Prefix}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">RPC Endpoint</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.cosmos.rpc, 'cosmos-rpc')}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    {copiedField === 'cosmos-rpc' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs break-all">{networkDetails.cosmos.rpc}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-600">REST API</span>
                  <button
                    onClick={() => copyToClipboard(networkDetails.cosmos.rest, 'cosmos-rest')}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    {copiedField === 'cosmos-rest' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs break-all">{networkDetails.cosmos.rest}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Additional Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="https://explorer.aequitasprotocol.zone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                Block Explorer
              </a>
              <a
                href="https://docs.aequitasprotocol.zone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                Documentation
              </a>
              <a
                href="https://faucet.aequitasprotocol.zone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                Testnet Faucet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
