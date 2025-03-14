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

// Get a specific faculty with populated events
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

// Add an event to a faculty
router.post("/:id/events", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Assuming you are passing an event object in the request body
    const newEvent = req.body;

    // Add the event to the faculty's events array
    faculty.events.push(newEvent);

    // Save the updated faculty document
    await faculty.save();

    res.status(201).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific faculty
router.put("/:id", async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(updatedFaculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific faculty
router.delete("/:id", async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
