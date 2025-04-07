const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  role: { type: String, required: true },
  managing: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }, // Default to Club
  type: { type: String, enum: ['Club', 'Society', 'Faculty'] } // New field to help us determine what to populate
});

module.exports = mongoose.model("Organizer", organizerSchema);
