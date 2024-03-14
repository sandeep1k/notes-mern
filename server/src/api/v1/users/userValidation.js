import { body } from "express-validator";

export const userRegistrationValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};
