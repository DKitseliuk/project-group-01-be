import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from "./middlewares/logger.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { errors } from 'celebrate';


const app = express();

const PORT = process.env.PORT ?? 3000;

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
app.listen(3003, (err) => {
  if (err) {
    console.log('❌ Error:', err);
  } else {
    console.log('✅ Server is running on port 3003');
  }
});
