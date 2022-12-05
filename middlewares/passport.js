const passport = require("passport");
const googleStrategy = require("./Strategy/google");
const facebookStrategy = require("./Strategy/facebook");

passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);
module.exports = passport;
