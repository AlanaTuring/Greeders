const express = require("express");
const router = express.Router();
const Club = require("../models/Club");

// Get all clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a club
router.post("/", async (req, res) => {
  try {
    const club = new Club(req.body);
    const savedClub = await club.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
