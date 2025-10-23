import React, { useState } from 'react';
import { Search, Loader, AlertCircle } from 'lucide-react';
import { multimodalSearch } from '../../utils/nvidiaAI';

const MultimodalSearch = () => {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const exampleQueries = [
    "Financial institutions with slavery liabilities",
    "Universities with historical involvement",
    "Corporations profiting from forced labor"
  ];

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setSearching(true);
    setError(null);

    try {
      const result = await multimodalSearch(searchQuery);
      if (result.success) {
        setResults(result);
      } else {
        setError('Search failed');
      }
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setSearching(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-8 h-8 text-indigo-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Multimodal Liability Search</h2>
          <p className="text-gray-600">Powered by CLIP</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Query
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for defendants, evidence, or liabilities..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSearch()}
              disabled={searching || !query.trim()}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-all ${
                searching || !query.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {searching ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Quick searches:</span>
          {exampleQueries.map((exQuery, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(exQuery);
                handleSearch(exQuery);
              }}
              className="text-xs px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full transition-colors"
            >
              {exQuery}
            </button>
          ))}
        </div>

        {results && (
          <div className="space-y-4 mt-6 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Found {results.totalResults} result{results.totalResults !== 1 ? 's' : ''}
              </h3>
              {results.isMock && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Demo Mode
                </span>
              )}
            </div>

            <div className="space-y-3">
              {results.results.map((result) => (
                <div
                  key={result.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{result.name}</h4>
                      <p className="text-sm text-gray-600">{result.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <span className="text-sm text-gray-600">Liability:</span>
                      <p className="font-bold text-red-600 text-lg">{result.liability}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Confidence:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600"
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                        <span className="font-medium text-gray-900">{(result.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Evidence:</span> {result.evidence}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Search powered by:</span> {results.model} • 
                <span className="ml-2">Processed at {new Date(results.timestamp).toLocaleTimeString()}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultimodalSearch;
