import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from '../helpers/getEnvVar.js';

const connectMongoDB = async () => {
  try {
    const MONGO_URL = getEnvVar(ENV_VARS.MONGO_URL);
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.log('❌ Failed to connext to MongoDB', error.message);
    process.exit(1);
  }
};

export { connectMongoDB };
