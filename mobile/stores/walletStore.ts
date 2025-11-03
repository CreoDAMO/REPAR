import { create } from 'zustand';

export interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  
  setAddress: (address: string | null) => void;
  setBalance: (balance: string) => void;
  setConnected: (isConnected: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  balance: '0.00',
  isConnected: false,
  isLoading: false,
  error: null,

  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
  setConnected: (isConnected) => set({ isConnected }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  reset: () => set({
    address: null,
    balance: '0.00',
    isConnected: false,
    isLoading: false,
    error: null,
  }),
}));
