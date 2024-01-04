const express = require('express');
const noteController = require('../controllers/note');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Search for notes based on keywords
router.get('/search', authenticateToken, noteController.searchNotes);

// Get All Notes of User
router.get('/', authenticateToken, noteController.getAllNotes);

// Get Note of User By Id
router.get('/:id', authenticateToken, noteController.getNoteById);

// Create a New Note
router.post('/', authenticateToken, noteController.createNote);

// Update a Note 
router.put('/:id', authenticateToken, noteController.updateNoteById);

// Delete a Note
router.delete('/:id', authenticateToken, noteController.deleteNoteById);

//Share a Note to another User
router.post('/:id/share', authenticateToken, noteController.shareNote);

module.exports = router;
