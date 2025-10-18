import { useState } from 'react';
import { Globe, Target, DollarSign, Flame, TrendingUp } from 'lucide-react';

export default function WarRoomVisualization() {
  const [selectedDefendant, setSelectedDefendant] = useState(null);
  const [activeJusticeBurn, setActiveJusticeBurn] = useState(false);

  const topDefendants = [
    { 
      name: "Barclays PLC", 
      country: "UK", 
      estimatedSettlement: "$45B-$68B",
      probability: 73,
      category: "Banking",
      evidence: "High",
      timeline: "18-24 months"
    },
    { 
      name: "Deutsche Bank", 
      country: "Germany", 
      estimatedSettlement: "$32B-$51B",
      probability: 68,
      category: "Banking",
      evidence: "High",
      timeline: "12-18 months"
    },
    { 
      name: "Credit Suisse", 
      country: "Switzerland", 
      estimatedSettlement: "$28B-$44B",
      probability: 64,
      category: "Banking",
      evidence: "Medium",
      timeline: "18-30 months"
    },
    { 
      name: "Lloyd's of London", 
      country: "UK", 
      estimatedSettlement: "$52B-$78B",
      probability: 71,
      category: "Insurance",
      evidence: "Very High",
      timeline: "24-36 months"
    },
    { 
      name: "BNP Paribas", 
      country: "France", 
      estimatedSettlement: "$24B-$39B",
      probability: 61,
      category: "Banking",
      evidence: "Medium",
      timeline: "24-36 months"
    }
  ];

  const triggerJusticeBurn = () => {
    setActiveJusticeBurn(true);
    setTimeout(() => setActiveJusticeBurn(false), 3000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-red-400/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-red-400" />
          <div>
            <h3 className="text-2xl font-bold">⚔️ War Room: Defendant Tracking</h3>
            <p className="text-sm text-gray-300">Interactive map of high-value targets and legal strategy</p>
          </div>
        </div>
        <button
          onClick={triggerJusticeBurn}
          className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
            activeJusticeBurn 
              ? 'bg-gradient-to-r from-orange-600 to-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
          } text-white`}
        >
          <Flame className="w-5 h-5" />
          {activeJusticeBurn ? 'Burning...' : 'Activate Justice Burn'}
        </button>
      </div>

      {/* Justice Burn Animation */}
      {activeJusticeBurn && (
        <div className="mb-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-red-400/50 rounded-xl p-6 animate-pulse">
          <div className="flex items-center justify-center gap-3">
            <Flame className="w-8 h-8 text-orange-400 animate-bounce" />
            <div className="text-center">
              <p className="text-xl font-bold text-orange-300">⚡ JUSTICE BURN ACTIVATED ⚡</p>
              <p className="text-sm text-gray-300 mt-1">Burning 50% of recovery fees forever • Deflationary mechanism engaged</p>
            </div>
            <Flame className="w-8 h-8 text-red-400 animate-bounce" />
          </div>
        </div>
      )}

      {/* Global Heat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Defendant List */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            High-Value Targets
          </h4>
          {topDefendants.map((defendant, i) => (
            <div
              key={i}
              onClick={() => setSelectedDefendant(defendant)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                selectedDefendant?.name === defendant.name
                  ? 'bg-red-500/20 border-red-400/50 shadow-lg'
                  : 'bg-white/5 border-gray-600/30 hover:bg-white/10 hover:border-red-400/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="font-bold text-lg text-white">{defendant.name}</h5>
                  <p className="text-sm text-gray-400">{defendant.country} • {defendant.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Settlement Probability</div>
                  <div className="text-2xl font-bold text-green-400">{defendant.probability}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Estimated Settlement</p>
                  <p className="font-semibold text-yellow-400">{defendant.estimatedSettlement}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Evidence Level</p>
                  <p className="font-semibold text-orange-400">{defendant.evidence}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Timeline</p>
                  <p className="font-semibold text-blue-400">{defendant.timeline}</p>
                </div>
              </div>

              {/* Probability Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${defendant.probability}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Defendant Details */}
        <div className="lg:col-span-1">
          {selectedDefendant ? (
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-xl p-5 sticky top-4">
              <h4 className="font-bold text-lg mb-4 text-red-300">📋 Target Dossier</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm text-gray-400 mb-1">Organization</h5>
                  <p className="font-bold text-xl text-white">{selectedDefendant.name}</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400 mb-1">Jurisdiction</h5>
                  <p className="font-semibold text-gray-200">{selectedDefendant.country}</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400 mb-1">Settlement Range</h5>
                  <p className="font-semibold text-yellow-400 text-lg">{selectedDefendant.estimatedSettlement}</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400 mb-1">Evidence Strength</h5>
                  <p className="font-semibold text-orange-400">{selectedDefendant.evidence}</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400 mb-1">Success Probability</h5>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                        style={{ width: `${selectedDefendant.probability}%` }}
                      />
                    </div>
                    <span className="font-bold text-green-400">{selectedDefendant.probability}%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h5 className="text-sm text-gray-400 mb-2">🎯 Recommended Actions</h5>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Coordinate with legal team in {selectedDefendant.country}</li>
                    <li>• Engage settlement mediators</li>
                    <li>• Prepare evidence documentation</li>
                    <li>• Timeline: {selectedDefendant.timeline}</li>
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Initiate Legal Action
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-600/30 rounded-xl p-8 text-center sticky top-4">
              <Globe className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className="text-gray-400">Select a defendant to view details</p>
              <p className="text-sm text-gray-500 mt-2">Click any organization to see legal strategy and evidence</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-4 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold text-green-400">$181B-$280B</div>
          <div className="text-sm text-gray-400">Total Estimated</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-blue-400">247</div>
          <div className="text-sm text-gray-400">Total Defendants</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-4 text-center">
          <Flame className="w-8 h-8 mx-auto mb-2 text-orange-400" />
          <div className="text-2xl font-bold text-orange-400">50%</div>
          <div className="text-sm text-gray-400">Justice Burn Rate</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4 text-center">
          <Globe className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-purple-400">23</div>
          <div className="text-sm text-gray-400">Jurisdictions</div>
        </div>
      </div>
    </div>
  );
}
