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

module.exports = router;
