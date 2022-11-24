const { RequestError } = require("../../helpers");
const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const requestedUser = await User.findOne({ email });

  if (!requestedUser) {
    throw RequestError(401, "Email or password is wrong");
  }

  const result = bcryptjs.compareSync(password, requestedUser.password);
  if (!result) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = { id: requestedUser._id };
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
    user: {
      name: requestedUser.name,
      email,
    },
  });
};

module.exports = login;
