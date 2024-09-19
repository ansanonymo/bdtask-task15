const mongoose = require("mongoose");
const { validate } = require("../models/UserModel");
const {
  emailRegex,
  usernameRegex,
  passwordRegex,
} = require("../../regex/regex");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
      validate: {
        validator: function (value) {
          return usernameRegex.test(value);
        },
        message: (props) =>
          `'${props.value}' is not a valid username.Username must be between 5 and 20 characters, contain only letters and single spaces, and cannot start or end with spaces.`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 32,
      validate: {
        validator: function (value) {
          return passwordRegex.test(value);
        },
        message: () => {
          return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
