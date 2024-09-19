const { checkSchema } = require("express-validator");
const { usernameRegex, passwordRegex } = require("../regex/regex");

const userValidationSchema = checkSchema({
  username: {
    in: "body",
    notEmpty: {
      errorMessage: "Username is required.",
    },
    isLength: {
      errorMessage: "User name must be between 5 and 20 characters.",
      options: {
        min: 5,
        max: 20,
      },
    },
    matches: {
      options: [usernameRegex],
      errorMessage:
        "Username must contain only alphabetic characters, can contain a single space inside, and cannot start or end with a space or have consecutive spaces",
    },
  },
  email: {
    in: "body",
    notEmpty: {
      errorMessage: "Email is required.",
    },
    isEmail: {
      errorMessage: "Please provide valid email.",
    },
    normalizeEmail: true,
  },
  password: {
    in: "body",
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      errorMessage: "Password must be between 6 and 32 characters",
      options: {
        min: 6,
        max: 32,
      },
    },
    matches: {
      options: [passwordRegex],
      errorMessage:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    },
  },
});

module.exports = userValidationSchema;
