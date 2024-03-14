import dotenv from "dotenv";
import express from "express";
import noteRoutes from "./api/v1/notes/noteRoutes.js";
import userRoutes from "./api/v1/users/userRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notes", noteRoutes);

// Default route handler
app.get("/", (req, res) => {
  res.send("Welcome to your API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
