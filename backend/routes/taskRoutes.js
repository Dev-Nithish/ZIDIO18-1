// backend/routes/taskRoutes.js

const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
});

module.exports = router; // ✅ CommonJS export
