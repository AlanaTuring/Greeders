const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');

const Student = require('../models/Student'); // Import the Student model
const Organizer = require('../models/Organizer'); // Import the Organizer model
const router = express.Router();

// Enable CORS with credentials
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
router.use(cors(corsOptions));

// Set up express-session
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
}));

// Student Registration (Sign-Up)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Create a new student without manually hashing the password
    const newStudent = new Student({
      name,
      email,
      password, // Leave the password plain, so the pre-save hook handles hashing
      role,
    });

    await newStudent.save();

    res.status(201).json({ msg: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'An error occurred. Please try again.' });
  }
});

// Student Login (with JWT token)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email belongs to a student
    let student = await Student.findOne({ email });

    if (student) {
      // Student Login Logic
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Create JWT token for student
      const token = jwt.sign(
        { id: student._id, email: student.email, role: student.role },
        process.env.JWT_SECRET || 'supersecretjwtkey',
        { expiresIn: '1d' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
      });
    }

    // Check if the email belongs to an organizer
    let organizer = await Organizer.findOne({ email });

    if (organizer) {
      // Organizer Login Logic
      const isMatch = await bcrypt.compare(password, organizer.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Create JWT token for organizer
      const token = jwt.sign(
        { id: organizer._id, email: organizer.email, role: organizer.role },
        process.env.JWT_SECRET || 'supersecretjwtkey',
        { expiresIn: '1d' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch Organizer by Email
router.get('/organizer/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const organizer = await Organizer.findOne({ email });

    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.json(organizer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logout successful' });
  });
});

module.exports = router;
