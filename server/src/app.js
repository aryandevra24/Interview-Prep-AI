import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/error.middleware.js';
import env from './config/env.js';

// Create express app
const app = express();

app.set('trust proxy', 1); // Trust first proxy

// Define the rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all requests
app.use(limiter);

// Middleware
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser(env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.send('Welcome to the Interview Prep API');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/interview', interviewRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
