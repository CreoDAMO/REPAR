
import { useState, useEffect } from 'react';

export default function ARPreview({ nft, onClose }) {
  const [arSupported, setArSupported] = useState(false);
  const [vrSupported, setVrSupported] = useState(false);

  useEffect(() => {
    // Check for WebXR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then(setArSupported);
      navigator.xr.isSessionSupported('immersive-vr').then(setVrSupported);
    }
  }, []);

  const launchARView = async () => {
    if (!arSupported) {
      alert('AR not supported on this device. Please use a compatible mobile device.');
      return;
    }

    try {
      // Initialize WebXR AR session
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body }
      });

      // TODO: Set up AR rendering with Three.js or Babylon.js
      console.log('AR Session started', session);
    } catch (error) {
      console.error('Failed to start AR session:', error);
      alert('Could not start AR session: ' + error.message);
    }
  };

  const launchVRView = async () => {
    if (!vrSupported) {
      alert('VR not supported. Please connect a VR headset.');
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-vr');
      console.log('VR Session started', session);
    } catch (error) {
      console.error('Failed to start VR session:', error);
      alert('Could not start VR session: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl max-w-4xl w-full p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">AR/VR Preview: {nft.name}</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* AR Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">📱 Augmented Reality</h3>
            <p className="text-sm text-gray-300 mb-4">
              View this NFT in your physical space using your device's camera
            </p>
            <div className="bg-black/30 rounded-lg aspect-square mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🥽</div>
                <div className="text-sm text-gray-400">AR Preview</div>
              </div>
            </div>
            <button
              onClick={launchARView}
              disabled={!arSupported}
              className={`w-full py-3 rounded-lg font-bold transition ${
                arSupported
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {arSupported ? 'Launch AR View' : 'AR Not Supported'}
            </button>
          </div>

          {/* VR Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">🥽 Virtual Reality</h3>
            <p className="text-sm text-gray-300 mb-4">
              Immerse yourself in a virtual gallery with this NFT
            </p>
            <div className="bg-black/30 rounded-lg aspect-square mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🌐</div>
                <div className="text-sm text-gray-400">VR Preview</div>
              </div>
            </div>
            <button
              onClick={launchVRView}
              disabled={!vrSupported}
              className={`w-full py-3 rounded-lg font-bold transition ${
                vrSupported
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {vrSupported ? 'Launch VR View' : 'VR Headset Required'}
            </button>
          </div>
        </div>

        {/* 3D Model Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-3">🎨 3D Model Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Format:</span>
              <span className="ml-2 font-semibold">GLTF 2.0</span>
            </div>
            <div>
              <span className="text-gray-400">Polygons:</span>
              <span className="ml-2 font-semibold">~50K</span>
            </div>
            <div>
              <span className="text-gray-400">Textures:</span>
              <span className="ml-2 font-semibold">4K PBR</span>
            </div>
            <div>
              <span className="text-gray-400">Animation:</span>
              <span className="ml-2 font-semibold">Supported</span>
            </div>
          </div>
        </div>

        {/* NFT Details */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-3">NFT Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Category:</span>
              <span className="font-semibold">{nft.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Owner:</span>
              <span className="font-mono text-xs">{nft.owner}</span>
            </div>
            {nft.certified && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Certification:</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  FRE 901 Certified
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition"
        >
          Close Preview
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          AR/VR features require WebXR-compatible devices and browsers
        </p>
      </div>
    </div>
  );
}
