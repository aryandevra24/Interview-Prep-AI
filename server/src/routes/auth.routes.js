import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getMeController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const authRouter = Router();

// Apply the limiter to specific routes (e.g., login route)
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 login attempts per minute
  message: 'Too many login attempts, please try again after a minute.',
});

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register user
 * @access  Public
 */
authRouter.post('/register', authLimiter, registerUserController);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
authRouter.post('/login', authLimiter, loginUserController);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
authRouter.post('/logout', authUser, logoutUserController);

/**
 * @route   GET /api/v1/auth/get-me
 * @desc    Get logged in user
 * @access  Private
 */
authRouter.get('/get-me', authUser, getMeController);

export default authRouter;
