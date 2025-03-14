const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// Create a faculty
router.post("/", async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    const savedFaculty = await faculty.save();
    res.status(201).json(savedFaculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all faculties
router.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific faculty
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("events");
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
