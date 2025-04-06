const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Event = require("../models/Event");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get token from request
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find student and populate favorites with event details
    const student = await Student.findById(decoded.id).populate("favorites");
    if (!student) return res.status(404).json({ message: "User not found" });

    // Return student name and events with _id included
    res.json({
      name: student.name,
      events: student.favorites.map(event => ({
        _id: event._id,
        title: event.title,
        description: event.description,
        location: event.location,
        time: event.time,
        date: event.date
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load profile", error: err.message });
  }
});

module.exports = router;
