const User = require('../models/user');
const Note = require('../models/note');
const jwt = require('jsonwebtoken');

// Get all notes for the authenticated user
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const notes = await Note.find({ createdBy: userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve notes.' });
  }
};

// Get a note by ID for the authenticated user
exports.getNoteById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;

    // Check if the note is created by the authenticated user or if it is shared with them
    const note = await Note.findOne({
      $or: [
        { _id: noteId, createdBy: userId }, 
        { _id: noteId, sharedWith: { $in: [userId] } }, 
      ],
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized.' });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve the note.' });
  }
};


// Create a new note for the authenticated user
exports.createNote = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { title, content } = req.body;

    const newNote = new Note({ title, content, createdBy: userId });
    await newNote.save();

    res.status(201).json({ message: 'Note created successfully.', note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create the note.' });
  }
};

// Update an existing note by ID for the authenticated user
exports.updateNoteById = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: userId },
      { $set: { title, content } },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json({ message: 'Note updated successfully.', note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update the note.' });
  }
};

// Delete a note by ID for the authenticated user
exports.deleteNoteById = async (req, res) => {
  try {
    const userId = req.user.userId; 

    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, createdBy: userId });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json({ message: 'Note deleted successfully.', note: deletedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the note.' });
  }
};

// Share a note with another user for the authenticated user
exports.shareNote = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const sharedUserId = req.body.sharedUserId;

    // Validate if the sharedUserId exists in the system
    const sharedUser = await User.findById(sharedUserId);
    if (!sharedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Retrieve the note to be shared
    const note = await Note.findOne({ _id: req.params.id, createdBy: userId });

    // Check if the note exists and belongs to the authenticated user
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    // Share the note by adding sharedUserId to the sharedWith array
    note.sharedWith.push(sharedUserId);
    await note.save();

    res.json({ message: 'Note shared successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to share the note.' });
  }
};

// Search for notes based on keywords for the authenticated user
exports.searchNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = req.query.q;

    // Use text search on 'title' and 'content' fields
    const searchResults = await Note.find({
      $and: [
        {
          $text: { $search: query },
        },
        {
          $or: [
            { createdBy: userId }, 
            { sharedWith: { $in: [userId] } }, 
          ],
        },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to perform the search.' });
  }
};
