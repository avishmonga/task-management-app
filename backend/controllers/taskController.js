const Task = require('../models/taskModel');

// Fetch tasks
exports.getTasks = async (req, res) => {
  try {
    const { completionStatus, dueDateOrder } = req.query;
    const filter = { user: req.userId };
    if (completionStatus && completionStatus !== 'all') {
      filter.completionStatus = completionStatus;
    }
    let tasks = Task.find(filter);
    tasks = tasks.sort({
      completionStatus: -1,
      dueDate: dueDateOrder === 'ascending' ? 1 : -1,
    });
    tasks = await tasks.exec();
    return res.status(200).send({ tasks, status: true });
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Error fetching tasks', status: false });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.create({
      user: req.userId,
      title,
      description,
      dueDate,
      status,
    });
    return res.status(201).send({ task, status: true });
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Error creating task', status: false });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send({ task, status: true });
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Error updating task', status: false });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: 'Task deleted', status: true });
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Error deleting task', status: false });
  }
};
