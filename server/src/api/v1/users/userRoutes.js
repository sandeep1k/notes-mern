import express from "express";
import { validate } from "../../../utils/validation.js";
import { loginUser, logoutUser, registerUser } from "./userController.js";
import { userRegistrationValidationRules } from "./userValidation.js";

const router = express.Router();

// User Registration Route
router.post(
  "/register",
  userRegistrationValidationRules(),
  validate,
  registerUser
);

// User Login Route
router.post("/login", loginUser);

// User Logout Route
router.post("/logout", logoutUser);

export default router;
