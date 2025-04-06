const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  role: { type: Number, default: 0 } // Changed to Number with default 0
});

module.exports = mongoose.model("Organizer", organizerSchema);