import { useState } from 'react';
import { DollarSign, CreditCard, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import reparLogo from '../assets/REPAR_Coin_Logo.png';

export default function CoinbasePayGateway() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBuy = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount('');
    }, 3000);
  };

  const reparAmount = amount ? (parseFloat(amount) / 18.33).toFixed(2) : '0';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <img src={reparLogo} alt="REPAR Coin" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Coinbase Pay</h2>
          <p className="text-sm text-gray-500">Buy $REPAR with USD</p>
        </div>
      </div>

      {showSuccess ? (
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-900 mb-2">Purchase Successful!</h3>
          <p className="text-green-700">
            {reparAmount} REPAR has been added to your wallet
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-4 text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
              />
            </div>
            {amount && (
              <p className="mt-2 text-sm text-gray-600">
                You will receive approximately <span className="font-semibold text-indigo-600">{reparAmount} REPAR</span>
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setMethod('credit_card')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition ${
                  method === 'credit_card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className={`h-6 w-6 ${method === 'credit_card' ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Instant purchase</p>
                </div>
                {method === 'credit_card' && <CheckCircle className="h-5 w-5 text-blue-600" />}
              </button>

              <button
                onClick={() => setMethod('bank_account')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition ${
                  method === 'bank_account'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className={`h-6 w-6 ${method === 'bank_account' ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Bank Account</p>
                  <p className="text-sm text-gray-500">1-3 business days</p>
                </div>
                {method === 'bank_account' && <CheckCircle className="h-5 w-5 text-blue-600" />}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">KYC Required</p>
              <p>You'll be redirected to Coinbase to complete identity verification and payment processing.</p>
            </div>
          </div>

          <button
            onClick={handleBuy}
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition"
          >
            {isProcessing ? 'Processing...' : 'Buy with Coinbase'}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Powered by Coinbase Commerce • Secure & Compliant
          </p>
        </>
      )}
    </div>
  );
}
