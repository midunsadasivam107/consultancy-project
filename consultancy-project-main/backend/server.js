const path = require('path');
const express = require('express');
const cors = require('cors');
// Load env from backend/.env even when app is started from repo root
require('dotenv').config({ path: path.join(__dirname, '.env') });
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./config/appConfig');
const { connectDB } = require('./config/db');
const app = express();

const configuredOrigins = String(process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = configuredOrigins;

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    // When CORS_ORIGINS is not configured, allow origins in development.
    if (allowedOrigins.length === 0 && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-guest-session-id'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'agriclinic-backend',
    status: 'ok',
    endpoints: {
      health: '/api/health',
      login: 'POST /api/auth/login',
      signup: 'POST /api/auth/signup',
      appointments: 'POST /api/appointments',
    },
  });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    // Prefer Atlas URI when provided, otherwise fall back to local
    const mongoUri = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI;
    await connectDB(mongoUri);
    app.listen(port, () => {
      console.log(`API server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
  