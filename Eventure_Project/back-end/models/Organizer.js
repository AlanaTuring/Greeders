const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, required: true },
  managing: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }  // assuming `managing` refers to another model
});

module.exports = mongoose.model("Organizer", organizerSchema);
