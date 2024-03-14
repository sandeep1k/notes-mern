// Importing necessary modules
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

// Importing route handlers
import { errorHandler } from "./api/v1/middlewares/errorMiddleware.js";
import noteRoutes from "./api/v1/notes/noteRoutes.js";
import userRoutes from "./api/v1/users/userRoutes.js";

// Initialize dotenv to use .env file variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies
app.use(cors()); // to enable CORS
app.use(morgan("dev")); // HTTP request logger

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notes", noteRoutes);

// Error Handling Middleware - This should be after all the routes
app.use(errorHandler);

// Exporting the app for further use, e.g., in server.js
export default app;
