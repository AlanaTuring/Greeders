// clubsbackend.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router(); // Use the Router object to define routes

// Club Schema
const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true, unique: true },

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],

  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const Club = mongoose.model("Club", clubSchema);

// GET all clubs with optional filters and sorting
router.get("/", async (req, res) => {
  try {
    const { name, sortBy } = req.query;
    let query = {};

    if (name) query.name = new RegExp(name, "i"); // Case-insensitive filter

    let clubs = Club.find(query).populate("events").populate("organizers");

    if (sortBy) clubs = clubs.sort({ [sortBy]: 1 });

    const results = await clubs;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single club by ID
router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate("events")
      .populate("organizers");
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new club
router.post("/", async (req, res) => {
  try {
    const existingClub = await Club.findOne({
      $or: [{ name: req.body.name }, { contact: req.body.contact }],
    });

    if (existingClub)
      return res.status(400).json({
        message: "A club with this name or contact already exists",
      });

    const club = new Club(req.body);
    const savedClub = await club.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an existing club
router.put("/:id", async (req, res) => {
  try {
    const existingClub = await Club.findOne({
      $or: [{ name: req.body.name }, { contact: req.body.contact }],
      _id: { $ne: req.params.id }, // Ensure it's not the same club being updated
    });

    if (existingClub)
      return res.status(400).json({
        message: "Another club with this name or contact already exists",
      });

    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClub) return res.status(404).json({ message: "Club not found" });
    res.status(200).json(updatedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a club
router.delete("/:id", async (req, res) => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);
    if (!deletedClub) return res.status(404).json({ message: "Club not found" });
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST to add an event to a club
router.post("/:id/events", async (req, res) => {
  try {
    const { eventId } = req.body;
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ message: "Club not found" });

    if (club.events.includes(eventId))
      return res.status(400).json({ message: "Event already added to this club" });

    club.events.push(eventId);
    await club.save();

    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST to add an organizer to a club
router.post("/:id/organizers", async (req, res) => {
  try {
    const { organizerId } = req.body;
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ message: "Club not found" });

    if (club.organizers.includes(organizerId))
      return res.status(400).json({
        message: "Organizer already added to this club",
      });

    club.organizers.push(organizerId);
    await club.save();

    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
