const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const Event = require("../models/Event");

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

// Get a specific faculty with populated events and organizers
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate("events") // Populate events
      .populate("organizers"); // Optionally populate organizers if needed
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

    const eventId = req.body.eventId; // Expect eventId in the request body

    // Validate if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the event ID to the faculty's events array
    faculty.events.push(eventId);

    // Save the updated faculty document
    await faculty.save();

    res.status(201).json({ message: "Event added to faculty", faculty });
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

module.exports = router;
