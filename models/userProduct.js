const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError } = require("../helpers");

const productSchema = new Schema(
    {
        weight: {
            type: Number,
            min: 1,
            default: 100,
        },

        name: {
            type: String,
            required: true,
        },

        calories: {
            type: Number,
            min: 0,
            required: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

productSchema.post("save", handleSaveError);

const add = Joi.object({
    name: Joi.string().required(),
    weight: Joi.number().required(),
    calories: Joi.number().required(),
});

const schemas = {
    add,
};

const UserProduct = model("userProduct", productSchema);

module.exports = { UserProduct, schemas };
