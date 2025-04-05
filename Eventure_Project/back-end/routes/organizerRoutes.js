const express = require("express");
const router = express.Router();
const Organizer = require("../models/Organizer");
const Club = require("../models/Club");

// GET all organizers
router.get("/", async (req, res) => {
  try {
    const organizers = await Organizer.find(); // Fetch all organizers from the database
    res.json(organizers); // Send the list of organizers as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // If there's an error, send it as a JSON response
  }
});

// GET a specific organizer by ID, with populated 'managing' data (club or faculty) and its events
router.get("/:id", async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id)
      .populate({
        path: "managing",
        populate: { path: "events" } // Ensure events of the club are also populated
      });

    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }
    res.json(organizer); // Send the organizer data with populated 'managing' and 'events'
  } catch (err) {
    res.status(500).json({ error: err.message }); // If there's an error, send it as a JSON response
  }
});

// Register a new organizer (POST route)
router.post("/", async (req, res) => {
  try {
    const organizer = new Organizer(req.body);
    const savedOrganizer = await organizer.save();
    res.status(201).json(savedOrganizer); // Return the saved organizer
  } catch (err) {
    res.status(500).json({ error: err.message }); // If there's an error, send it as a JSON response
  }
});

module.exports = router;
