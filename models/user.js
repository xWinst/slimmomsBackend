const { Schema, model } = require("mongoose");
const { handleSaveError } = require("../helpers");

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },

        dailyRate: {
            type: Number,
            default: 0,
        },

        weight: {
            type: Number,
            min: 0,
            max: 400,
            default: 0,
        },

        bloodGroup: {
            type: Number,
            default: 0,
        },

        accessToken: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },

    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);
module.exports = User;
