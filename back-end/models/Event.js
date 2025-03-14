const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizerEmail: { type: String, required: true },
  club: { type: String },
  participants: [{ type: String }], // storing emails
  form: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
