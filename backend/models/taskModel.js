const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  dueDate: { type: Date },
  description: { type: String },
  completionStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
