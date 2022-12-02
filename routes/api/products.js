const express = require("express");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");

const { Product } = require("../../models/product");
const { UserProduct, schemas } = require("../../models/userProduct");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));
router.post("/", auth, validateBody(schemas.add), ctrlWrapper(add));
router.get("/:date", auth, ctrlWrapper(getUserProduct));
router.delete("/:id", auth, ctrlWrapper(remove));

async function getAll(req, res) {
    const result = await Product.find(
        {},
        "title weight calories groupBloodNotAllowed"
    );
    res.status(200).json(result);
}

async function add(req, res) {
    const { _id: owner } = req.user;
    console.log("add:", req.body);
    const result = await UserProduct.create({ ...req.body, owner });

    res.status(201).json(result);
}

async function getUserProduct(req, res) {
    const { _id: owner } = req.user;
    const { date } = req.params;
    console.log("date: ", date);
    const result = await UserProduct.find({ owner, date });

    res.status(200).json(result);
}

async function remove(req, res) {
    const { id } = req.params;
    const result = await UserProduct.findByIdAndRemove(id);
    if (!result) throw RequestError(404, "Not found");

    res.status(204).json({ message: "product deleted" });
}

module.exports = router;
