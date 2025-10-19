import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ForensicAudit from './pages/ForensicAudit';
import Defendants from './pages/Defendants';
import TransparencyLedger from './pages/TransparencyLedger';
import FounderWallet from './pages/FounderWallet';
import ActionItems from './pages/ActionItems';
import IFRSystem from './pages/IFRSystem';
import GRCOversight from './pages/GRCOversight';
import DAOGovernance from './pages/DAOGovernance';
import AIAnalytics from './pages/AIAnalytics';
import Alliances from './pages/Alliances';
import REPAREconomics from './pages/REPAREconomics';
import CryptoComparison from './pages/CryptoComparison';
import AequitasDEX from './pages/AequitasDEX';
import AequitasSuperPay from './pages/AequitasSuperPay';
import EndowmentDashboard from './pages/EndowmentDashboard';
import ValidatorSubsidy from './pages/ValidatorSubsidy';
import FounderEndowment from './pages/FounderEndowment';
import Onramper from './components/Onramper';
import BlackPaper from './pages/BlackPaper';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/audit" element={<ForensicAudit />} />
          <Route path="/defendants" element={<Defendants />} />
          <Route path="/ledger" element={<TransparencyLedger />} />
          <Route path="/founder-wallet" element={<FounderWallet />} />
          <Route path="/roadmap" element={<ActionItems />} />
          <Route path="/ifr" element={<IFRSystem />} />
          <Route path="/grc" element={<GRCOversight />} />
          <Route path="/dao" element={<DAOGovernance />} />
          <Route path="/ai-analytics" element={<AIAnalytics />} />
          <Route path="/alliances" element={<Alliances />} />
          <Route path="/economics" element={<REPAREconomics />} />
          <Route path="/crypto-comparison" element={<CryptoComparison />} />
          <Route path="/dex" element={<AequitasDEX />} />
          <Route path="/superpay" element={<AequitasSuperPay />} />
          <Route path="/endowment" element={<EndowmentDashboard />} />
          <Route path="/validator-subsidy" element={<ValidatorSubsidy />} />
          <Route path="/founder-endowment" element={<FounderEndowment />} />
          <Route path="/onramp" element={<Onramper />} />
          <Route path="/black-paper" element={<BlackPaper />} />
        </Routes>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2">Built with ❤️ for justice</p>
            <p className="text-sm text-gray-400">Powered by Cosmos SDK, Coinbase, & NVIDIA</p>
            <p className="text-xs text-amber-300 mt-4 italic">"Justice delayed is justice denied, but mathematics is eternal."</p>
            <p className="text-xs text-gray-500 mt-4">This is not an investment. This is restitution.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;