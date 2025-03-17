const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// Get all events for a specific club
router.get("/:clubId/events", async (req, res) => {
  try {
    // Fetch events for the specific club
    const events = await Event.find({ club: req.params.clubId }).populate("club");
    res.status(200).json(events); // Return events related to the club
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new event (if needed in the future)
router.post("/", async (req, res) => {
  try {
    const { title, description, club } = req.body;
    const newEvent = new Event({
      title,
      description,
      club, // The event should be associated with a club
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id); // Find the event by its ID and delete it
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an event (if needed in the future)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, club } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, club },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
