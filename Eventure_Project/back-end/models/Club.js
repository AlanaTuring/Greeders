const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  // This will store the list of events related to the club
  events: [
    {
      event_name: { type: String, required: true },
      event_date: { type: Date, required: true },
      event_description: { type: String, required: true },
    },
  ],
  // This will store organizers of the club (optional)
  organizers: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
  ],
});

// Create the Club model
const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
