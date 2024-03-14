import express from "express";
import { protect } from "../middlewares/authMiddleware.js"; // Assuming you have an authentication middleware
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./noteController.js";

const router = express.Router();

// Note Creation Route
router.post("/", protect, createNote);

// Get all notes
router.get("/", protect, getAllNotes);

// Get a single note
router.get("/:id", protect, getNoteById);

// Update a note
router.put("/:id", protect, updateNote);

// Delete a note
router.delete("/:id", protect, deleteNote);

export default router;
