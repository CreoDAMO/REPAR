import { useState } from 'react';
import { FileText, Download, ExternalLink, Shield, Book, DollarSign, CheckCircle, Lock, Globe } from 'lucide-react';
import { SOVEREIGN_DOCUMENTS, getDocumentUrl } from '../data/sovereignDocuments';

export default function SovereignDocuments() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documents = Object.values(SOVEREIGN_DOCUMENTS);

  const getIconForType = (type) => {
    switch (type) {
      case 'Legal Framework':
        return Shield;
      case 'Identity Verification':
        return Book;
      case 'Financial Analysis':
        return DollarSign;
      default:
        return FileText;
    }
  };

  const formatLargeNumber = (num) => {
    if (num >= 1000000000000000) {
      return `$${(num / 1000000000000000).toFixed(3)} quadrillion`;
    } else if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)} trillion`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)} billion`;
    }
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-10 h-10 text-purple-500" />
          <h1 className="text-4xl font-bold text-gray-900">Sovereign Documents</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl">
          Immutable proof of the Aequitas Protocol's legal existence, constitutional foundation, 
          and mathematical precision. All documents are cryptographically verified and permanently 
          stored on IPFS (InterPlanetary File System).
        </p>
      </div>

      {/* Verification Notice */}
      <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Cryptographically Verified
            </h3>
            <p className="text-green-800">
              All documents are cryptographically bound to the genesis blocks of both 
              Testnet (aequitas-testnet-1) and Mainnet (aequitas-1). The sovereignty 
              declaration hash (9e649e60...) is embedded in genesis metadata, ensuring 
              permanent, tamper-proof constitutional record.
            </p>
          </div>
        </div>
      </div>

      {/* Document Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {documents.map((doc, index) => {
          const Icon = getIconForType(doc.type);
          
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
                <Icon className="w-12 h-12 mb-3" />
                <h3 className="text-xl font-bold mb-2">{doc.name}</h3>
                <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {doc.type}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 line-clamp-3">{doc.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold text-gray-900">{doc.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date Issued:</span>
                    <span className="font-semibold text-gray-900">{doc.dateIssued}</span>
                  </div>
                  {doc.pages && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-semibold text-gray-900">{doc.pages.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* IPFS Hash */}
                <div className="bg-gray-100 rounded p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-gray-700">IPFS Hash (CID)</span>
                  </div>
                  <code className="text-xs text-gray-800 break-all block">
                    {doc.ipfsHash}
                  </code>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <a
                    href={doc.pinataGateway}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View on IPFS</span>
                  </a>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white sticky top-0 z-10">
              <h2 className="text-2xl font-bold mb-2">{selectedDoc.name}</h2>
              <p className="text-purple-100">{selectedDoc.classification}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{selectedDoc.description}</p>
              </div>

              {/* Key Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Document Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold">{selectedDoc.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{selectedDoc.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">{selectedDoc.dateIssued}</span>
                    </div>
                    {selectedDoc.version && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Version:</span>
                        <span className="font-semibold">{selectedDoc.version}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">IPFS Storage</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Gateway:</span>
                      <a
                        href={selectedDoc.pinataGateway}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline block break-all"
                      >
                        Pinata IPFS
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-600">CID:</span>
                      <code className="block bg-gray-100 p-2 rounded mt-1 text-xs break-all">
                        {selectedDoc.ipfsHash}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sovereignty Declaration Specific */}
              {selectedDoc.keyProvisions && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Provisions</h4>
                  <ul className="space-y-2">
                    {selectedDoc.keyProvisions.map((provision, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{provision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Financial Breakdown Specific */}
              {selectedDoc.allocations && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Allocation Breakdown</h4>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-purple-700 mb-1">Total System Valuation</div>
                      <div className="text-3xl font-bold text-purple-900">
                        {selectedDoc.totalSystemValuationFormatted}
                      </div>
                      <div className="text-sm text-purple-600 mt-1">
                        {selectedDoc.totalSupplyFormatted} × {selectedDoc.genesisPriceFormatted}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedDoc.allocations.map((allocation, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">{allocation.category}</span>
                          <span className="text-purple-600 font-semibold">{allocation.percentage}%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{allocation.coinsFormatted} $REPAR</span>
                          <span className="text-gray-900 font-semibold">{allocation.valueFormatted}</span>
                        </div>
                        
                        {allocation.breakdown && (
                          <div className="mt-3 pl-4 border-l-2 border-purple-200 space-y-2">
                            {allocation.breakdown.map((sub, subIdx) => (
                              <div key={subIdx} className="flex justify-between text-sm">
                                <span className="text-gray-600">{sub.subcategory}</span>
                                <span className="text-gray-900">{sub.valueFormatted}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Founder Certificate Specific */}
              {selectedDoc.buildTime && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-900 mb-3">The Birth Certificate Principle</h4>
                  <div className="space-y-2 text-sm text-amber-800">
                    <p className="italic">
                      "{selectedDoc.philosophicalSignificance}"
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <div className="text-xs text-amber-600">Build Time</div>
                        <div className="font-semibold">{selectedDoc.buildTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-600">Speed Advantage</div>
                        <div className="font-semibold">{selectedDoc.achievementScale}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-600">Formal Education</div>
                        <div className="font-semibold">{selectedDoc.formalEducation}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-600">System Valuation</div>
                        <div className="font-semibold">{selectedDoc.systemValuation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
