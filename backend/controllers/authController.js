const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    config.jwtSecret,
    { expiresIn: '1h' }
  );
};

// signup
exports.signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({
        message: 'Name, email, and password are required.',
        status: false,
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: 'User already exists with this email.',
        status: false,
      });
    }

    const user = await User.create({ email, password, name });
    const token = generateToken(user);
    return res
      .status(201)
      .send({ message: 'User created successfully', token, status: true });
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Error signup user', status: false });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User not found', status: false });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.status(200).send({ token, status: true });
  } catch (err) {
    return res.status(400).send({ message: 'Error logging in', status: false });
  }
};
