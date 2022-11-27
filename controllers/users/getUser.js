const { RequestError } = require("../../helpers");

const getUser = async (req, res) => {
    const { name, email, dailyRate } = req.user;

    res.json({
        dailyRate,
        name,
        email,
    });
};
module.exports = getUser;
