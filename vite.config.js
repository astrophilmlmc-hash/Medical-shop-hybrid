import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createApiApp } from './backend/server.js';

const expressApiPlugin = () => ({
  name: 'express-api-middleware',
  configureServer(server) {
    const apiApp = createApiApp();
    server.middlewares.use(apiApp);
  },
  configurePreviewServer(server) {
    const apiApp = createApiApp();
    server.middlewares.use(apiApp);
  }
});

export default defineConfig({
  plugins: [react(), expressApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true
  }
});
