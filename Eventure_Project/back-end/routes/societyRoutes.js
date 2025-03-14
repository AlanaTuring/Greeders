const express = require("express");
const router = express.Router();
const Society = require("../models/Society");

// Create a society
router.post("/", async (req, res) => {
  try {
    const society = new Society(req.body);
    const savedSociety = await society.save();
    res.status(201).json(savedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all societies
router.get("/", async (req, res) => {
  try {
    const societies = await Society.find();
    res.status(200).json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific society
router.get("/:id", async (req, res) => {
  try {
    const society = await Society.findById(req.params.id).populate("events");
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.status(200).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
