const { RequestError } = require("../../helpers");

const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    const { id } = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
    const requestedUser = await User.findById(id);
    if (!requestedUser || !requestedUser.refreshToken) {
      throw RequestError(401, "Unautharized");
    }
    const payload = { id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(requestedUser._id, {
      accessToken,
      refreshToken,
    });
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    throw error;
  }
};
module.exports = refresh;
