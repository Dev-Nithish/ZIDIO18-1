// backend/routes/authRoutes.js

const express = require('express');
const {
  signup,
  login,
  getCurrentUser,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

const router = express.Router();

// ─── Public routes ───────────────────────────────────────────
router.post('/signup', signup);
router.post('/login',  login);

// ─── Protected route: get logged‑in user's data ──────────────
router.get('/user', protect, getCurrentUser);

// ─── Example admin‑only route (optional) ─────────────────────
router.get('/admin-only', protect, isAdmin, (req, res) => {
  res.json({ message: 'Admin access granted.' });
});

module.exports = router;   // ✅ CommonJS export
