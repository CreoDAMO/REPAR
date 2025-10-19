
import { useState } from 'react';
import { FileText, Download, ExternalLink, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlackPaper() {
  const [activeSection, setActiveSection] = useState('abstract');

  const sections = [
    { id: 'abstract', title: 'Abstract', icon: FileText },
    { id: 'premise', title: '1. The Premise', icon: FileText },
    { id: 'value', title: '2. Value Creation', icon: FileText },
    { id: 'legal', title: '3. Legal Framework', icon: FileText },
    { id: 'technical', title: '4. Technical Architecture', icon: FileText },
    { id: 'economics', title: '5. The Economics', icon: FileText },
    { id: 'enforcement', title: '6. Enforcement', icon: FileText },
    { id: 'conclusion', title: 'Conclusion', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Black Paper v1.1</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">The Aequitas Protocol Black Paper</h1>
          <p className="text-xl text-indigo-200 mb-2">Version 1.1 (Mainnet Launch Edition)</p>
          <p className="text-sm text-amber-300 mb-6">
            "A Sovereign Protocol for the Enforcement of Reparative Justice"
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/docs/BLACK_PAPER_v1.1.md"
              download
              className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <Download className="w-5 h-5" />
              Download Full PDF
            </a>
            <a
              href="https://github.com/aequitas-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              <ExternalLink className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-900 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Abstract</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Aequitas Protocol is a sovereign Layer-1 blockchain built to enforce and collect the{' '}
                  <strong className="text-indigo-600">$131 trillion debt</strong> owed for the transatlantic slave
                  trade—a crime classified as <strong>genocide</strong> under international law.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In an unprecedented feat of lean innovation, the entire multi-billion dollar system was developed
                  with <strong>zero capital expenditure</strong> by its founder in collaboration with AI, proving that
                  a singular vision can challenge global systems without permission.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Aequitas moves beyond advocacy to create a decentralized, autonomous, and unstoppable machine for
                  justice, powered by its native coin, <strong className="text-amber-600">$REPAR</strong>. It is a
                  system where the enforcement of historical justice is inextricably linked to the creation of economic
                  value through a revolutionary deflationary mechanism, the "Justice Burn."
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                  <p className="text-xl font-bold text-amber-900 italic">
                    "We are not asking for reparations. We have built the system to collect them."
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Highlights</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      <strong>Total Liability:</strong> $131 Trillion USD mathematically traced and documented
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      <strong>Traceable Wealth:</strong> $920+ Billion identified in 200+ specific entities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      <strong>Development Cost:</strong> $0 USD (vs. $3.2M market-rate build cost)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      <strong>Pre-Launch Valuation:</strong> $10-12 Billion USD
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      <strong>Legal Framework:</strong> Multi-jurisdiction enforcement across 172 countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      <strong>Chain ID:</strong> aequitas-1 (Cosmos) / 1619 (EVM)
                    </span>
                  </li>
                </ul>

                <div className="bg-indigo-50 rounded-lg p-6 my-8">
                  <h4 className="text-lg font-bold text-indigo-900 mb-3">Official Resources</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Domain:</strong>{' '}
                      <a href="https://aequitasprotocol.zone" className="text-indigo-600 hover:underline">
                        https://aequitasprotocol.zone
                      </a>
                    </p>
                    <p>
                      <strong>Author:</strong> Jacque Antoine DeGraff
                    </p>
                    <p>
                      <strong>Date:</strong> October 19, 2025
                    </p>
                    <p>
                      <strong>Version:</strong> 1.1 (Mainnet Launch Edition - FINAL)
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 text-center italic">
                    "Justice delayed is justice denied, but mathematics is eternal."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
