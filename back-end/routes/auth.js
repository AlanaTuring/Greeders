const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config(); 

const Student = require('../models/Student'); // Import the Student model
const Organizer = require('../models/Organizer'); // Import the Organizer model
const router = express.Router();



const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Enable CORS with credentials
const corsOptions = {
  origin: process.env.CLIENT_URL,  // Make sure this matches your React frontend URL
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
// Student Login (with JWT token)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email belongs to a student
    let student = await Student.findOne({ email });

    if (student) {
      console.log("Logged in as student:", student.email);

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Create JWT token for student (no managing field for students)
      const token = jwt.sign(
        {
          id: student._id,
          email: student.email,
          role: 'student',
        },
        process.env.JWT_SECRET || 'supersecretjwtkey',
        { expiresIn: '1d' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        role: 'student',
      });
    }

    // Check if the email belongs to an organizer
    let organizer = await Organizer.findOne({ email });

    if (organizer) {
      console.log("Logged in as organizer:", organizer.email);
      console.log("Organizer managing clubId:", organizer.managing);


      const isMatch = await bcrypt.compare(password, organizer.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Create JWT token for organizer
      const token = jwt.sign(
        {
          id: organizer._id,
          email: organizer.email,
          role: 'organizer',
          managing: organizer.managing._id
        },
        process.env.JWT_SECRET || 'supersecretjwtkey',
        { expiresIn: '1d' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        role: 'organizer',
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


router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await Student.findOne({ email }) || await Organizer.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' }); // ✅ return JSON here
    }

    const role = user.role || (user instanceof Organizer ? 'organizer' : 'student');
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${user._id}?role=${role}&token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Eventure" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Eventure Password Reset",
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ msg: "Reset link sent!" }); // ✅ successful JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' }); // ✅ JSON error response
  }
});

// Reset Password: Validate token and update password
router.post('/reset-password/:id', async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const { role, token } = req.query;

  try {
    let user = role === 'organizer'
      ? await Organizer.findById(id)
      : await Student.findById(id);

    if (!user || user.resetToken !== token || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    user.password = password; // Will be auto-hashed by the .pre('save') hook
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;
