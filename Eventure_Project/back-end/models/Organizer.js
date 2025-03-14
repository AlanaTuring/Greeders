const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  club: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("Organizer", organizerSchema);
