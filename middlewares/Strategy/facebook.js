const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const { Strategy } = require("passport-facebook");
const User = require("../../models/user");

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CALLBACK_URL } =
    process.env;

const facebookParams = {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ["id", "displayName", "name", "emails"],
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
    try {
        const { emails, displayName } = profile;
        const email = emails[0].value;
        const user = await User.findOne({ email });
        if (user) {
            return done(null, user);
        }
        const hashPassword = await bcrypt.hash(uuid(), 10);

        const newUser = await User.create({
            name: displayName,
            email,
            password: hashPassword,
        });

        return done(null, newUser);
    } catch (error) {
        done(error, false);
    }
};

const facebookStrategy = new Strategy(facebookParams, facebookCallback);

module.exports = facebookStrategy;
