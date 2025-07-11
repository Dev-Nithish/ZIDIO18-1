// backend/routes/authRoutes.js or .ts (ES Module version)

import express from 'express';
const router = express.Router();

// Dummy admin/user registration controller
const registerController = async (req, res) => {
  const { name = 'Admin User', email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Dummy success response
  res.status(201).json({
    message: 'Account created successfully.',
    user: {
      id: 'admin123',
      name,
      email,
      role: 'admin',
    },
    token: 'mocked.jwt.token'
  });
};

// Dummy login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  res.status(200).json({
    message: 'Login successful.',
    user: {
      id: 'user123',
      name: 'John Doe',
      email,
      role: email === 'admin@example.com' ? 'admin' : 'user'
    },
    token: 'mocked.jwt.token'
  });
};

router.post('/register', registerController);
router.post('/login', loginController);

export default router;
