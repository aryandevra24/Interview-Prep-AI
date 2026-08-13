import multer from 'multer';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

const toApiError = error => {
  if (error instanceof ApiError) return error;

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return new ApiError(413, 'Resume file exceeds the 3MB size limit.');
    }
    return new ApiError(400, 'Invalid file upload.');
  }

  return new ApiError(500, 'Something went wrong.');
};

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, 'Route not found.'));
};

export const errorHandler = (error, req, res, next) => {
  const apiError = toApiError(error);

  if (env.NODE_ENV !== 'test') {
    console.error(`[${apiError.statusCode}] ${apiError.message}`);
  }

  const message = apiError.isOperational
    ? apiError.message
    : 'Internal server error.';

  res.status(apiError.statusCode).json({
    success: false,
    message,
    errors: apiError.errors || [],
  });
};
