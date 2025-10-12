
import { useState } from 'react';
import { Shield, Users, Key, CheckCircle2, XCircle, Clock } from 'lucide-react';

const MultiSigWallet = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const treasuryInfo = {
    balance: '1.31T $REPAR',
    usdValue: '$24.01B',
    signaturesRequired: '2 of 3',
    keyholders: [
      { id: 1, name: 'Founder Operational Key', address: 'repar1founder...', status: 'active', device: 'Keplr + Ledger' },
      { id: 2, name: 'Foundation CFO/COO', address: 'repar1cfo...', status: 'active', device: 'Keplr' },
      { id: 3, name: 'Automated Policy Contract', address: 'repar1policy...', status: 'active', device: 'Smart Contract' },
    ],
    pendingTransactions: [
      { id: 1, type: 'Security Detail Payment', amount: '5,000 $REPAR', signatures: 1, required: 2, timestamp: '2024-01-15' },
      { id: 2, type: 'Legal Team Retainer', amount: '10,000 $REPAR', signatures: 2, required: 2, timestamp: '2024-01-14', status: 'approved' },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Multi-Signature Treasury</h2>
            <p className="text-amber-100">Layer 3: Operational Security Wallet</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs text-amber-100">Total Balance</p>
            <p className="text-xl font-bold">{treasuryInfo.balance}</p>
            <p className="text-xs text-amber-100">{treasuryInfo.usdValue}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs text-amber-100">Signatures Required</p>
            <p className="text-xl font-bold">{treasuryInfo.signaturesRequired}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs text-amber-100">Pending Approvals</p>
            <p className="text-xl font-bold">{treasuryInfo.pendingTransactions.filter(tx => !tx.status).length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {['overview', 'keyholders', 'pending', 'create'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Treasury Configuration
              </h3>
              <p className="text-sm text-blue-700">
                This 2-of-3 multisig wallet holds the <strong>1% immediate founder allocation</strong>. 
                All transactions require approval from at least 2 keyholders for enhanced security.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Security Model</h4>
                <p className="text-sm text-gray-600">Multi-signature prevents single point of failure</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Smart Automation</h4>
                <p className="text-sm text-gray-600">Policy contract auto-approves pre-budgeted items</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Transparent Ledger</h4>
                <p className="text-sm text-gray-600">All transactions recorded on-chain permanently</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keyholders' && (
          <div className="space-y-3">
            {treasuryInfo.keyholders.map((holder) => (
              <div key={holder.id} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Key className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{holder.name}</h4>
                  <p className="text-sm text-gray-500 font-mono">{holder.address}</p>
                  <p className="text-xs text-gray-400">{holder.device}</p>
                </div>
                <div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {holder.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="space-y-3">
            {treasuryInfo.pendingTransactions.map((tx) => (
              <div key={tx.id} className={`border rounded-lg p-4 ${
                tx.status === 'approved' ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{tx.type}</h4>
                    <p className="text-sm text-gray-500">{tx.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{tx.amount}</p>
                    <p className="text-xs text-gray-500">
                      {tx.signatures} of {tx.required} signatures
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {tx.status === 'approved' ? (
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approved - Ready to Execute</span>
                    </div>
                  ) : (
                    <>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-semibold transition-colors">
                        Approve Transaction
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-semibold transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Create New Transaction</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Security Detail Payment</option>
                    <option>Legal Services</option>
                    <option>Development Costs</option>
                    <option>Marketing Budget</option>
                    <option>Other Operational Expense</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient Address
                  </label>
                  <input 
                    type="text" 
                    placeholder="repar1..." 
                    className="w-full border border-gray-300 rounded-md p-2 font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount ($REPAR)
                  </label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea 
                    rows="3" 
                    placeholder="Describe the purpose of this transaction..."
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-md font-semibold transition-colors">
                  Propose Transaction (Requires 2 Signatures)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSigWallet;
