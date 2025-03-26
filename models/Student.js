const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Keep password field
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);