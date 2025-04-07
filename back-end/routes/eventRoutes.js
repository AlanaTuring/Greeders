const express = require("express");
const Event = require("../models/Event");
const Club = require("../models/Club");
const Society = require("../models/Society");
const Faculty = require("../models/Faculty");

const router = express.Router();

// ✅ More specific route to get events for a club (avoids conflict)
router.get("/club/:clubId/events", async (req, res) => {
  try {
    const events = await Event.find({ club: req.params.clubId }).populate("club");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a specific event by eventId (no more conflict with the route above)
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("club");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create a new event
router.post("/", async (req, res) => {
  try {
    const { title, description, club, date, location, time, form } = req.body;

    const newEvent = new Event({
      title,
      description,
      club,
      date,
      location,
      time,
      form,
    });

    const savedEvent = await newEvent.save();

    // Update the appropriate collection with the event ID
    if (form === "club") {
      await Club.updateOne({ _id: club }, { $push: { events: savedEvent._id } });
    } else if (form === "society") {
      await Society.updateOne({ _id: club }, { $push: { events: savedEvent._id } });
    } else if (form === "faculty") {
      await Faculty.updateOne({ _id: club }, { $push: { events: savedEvent._id } });
    }

    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete an event
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

// ✅ Update an event
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
