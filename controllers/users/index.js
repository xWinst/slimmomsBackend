const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const refresh = require("./refresh");
const getUser = require("./getUser");
const setDailyRate = require("./setDailyRate");
const googleAuth = require("./googleAuth");

module.exports = {
  register,
  login,
  logout,
  refresh,
  getUser,
  setDailyRate,
  googleAuth,
};
