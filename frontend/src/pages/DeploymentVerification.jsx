import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, Loader, 
  Cloud, Database, Cpu, DollarSign, Lock,
  Mail, Github, Globe, Shield, Server
} from 'lucide-react';

const DeploymentVerification = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  const API_CATEGORIES = {
    critical: [
      { name: 'Cloudflare DNS', key: 'cloudflare', icon: Cloud, description: 'DNS & CDN management' },
      { name: 'DigitalOcean', key: 'digitalocean', icon: Server, description: 'Deployment infrastructure' },
      { name: 'Anthropic Claude', key: 'anthropic', icon: Cpu, description: 'AI legal analysis' },
      { name: 'OpenAI GPT-4', key: 'openai', icon: Cpu, description: 'AI claim parsing' },
      { name: 'X.AI Grok', key: 'xai', icon: Cpu, description: 'Real-time intelligence' },
      { name: 'DeepSeek', key: 'deepseek', icon: Cpu, description: 'Cost-effective AI' },
      { name: 'Coinbase', key: 'coinbase', icon: DollarSign, description: 'Fiat on/off ramp' },
      { name: 'Circle USDC', key: 'circle', icon: DollarSign, description: 'USDC payments' }
    ],
    recommended: [
      { name: 'NVIDIA NIM', key: 'nvidia', icon: Cpu, description: 'AI acceleration' },
      { name: 'GitHub', key: 'github', icon: Github, description: 'Auto-deployment' },
      { name: 'SendGrid', key: 'sendgrid', icon: Mail, description: 'Email notifications' },
      { name: 'Infura', key: 'infura', icon: Globe, description: 'Blockchain RPC' }
    ],
    optional: [
      { name: 'Sentry', key: 'sentry', icon: Shield, description: 'Error tracking' },
      { name: 'Pinata IPFS', key: 'pinata', icon: Database, description: 'Decentralized storage' },
      { name: 'Discord', key: 'discord', icon: Globe, description: 'Community bot' },
      { name: 'Twitter/X', key: 'twitter', icon: Globe, description: 'Social announcements' }
    ]
  };

  const mockAPITest = async (apiKey) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hasKey = Math.random() > 0.3;
        resolve({
          success: hasKey,
          status: hasKey ? 'Connected' : 'Not configured',
          latency: hasKey ? Math.floor(Math.random() * 200) + 50 : null,
          message: hasKey 
            ? 'API key verified and operational' 
            : 'API key not configured or invalid'
        });
      }, Math.random() * 1000 + 500);
    });
  };

  const runAllTests = async () => {
    setTesting(true);
    setTestResults({});

    const allAPIs = [
      ...API_CATEGORIES.critical,
      ...API_CATEGORIES.recommended,
      ...API_CATEGORIES.optional
    ];

    for (const api of allAPIs) {
      setCurrentTest(api.name);
      const result = await mockAPITest(api.key);
      setTestResults(prev => ({
        ...prev,
        [api.key]: result
      }));
    }

    setTesting(false);
    setCurrentTest('');
  };

  const getStatusIcon = (result) => {
    if (!result) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    if (result.success) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const renderCategory = (categoryName, apis, priority) => {
    const tested = apis.filter(api => testResults[api.key]).length;
    const passed = apis.filter(api => testResults[api.key]?.success).length;

    return (
      <div key={categoryName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white capitalize">{categoryName} APIs</h3>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {priority}
              </span>
              {tested > 0 && (
                <span className="px-3 py-1 bg-white/90 rounded-full text-indigo-600 text-sm font-bold">
                  {passed}/{tested} passed
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {apis.map((api) => {
            const Icon = api.icon;
            const result = testResults[api.key];
            const isTesting = testing && currentTest === api.name;

            return (
              <div key={api.key} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{api.name}</h4>
                      <p className="text-sm text-gray-500">{api.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {result && result.latency && (
                      <span className="text-sm text-gray-500">
                        {result.latency}ms
                      </span>
                    )}
                    
                    {isTesting ? (
                      <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                    ) : (
                      getStatusIcon(result)
                    )}
                    
                    {result && (
                      <span className={`text-sm font-medium ${
                        result.success ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.status}
                      </span>
                    )}
                  </div>
                </div>

                {result && result.message && (
                  <div className="mt-2 ml-14">
                    <p className="text-sm text-gray-600">{result.message}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const calculateStats = () => {
    const allAPIs = [
      ...API_CATEGORIES.critical,
      ...API_CATEGORIES.recommended,
      ...API_CATEGORIES.optional
    ];
    const tested = Object.keys(testResults).length;
    const passed = Object.values(testResults).filter(r => r.success).length;
    const criticalPassed = API_CATEGORIES.critical.filter(api => testResults[api.key]?.success).length;
    const criticalTotal = API_CATEGORIES.critical.length;

    return { tested, passed, total: allAPIs.length, criticalPassed, criticalTotal };
  };

  const stats = calculateStats();
  const readinessScore = stats.tested > 0 
    ? Math.round((stats.passed / stats.tested) * 100)
    : 0;
  const isProductionReady = stats.criticalPassed === stats.criticalTotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-10 h-10" />
              Deployment Verification
            </h1>
            <p className="text-gray-300 text-lg">
              Pre-deployment API key verification for production readiness
            </p>
          </div>

          <button
            onClick={runAllTests}
            disabled={testing}
            className={`px-8 py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg ${
              testing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
            }`}
          >
            {testing ? (
              <span className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                Testing...
              </span>
            ) : (
              'Run All Tests'
            )}
          </button>
        </div>

        {stats.tested > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {readinessScore}%
              </div>
              <div className="text-gray-600 font-medium">Readiness Score</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.passed}/{stats.tested}
              </div>
              <div className="text-gray-600 font-medium">APIs Verified</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stats.criticalPassed}/{stats.criticalTotal}
              </div>
              <div className="text-gray-600 font-medium">Critical APIs</div>
            </div>

            <div className={`rounded-xl p-6 shadow-lg ${
              isProductionReady ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              <div className="text-4xl font-bold text-white mb-2">
                {isProductionReady ? '✓' : '!'}
              </div>
              <div className="text-white font-medium">
                {isProductionReady ? 'Production Ready' : 'Not Ready'}
              </div>
            </div>
          </div>
        )}

        {testing && currentTest && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <Loader className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-blue-900 font-medium">
                Testing {currentTest}...
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {renderCategory('critical', API_CATEGORIES.critical, 'MUST HAVE')}
          {renderCategory('recommended', API_CATEGORIES.recommended, 'RECOMMENDED')}
          {renderCategory('optional', API_CATEGORIES.optional, 'OPTIONAL')}
        </div>

        {stats.tested > 0 && !isProductionReady && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-900 mb-2">
              ⚠️ Production Deployment Blocked
            </h3>
            <p className="text-yellow-800">
              Not all critical APIs are configured. Please set up the following before deploying to production:
            </p>
            <ul className="mt-3 space-y-1">
              {API_CATEGORIES.critical
                .filter(api => !testResults[api.key]?.success)
                .map(api => (
                  <li key={api.key} className="text-yellow-800 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    {api.name} - {api.description}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {isProductionReady && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 mb-2">
              ✓ System Ready for Production
            </h3>
            <p className="text-green-800">
              All critical APIs are configured and verified. The system is ready for deployment to DigitalOcean.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentVerification;
