const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");

const { UserData, schemas } = require("../../models/userData");
const User = require("../../models/user");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getUserData));
router.get("/:date", auth, ctrlWrapper(getUserProducts));
router.post("/", auth, validateBody(schemas.add), ctrlWrapper(addUserData));
router.patch(
    "/addProduct",
    auth,
    validateBody(schemas.addProduct),
    ctrlWrapper(addProduct)
);
router.patch("/removeProduct", auth, ctrlWrapper(removeProduct));
router.patch(
    "/weight",
    auth,
    validateBody(schemas.updateWeight),
    ctrlWrapper(setWeight)
);

async function getUserData(req, res) {
    const { _id: owner } = req.user;
    const result = await UserData.find({ owner }, "-createdAt -updatedAt");
    res.status(200).json(result);
}

async function addUserData(req, res) {
    const { _id: owner } = req.user;
    const result = await UserData.create({ ...req.body, owner });
    res.status(201).json(result);
}

async function addProduct(req, res) {
    const { _id: owner } = req.user;
    const { date, product } = req.body;
    let result = await UserData.findOneAndUpdate(
        { owner, date },
        { $push: { products: product }, $inc: { consumed: product.calories } },
        { new: true, fields: "products consumed" }
    );
    if (!result) {
        const user = await User.findById(owner);
        result = await UserData.create({
            date,
            owner,
            dailyRate: user.dailyRate,
            consumed: product.calories,
            products: [product],
        });
    }
    res.status(201).json(result);
}

async function removeProduct(req, res) {
    const { _id: owner } = req.user;
    const { date, product } = req.body;
    const result = await UserData.findOneAndUpdate(
        { owner, date },
        {
            $pull: {
                products: { _id: product.id },
            },
            $inc: { consumed: -product.calories },
        },
        { new: true, fields: "products consumed" }
    );
    if (!result) throw RequestError(404, "Not found");

    res.status(201).json(result);
}

async function getUserProducts(req, res) {
    const { _id: owner } = req.user;
    const { date } = req.params;
    let result = await UserData.findOne({ owner, date }, "products consumed");
    if (!result) result = { products: [], consumed: 0 };
    res.status(200).json(result);
}

async function setWeight(req, res) {
    const { _id: owner } = req.user;
    const { date, weight } = req.body;
    let result = await UserData.findOneAndUpdate(
        { owner, date },
        { weight },
        { new: true, fields: "weight" }
    );
    if (!result) {
        const user = await User.findById(owner);
        result = await UserData.create({
            date,
            owner,
            dailyRate: user.dailyRate,
            weight,
        });
    }
    res.status(201).json(result);
}

module.exports = router;
