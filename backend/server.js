// backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Must include .js extension for ES Modules
import uploadRoute from './routes/upload.js'; // Add this line
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoute);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });
