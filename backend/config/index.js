module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 8000,
  database: {
    url: process.env.MONGO_URI,
  },
};
