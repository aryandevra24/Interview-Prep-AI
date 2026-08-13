import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import BlacklistToken from '../models/blacklistToken.model.js';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

const createAuthenticationToken = user => {
  return jwt.sign(
    { _id: user._id.toString(), username: user.username },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

export const getCurrentUser = async username => {
  return User.findOne({ username });
};

export const registerUser = async ({ name, username, email, password }) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser?.email === email) {
    throw new ApiError(400, 'email already exists');
  }
  if (existingUser?.username === username) {
    throw new ApiError(400, 'username not available');
  }

  const user = await User.create({ name, username, email, password });
  return { user, token: createAuthenticationToken(user) };
};

export const loginUser = async ({ email, username, password }) => {
  const user = email
    ? await User.findOne({ email }).select('+password')
    : await User.findOne({ username }).select('+password');

  if (!user) {
    throw new ApiError(400, 'user not found');
  }

  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword) {
    throw new ApiError(400, 'invalid password');
  }

  return { user, token: createAuthenticationToken(user) };
};

export const logoutUser = async token => {
  await BlacklistToken.create({ token });
};
