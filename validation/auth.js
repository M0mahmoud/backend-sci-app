const { body } = require("express-validator");

const signUpValidation = [
  body("email", "Enter valid email...").isEmail().notEmpty().toLowerCase(),
  body("name").notEmpty(),
  body("password", "Password must be more than 12 characters")
    .notEmpty()
    .toLowerCase()
    .isLength({ min: 12 }),
];
const signInValidation = [
  body("email", "Enter valid email...").isEmail().notEmpty().toLowerCase(),
  body("password", "Enter more than 12 characters")
    .notEmpty()
    .toLowerCase()
    .isLength({ min: 12 }),
];
const ForgotPasswordValidation = [
  body("email", "Enter valid email...").isEmail().notEmpty().toLowerCase(),
];
const UpdatePasswordValidation = [
  body("password", "Password must be more than 12 characters")
    .notEmpty()
    .toLowerCase()
    .isLength({ min: 12 }),
];

module.exports = {
  signUpValidation,
  signInValidation,
  ForgotPasswordValidation,
  UpdatePasswordValidation,
};
