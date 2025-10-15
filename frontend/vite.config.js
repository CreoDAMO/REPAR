import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/REPAR/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  },
})