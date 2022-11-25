const express = require("express");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");
// const {
//     registerSchema,
//     loginSchema,
//     refreshSchema,
// } = require("../../schemas/users");

const { Product } = require("../../models/product");
const { UserProduct, schemas } = require("../../models/userProduct");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));
router.post("/", auth, validateBody(schemas.add), ctrlWrapper(add));

async function getAll(req, res) {
    console.log("Bingo!");
    const result = await Product.find(
        {},
        "title calories groupBloodNotAllowed"
    );
    res.status(200).json(result);
}

async function add(req, res) {
    const { _id: owner } = req.user;
    const result = await UserProduct.create({ ...req.body, owner });

    res.status(201).json(result);
}

module.exports = router;
