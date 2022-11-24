const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const { ACCESS_TOKEN_SECRET_KEY } = process.env;
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") throw RequestError(401, "Not authorized");
    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.accessToken) throw RequestError(401, "Not authorized");
    req.user = user;

    next();
  } catch (error) {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = auth;
