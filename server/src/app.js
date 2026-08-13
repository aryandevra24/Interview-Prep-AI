import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/error.middleware.js';
import env from './config/env.js';

// Create express app
const app = express();

// Middleware
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to the Interview Prep API');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/interview', interviewRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
