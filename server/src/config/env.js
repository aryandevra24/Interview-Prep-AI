const requiredEnv = [
  'NODE_ENV',
  'CORS_ORIGIN',
  'MONGO_URI',
  'COOKIE_SECRET',
  'JWT_SECRET',
  'GEMINI_API_KEY',
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined.`);
  }
}

const optionalEnv = ['PORT', 'JWT_EXPIRES_IN'];

for (const key of optionalEnv) {
  if (!process.env[key]) {
    console.warn(`${key} is not defined.`);
  }
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
