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
            type: [String],
            required: true,
        },

        calories: {
            type: Number,
            min: 0,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

module.exports = { productSchema };
