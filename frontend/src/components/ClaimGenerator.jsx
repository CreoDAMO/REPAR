
import React, { useState } from 'react';
import { FileText, Download, Send } from 'lucide-react';
import { uploadJSONToIPFS } from '../utils/ipfsClient';

const ClaimGenerator = ({ defendant, walletAddress }) => {
  const [claimData, setClaimData] = useState({
    claimantName: '',
    claimantAddress: walletAddress || '',
    ancestorName: '',
    relationship: '',
    damagesRequested: defendant?.liability || 0,
    jurisdiction: 'International Arbitration - NYC Convention'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimHash, setClaimHash] = useState(null);

  const generateClaimDocument = () => {
    const doc = {
      title: 'ARBITRATION DEMAND',
      subtitle: 'Under the New York Convention on Recognition and Enforcement of Foreign Arbitral Awards',
      date: new Date().toISOString(),
      claimant: {
        name: claimData.claimantName,
        address: claimData.claimantAddress,
        ancestor: claimData.ancestorName,
        relationship: claimData.relationship
      },
      respondent: {
        name: defendant.name,
        category: defendant.category,
        jurisdiction: defendant.jurisdiction,
        founded: defendant.founded
      },
      claim: {
        basis: 'Unjust enrichment derived from the transatlantic slave trade',
        liability: defendant.liability,
        compoundInterest: `Calculated at ${(defendant.compoundInterestRate * 100).toFixed(1)}% annually from ${defendant.founded} to present`,
        damagesRequested: claimData.damagesRequested
      },
      evidence: defendant.evidence?.map(e => ({
        type: e.type,
        description: e.description,
        ipfsHash: e.ipfsHash,
        year: e.year
      })),
      legalBasis: [
        'Universal Declaration of Human Rights (1948)',
        'International Covenant on Civil and Political Rights',
        'UN Basic Principles on Right to Remedy and Reparation',
        'Unjust Enrichment under International Law'
      ],
      jurisdiction: claimData.jurisdiction,
      reliefSought: [
        `Monetary damages of $${claimData.damagesRequested.toLocaleString()}`,
        'Declaration of liability under international law',
        'Establishment of reparations fund',
        'Public acknowledgment of historical wrongs'
      ],
      signature: {
        claimant: claimData.claimantName,
        walletAddress: claimData.claimantAddress,
        timestamp: new Date().toISOString()
      }
    };
    return doc;
  };

  const handleSubmitClaim = async () => {
    setIsSubmitting(true);
    try {
      const claimDocument = generateClaimDocument();
      const hash = await uploadJSONToIPFS(claimDocument);
      setClaimHash(hash);
      alert(`Claim successfully filed to IPFS!\n\nIPFS Hash: ${hash}\n\nThis is an immutable record of your arbitration demand.`);
    } catch (error) {
      alert('Error filing claim: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadClaim = () => {
    const doc = generateClaimDocument();
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arbitration-demand-${defendant.name.replace(/\s/g, '-')}-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-purple-400 mb-6">File Arbitration Demand</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-400 mb-2">Your Name</label>
          <input
            type="text"
            value={claimData.claimantName}
            onChange={(e) => setClaimData({ ...claimData, claimantName: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-4 py-2"
            placeholder="Full legal name"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Wallet Address</label>
          <input
            type="text"
            value={claimData.claimantAddress}
            onChange={(e) => setClaimData({ ...claimData, claimantAddress: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-4 py-2 font-mono text-sm"
            placeholder="0x... or cosmos..."
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Ancestor Name</label>
          <input
            type="text"
            value={claimData.ancestorName}
            onChange={(e) => setClaimData({ ...claimData, ancestorName: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-4 py-2"
            placeholder="Name of enslaved ancestor"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Relationship</label>
          <input
            type="text"
            value={claimData.relationship}
            onChange={(e) => setClaimData({ ...claimData, relationship: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-4 py-2"
            placeholder="e.g., Great-great-great grandson"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Damages Requested</label>
          <div className="flex items-center space-x-2">
            <span className="text-white">$</span>
            <input
              type="number"
              value={claimData.damagesRequested}
              onChange={(e) => setClaimData({ ...claimData, damagesRequested: Number(e.target.value) })}
              className="flex-1 bg-gray-700 text-white rounded px-4 py-2"
            />
          </div>
        </div>
      </div>

      {claimHash && (
        <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded-lg p-4 mb-6">
          <p className="text-green-400 font-semibold mb-2">Claim Filed Successfully!</p>
          <p className="text-sm text-gray-300 mb-2">IPFS Hash:</p>
          <p className="text-xs text-green-400 font-mono break-all">{claimHash}</p>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={downloadClaim}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download Draft</span>
        </button>
        <button
          onClick={handleSubmitClaim}
          disabled={isSubmitting || !claimData.claimantName || !claimData.claimantAddress}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded transition-colors flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? 'Filing to IPFS...' : 'File Claim to IPFS'}</span>
        </button>
      </div>
    </div>
  );
};

export default ClaimGenerator;
