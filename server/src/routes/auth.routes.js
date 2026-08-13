import { Router } from 'express';
import {
  getMeController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const authRouter = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register user
 * @access  Public
 */
authRouter.post('/register', registerUserController);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
authRouter.post('/login', loginUserController);

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
