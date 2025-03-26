const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = 'uploads/';
const Student = require('../models/Student');
const Organizer = require('../models/Organizer');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const [studentExists, organizerExists] = await Promise.all([
            Student.findOne({ email }),
            Organizer.findOne({ email })
        ]);

        if (studentExists || organizerExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user;
        if (role === 'student') {
            user = new Student({
                name,
                email,
                password: hashedPassword
            });
        } else {
            user = new Organizer({
                name,
                email,
                password: hashedPassword
            });
        }

        await user.save();

        const activationLink = `http://localhost:5001/api/auth/activate/${user._id}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Account Activation',
            text: `Click the following link to activate your account: ${activationLink}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            msg: 'Registration successful! Please login.',
            userType: role
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            msg: 'Registration failed',
            error: err.message 
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!['student', 'organizer'].includes(role)) {
            return res.status(400).json({ msg: 'Invalid role selected' });
        }
        if (!password) {
            return res.status(400).json({ msg: 'Password is required' });
        }
        const Model = role === 'student' ? Student : Organizer;
        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                msg: role === 'student' ? 'Student not found' : 'Organizer not found'
            });
        }
        if (!user.password) {
            return res.status(500).json({ msg: 'User password not set in database' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        req.session.user = {
            id: user._id,
            email: user.email,
            role,
            name: user.name,
            collection: role
        };
        const redirectUrl = role === 'student' ? '/student-dashboard' : '/organizer-dashboard';
        res.json({ 
            msg: 'Login successful! Cannot get home page yet.',
            redirect: redirectUrl,
            user: { id: user._id, name: user.name, email: user.email, role }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ msg: 'Server error during login', error: err.message });
    }
});

router.post('/update-profile', upload.single('profilePicture'), async (req, res) => {
    const { email, password, ...updateData } = req.body;
    
    try {
        if (!req.session.user) {
            return res.status(401).json({ msg: 'Not authenticated' });
        }

        const Model = req.session.user.role === 'student' ? Student : Organizer;
        const user = await Model.findOne({ email });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect password, profile not updated.' });
        }

        if (req.file) {
            updateData.profilePicture = `/uploads/${req.file.filename}`;
        }

        await Model.findByIdAndUpdate(user._id, updateData);
        res.status(200).json({ msg: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

router.delete('/delete', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!req.session.user) {
            return res.status(401).json({ msg: 'Not authenticated' });
        }

        const Model = req.session.user.role === 'student' ? Student : Organizer;
        const user = await Model.findOne({ email });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        await Model.deleteOne({ _id: user._id });
        res.status(200).json({ msg: 'Account deleted successfully!' });
    } catch (err) {
        console.error('Error during account deletion:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Password reset route (send email)
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        let user = await Student.findOne({ email });
        let role = 'student';
        if (!user) {
            user = await Organizer.findOne({ email });
            role = 'organizer';
        }
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const resetLink = `http://localhost:5001/api/auth/reset-password/${user._id}?role=${role}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending password reset email:', error);
                return res.status(500).json({ msg: 'Server error', error: error.message });
            }
            res.status(200).json({ msg: 'Password reset email sent' });
        });
    } catch (err) {
        console.error('Error during password reset request:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Serve reset password form
router.get('/reset-password/:id', (req, res) => {
    const userId = req.params.id;
    const filePath = path.join(__dirname, '../public/reset-password.html');
    console.log('Serving reset-password.html from:', filePath); // Debugging log
    res.sendFile(filePath);
});

// Handle password reset
router.post('/reset-password/:id', async (req, res) => {
    const { password } = req.body;
    const { role } = req.query;
    try {
        const Model = role === 'student' ? Student : Organizer;
        let user = await Model.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid reset link' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error('Error during password reset:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;