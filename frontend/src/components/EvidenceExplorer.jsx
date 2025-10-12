
import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Lock } from 'lucide-react';
import { getIPFSUrl } from '../utils/ipfsClient';

const EvidenceExplorer = ({ defendant }) => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const calculateCompoundInterest = (principal, rate, years) => {
    return principal * Math.pow(1 + rate, years);
  };

  const viewOnIPFS = (hash) => {
    window.open(getIPFSUrl(hash), '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Chain of Guilt Timeline */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4">Chain of Guilt</h3>
        <div className="space-y-4">
          {defendant.chainOfGuilt?.map((entry, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="w-24 text-gray-400">{entry.year}</div>
              <div className="flex-1 bg-gray-700 rounded p-3">
                <div className="font-semibold text-white">{entry.entity}</div>
                <div className="text-green-400">
                  ${entry.liability.toLocaleString()}
                </div>
              </div>
              {idx < defendant.chainOfGuilt.length - 1 && (
                <div className="text-purple-400">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Documents */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4">Evidence Repository</h3>
        <div className="grid gap-4">
          {defendant.evidence?.map((evidence, idx) => (
            <div
              key={idx}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => setSelectedEvidence(evidence)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-white">{evidence.type}</span>
                    <span className="text-sm text-gray-400">({evidence.year})</span>
                  </div>
                  <p className="text-gray-300 text-sm">{evidence.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      viewOnIPFS(evidence.ipfsHash);
                    }}
                    className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                    title="View on IPFS"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400 font-mono">
                  IPFS: {evidence.ipfsHash?.substring(0, 20)}...
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compound Interest Calculator */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4">
          Compound Interest Calculator
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Original Liability (1690):</span>
            <span className="text-white font-semibold">
              ${defendant.chainOfGuilt?.[0]?.liability.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Annual Interest Rate:</span>
            <span className="text-white font-semibold">
              {(defendant.compoundInterestRate * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Years Compounded:</span>
            <span className="text-white font-semibold">
              {new Date().getFullYear() - defendant.founded}
            </span>
          </div>
          <div className="border-t border-gray-600 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Liability (2024):</span>
              <span className="text-green-400 font-bold text-xl">
                ${defendant.liability?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Evidence Detail Modal */}
      {selectedEvidence && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvidence(null)}
        >
          <div 
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              {selectedEvidence.type}
            </h3>
            <p className="text-gray-300 mb-4">{selectedEvidence.description}</p>
            <div className="bg-gray-900 rounded p-4 mb-4">
              <p className="text-sm text-gray-400 mb-2">IPFS Hash (Immutable):</p>
              <p className="text-xs text-green-400 font-mono break-all">
                {selectedEvidence.ipfsHash}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => viewOnIPFS(selectedEvidence.ipfsHash)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                View on IPFS
              </button>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceExplorer;
