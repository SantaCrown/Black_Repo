import express from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import passport from 'passport';
import validator from 'validator'; // Install this package using: npm install validator
import crypto from 'crypto';


import User from '../models/User.js';

const router = express.Router();

const sendConfirmationEmail = async (email, token) => {
  const url = 'https://api.brevo.com/v3/smtp/email';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY, // Use environment variable for security
    },
    body: JSON.stringify({
      sender: { name: 'Blacklemon', email: 'nakamuradev001@gmail.com' },
      replyTo: { email: 'nakamuradev001@gmail.com', name: 'Blacklemon' },
      to: [{ name: email.split('@')[0], email: email }], // Derive name from email if none provided
      textContent: 'Confirm Your Email',
      htmlContent: `
        <h1>Welcome to Our App</h1>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="http://localhost:3000/confirm?token=${token}">Confirm Email</a>
      `,
      subject: 'Verify Your Email',
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error sending email:', errorDetails);
      throw new Error('Failed to send confirmation email');
    }

    console.log('Email sent successfully!');
  } catch (err) {
    console.error('Error:', err.message);
    throw err; // Propagate the error for handling
  }
};

// Local Signup

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate inputs
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    // Generate a unique confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');

    // Create a new user with the confirmation token
    const user = new User({
      name,
      email,
      password,
      confirmationToken,
    });

    await user.save();

    // Send confirmation email
    await sendConfirmationEmail(email, confirmationToken);

    res.status(201).json({ message: 'User registered successfully. Please check your email to confirm your account.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Local Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google Login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account', // Forces the "Choose an Account" screen
  })
);


router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('Google callback hit');
    next();
  },
  passport.authenticate('google', { failureRedirect: '/login'}),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

router.get('/confirm', async (req, res) => {
  const { token } = req.query;

  try {
    // Find user by confirmation token
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired confirmation token.' });
    }

    // Verify the user
    user.isVerified = true;
    user.confirmationToken = null; // Clear the token
    await user.save();

    // Redirect to the login page
    res.redirect('http://localhost:3000/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
