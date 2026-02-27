const jwt = require("jsonwebtoken");
const config = require("../config/env");

const generateAccessToken = () => {
  return jwt.sign({ sub: config.tokenPayload }, config.jwtSecret);
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
