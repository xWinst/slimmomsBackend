// const { RequestError } = require("../../helpers");

const getUser = async (req, res) => {
    const { name, email, dailyRate, bloodGroup } = req.user;

    res.json({
        dailyRate,
        bloodGroup,
        name,
        email,
    });
};
module.exports = getUser;
