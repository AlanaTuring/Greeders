const express = require("express");
const router = express.Router();
const Organizer = require("../models/Organizer");

// Register an organizer
router.post("/", async (req, res) => {
  try {
    const organizer = new Organizer(req.body);
    const savedOrganizer = await organizer.save();
    res.status(201).json(savedOrganizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
