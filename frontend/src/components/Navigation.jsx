import { NavLink } from 'react-router-dom';
import { Scale, Database, FileText, TrendingUp, Wallet } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-amber-400" />
            <div>
              <h1 className="text-xl font-bold">AEQUITAS PROTOCOL</h1>
              <p className="text-xs text-amber-300">$REPAR - Enforcing Justice</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center space-x-2 transition ${
                  isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                }`
              }
            >
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/audit"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center space-x-2 transition ${
                  isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                }`
              }
            >
              <FileText className="h-4 w-4" />
              <span>Forensic Audit</span>
            </NavLink>
            <NavLink
              to="/defendants"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center space-x-2 transition ${
                  isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                }`
              }
            >
              <Database className="h-4 w-4" />
              <span>Defendants</span>
            </NavLink>
            <NavLink
              to="/ledger"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center space-x-2 transition ${
                  isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'
                }`
              }
            >
              <Scale className="h-4 w-4" />
              <span>Transparency Ledger</span>
            </NavLink>
          </div>

          <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md font-semibold flex items-center space-x-2 transition">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
