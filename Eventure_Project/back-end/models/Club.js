const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
});

module.exports = mongoose.model("Club", clubSchema);
