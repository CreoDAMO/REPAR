import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Scale, Database, FileText, TrendingUp, Wallet, Shield, Vote, Brain, CheckCircle, Menu, X, DollarSign, BarChart3, ArrowLeftRight, CreditCard, Coins, Lock, Server, ExternalLink, Image, Network, Calculator, Settings } from 'lucide-react';
import WalletConnect from './WalletConnect';
import reparLogo from '../assets/REPAR_Coin_Logo.png';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', icon: TrendingUp, label: 'Dashboard' },
    { to: '/investor', icon: Calculator, label: 'Investor Dashboard' },
    { to: '/black-paper', icon: FileText, label: 'Black Paper' },
    { to: '/audit', icon: FileText, label: 'Forensic Audit' },
    { to: '/defendants', icon: Database, label: 'Defendants' },
    { to: '/ledger', icon: Scale, label: 'Transparency Ledger' },
    { to: '/founder-wallet', icon: Wallet, label: 'Founder Wallet' },
    { to: '/roadmap', icon: Scale, label: 'Roadmap' },
    { to: '/ifr', icon: Shield, label: 'IFR' },
    { to: '/grc', icon: CheckCircle, label: 'GRC' },
    { to: '/dao', icon: Vote, label: 'DAO' },
    { to: '/ai-analytics', icon: Brain, label: 'AI' },
    { to: '/endowment', icon: Lock, label: 'Endowment' },
    { to: '/alliances', icon: CheckCircle, label: 'Alliances' },
    { to: '/economics', icon: DollarSign, label: 'Economics' },
    { to: '/crypto-comparison', icon: BarChart3, label: 'Comparison' },
    { to: '/dex', icon: ArrowLeftRight, label: 'DEX' },
    { to: '/nft-marketplace', icon: Image, label: 'NFT Marketplace' },
    { to: '/agentkit', icon: Brain, label: 'AgentKit' }, // Added AgentKit link
    { to: '/chain-integration', icon: Network, label: 'Add to Wallet' },
    { to: '/onramp', icon: Coins, label: 'Buy $REPAR' },
    { to: '/superpay', icon: CreditCard, label: 'SuperPay' },
    { to: '/validator-subsidy', icon: Server, label: 'Validators' },
    { to: '/founder-endowment', icon: Lock, label: 'Founder\'s Endowment' },
    { to: '/deployment', icon: Settings, label: 'Deployment' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src={reparLogo} alt="$REPAR Coin" className="h-8 w-8 rounded-full object-cover" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">AEQUITAS PROTOCOL</h1>
              <p className="text-xs text-amber-300">$REPAR - Enforcing Justice</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold">AEQUITAS</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex space-x-1">
            {navLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md flex items-center space-x-2 transition text-sm ${
                    isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
            <NavLink
              to="/explorer"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md flex items-center space-x-2 transition text-sm ${
                  isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                }`
              }
            >
              <Database className="h-4 w-4" />
              <span>Explorer</span>
            </NavLink>
          </div>

          {/* Mobile & Tablet - Wallet + Hamburger */}
          <div className="flex items-center space-x-3 xl:hidden">
            <div className="hidden md:block">
              <WalletConnect />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-indigo-800 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Wallet */}
          <div className="hidden xl:block">
            <WalletConnect />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-indigo-700">
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-md flex items-center space-x-3 transition ${
                      isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </NavLink>
              ))}
              <NavLink
                to="/explorer"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-md flex items-center space-x-3 transition ${
                    isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                  }`
                }
              >
                <Database className="h-5 w-5" />
                <span>Block Explorer</span>
              </NavLink>
              <div className="md:hidden pt-3 border-t border-indigo-700">
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}