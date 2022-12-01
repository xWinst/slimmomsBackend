const User = require("../../models/user");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  console.log("res.user: ", req.user);
  //   console.log("req: ", req);
  const { user } = req;
  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(user._id, {
    accessToken,
    refreshToken,
  });
  const userToSend = {
    name: user.name,
    dailyRate: user.dailyRate,
    bloodGroup: user.bloodGroup,
  };
  // res.status(200).json({
  //   accessToken,
  //   refreshToken,
  //   user,
  // });
  res.redirect(
    `http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${JSON.stringify(
      userToSend
    )}`
  );
};

module.exports = googleAuth;
