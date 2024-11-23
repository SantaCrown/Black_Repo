import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import process from 'process';
import authRoutes from './routes/auth.js';
import './config/googleAuth.js'; // Google OAuth config

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'blacklemon', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
