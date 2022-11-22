const { Schema, model } = require("mongoose");
// const Joi = require("joi");
const { handleSaveError } = require("../helpers");

const productSchema = new Schema(
  {
    categories: {
      type: [String],
      required: true,
    },

    weight: {
      type: Number,
      min: 1,
      default: 100,
    },

    title: {
      ru: {
        type: String,
        required: true,
      },
      ua: {
        type: String,
        required: true,
      },
    },

    calories: {
      type: Number,
      min: 0,
      required: true,
    },

    groupBloodNotAllowed: {
      type: [Boolean],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleSaveError);

const Product = model("product", productSchema);

module.exports = { Product };
