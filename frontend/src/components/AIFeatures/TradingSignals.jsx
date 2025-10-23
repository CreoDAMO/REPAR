import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Loader, RefreshCw } from 'lucide-react';
import { analyzeSentiment } from '../../utils/nvidiaAI';

const TradingSignals = () => {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const exampleTexts = [
    "REPAR price up 10% after major partnership announcement",
    "Market uncertainty as regulations tighten for crypto",
    "Strong institutional buying pressure on REPAR token"
  ];

  const handleAnalyze = async (text = inputText) => {
    if (!text.trim()) {
      setError('Please enter text to analyze');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeSentiment(text);
      if (result.success) {
        setAnalysis(result);
      } else {
        setError('Failed to analyze sentiment');
      }
    } catch (err) {
      setError(err.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const getSentimentIcon = (score) => {
    if (score > 0.3) return <TrendingUp className="w-6 h-6 text-green-500" />;
    if (score < -0.3) return <TrendingDown className="w-6 h-6 text-red-500" />;
    return <Minus className="w-6 h-6 text-gray-500" />;
  };

  const getSentimentColor = (score) => {
    if (score > 0.3) return 'bg-green-100 text-green-800 border-green-300';
    if (score < -0.3) return 'bg-red-100 text-red-800 border-red-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getSentimentLabel = (score) => {
    if (score > 0.5) return 'Very Bullish';
    if (score > 0.3) return 'Bullish';
    if (score > 0) return 'Slightly Bullish';
    if (score > -0.3) return 'Neutral';
    if (score > -0.5) return 'Bearish';
    return 'Very Bearish';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Trading Signals</h2>
          <p className="text-gray-600">Powered by Llama 3.1 8B</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Market News or Social Media Post
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter news, tweet, or market update to analyze sentiment..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Quick examples:</span>
          {exampleTexts.map((text, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(text);
                handleAnalyze(text);
              }}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              Example {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleAnalyze()}
          disabled={analyzing || !inputText.trim()}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg ${
            analyzing || !inputText.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl'
          }`}
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Analyzing Sentiment...
            </span>
          ) : (
            'Analyze Sentiment'
          )}
        </button>

        {analysis && (
          <div className="space-y-4 mt-6 border-t pt-6">
            <div className={`rounded-xl border-2 p-6 ${getSentimentColor(analysis.score)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getSentimentIcon(analysis.score)}
                  <span className="text-2xl font-bold">{getSentimentLabel(analysis.score)}</span>
                </div>
                <div className="text-3xl font-bold">
                  {analysis.score > 0 ? '+' : ''}{(analysis.score * 100).toFixed(0)}%
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <p className="text-sm leading-relaxed">{analysis.sentiment}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Confidence Score:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-current transition-all"
                      style={{ width: `${Math.abs(analysis.score) * 100}%` }}
                    />
                  </div>
                  <span className="font-medium">{(Math.abs(analysis.score) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">AI Model:</span>
                <span className="font-medium text-gray-900">{analysis.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Analyzed:</span>
                <span className="font-medium text-gray-900">
                  {new Date(analysis.timestamp).toLocaleString()}
                </span>
              </div>
              {analysis.isMock && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium text-yellow-600">Demo (Real API not configured)</span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleAnalyze()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Re-analyze
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingSignals;
