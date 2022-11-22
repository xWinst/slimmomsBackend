 const { RequestError } = require("../../helpers");
const bcryptjs = require("bcryptjs");
const User = require("../../models/user");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  const requestedUser = await User.find({ email });
  if (requestedUser.length > 0) {
    throw RequestError(409, "Email in use");
  }

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
module.exports = register;
