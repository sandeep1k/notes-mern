import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/UserModel.js";

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    // Return success message
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login." });
  }
};

// Logout user
export const logoutUser = async (req, res, next) => {
  try {
    // Perform any logout-related actions here, such as invalidating tokens
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
