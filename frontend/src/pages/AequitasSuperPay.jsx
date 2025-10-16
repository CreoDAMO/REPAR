import { useState } from 'react';
import { Send, Upload, Users, Download, X, Plus, Check, Clock, AlertCircle } from 'lucide-react';

export default function AequitasSuperPay() {
  const [activeTab, setActiveTab] = useState('batch');
  const [recipients, setRecipients] = useState([
    { address: '', amount: '', note: '' }
  ]);
  const [csvData, setCsvData] = useState(null);
  const [processing, setProcessing] = useState(false);

  const recentBatchPayments = [
    { id: 'BP001', recipients: 150, totalAmount: '75,000', status: 'completed', date: '2024-10-15' },
    { id: 'BP002', recipients: 89, totalAmount: '44,500', status: 'completed', date: '2024-10-14' },
    { id: 'BP003', recipients: 200, totalAmount: '100,000', status: 'processing', date: '2024-10-16' },
  ];

  const templates = [
    { name: 'Monthly Descendant Distribution', recipients: 150000, amount: '56,330,000,000' },
    { name: 'DAO Governance Rewards', recipients: 5000, amount: '2,500,000' },
    { name: 'Community Airdrops', recipients: 10000, amount: '5,000,000' },
  ];

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '', note: '' }]);
  };

  const removeRecipient = (index) => {
    const newRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(newRecipients.length > 0 ? newRecipients : [{ address: '', amount: '', note: '' }]);
  };

  const updateRecipient = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const getTotalAmount = () => {
    return recipients.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
        const lines = csvText.split('\n').slice(1);
        const parsed = lines
          .filter(line => line.trim())
          .map(line => {
            const [address, amount, note] = line.split(',');
            return { address: address?.trim(), amount: amount?.trim(), note: note?.trim() || '' };
          });
        setRecipients(parsed.length > 0 ? parsed : [{ address: '', amount: '', note: '' }]);
        setCsvData({ fileName: file.name, count: parsed.length });
      };
      reader.readAsText(file);
    }
  };

  const exportTemplate = () => {
    const csv = 'address,amount,note\ncosmos1...,1000,Monthly distribution\ncosmos1...,1500,Governance reward';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'superpay_template.csv';
    a.click();
  };

  const executeBatchPayment = async () => {
    const validRecipients = recipients.filter(r => r.address && r.amount && parseFloat(r.amount) > 0);
    
    if (validRecipients.length === 0) {
      alert('Please add at least one valid recipient');
      return;
    }

    setProcessing(true);
    
    setTimeout(() => {
      alert(`Batch payment initiated!\n\nRecipients: ${validRecipients.length}\nTotal Amount: ${getTotalAmount().toLocaleString()} REPAR\n\nTransaction will be signed with your wallet.`);
      setProcessing(false);
      setRecipients([{ address: '', amount: '', note: '' }]);
      setCsvData(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Aequitas SuperPay
          </h1>
          <p className="text-xl text-gray-300">Mass $REPAR distributions for descendants, DAO, and community</p>
          <p className="text-sm text-gray-400 mt-2">Powered by Cosmos SDK Multi-Send • Gas-optimized • Batch up to 10,000 recipients</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Total Recipients</span>
              <Users className="text-blue-400" />
            </div>
            <p className="text-3xl font-bold">{recipients.filter(r => r.address).length.toLocaleString()}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Total Amount</span>
              <Send className="text-green-400" />
            </div>
            <p className="text-3xl font-bold">{getTotalAmount().toLocaleString()} REPAR</p>
            <p className="text-sm text-gray-400">≈ ${(getTotalAmount() * 18.33).toLocaleString()} USD</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Estimated Gas</span>
              <AlertCircle className="text-yellow-400" />
            </div>
            <p className="text-3xl font-bold">{(recipients.filter(r => r.address).length * 0.001).toFixed(3)} REPAR</p>
            <p className="text-sm text-gray-400">~0.001 REPAR per recipient</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Send className="mr-3" />
                  Batch Payment
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={exportTemplate}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition flex items-center gap-2 text-sm"
                  >
                    <Download size={16} />
                    CSV Template
                  </button>
                  <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2 cursor-pointer text-sm">
                    <Upload size={16} />
                    Upload CSV
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {csvData && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="text-green-400" />
                    <span>Loaded: {csvData.fileName} ({csvData.count} recipients)</span>
                  </div>
                  <button
                    onClick={() => {
                      setCsvData(null);
                      setRecipients([{ address: '', amount: '', note: '' }]);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {recipients.map((recipient, index) => (
                  <div key={index} className="bg-black/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="cosmos1... or @username"
                          value={recipient.address}
                          onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-yellow-500 focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Amount (REPAR)"
                            value={recipient.amount}
                            onChange={(e) => updateRecipient(index, 'amount', e.target.value)}
                            className="px-3 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-yellow-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Note (optional)"
                            value={recipient.note}
                            onChange={(e) => updateRecipient(index, 'note', e.target.value)}
                            className="px-3 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-yellow-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeRecipient(index)}
                        className="mt-2 p-2 text-red-400 hover:text-red-300 transition"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={addRecipient}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Recipient
                </button>
                <button
                  onClick={executeBatchPayment}
                  disabled={processing || recipients.filter(r => r.address && r.amount).length === 0}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Execute Batch Payment
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Recent Batch Payments</h3>
              <div className="space-y-3">
                {recentBatchPayments.map((batch) => (
                  <div key={batch.id} className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm bg-white/10 px-2 py-1 rounded">{batch.id}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          batch.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {batch.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        {batch.recipients} recipients • {batch.totalAmount} REPAR
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      {batch.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Distribution Templates</h3>
              <div className="space-y-3">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => alert(`Template "${template.name}" will load ${template.recipients.toLocaleString()} recipients`)}
                    className="w-full bg-black/20 hover:bg-black/30 p-4 rounded-lg transition text-left"
                  >
                    <p className="font-semibold mb-2">{template.name}</p>
                    <p className="text-sm text-gray-300">{template.recipients.toLocaleString()} recipients</p>
                    <p className="text-sm text-gray-400">{template.amount} REPAR</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">How It Works</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <p className="text-gray-300">Add recipients manually or upload CSV file</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <p className="text-gray-300">Review total amount and gas estimate</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <p className="text-gray-300">Execute batch with Cosmos multi-send (up to 10,000 recipients)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <p className="text-gray-300">Track status in real-time on blockchain</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <p className="text-sm">
                <strong>Gas Optimization:</strong> Cosmos multi-send batches up to 10,000 recipients in a single transaction, 
                reducing gas costs by ~90% compared to individual sends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
