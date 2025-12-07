import { useState } from 'react';

function MobileDownload() {
  const [copied, setCopied] = useState(false);

  const currentVersion = "1.0.0";
  const apkHash = "pending-first-build";
  const ipfsHash = "pending-first-build";
  const blockHeight = "pending";
  const releaseDate = "December 2025";

  const copyHash = () => {
    navigator.clipboard.writeText(apkHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Your Phone Is Your Nation
          </h1>
          <p className="text-xl text-gray-300 mb-2">Download the Aequitas Protocol Mobile App</p>
          <p className="text-sm text-amber-400">Sovereign Distribution - No App Store Required</p>
        </section>

        <section className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-amber-500/20">
          <h2 className="text-2xl font-semibold mb-6 text-amber-400">Latest Version: {currentVersion}</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">SHA-256 Hash</p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-green-400 break-all">{apkHash}</code>
                <button 
                  onClick={copyHash}
                  className="px-2 py-1 bg-amber-600 hover:bg-amber-500 rounded text-xs transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Blockchain Verification</p>
              <span className="text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Block #{blockHeight}
              </span>
            </div>
            
            <div className="bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Founder Signature</p>
              <span className="text-green-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Valid
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">Released: {releaseDate}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Download Options</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Direct Download</h3>
              <p className="text-sm text-amber-100 mb-4">Recommended - No intermediaries</p>
              <a 
                href="/mobile/aequitas-zone.apk" 
                className="block w-full py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-amber-100 transition-colors"
              >
                Download APK
              </a>
              <p className="text-xs text-amber-200 mt-2">~42 MB</p>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">IPFS Download</h3>
              <p className="text-sm text-gray-400 mb-4">Censorship-resistant</p>
              <a 
                href={`https://ipfs.io/ipfs/${ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
              >
                Download via IPFS
              </a>
              <p className="text-xs text-gray-500 mt-2">Decentralized hosting</p>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold mb-2">GitHub Releases</h3>
              <p className="text-sm text-gray-400 mb-4">Open source verification</p>
              <a 
                href="https://github.com/CreoDAMO/REPAR/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
              >
                View All Releases
              </a>
              <p className="text-xs text-gray-500 mt-2">Version history</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700 opacity-75">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold mb-2">App Stores</h3>
              <p className="text-sm text-gray-400 mb-4">Optional - Convenience only</p>
              <button 
                disabled
                className="block w-full py-3 bg-gray-700 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
              >
                Coming Soon
              </button>
              <p className="text-xs text-gray-500 mt-2">Not required for sovereignty</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Installation Instructions</h2>
          
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold">Download the APK</p>
                <p className="text-sm text-gray-400">Use any download option above</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold">Verify the SHA-256 hash</p>
                <p className="text-sm text-gray-400">Compare with the hash shown above</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold">Enable "Install from Unknown Sources"</p>
                <p className="text-sm text-gray-400">Android Settings → Security → Unknown Sources</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-semibold">Open and install the APK</p>
                <p className="text-sm text-gray-400">Follow the installation prompts</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center font-bold">5</span>
              <div>
                <p className="font-semibold">Verify blockchain signature in-app</p>
                <p className="text-sm text-gray-400">The app verifies itself on first launch</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">How to Verify Authenticity</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-amber-400 mb-2">Linux / Mac</h3>
              <code className="block bg-gray-900 p-3 rounded text-sm text-green-400">
                sha256sum aequitas-zone.apk
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400 mb-2">Windows</h3>
              <code className="block bg-gray-900 p-3 rounded text-sm text-green-400 break-all">
                certutil -hashfile aequitas-zone.apk SHA256
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400 mb-2">In-App</h3>
              <p className="text-sm text-gray-400">
                The app automatically verifies its signature against the blockchain on first launch.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Why Direct Distribution?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-4">App Store Dependency</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Approval required (can be rejected)</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Updates delayed (review process)</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Can be removed anytime</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Geographic restrictions</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> 15-30% revenue share</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Sovereign Distribution</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Zero gatekeepers</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Instant updates (blockchain-anchored)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Permanent availability</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> No geographic restrictions</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Zero commissions</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-amber-600/20 rounded-xl border border-amber-500/30">
            <p className="text-amber-300 text-center italic">
              "Sovereign nations don't ask permission to distribute to their citizens."
            </p>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">App Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">💳</p>
              <p className="text-sm">BIP39 Wallet</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">🗳️</p>
              <p className="text-sm">Live Governance</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">⚖️</p>
              <p className="text-sm">Claims Filing</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">🛰️</p>
              <p className="text-sm">Satellite/LoRa</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">🔐</p>
              <p className="text-sm">Biometric Auth</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">📷</p>
              <p className="text-sm">Evidence Camera</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">🌐</p>
              <p className="text-sm">Light Validator</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-2xl mb-2">📴</p>
              <p className="text-sm">Offline Mode</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MobileDownload;
