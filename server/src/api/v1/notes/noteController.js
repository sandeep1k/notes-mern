import Note from "../../../models/NoteModel.js";

// Create a new note
export const createNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Create a new note
    const newNote = new Note({
      title,
      description,
      user: req.user._id, //authentication and storing user ID in req.user
    });

    await newNote.save();

    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    next(error);
  }
};

// Get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note updated successfully", note });
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
