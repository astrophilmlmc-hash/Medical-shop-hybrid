import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';

export const createApiApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use('/api/v1', apiRouter);
  return app;
};

// Run standalone if invoked directly via `node backend/server.js`
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  const PORT = process.env.PORT || 5000;
  const app = createApiApp();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MediShop Hybrid Backend API running on http://0.0.0.0:${PORT}/api/v1`);
  });
}

export default createApiApp;
