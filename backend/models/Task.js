// backend/models/Task.js  (CommonJS)

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName:  { type: String, required: true },
  assignedTo:{ type: String, required: true },
  dueDate:   { type: Date,   required: true },
  status:    { type: String, required: true },
  priority:  { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
