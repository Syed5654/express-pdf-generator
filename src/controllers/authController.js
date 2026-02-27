const { generateAccessToken } = require("../services/tokenService");

const createToken = (req, res) => {
  const token = generateAccessToken();
  return res.status(200).json({
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: null,
    note: "This token does not expire unless JWT_SECRET is changed.",
  });
};

module.exports = {
  createToken,
};
