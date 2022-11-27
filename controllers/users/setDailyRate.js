const { RequestError } = require("../../helpers");
const User = require("../../models/user");

const setDailyRate = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) throw RequestError(404, "Not found");

    res.status(200).json(result);
};
module.exports = setDailyRate;
