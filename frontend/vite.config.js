import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/REPAR/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-blockchain': ['@cosmjs/proto-signing', '@cosmjs/stargate', '@cosmjs/tendermint-rpc'],
          'vendor-ui': ['lucide-react', 'cryptocons', 'react-icons'],
          'vendor-ipfs': ['ipfs-http-client'],
          'vendor-crypto': ['@coinbase/wallet-sdk', '@coinbase/cbpay-js', '@circle-fin/usdckit']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  }
})