import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import BlacklistToken from '../models/blacklistToken.model.js';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from './asyncHandler.middleware.js';

export const authUser = asyncHandler(async (req, res, next) => {
  const authorization = req.headers?.authorization;
  const token = authorization?.startsWith('Bearer ')
    ? authorization.split(' ')[1]
    : req.cookies?.token;

  if (!token) {
    throw new ApiError(401, 'token not found');
  }

  const isBlacklisted = await BlacklistToken.isBlacklistedToken(token);
  if (isBlacklisted) {
    throw new ApiError(401, 'invalid token');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, 'invalid token');
  }

  if (!mongoose.isValidObjectId(decoded._id)) {
    throw new ApiError(401, 'invalid token');
  }

  req.user = decoded;
  req.token = token;
  next();
});
