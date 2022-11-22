const { RequestError } = require("../../helpers");
const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(requestedUser._id, { token });

  res.status(200).json({
    token,
    user: {
      name: requestedUser.name,
      email,
    },
  });
};

module.exports = login;
