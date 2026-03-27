import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { getEnvVar } from './helpers/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import locationsRoutes from './routes/locationsRoutes.js';
const app = express();

//MIddleware - Pino(pretty) logging
app.use(logger);

//Middleware - JSON parsing
app.use(express.json());

//Middleware - CORS
app.use(cors());

//Middleware - Cookies parser
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.use(authRoutes);
app.use(feedbackRoutes);
app.use(userRoutes);
app.use(locationsRoutes);

//Middleware - 404 - Route not found
app.use(notFoundHandler);

//Middleware - Celebrate error catching
app.use(errors());

//Middleware - Error catching
app.use(errorHandler);

// DB connection
await connectMongoDB();

// PORT
const PORT = getEnvVar(ENV_VARS.PORT) ?? 3000;

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.log('❌ Error:', err);
  } else {
    console.log(`✅ Server is running on port ${PORT}`);
  }
});
