const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.access_token_secret, {
    expiresIn: config.access_token_expire,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.refresh_token_secret, {
    expiresIn: config.refresh_token_expire,
  });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
