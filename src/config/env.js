const dotenv = require("dotenv");

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "jwt-secret-for-n8n-service",
  tokenPayload: process.env.TOKEN_PAYLOAD || "n8n-service",
};

module.exports = config;
