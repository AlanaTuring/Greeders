const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  president: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
});

module.exports = mongoose.model("Society", societySchema);
