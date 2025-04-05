const express = require("express");
const router = express.Router();
const Club = require("../models/Club");

// Get all clubs with sorting, filtering, and populated fields
router.get("/", async (req, res) => {
  try {
    const { name, location, sortBy } = req.query;

    let query = {};

    if (name) query.name = new RegExp(name, "i"); // Case-insensitive name filter
    if (location) query.location = new RegExp(location, "i"); // Location filter

    let clubs = Club.find(query)
      .populate("events") // Populate events
      .populate("organizers"); // Populate organizers

    // Sorting logic (e.g., ?sortBy=name or ?sortBy=location)
    if (sortBy) clubs = clubs.sort({ [sortBy]: 1 });

    const results = await clubs;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific club with populated references (events and organizers)
router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate("events") // Populate events
      .populate("organizers"); // Populate organizers

    if (!club) return res.status(404).json({ message: "Club not found" });
    res.status(200).json(club);  // Send the club data (including populated events)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new club with duplicate prevention
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

// Add an event to a club by event ID (checks for duplicates)
router.post("/:id/events", async (req, res) => {
  try {
    const { eventId } = req.body;
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ message: "Club not found" });

    if (club.events.includes(eventId))
      return res.status(400).json({ message: "Event already added to this club" });

    club.events.push(eventId);
    await club.save();

    // Populate events and organizers after adding the new event
    const updatedClub = await Club.findById(req.params.id)
      .populate("events")
      .populate("organizers");

    res.status(201).json(updatedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an organizer to a club by organizer ID (checks for duplicates)
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

    // Populate events and organizers after adding the new organizer
    const updatedClub = await Club.findById(req.params.id)
      .populate("events")
      .populate("organizers");

    res.status(201).json(updatedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing club with duplicate prevention on update
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

    // Populate events and organizers after updating the club
    const populatedClub = await Club.findById(req.params.id)
      .populate("events")
      .populate("organizers");

    res.status(200).json(populatedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
