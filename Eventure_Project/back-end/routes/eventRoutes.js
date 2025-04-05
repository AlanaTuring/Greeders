const express = require("express");
const Event = require("../models/Event");
const Club = require("../models/Club");  // Import the Club model
const router = express.Router();

// Get all events for a specific club
router.get("/:clubId/events", async (req, res) => {
  try {
    const events = await Event.find({ club: req.params.clubId }).populate("club");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific event by eventId
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("club");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event); // Send the event back in the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new event
router.post("/", async (req, res) => {
  try {
    const { title, description, club, date, location, time, form } = req.body; // Include all necessary fields
    const newEvent = new Event({
      title,
      description,
      club, 
      date,
      location,
      time,
      form,
    });
    
    // Save the new event
    const savedEvent = await newEvent.save();

    // Now update the club's events array by adding the new event's ID
    await Club.updateOne(
      { _id: club },  // Find the club by its ID
      { $push: { events: savedEvent._id } }  // Push the new event's ID into the club's events array
    );

    res.status(201).json(savedEvent);  // Send the created event back in the response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an event
router.put("/:id", async (req, res) => {
  try {
    const { title, description, club, date, location, time, form } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, club, date, location, time, form },
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
