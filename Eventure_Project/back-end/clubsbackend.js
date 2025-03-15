// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eventure";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

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

// Routes

app.get("/api/clubs", async (req, res) => {
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

app.get("/api/clubs/:id", async (req, res) => {
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

app.post("/api/clubs", async (req, res) => {
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

app.put("/api/clubs/:id", async (req, res) => {
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

app.delete("/api/clubs/:id", async (req, res) => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);
    if (!deletedClub) return res.status(404).json({ message: "Club not found" });
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/clubs/:id/events", async (req, res) => {
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

// 📍 Add an organizer to a club
app.post("/api/clubs/:id/organizers", async (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
