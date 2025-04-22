const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
