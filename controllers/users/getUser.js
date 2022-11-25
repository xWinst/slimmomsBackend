const { RequestError } = require("../../helpers");
// const bcryptjs = require("bcryptjs");
// const User = require("../../models/user");

const getUser = async (req, res) => {
    const { name, email } = req.user;

    res.json({
        name,
        email,
    });
};
module.exports = getUser;
