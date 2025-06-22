// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator'); // For email validation
const User = require('../models/User');
require('dotenv').config();

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // --- UPDATED: More robust input validation ---
    if (!name || !email || !password) { // CORRECTED: Changed '!!password' to '!password'
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Validate password strength (example: min 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered. Please log in.' });
    }

    // Validate role if provided, otherwise default
    let userRole = 'user'; // Default role
    if (role) {
      // Example: Only 'user' and 'admin' roles are allowed
      const allowedRoles = ['user', 'admin'];
      if (!allowedRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ message: `Invalid role specified. Allowed roles are: ${allowedRoles.join(', ')}.` });
      }
      userRole = role.toLowerCase();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole, // Use the validated/defaulted role
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Account created successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Signup Error:', error.message); // Log specific error message
    res.status(500).json({ message: 'Server error during signup.' }); // More specific error message
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Validate email format (optional but good for consistency)
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' }); // Generic message for security
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' }); // Generic message for security
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login Error:', error.message); // Log specific error message
    res.status(500).json({ message: 'Server error during login.' }); // More specific error message
  }
};

// @desc    Get current user
// @route   GET /api/auth/user
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    // This assumes an authentication middleware has already run and attached user info to req.user
    // For example, a middleware would verify the JWT and add { userId: '...', role: '...' } to req.user
    if (!req.user || !req.user.userId) {
        // This case should ideally be handled by the authentication middleware
        // if it fails to verify the token, but acts as a fallback.
        return res.status(401).json({ message: 'Not authenticated. Token missing or invalid.' });
    }

    const user = await User.findById(req.user.userId).select('-password -__v'); // Exclude password and Mongoose version key
    if (!user) {
      return res.status(404).json({ message: 'User not found.' }); // User might have been deleted after token was issued
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Fetch User Error:', error.message); // Log specific error message
    res.status(500).json({ message: 'Server error fetching user data.' }); // More specific error message
  }
};