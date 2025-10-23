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
      // Replit environment HMR configuration
      clientPort: process.env.REPLIT_DEV_DOMAIN ? 443 : 5000,
      protocol: process.env.REPLIT_DEV_DOMAIN ? 'wss' : 'ws',
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost',
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