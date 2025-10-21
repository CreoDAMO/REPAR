import { useState, useEffect } from 'react';
import { 
  Image, ShoppingBag, Sparkles, Activity, Filter, Search, 
  TrendingUp, Award, Shield, FileText, Gavel, Users, Calendar, Zap,
  Mic, Video, Volume2, Headphones
} from 'lucide-react';
import ARPreview from '../components/ARPreview';

export default function NFTMarketplace() {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, ar
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [showAuctions, setShowAuctions] = useState(false);
  const [arPreview, setArPreview] = useState(false);
  const [showARModal, setShowARModal] = useState(false);
  const [narrateMode, setNarrateMode] = useState(false);
  const [currentNarration, setCurrentNarration] = useState(null);
  const [videoMode, setVideoMode] = useState(false);

  // NFT Categories matching the proto definitions
  const categories = [
    { id: 'all', name: 'All NFTs', icon: Image, count: 1247 },
    { id: 'evidence', name: 'Evidence', icon: FileText, count: 523, description: 'FRE 901 compliant legal evidence' },
    { id: 'justice_burn', name: 'Justice Burn', icon: Zap, count: 342, description: 'Commemorative burn event NFTs' },
    { id: 'descendant_id', name: 'Descendant ID', icon: Users, count: 156, description: 'Verified descendant identity' },
    { id: 'historical_archive', name: 'Historical', icon: Calendar, count: 198, description: 'Forensic audit artifacts' },
    { id: 'commemorative', name: 'Commemorative', icon: Award, count: 28, description: 'Special commemorative NFTs' },
  ];

  // Generate NFT image based on category
  const generateNFTImage = (category, name) => {
    const colors = {
      evidence: 'from-blue-500 to-indigo-600',
      justice_burn: 'from-orange-500 to-red-600',
      descendant_id: 'from-purple-500 to-pink-600',
      historical_archive: 'from-amber-500 to-yellow-600',
      commemorative: 'from-green-500 to-teal-600',
    };
    
    const icons = {
      evidence: '📋',
      justice_burn: '🔥',
      descendant_id: '👤',
      historical_archive: '📜',
      commemorative: '🏆',
    };
    
    return {
      gradient: colors[category] || 'from-gray-500 to-gray-600',
      icon: icons[category] || '📄',
      initials: name.substring(0, 2).toUpperCase()
    };
  };

  // Mock NFT data (will be replaced with blockchain data)
  const mockNFTs = [
    {
      id: 'nft-1',
      name: 'Barclays Evidence Package #001',
      category: 'evidence',
      price: '500000',
      image: null,
      creator: 'aequitas1abc...',
      owner: 'aequitas1xyz...',
      certified: true,
      defendant_id: 'def-001',
      created_at: '2025-10-15',
      attributes: [
        { trait_type: 'Defendant', value: 'Barclays Bank' },
        { trait_type: 'Evidence Type', value: 'Financial Records' },
        { trait_type: 'Time Period', value: '1720-1834' },
        { trait_type: 'Certification', value: 'FRE 901 Compliant' }
      ]
    },
    {
      id: 'nft-2',
      name: 'Justice Burn: $10M REPAR',
      category: 'justice_burn',
      price: '250000',
      image: null,
      creator: 'aequitas1def...',
      owner: 'aequitas1abc...',
      certified: true,
      burn_amount: '10000000',
      burn_tx_hash: '0x1234...',
      created_at: '2025-10-18',
      attributes: [
        { trait_type: 'Burn Amount', value: '$10,000,000' },
        { trait_type: 'Defendant', value: 'Lloyds of London' },
        { trait_type: 'Burn Date', value: 'October 18, 2025' }
      ]
    },
    {
      id: 'nft-3',
      name: 'Descendant Certificate #156',
      category: 'descendant_id',
      price: '1000000',
      image: null,
      creator: 'aequitas1ghi...',
      owner: 'aequitas1ghi...',
      certified: true,
      created_at: '2025-10-10',
      attributes: [
        { trait_type: 'Lineage Verification', value: 'DNA Confirmed' },
        { trait_type: 'Generation', value: '7th Generation' },
        { trait_type: 'Issue Date', value: 'October 10, 2025' }
      ]
    },
    {
      id: 'nft-4',
      name: 'Forensic Audit Page 127',
      category: 'historical_archive',
      price: '750000',
      image: null,
      creator: 'aequitas1jkl...',
      owner: 'aequitas1mno...',
      certified: true,
      created_at: '2025-10-12',
      attributes: [
        { trait_type: 'Document Type', value: 'Compound Interest Calculation' },
        { trait_type: 'Page Number', value: '127' },
        { trait_type: 'Audit Section', value: 'Financial Modeling' }
      ]
    },
  ];

  const [nfts, setNfts] = useState(mockNFTs);
  const [userNFTs, setUserNFTs] = useState([mockNFTs[2]]); // Mock: User owns NFT #3

  // Mock listings
  const [listings, setListings] = useState([
    { id: 'listing-1', nft_id: 'nft-1', price: '500000', seller: 'aequitas1xyz...', status: 'active' },
    { id: 'listing-2', nft_id: 'nft-2', price: '250000', seller: 'aequitas1abc...', status: 'active' },
    { id: 'listing-4', nft_id: 'nft-4', price: '750000', seller: 'aequitas1mno...', status: 'active' },
  ]);

  // Mock auctions
  const [auctions, setAuctions] = useState([
    {
      id: 'auction-1',
      nft_id: 'nft-1',
      current_bid: '600000',
      min_bid_increment: '50000',
      bidder_count: 12,
      ends_at: Date.now() + 86400000, // 24 hours
      seller: 'aequitas1xyz...',
      status: 'active'
    },
    {
      id: 'auction-2',
      nft_id: 'nft-3',
      current_bid: '1200000',
      min_bid_increment: '100000',
      bidder_count: 8,
      ends_at: Date.now() + 172800000, // 48 hours
      seller: 'aequitas1ghi...',
      status: 'active'
    }
  ]);

  // Mock sales activity
  const recentSales = [
    { nft_name: 'JPMorgan Evidence #045', price: '1500000', buyer: 'aequitas1...', seller: 'aequitas1...', timestamp: '2 hours ago' },
    { nft_name: 'Justice Burn: $5M', price: '125000', buyer: 'aequitas1...', seller: 'aequitas1...', timestamp: '5 hours ago' },
    { nft_name: 'Descendant Certificate #142', price: '950000', buyer: 'aequitas1...', seller: 'aequitas1...', timestamp: '1 day ago' },
  ];

  // Filter NFTs
  const filteredNFTs = nfts.filter(nft => {
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const nftPrice = parseInt(nft.price);
    const matchesPrice = nftPrice >= priceRange.min && nftPrice <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Format REPAR price
  const formatREPAR = (amount) => {
    const num = parseInt(amount) / 1000000; // Convert from urepar
    return new Intl.NumberFormat().format(num) + ' REPAR';
  };

  // Text-to-Speech narration
  const narrateNFTStory = async (nft) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `NFT: ${nft.name}. Category: ${categories.find(c => c.id === nft.category)?.name}. 
        Price: ${formatREPAR(nft.price)}. 
        ${nft.certified ? 'This NFT is FRE 901 certified.' : ''}`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      setCurrentNarration(nft.id);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  const stopNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentNarration(null);
    }
  };

  // Generate holographic video (simulated)
  const generateHolographicVideo = async (nft) => {
    console.log('Generating holographic video for:', nft.name);
    alert(`Holographic video generation started for ${nft.name}. This will use Omniverse for AR rendering.`);
  };

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Aequitas NFT Marketplace
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Legal Evidence • Justice Burns • Descendant Identity • Historical Archives
            </p>
            <p className="text-sm text-gray-400">
              FRE 901 Certified Evidence NFTs • Powered by $REPAR • On-Chain Provenance
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">1,247</div>
                <div className="text-sm text-gray-300">Total NFTs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">523</div>
                <div className="text-sm text-gray-300">Evidence NFTs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">145</div>
                <div className="text-sm text-gray-300">Active Listings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">₹45.2M</div>
                <div className="text-sm text-gray-300">Volume (24h)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'browse'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingBag className="inline h-5 w-5 mr-2" />
            Browse
          </button>
          <button
            onClick={() => setActiveTab('mint')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'mint'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Sparkles className="inline h-5 w-5 mr-2" />
            Mint
          </button>
          <button
            onClick={() => setActiveTab('my-nfts')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'my-nfts'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Image className="inline h-5 w-5 mr-2" />
            My NFTs
          </button>
          <button
            onClick={() => setActiveTab('auctions')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'auctions'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Gavel className="inline h-5 w-5 mr-2" />
            Auctions
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'activity'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Activity className="inline h-5 w-5 mr-2" />
            Activity
          </button>
        </div>

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search NFTs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="recent">Recently Listed</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="ending-soon">Auctions Ending Soon</option>
                </select>

                {/* View Mode */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 px-4 py-2 rounded-lg transition ${
                      viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('ar')}
                    className={`flex-1 px-4 py-2 rounded-lg transition ${
                      viewMode === 'ar' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    AR View
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                {/* Price Range */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">Price Range (REPAR)</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000000 })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Show Auctions Toggle */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAuctions}
                      onChange={(e) => setShowAuctions(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold">Show Auctions Only</span>
                  </label>
                </div>

                {/* AR Preview Toggle */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={arPreview}
                      onChange={(e) => setArPreview(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold">AR/VR Preview Mode</span>
                  </label>
                </div>

                {/* TTS Narration Toggle */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={narrateMode}
                      onChange={(e) => setNarrateMode(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <Volume2 className="h-4 w-4" />
                      Narration Mode
                    </span>
                  </label>
                </div>

                {/* Video Generation Toggle */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={videoMode}
                      onChange={(e) => setVideoMode(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      Holographic Video
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {categories.slice(1).map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl transition ${
                      selectedCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-white hover:shadow-md'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${selectedCategory === cat.id ? 'text-white' : 'text-purple-600'}`} />
                    <div className={`text-sm font-semibold ${selectedCategory === cat.id ? 'text-white' : 'text-gray-700'}`}>
                      {cat.name}
                    </div>
                    <div className={`text-xs ${selectedCategory === cat.id ? 'text-purple-100' : 'text-gray-500'}`}>
                      {cat.count} items
                    </div>
                  </button>
                );
              })}
            </div>

            {/* AR/VR Preview Banner */}
            {arPreview && (
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-2">🥽 AR/VR Preview Mode Enabled</h3>
                <p className="text-sm mb-4">
                  NFTs with 3D models will display holographic previews. Click any NFT to view in AR or VR.
                </p>
                <div className="flex gap-3">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Launch WebXR Viewer
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Connect VR Headset
                  </button>
                  <button
                    onClick={() => setArPreview(false)}
                    className="bg-red-500/30 hover:bg-red-500/40 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Exit AR Mode
                  </button>
                </div>
              </div>
            )}

            {/* NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredNFTs.map((nft) => {
                const imageData = generateNFTImage(nft.category, nft.name);
                return (
                  <div
                    key={nft.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group"
                    onClick={() => setSelectedNFT(nft)}
                  >
                    {/* NFT Image */}
                    <div className={`relative aspect-square bg-gradient-to-br ${imageData.gradient} rounded-t-xl overflow-hidden flex items-center justify-center`}>
                      {nft.image ? (
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-white">
                          <div className="text-6xl mb-4">{imageData.icon}</div>
                          <div className="text-4xl font-bold opacity-90">{imageData.initials}</div>
                        </div>
                      )}
                      {nft.certified && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          FRE 901
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                        {categories.find(c => c.id === nft.category)?.name}
                      </div>
                    </div>

                  {/* NFT Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 truncate">{nft.name}</h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="text-purple-600 font-bold">{formatREPAR(nft.price)}</div>
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                        Buy Now
                      </button>
                    </div>

                    {/* TTS and Video Controls */}
                    {(narrateMode || videoMode || arPreview) && (
                      <div className="flex gap-2 mb-3">
                        {narrateMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentNarration === nft.id) {
                                stopNarration();
                              } else {
                                narrateNFTStory(nft);
                              }
                            }}
                            className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                              currentNarration === nft.id
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                          >
                            {currentNarration === nft.id ? (
                              <>Stop <Volume2 className="h-3 w-3" /></>
                            ) : (
                              <>Narrate <Mic className="h-3 w-3" /></>
                            )}
                          </button>
                        )}
                        {videoMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              generateHolographicVideo(nft);
                            }}
                            className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                          >
                            Video <Video className="h-3 w-3" />
                          </button>
                        )}
                        {arPreview && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedNFT(nft);
                              setShowARModal(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                          >
                            AR View
                          </button>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-2">
                      <div>
                        <div>Creator</div>
                        <div className="font-mono">{nft.creator.slice(0, 12)}...</div>
                      </div>
                      <div className="text-right">
                        <div>Listed</div>
                        <div>{nft.created_at}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mint Tab */}
        {activeTab === 'mint' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-purple-600" />
                Mint New NFT
              </h2>

              <form className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2">NFT Category *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option value="">Select category...</option>
                    <option value="evidence">Evidence NFT (FRE 901 Compliant)</option>
                    <option value="justice_burn">Justice Burn NFT</option>
                    <option value="descendant_id">Descendant ID NFT</option>
                    <option value="historical_archive">Historical Archive NFT</option>


        {/* Auctions Tab */}
        {activeTab === 'auctions' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Gavel className="h-6 w-6 text-purple-600" />
                Live Auctions
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-600">{auctions.length}</div>
                  <div className="text-sm text-gray-600">Active Auctions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600">₹2.8M</div>
                  <div className="text-sm text-gray-600">Total Bids</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Active Bidders</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auctions.map((auction) => {
                const auctionNFT = nfts.find(n => n.id === auction.nft_id);
                if (!auctionNFT) return null;

                const timeRemaining = auction.ends_at - Date.now();
                const hoursRemaining = Math.floor(timeRemaining / 3600000);
                const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);

                const imageData = generateNFTImage(auctionNFT.category, auctionNFT.name);
                return (
                  <div key={auction.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition">
                    <div className={`relative aspect-video rounded-t-xl overflow-hidden flex items-center justify-center ${
                      auctionNFT.image 
                        ? 'bg-gray-100' 
                        : `bg-gradient-to-br ${imageData.gradient}`
                    }`}>
                      {auctionNFT.image ? (
                        <img src={auctionNFT.image} alt={auctionNFT.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-white">
                          <div className="text-5xl mb-3">{imageData.icon}</div>
                          <div className="text-3xl font-bold opacity-90">{imageData.initials}</div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold animate-pulse">
                        Live Auction
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                        <div className="text-xs text-gray-300">Ends in</div>
                        <div className="font-bold">{hoursRemaining}h {minutesRemaining}m</div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{auctionNFT.name}</h3>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                        <div className="text-xs text-gray-600 mb-1">Current Bid</div>
                        <div className="text-2xl font-bold text-purple-600">{formatREPAR(auction.current_bid)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {auction.bidder_count} bidders • Min increment: {formatREPAR(auction.min_bid_increment)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                          Place Bid
                        </button>
                        <button className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition">
                          Watch
                        </button>
                      </div>

                      <div className="text-xs text-gray-500 mt-3 flex items-center justify-between">
                        <span>Seller: {auction.seller.slice(0, 12)}...</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Create Auction Button */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
              <Gavel className="h-12 w-12 mx-auto text-purple-600 mb-3" />
              <h3 className="text-xl font-bold mb-2">Start Your Own Auction</h3>
              <p className="text-gray-600 mb-4">List your NFT for auction and let the market decide its value</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition">
                Create Auction
              </button>
            </div>
          </div>
        )}

                    <option value="commemorative">Commemorative NFT</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">NFT Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Barclays Evidence Package #001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Description *</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your NFT..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2">NFT Image *</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                        onClick={() => alert('AI Image Generation: Connect to DALL-E, Stable Diffusion, or Midjourney API to generate unique NFT artwork based on your description.')}
                      >
                        <Sparkles className="h-5 w-5" />
                        Generate with AI
                      </button>
                      <button
                        type="button"
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                      >
                        <Image className="h-5 w-5" />
                        Upload Manually
                      </button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 mb-2">Drag & drop or click to upload</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB • Will be stored on IPFS</p>
                      <input type="file" className="hidden" accept="image/*" />
                      <button type="button" className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition">
                        Choose File
                      </button>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-900 mb-2">✨ AI Generation Options:</p>
                      <ul className="text-xs text-purple-700 space-y-1">
                        <li>• DALL-E 3: Photorealistic historical documents</li>
                        <li>• Stable Diffusion: Artistic commemorative NFTs</li>
                        <li>• Midjourney: High-quality identity certificates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Metadata URI (IPFS)</label>
                  <input
                    type="text"
                    placeholder="ipfs://..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Provide IPFS CID for additional metadata</p>
                </div>

                {/* Royalty */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Creator Royalty (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    placeholder="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 10% • You'll earn this % on all future sales</p>
                </div>

                {/* Evidence-specific fields */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-purple-900">Evidence NFT Fields (Optional)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Defendant ID</label>
                      <input
                        type="text"
                        placeholder="def-001"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Claim ID</label>
                      <input
                        type="text"
                        placeholder="claim-001"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Mint Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="h-5 w-5" />
                    Mint NFT
                  </button>
                  <button
                    type="button"
                    className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-lg font-bold transition"
                  >
                    Reset
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Minting fee: 100 REPAR • Gas fees apply • NFT will be stored on IPFS
                </p>
              </form>
            </div>
          </div>
        )}

        {/* My NFTs Tab */}
        {activeTab === 'my-nfts' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">My Collection</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-600">{userNFTs.length}</div>
                  <div className="text-sm text-gray-600">Total NFTs</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600">1</div>
                  <div className="text-sm text-gray-600">Listed</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600">₹1M</div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userNFTs.map((nft) => {
                const imageData = generateNFTImage(nft.category, nft.name);
                return (
                  <div key={nft.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition">
                    <div className={`relative aspect-square rounded-t-xl overflow-hidden flex items-center justify-center ${
                      nft.image 
                        ? 'bg-gray-100' 
                        : `bg-gradient-to-br ${imageData.gradient}`
                    }`}>
                      {nft.image ? (
                        <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-white">
                          <div className="text-6xl mb-4">{imageData.icon}</div>
                          <div className="text-4xl font-bold opacity-90">{imageData.initials}</div>
                        </div>
                      )}
                      {nft.certified && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Certified
                        </div>
                      )}
                    </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{nft.name}</h3>
                    <div className="flex gap-2 mb-3">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                        List for Sale
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition">
                        Transfer
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Minted: {nft.created_at}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg"></div>
                    <div>
                      <div className="font-semibold">{sale.nft_name}</div>
                      <div className="text-sm text-gray-500">
                        Sold for <span className="font-semibold text-purple-600">{formatREPAR(sale.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">From</div>
                    <div className="font-mono text-xs text-gray-700">{sale.seller.slice(0, 12)}...</div>
                    <div className="text-sm text-gray-500 mt-1">To</div>
                    <div className="font-mono text-xs text-gray-700">{sale.buyer.slice(0, 12)}...</div>
                    <div className="text-xs text-gray-400 mt-2">{sale.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AR Preview Modal */}
      {showARModal && selectedNFT && (
        <ARPreview 
          nft={selectedNFT} 
          onClose={() => {
            setShowARModal(false);
            setSelectedNFT(null);
          }} 
        />
      )}

      {/* NFT Detail Modal (simplified - would be more detailed in production) */}
      {selectedNFT && !showARModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedNFT(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <div className={`aspect-square rounded-xl overflow-hidden flex items-center justify-center ${
                selectedNFT.image 
                  ? 'bg-gray-100' 
                  : `bg-gradient-to-br ${generateNFTImage(selectedNFT.category, selectedNFT.name).gradient}`
              }`}>
                {selectedNFT.image ? (
                  <img src={selectedNFT.image} alt={selectedNFT.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-white">
                    <div className="text-8xl mb-6">{generateNFTImage(selectedNFT.category, selectedNFT.name).icon}</div>
                    <div className="text-6xl font-bold opacity-90">{generateNFTImage(selectedNFT.category, selectedNFT.name).initials}</div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedNFT.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-semibold">
                    {categories.find(c => c.id === selectedNFT.category)?.name}
                  </span>
                  {selectedNFT.certified && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      FRE 901 Certified
                    </span>
                  )}
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Current Price</div>
                  <div className="text-3xl font-bold text-purple-600">{formatREPAR(selectedNFT.price)}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600">Creator</div>
                    <div className="font-mono text-sm">{selectedNFT.creator}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Owner</div>
                    <div className="font-mono text-sm">{selectedNFT.owner}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Created</div>
                    <div className="text-sm">{selectedNFT.created_at}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Attributes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedNFT.attributes.map((attr, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500">{attr.trait_type}</div>
                        <div className="font-semibold text-sm">{attr.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold transition">
                    Buy Now
                  </button>
                  <button
                    onClick={() => setSelectedNFT(null)}
                    className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-bold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
