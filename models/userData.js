const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError } = require("../helpers");
const { productSchema } = require("./userProduct");

const dataSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
        },

        weight: {
            type: Number,
            min: 0,
            max: 400,
            default: 0,
        },

        dailyRate: {
            type: Number,
            default: 0,
        },

        consumed: {
            type: Number,
            default: 0,
        },

        products: {
            type: [productSchema],
            default: [],
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },

    { versionKey: false, timestamps: true }
);

dataSchema.post("save", handleSaveError);

const add = Joi.object({
    date: Joi.string().required(),
    weight: Joi.number(),
    dailyRate: Joi.number(),
});

const addProduct = Joi.object({
    date: Joi.string().required(),
    consumed: Joi.number(),
    product: Joi.object()
        .keys({
            name: Joi.string().required(),
            weight: Joi.number().required(),
            calories: Joi.number().required(),
        })
        .required(),
});

const removeProduct = Joi.object({
    date: Joi.string().required(),
    product: Joi.object()
        .keys({
            id: Joi.string().required(),
            calories: Joi.number().required(),
        })
        .required(),
});

const updateWeight = Joi.object({
    date: Joi.string().required(),
    weight: Joi.number().required(),
});

const schemas = {
    add,
    addProduct,
    removeProduct,
    updateWeight,
};

const UserData = model("userData", dataSchema);

module.exports = { UserData, schemas };
