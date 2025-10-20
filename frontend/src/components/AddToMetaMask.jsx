import { useState } from 'react';
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react';

export default function AddToMetaMask() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const addAequitasNetwork = async () => {
    if (!window.ethereum) {
      setStatus('error');
      setMessage('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setStatus('loading');
    setMessage('Adding network...');

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x653',
            chainName: 'Aequitas Protocol',
            nativeCurrency: {
              name: 'Repar',
              symbol: 'REPAR',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-evm.aequitasprotocol.zone'],
            blockExplorerUrls: ['https://explorer.aequitasprotocol.zone'],
            iconUrls: ['https://aequitasprotocol.zone/favicon.ico'],
          },
        ],
      });
      
      setStatus('success');
      setMessage('Aequitas Protocol successfully added to MetaMask!');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      if (error.code === 4001) {
        setMessage('Request rejected. Please try again.');
      } else {
        setMessage(`Failed to add network: ${error.message}`);
      }
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="inline-block">
      <button
        onClick={addAequitasNetwork}
        disabled={status === 'loading'}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
          status === 'success'
            ? 'bg-green-500 text-white'
            : status === 'error'
            ? 'bg-red-500 text-white'
            : status === 'loading'
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {status === 'loading' && (
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
        )}
        {status === 'success' && <CheckCircle className="h-5 w-5" />}
        {status === 'error' && <AlertCircle className="h-5 w-5" />}
        {status === 'idle' && (
          <svg className="h-5 w-5" viewBox="0 0 40 40" fill="none">
            <path d="M32.5 18.5L20 5L7.5 18.5L11.25 18.5L11.25 30L16.25 30L16.25 23.75L23.75 23.75L23.75 30L28.75 30L28.75 18.5L32.5 18.5Z" fill="currentColor"/>
            <path d="M20 35C15.0294 35 10.8824 32.3824 8.67647 28.5294" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M31.3235 28.5294C29.1176 32.3824 24.9706 35 20 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        )}
        <span>
          {status === 'loading' && 'Adding to MetaMask...'}
          {status === 'success' && 'Added Successfully!'}
          {status === 'error' && 'Failed'}
          {status === 'idle' && 'Add to MetaMask'}
        </span>
      </button>
      
      {message && (
        <div className={`mt-2 text-sm ${
          status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-gray-600'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
