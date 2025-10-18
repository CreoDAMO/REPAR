import { useState } from 'react';
import { Brain, Sparkles, TrendingUp, Clock } from 'lucide-react';

export default function OracleQuery() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const suggestedQueries = [
    "What's the probability Barclays settles within 18 months?",
    "Simulate $100T total settlements impact on REPAR price",
    "What's optimal legal strategy for UK defendants?",
    "Predict Year 5 endowment balance at current DEX volume",
    "Which defendants most likely to settle first?",
    "Impact of $50B settlement on global UBI program"
  ];

  const handleQuery = async (q) => {
    setLoading(true);
    setQuery(q);
    
    // Simulate Oracle processing
    setTimeout(() => {
      setResult({
        query: q,
        confidence: 85 + Math.random() * 10,
        prediction: generatePrediction(q),
        reasoning: [
          "Historical settlement patterns analyzed across 247 comparable cases",
          "Current market conditions and regulatory environment considered",
          "Financial stress indicators for defendant organizations evaluated",
          "Probability weighted against timeline and strategic variables"
        ],
        timeline: generateTimeline(),
        alternatives: [
          { scenario: "Optimistic", probability: 35, outcome: "Settlement in 12 months" },
          { scenario: "Base Case", probability: 55, outcome: "Settlement in 18-24 months" },
          { scenario: "Pessimistic", probability: 10, outcome: "Extended litigation >36 months" }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const generatePrediction = (query) => {
    if (query.includes("Barclays")) {
      return "73% probability of settlement within 18-24 months, estimated range $45B-$68B";
    } else if (query.includes("$100T")) {
      return "$REPAR price projection: $285-$420 per coin with $100T total settlements";
    } else if (query.includes("UK defendants")) {
      return "Coordinated negotiation strategy recommended - target Lloyd's first as bellwether";
    } else if (query.includes("Year 5")) {
      return "$153M LP endowment principal achieved by Year 5 at current $60M annual DEX volume";
    } else if (query.includes("first")) {
      return "Highest settlement probability: 1) Deutsche Bank (68%), 2) Credit Suisse (64%), 3) BNP Paribas (61%)";
    } else {
      return "$3.6M annual UBI funding from $50B settlement yield (7% APY on 30% of recovery)";
    }
  };

  const generateTimeline = () => [
    { date: "Q1 2026", event: "Initial discovery phase completion", probability: 92 },
    { date: "Q3 2026", event: "Settlement negotiations begin", probability: 78 },
    { date: "Q4 2026", event: "First bellwether defendant settles", probability: 65 },
    { date: "Q2 2027", event: "Major UK banks coordinate settlement", probability: 58 },
    { date: "Q4 2027", event: "Full settlement finalization", probability: 45 }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-purple-400" />
        <div>
          <h3 className="text-2xl font-bold">🔮 Oracle Intelligence Engine</h3>
          <p className="text-sm text-gray-300">Ask the Oracle anything about settlements, economics, or strategy</p>
        </div>
      </div>

      {/* Query Input */}
      <div className="mb-6">
        <textarea
          className="w-full bg-gray-800/50 border border-purple-400/30 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          rows={3}
          placeholder="Ask the Oracle: What probability does Barclays have of settling within 18 months?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleQuery(query);
            }
          }}
        />
        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-gray-500">Press Enter to submit</p>
          <button
            onClick={() => handleQuery(query)}
            disabled={!query.trim() || loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Processing...' : 'Query Oracle'}
          </button>
        </div>
      </div>

      {/* Suggested Queries */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-400 mb-3">💡 Suggested Queries:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleQuery(sq)}
              className="text-left bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/20 rounded-lg p-3 text-sm text-gray-300 hover:text-white transition"
            >
              "{sq}"
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
            <p className="text-lg text-gray-300">Oracle processing your query...</p>
            <p className="text-sm text-gray-500">Analyzing blockchain data and historical patterns</p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4">
          {/* Confidence Meter */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-300">Oracle Confidence</span>
              <span className="text-2xl font-bold text-green-400">{result.confidence.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {/* Prediction */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-5">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Prediction
            </h4>
            <p className="text-gray-200 text-lg">{result.prediction}</p>
          </div>

          {/* Reasoning */}
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/30 rounded-xl p-5">
            <h4 className="font-bold text-lg mb-3">Reasoning Chain</h4>
            <ul className="space-y-2">
              {result.reasoning.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-400/30 rounded-xl p-5">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              Projected Timeline
            </h4>
            <div className="space-y-3">
              {result.timeline.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-200">{item.date}</p>
                    <p className="text-sm text-gray-400">{item.event}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-green-400">{item.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Scenarios */}
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-400/30 rounded-xl p-5">
            <h4 className="font-bold text-lg mb-3">Alternative Scenarios</h4>
            <div className="space-y-2">
              {result.alternatives.map((alt, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-200">{alt.scenario}</p>
                    <p className="text-sm text-gray-400">{alt.outcome}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-yellow-400">{alt.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
