const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  club: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Club", 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  form: { 
    type: String 
  },
});

module.exports = mongoose.model("Event", eventSchema);
