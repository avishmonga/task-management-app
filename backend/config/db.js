const mongoose = require('mongoose');
const config = require('.');
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
