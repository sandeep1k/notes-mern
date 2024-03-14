import jwt from "jsonwebtoken";
import User from "../../../models/UserModel.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if authorization header is present and formatted correctly
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // If token is not valid or expired, or other errors occur
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    // If no token is found in the request header
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
