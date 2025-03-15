const mongoose = require("mongoose");

// Create the Faculty schema
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }, // Explicitly mark description as optional
  // Modify events to be an array of ObjectIds that reference the Event collection
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Corrected to match the Event model's name
      required: true,
    },
  ],
  // Add a field for organizers, referencing the Organizer collection
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer", // Corrected to match the Organizer model's name
      required: true,
    },
  ],
});

// Export the Faculty model based on the schema
module.exports = mongoose.model("Faculty", facultySchema); // Corrected model name to be plural
