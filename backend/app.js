const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');
const config = require('./config');
const cors = require('cors');
const app = express();

app.use(
  cors({ origin: 'https://task-management-app-frontend-kik5.onrender.com' })
);

app.use(bodyParser.json());

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
