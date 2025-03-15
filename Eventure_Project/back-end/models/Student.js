const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event" // Reference to the Event collection
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);
