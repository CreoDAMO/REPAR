import { useState, useEffect } from 'react';
import { Database, Activity, Box, Users, FileText, Settings, AlertCircle } from 'lucide-react';

export default function BlockExplorer() {
  const [explorerUrl, setExplorerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In development, try to connect to the dexplorer service
    // In production, use the production explorer URL
    const url = import.meta.env.PROD 
      ? 'https://explorer.aequitasprotocol.zone' 
      : 'http://localhost:3001';
    
    setExplorerUrl(url);
    
    // Check if the explorer is accessible
    const checkExplorer = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setIsLoading(false);
          setError(null);
        } else {
          setError('Explorer service is not responding');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Explorer service is not running. Please start the Block Explorer workflow.');
        setIsLoading(false);
      }
    };

    checkExplorer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <Database className="h-10 w-10 text-purple-300" />
            <div>
              <h1 className="text-3xl font-bold">Aequitas Block Explorer</h1>
              <p className="text-purple-200">Explore the Aequitas Zone blockchain in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Box className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Blocks</p>
              <p className="text-lg font-bold">Live</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Activity className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Transactions</p>
              <p className="text-lg font-bold">Real-time</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Users className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-xs text-gray-600">Validators</p>
              <p className="text-lg font-bold">Active</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <FileText className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-xs text-gray-600">Governance</p>
              <p className="text-lg font-bold">Proposals</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Database className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-xs text-gray-600">Native Coin</p>
              <p className="text-lg font-bold">$REPAR</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Settings className="h-8 w-8 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Chain ID</p>
              <p className="text-sm font-bold">aequitas-1</p>
            </div>
          </div>
        </div>

        {/* Explorer Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading Aequitas Block Explorer...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-8">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Explorer Not Available</h3>
                    <p className="text-amber-800 mb-4">{error}</p>
                    <div className="bg-white rounded p-4 border border-amber-200">
                      <p className="text-sm font-semibold text-gray-900 mb-2">To start the Block Explorer:</p>
                      <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                        <li>Make sure the "Block Explorer" workflow is running in Replit</li>
                        <li>The explorer should be accessible at: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{explorerUrl}</code></li>
                        <li>Once started, refresh this page</li>
                      </ol>
                    </div>
                    <div className="mt-4">
                      <button 
                        onClick={() => window.location.reload()} 
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded font-semibold"
                      >
                        Retry Connection
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information about the explorer */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    What You Can Explore
                  </h4>
                  <ul className="text-sm text-indigo-800 space-y-2">
                    <li>• Real-time blocks and transactions</li>
                    <li>• Validator information and staking</li>
                    <li>• Account balances and activity</li>
                    <li>• Governance proposals and voting</li>
                    <li>• Chain parameters and statistics</li>
                    <li>• Native $REPAR coin data (urepar denomination)</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Custom Aequitas Modules
                  </h4>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• <strong>x/defendant</strong> - Defendant liability tracking</li>
                    <li>• <strong>x/justice</strong> - Justice Burn mechanism</li>
                    <li>• <strong>x/claims</strong> - Arbitration demands</li>
                    <li>• <strong>x/distribution</strong> - Reparations distribution</li>
                    <li>• <strong>x/threatdefense</strong> - 10% Chaos Defense</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full" style={{ height: 'calc(100vh - 350px)', minHeight: '600px' }}>
              <iframe
                src={explorerUrl}
                className="w-full h-full border-0"
                title="Aequitas Block Explorer"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-indigo-900 text-white rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-bold mb-2">💎 Native Currency</p>
              <p className="text-indigo-200">$REPAR (urepar denomination)</p>
              <p className="text-indigo-300 text-xs">1 REPAR = 1,000,000 urepar</p>
            </div>
            <div>
              <p className="font-bold mb-2">🌐 Network</p>
              <p className="text-indigo-200">Aequitas Zone (Cosmos SDK)</p>
              <p className="text-indigo-300 text-xs">Sovereign Layer-1 Blockchain</p>
            </div>
            <div>
              <p className="font-bold mb-2">📊 Total Supply</p>
              <p className="text-indigo-200">131 Trillion $REPAR</p>
              <p className="text-indigo-300 text-xs">Pegged to $131T liability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
