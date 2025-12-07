import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";

/**
 * Landing page for the Aequitas Protocol Advanced Calculator
 */
export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-8 w-8" />}
            <h1 className="text-xl font-bold text-white">{APP_TITLE}</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <span className="text-slate-300">{user.name || user.email}</span>
                <Link href="/dashboard">
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={logout} className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Aequitas Protocol
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Advanced Calculator
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Interactive financial modeling and analysis for the REPAR native coin ecosystem. 
            Explore scenarios, analyze sensitivity, and simulate the Cerberus Engine's impact on the $131T asset base.
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Launch Calculator
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Sign In to Get Started
            </Button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Financial Modeling</h3>
            <p className="text-slate-400">
              Real-time analysis of valuation, investment returns, revenue streams, and use of funds allocation.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Scenario Analysis</h3>
            <p className="text-slate-400">
              Create, save, and compare multiple financial scenarios to understand different market conditions.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-white mb-3">Sensitivity Analysis</h3>
            <p className="text-slate-400">
              Analyze how changes in key variables impact your financial projections and return multiples.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-3">Cerberus Engine</h3>
            <p className="text-slate-400">
              Simulate AI auditor impact on asset recovery and ecosystem valuation across different scenarios.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-white mb-3">$131T Asset Explorer</h3>
            <p className="text-slate-400">
              Interactive database of liable entities and proven liability distribution across sectors.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-white mb-3">Interactive Controls</h3>
            <p className="text-slate-400">
              Adjust parameters with sliders and see instant impact on all financial metrics and projections.
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mt-24">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">Pre-Launch Valuation</p>
            <p className="text-3xl font-bold text-blue-400">$7B</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">Year 1 Expected Valuation</p>
            <p className="text-3xl font-bold text-green-400">$250B</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">Expected Return Multiple</p>
            <p className="text-3xl font-bold text-purple-400">43x</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">Total Addressable Market</p>
            <p className="text-3xl font-bold text-orange-400">$131T</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-900/50 mt-24">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center text-slate-400">
          <p>© 2024 Aequitas Protocol. Advanced Financial Calculator for the REPAR Ecosystem.</p>
        </div>
      </div>
    </div>
  );
}

