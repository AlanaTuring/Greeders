const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Encrypt password before saving
studentSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare input password with stored hashed password
studentSchema.methods.comparePassword = function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
