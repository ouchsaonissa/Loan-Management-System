import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: '0.0.0.0',
    // Tell Vite to let Cloudflare Tunnel traffic through
    allowedHosts: ['.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080', // <-- This is the crucial change
        changeOrigin: true,
      },
    },
  },
});