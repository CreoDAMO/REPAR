import { useState } from 'react';
import { Send, QrCode, User, Clock, Check } from 'lucide-react';

export default function AequitasSuperPay() {
  const [activeTab, setActiveTab] = useState('send');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const recentTransactions = [
    { user: '@maria_santos', amount: '500', type: 'sent', time: '2 min ago', avatar: '👩🏾' },
    { user: '@james_wilson', amount: '1,250', type: 'received', time: '1 hour ago', avatar: '👨🏿' },
    { user: '@aisha_kumar', amount: '750', type: 'sent', time: '3 hours ago', avatar: '👩🏽' },
  ];

  const contacts = [
    { username: '@maria_santos', name: 'Maria Santos', avatar: '👩🏾' },
    { username: '@james_wilson', name: 'James Wilson', avatar: '👨🏿' },
    { username: '@aisha_kumar', name: 'Aisha Kumar', avatar: '👩🏽' },
    { username: '@kwame_osei', name: 'Kwame Osei', avatar: '👨🏿' },
  ];

  const handleSend = () => {
    alert(`Sent ${amount} REPAR to ${recipient}`);
    setRecipient('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Aequitas SuperPay</h1>
          <p className="text-purple-200">Fast, free peer-to-peer $REPAR payments</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 max-w-2xl mx-auto">
          <p className="text-purple-200 text-sm mb-2">Your Balance</p>
          <p className="text-5xl font-bold text-white mb-4">1,250,000 REPAR</p>
          <p className="text-purple-200 text-lg">≈ $22,912,500 USD</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setActiveTab('send')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send
            </button>
            <button
              onClick={() => setShowQR(!showQR)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <QrCode className="h-5 w-5" />
              Receive
            </button>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowQR(false)}>
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-center mb-6">Scan to Pay</h3>
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-32 w-32 text-gray-300 mx-auto mb-4" />
                    <p className="text-sm text-gray-500">QR Code</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 font-mono">@your_username</p>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          
          {/* Send Money Form */}
          {activeTab === 'send' && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Send $REPAR</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="@username or address"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (REPAR)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none"
                />
                {amount && (
                  <p className="mt-2 text-sm text-gray-600">
                    ≈ ${(parseFloat(amount) * 18.33).toFixed(2)} USD
                  </p>
                )}
              </div>

              <button
                onClick={handleSend}
                disabled={!recipient || !amount || parseFloat(amount) <= 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition"
              >
                Send $REPAR
              </button>
            </div>
          )}

          {/* Quick Send to Contacts */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Quick Send</h3>
            <div className="grid grid-cols-2 gap-3">
              {contacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => setRecipient(contact.username)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.username}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                      {tx.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{tx.user}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {tx.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'received' ? 'text-green-600' : 'text-gray-900'}`}>
                      {tx.type === 'received' ? '+' : '-'}{tx.amount} REPAR
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Check className="h-3 w-3" />
                      Completed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
