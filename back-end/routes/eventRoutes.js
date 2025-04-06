const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Club = require("../models/Club");  // Import Club model if needed for validation

// Create an event
router.post("/", async (req, res) => {
  try {
    const { club, title, date, location, form } = req.body;

    // Check if the club exists
    const foundClub = await Club.findById(club);
    if (!foundClub) {
      return res.status(404).json({ error: "Club not found" });
    }

    const event = new Event({ club, title, date, location, form });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate('club');  // Populate club data in the events
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
