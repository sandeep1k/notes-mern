import { body, validationResult } from "express-validator";

// User validation rules
const registerValidationRules = () => {
  return [
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ];
};

const loginValidationRules = () => {
  return [
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").exists(),
  ];
};

// Note validation rules
const noteValidationRules = () => {
  return [
    body("title", "Title is required").not().isEmpty(),
    body(
      "description",
      "Description must be at least 10 characters long"
    ).isLength({ min: 10 }),
  ];
};

// General function to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  loginValidationRules,
  noteValidationRules,
  registerValidationRules,
  validate,
};
