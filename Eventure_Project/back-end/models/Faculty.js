const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  events: [
    {
      eventName: { type: String, required: true },
      date: { type: Date, required: true },
      location: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Faculty", facultySchema);
