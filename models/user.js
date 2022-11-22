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

    token: {
      type: String,
      default: null,
    },

    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);
module.exports = User;
