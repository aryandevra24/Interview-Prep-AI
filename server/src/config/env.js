if (!process.env.CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN is not defined');
}
if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is not defined');
}
if (!process.env.COOKIE_SECRET) {
  throw new Error('COOKIE_SECRET is not defined');
}
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined');
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined');
}

const env = Object.freeze({
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: String(process.env.NODE_ENV),
  CORS_ORIGIN: String(process.env.CORS_ORIGIN),
  COOKIE_SECRET: String(process.env.COOKIE_SECRET),
  MONGO_URI: String(process.env.MONGO_URI),
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN || '1d'),
  GEMINI_API_KEY: String(process.env.GEMINI_API_KEY),
});

export default env;
