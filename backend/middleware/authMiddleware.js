const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  let token = req.headers['authorization'];
  token = token && token.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
