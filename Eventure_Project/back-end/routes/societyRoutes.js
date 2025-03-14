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

// Get a specific society with populated events
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

// Add an event to a society
router.post("/:id/events", async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }

    // Assuming you are passing an event object in the request body
    const newEvent = req.body;

    // Add the event to the society's events array
    society.events.push(newEvent);

    // Save the updated society document
    await society.save();

    res.status(201).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific society
router.put("/:id", async (req, res) => {
  try {
    const updatedSociety = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSociety) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.status(200).json(updatedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific society
router.delete("/:id", async (req, res) => {
  try {
    const deletedSociety = await Society.findByIdAndDelete(req.params.id);
    if (!deletedSociety) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.status(200).json({ message: "Society deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
