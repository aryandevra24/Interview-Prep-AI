import mongoose from 'mongoose';
import env from './env.js';
import { DB_APPNAME, DB_NAME } from '../constants/index.js';

/**
 * @name connectDB
 * @desc Connect to MongoDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${env.MONGO_URI}/${DB_NAME}?appName=${DB_APPNAME}`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
