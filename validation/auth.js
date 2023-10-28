import { body } from "express-validator";

export const signUpValidation = [
  body("email", "Enter valid email...").isEmail().notEmpty(),
  body("name").notEmpty(),
  body("password", "Password must be more than 12 characters")
    .notEmpty()
    .toLowerCase()
    .isLength({ min: 12 }),
];
export const signInValidation = [
  body("email", "Enter valid email...").isEmail().notEmpty(),
  body("password", "Enter more than 12 characters")
    .notEmpty()
    .toLowerCase()
    .isLength({ min: 12 }),
];
export const ForgotPasswordValidation = [
  body("email", "Enter valid email...").isEmail().notEmpty(),
];
export const UpdatePasswordValidation = [
  body("password", "Password must be more than 12 characters")
    .notEmpty()
    .toLowerCase()
    .isLength({ min: 12 }),
];
