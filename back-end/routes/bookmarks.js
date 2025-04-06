// routes/bookmarks.js
const express = require('express');
const Bookmark = require('../models/Bookmark');
const authenticateToken = require('../middleware/authenticateToken');
const Student = require('../models/Student');


const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { eventId } = req.body;
    const studentId = req.user.id; // Get user ID from the decoded token

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Check if the event is already bookmarked
    const existing = await Bookmark.findOne({ studentId, eventId });
    if (existing) {
      return res.status(409).json({ message: 'Event already bookmarked' });
    }

    // Create new bookmark document
    const newBookmark = new Bookmark({ studentId, eventId });
    await newBookmark.save();

    // Also update the 'favorites' array in the Student model
    const student = await Student.findById(studentId);
    if (student) {
      // Add the event to the favorites array if it doesn't already exist
      if (!student.favorites.includes(eventId)) {
        student.favorites.push(eventId);
        await student.save();
      }
    }

    res.status(201).json({ message: 'Event bookmarked successfully' });
  } catch (error) {
    console.error('Error bookmarking event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
