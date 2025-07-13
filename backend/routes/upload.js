const express = require('express');
const multer = require('multer');
const path = require('path');
const { parseExcel } = require('../utils/parseExcel');
const Task = require('../models/Task');

const router = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (!['.xls', '.xlsx'].includes(ext)) {
    return cb(new Error('Only .xls and .xlsx files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter
});

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded or invalid file type'
    });
  }

  const result = parseExcel(req.file.buffer);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error
    });
  }

  try {
    const tasks = result.data.map((row, index) => {
      const excelDate = row["Due Date"];
      let dueDate;

      if (typeof excelDate === 'number') {
        dueDate = new Date((excelDate - 25569) * 86400 * 1000); // 🗓️ Excel date fix
      } else {
        dueDate = new Date(excelDate);
      }

      if (isNaN(dueDate.getTime())) {
        throw new Error(`Invalid Due Date at row ${index + 2}: "${excelDate}"`);
      }

      return {
        taskName: row["Task Name"]?.trim(),
        assignedTo: row["Assigned To"]?.trim(),
        dueDate,
        status: row["Status"]?.trim(),
        priority: row["Priority"]?.trim()
      };
    });

    console.log('✅ Parsed tasks:', tasks);

    await Task.insertMany(tasks);

    return res.status(200).json({
      success: true,
      message: 'File uploaded and data stored successfully',
      filename: req.file.originalname,
      count: tasks.length
    });

  } catch (err) {
    console.error('❌ DB Error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Error saving to database'
    });
  }
});

module.exports = router;

