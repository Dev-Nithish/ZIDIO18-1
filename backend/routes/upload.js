import express from 'express';
import multer from 'multer';
import path from 'path';
import { parseExcel } from '../utils/parseExcel.js';   // ⬅️ import parser

const router = express.Router();

// Store file in memory (no disk write)
const storage = multer.memoryStorage();

// Allow only .xls/.xlsx
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (!['.xls', '.xlsx'].includes(ext)) {
    return cb(new Error('Only .xls and .xlsx files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter
});

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded or invalid file type'
    });
  }

  // ▶️  Parse the uploaded Excel buffer
  const result = parseExcel(req.file.buffer);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error
    });
  }

  // ✅ Success: return structured JSON
  return res.status(200).json({
    success: true,
    message: 'File uploaded and parsed successfully',
    filename: req.file.originalname,
    data: result.data     // parsed rows
  });
});

export default router;
