const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  // This will store the list of events related to the society
  events: [
    {
      event_name: { type: String, required: true },
      event_date: { type: Date, required: true },
      event_description: { type: String, required: true },
    },
  ],
  // This will store organizers of the society (optional)
  organizers: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
  ],
});

// Create the Society model
const Society = mongoose.model('Society', societySchema);

module.exports = Society;
