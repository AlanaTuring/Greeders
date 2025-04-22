const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Organizer = require("../models/Organizer");
const Club = require("../models/Club");
const Society = require("../models/Society");
const Faculty = require("../models/Faculty");

// ✅ GET an organizer by email (with dynamic entity population)
router.get("/:email", async (req, res) => {
  try {
    const organizer = await Organizer.findOne({ email: req.params.email });

    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    const populatedOrganizer = organizer.toObject();

    // Dynamically fetch the correct managing entity based on type
    if (organizer.managing && organizer.type) {
      const modelMap = {
        Club,
        Society,
        Faculty,
      };

      const EntityModel = modelMap[organizer.type];

      if (EntityModel) {
        const managedEntity = await EntityModel.findById(organizer.managing);
        populatedOrganizer.managing = managedEntity;
      } else {
        return res.status(400).json({ message: "Unknown managing type." });
      }
    }

    res.json(populatedOrganizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET dashboard data for an organizer by ID
router.get("/dashboard/:organizerId", async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.organizerId);

    if (!organizer || !organizer.managing || !organizer.type) {
      return res.status(400).json({ message: "This organizer is not managing any entity." });
    }

    let managingEntity;

    switch (organizer.type) {
      case "Club":
        managingEntity = await Club.findById(organizer.managing).populate("events");
        break;
      case "Society":
        managingEntity = await Society.findById(organizer.managing).populate("events");
        break;
      case "Faculty":
        managingEntity = await Faculty.findById(organizer.managing).populate("events");
        break;
      default:
        return res.status(400).json({ message: "Unknown managing type." });
    }

    if (!managingEntity) {
      return res.status(404).json({ message: "Managed entity not found." });
    }

    res.status(200).json({ organizer, managingEntity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Check if the email belongs to an organizer
router.get("/check-role/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const organizer = await Organizer.findOne({ email });
    if (organizer) return res.json({ role: "organizer" });
    res.status(404).json({ message: "Not an organizer" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
