import express from 'express';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

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
