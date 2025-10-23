import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['react-dev-locator'],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
    allowedHosts: true,
    hmr: {
      clientPort: process.env.REPLIT_DEV_DOMAIN ? 443 : 3001,
      protocol: process.env.REPLIT_DEV_DOMAIN ? 'wss' : 'ws',
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost',
    },
  },
})
