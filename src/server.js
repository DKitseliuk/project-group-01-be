import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { errors } from 'celebrate';
import { getEnvVar } from "./helpers/getEnvVar.js";
import { ENV_VARS } from "./constants/envVars.js";

const app = express();

const PORT = getEnvVar(ENV_VARS.PORT) ?? 3000;

app.use(logger);


app.use(express.json());

app.use(cors());

app.use(cookieParser());



app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

// DB connection
await connectMongoDB();

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.log('❌ Error:', err);
  } else {
    console.log(`✅ Server is running on port ${PORT}`);
  }
});
