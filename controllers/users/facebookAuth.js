const User = require("../../models/user");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, REDIRECT_URL } =
    process.env;

const facebookAuth = async (req, res) => {
    const { user } = req;
    const payload = { id: user._id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "20m",
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
    //     accessToken,
    //     refreshToken,
    //     userToSend,
    // });
    res.redirect(
        `${REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${JSON.stringify(
            userToSend
        )}`
    );
};

module.exports = facebookAuth;
