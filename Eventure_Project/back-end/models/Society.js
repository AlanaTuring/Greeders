const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  contact: { type: String },

  // Array of references to Event documents
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event", // Refers to the Event model
      required: true,
    },
  ],

  // Array of references to Organizer documents
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizer", // Refers to the Organizer model
      required: true,
    },
  ],
});

// Create the Society model
const Society = mongoose.model('Society', societySchema);

module.exports = Society;
