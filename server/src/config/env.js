const env = Object.freeze({
  PORT: Number(process.env.PORT || 3000),
  MONGO_URI: String(process.env.MONGO_URI),
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN || '1d'),
  GEMINI_API_KEY: String(process.env.GEMINI_API_KEY),
  NODE_ENV: String(process.env.NODE_ENV || 'development'),
  CORS_ORIGIN: String(process.env.CORS_ORIGIN),
});

export default env;
