import env from '../config/env.js';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * @name getMeController
 * @desc get current user
 * @route GET /api/v1/auth/get-me
 * @access Public
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - User object or error message
 */
export const getMeController = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req?.user?.username);

  return sendSuccess(res, {
    message: 'user details fetched successfully',
    data: { user },
  });
});

/**
 * @name registerUserController
 * @desc register a new user, expect username, email and password in req.body
 * @route POST /api/v1/auth/register
 * @access Public
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - User object or error message
 */
export const registerUserController = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      throw new ApiError(
        400,
        'name, username, email and password are required'
      );
    }

    const { user, token } = await registerUser({
      name,
      username,
      email,
      password,
    });
    const { password: passwordhash, ...userDetails } = user._doc;

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/',
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'user created successfully',
      data: { user: userDetails },
    });
  } catch (error) {
    res.clearCookie('token');
    next(error);
  }
};

/**
 * @name loginUserController
 * @desc login a user, expect either email or username and password in req.body
 * @route POST /api/v1/auth/login
 * @access Public
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - User object or error message
 */
export const loginUserController = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!(email || username) || !password) {
      throw new ApiError(
        400,
        'either email or username and password are required'
      );
    }

    const { user, token } = await loginUser({ email, username, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/',
    });

    const { password: passwordHash, ...userDetails } = user._doc;

    return sendSuccess(res, {
      message: 'user logged in successfully',
      data: { user: userDetails },
    });
  } catch (error) {
    res.clearCookie('token');
    next(error);
  }
};

/**
 * @name logoutUserController
 * @desc logout a user
 * @route POST /api/v1/auth/logout
 * @access Public
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - Message or error message
 */
export const logoutUserController = asyncHandler(async (req, res) => {
  const token = req.token;

  if (!token) {
    throw new ApiError(400, 'user not logged in');
  }

  await logoutUser(token);

  res.clearCookie('token');
  return sendSuccess(res, { message: 'user logged out successfully' });
});
