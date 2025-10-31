import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiGlobe, FiCheck } from 'react-icons/fi';
import { useTheme } from '@/theme/ThemeProvider';
import { RootState } from '@/store';
import { validateConnection, connectWebsocketClient } from '@/rpc/client';
import { subscribeNewBlock, subscribeTx } from '@/rpc/subscribe';
import {
  setConnectState,
  setTmClient,
  setRPCAddress,
} from '@/store/connectSlice';
import {
  setNewBlock,
  setTxEvent,
  setSubsNewBlock,
  setSubsTxEvent,
  addBlock,
  addTransaction,
} from '@/store/streamSlice';
import { LS_RPC_ADDRESS } from '@/utils/constant';

const networks = [
  {
    name: 'Testnet',
    chainId: 'aequitas-testnet-1',
    rpc: 'https://testnet-rpc.aequitaszone.io',
    fallback: 'http://localhost:26657',
  },
  {
    name: 'Mainnet',
    chainId: 'aequitas-1',
    rpc: 'https://rpc.aequitaszone.io',
    fallback: 'http://localhost:36657',
  },
];

export default function NetworkSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  
  const currentRpc = useSelector((state: RootState) => state.connect.rpcAddress);
  const currentTmClient = useSelector((state: RootState) => state.connect.tmClient);
  const currentSubsNewBlock = useSelector((state: RootState) => state.stream.subsNewBlock);
  const currentSubsTxEvent = useSelector((state: RootState) => state.stream.subsTxEvent);

  const currentNetwork = networks.find(n => 
    currentRpc.includes('testnet') ? n.name === 'Testnet' : n.name === 'Mainnet'
  ) || networks[0];

  const switchNetwork = async (network: typeof networks[0]) => {
    if (switching || currentRpc === network.rpc) return;
    
    setSwitching(true);
    setIsOpen(false);

    try {
      // Clean up existing connections
      if (currentSubsNewBlock) {
        currentSubsNewBlock.unsubscribe();
        dispatch(setSubsNewBlock(null));
      }
      if (currentSubsTxEvent) {
        currentSubsTxEvent.unsubscribe();
        dispatch(setSubsTxEvent(null));
      }
      if (currentTmClient) {
        try {
          currentTmClient.disconnect();
        } catch (error) {
          console.warn('Error disconnecting previous tmClient:', error);
        }
      }

      dispatch(setNewBlock(null));
      dispatch(setTxEvent(null));

      // Try primary RPC, fallback to local if needed
      let rpcToUse = network.rpc;
      let isValid = await validateConnection(rpcToUse);
      
      if (!isValid && network.fallback) {
        console.warn(`${network.name} primary RPC unavailable, trying fallback...`);
        rpcToUse = network.fallback;
        isValid = await validateConnection(rpcToUse);
      }

      if (!isValid) {
        throw new Error(`Cannot connect to ${network.name}`);
      }

      const tmClient = await connectWebsocketClient(rpcToUse);
      if (!tmClient) {
        throw new Error('Failed to create Tendermint client');
      }

      dispatch(setConnectState(true));
      dispatch(setTmClient(tmClient));
      dispatch(setRPCAddress(rpcToUse));

      // Restart subscriptions
      const newBlockSub = subscribeNewBlock(tmClient, (event) => {
        dispatch(setNewBlock(event));
        dispatch(addBlock(event));
      });

      const txSub = subscribeTx(tmClient, (event) => {
        dispatch(setTxEvent(event));
        dispatch(addTransaction(event));
      });

      dispatch(setSubsNewBlock(newBlockSub));
      dispatch(setSubsTxEvent(txSub));

      window.localStorage.setItem(LS_RPC_ADDRESS, rpcToUse);
      
      console.log(`✅ Switched to ${network.name} (${network.chainId})`);
    } catch (error) {
      console.error(`Failed to switch to ${network.name}:`, error);
      alert(`Failed to switch to ${network.name}. Please try again.`);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={switching}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border.primary}`,
          color: colors.text.primary,
        }}
      >
        <FiGlobe style={{ color: colors.primary }} />
        <span className="font-medium">{switching ? 'Switching...' : currentNetwork.name}</span>
        <span 
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ 
            backgroundColor: currentNetwork.name === 'Testnet' ? '#FFA500' : '#00FF00',
            color: '#000'
          }}
        >
          {currentNetwork.chainId}
        </span>
      </button>

      {isOpen && !switching && (
        <div
          className="absolute top-full right-0 mt-2 min-w-[250px] rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border.primary}`,
          }}
        >
          {networks.map((network) => {
            const isActive = currentNetwork.name === network.name;
            
            return (
              <button
                key={network.chainId}
                onClick={() => switchNetwork(network)}
                disabled={isActive}
                className="w-full flex items-center justify-between px-4 py-3 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: isActive ? colors.primary + '20' : 'transparent',
                  color: colors.text.primary,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = colors.primary + '10';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="text-left">
                  <div className="font-medium">{network.name}</div>
                  <div className="text-xs opacity-70">{network.chainId}</div>
                </div>
                {isActive && <FiCheck style={{ color: colors.primary }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
