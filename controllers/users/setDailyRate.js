const { RequestError } = require("../../helpers");
const User = require("../../models/user");
const { UserData } = require("../../models/userData");

const setDailyRate = async (req, res) => {
    const { _id } = req.user;
    const { date, dailyRate, weight, bloodGroup } = req.body;
    const result = await User.findByIdAndUpdate(
        _id,
        { bloodGroup, dailyRate },
        { new: true }
    );
    if (!result) throw RequestError(404, "Not found");
    const data = await UserData.findOneAndUpdate(
        { owner: _id, date },
        { date, dailyRate, weight },
        { new: true }
    );

    if (!data) await UserData.create({ date, dailyRate, weight, owner: _id });

    res.status(200).json(result);
};
module.exports = setDailyRate;
