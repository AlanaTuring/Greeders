const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  
  // Reference existing Event documents
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to Event model
    },
  ],

  // Reference existing Organizer documents
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer", // Reference to Organizer model
    },
  ],
});

// Create the Club model
const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
