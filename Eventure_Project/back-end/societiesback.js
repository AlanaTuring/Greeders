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
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Society Schema
const societySchema = new mongoose.Schema({
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

const Society = mongoose.model("Society", societySchema);

// Routes

app.get("/api/societies", async (req, res) => {
  try {
    const { name, sortBy } = req.query;
    let query = {};

    if (name) query.name = new RegExp(name, "i"); // Case-insensitive filter

    let societies = Society.find(query).populate("events").populate("organizers");

    if (sortBy) societies = societies.sort({ [sortBy]: 1 });

    const results = await societies;
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/societies/:id", async (req, res) => {
  try {
    const society = await Society.findById(req.params.id)
      .populate("events")
      .populate("organizers");
    if (!society) return res.status(404).json({ message: "Society not found" });
    res.status(200).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/societies", async (req, res) => {
  try {
    const existingSociety = await Society.findOne({
      $or: [{ name: req.body.name }, { contact: req.body.contact }],
    });

    if (existingSociety)
      return res.status(400).json({
        message: "A society with this name or contact already exists",
      });

    const society = new Society(req.body);
    const savedSociety = await society.save();
    res.status(201).json(savedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/societies/:id", async (req, res) => {
  try {
    const existingSociety = await Society.findOne({
      $or: [{ name: req.body.name }, { contact: req.body.contact }],
      _id: { $ne: req.params.id }, // Ensure it's not the same society being updated
    });

    if (existingSociety)
      return res.status(400).json({
        message: "Another society with this name or contact already exists",
      });

    const updatedSociety = await Society.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSociety) return res.status(404).json({ message: "Society not found" });
    res.status(200).json(updatedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/societies/:id", async (req, res) => {
  try {
    const deletedSociety = await Society.findByIdAndDelete(req.params.id);
    if (!deletedSociety) return res.status(404).json({ message: "Society not found" });
    res.status(200).json({ message: "Society deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/societies/:id/events", async (req, res) => {
  try {
    const { eventId } = req.body;
    const society = await Society.findById(req.params.id);

    if (!society) return res.status(404).json({ message: "Society not found" });

    if (society.events.includes(eventId))
      return res.status(400).json({ message: "Event already added to this society" });

    society.events.push(eventId);
    await society.save();

    res.status(201).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/societies/:id/organizers", async (req, res) => {
  try {
    const { organizerId } = req.body;
    const society = await Society.findById(req.params.id);

    if (!society) return res.status(404).json({ message: "Society not found" });

    if (society.organizers.includes(organizerId))
      return res.status(400).json({
        message: "Organizer already added to this society",
      });

    society.organizers.push(organizerId);
    await society.save();

    res.status(201).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
