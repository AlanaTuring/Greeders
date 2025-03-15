const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Register a student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate('favorites');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific student (with populated favorites)
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('favorites');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an event to a student's favorites
router.post("/:id/favorites", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const eventId = req.body.eventId; // The ID of the event to be added

    // Check if the event ID already exists in the favorites array
    if (!student.favorites.includes(eventId)) {
      student.favorites.push(eventId); // Add event ID to favorites
      await student.save();
      res.status(200).json(student);
    } else {
      res.status(400).json({ message: "Event already in favorites" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove an event from a student's favorites
router.delete("/:id/favorites/:eventId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const eventId = req.params.eventId;
    const index = student.favorites.indexOf(eventId);

    if (index > -1) {
      student.favorites.splice(index, 1); // Remove event ID from favorites
      await student.save();
      res.status(200).json(student);
    } else {
      res.status(400).json({ message: "Event not found in favorites" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
