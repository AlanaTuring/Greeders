const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const profileRoute = require("./routes/profile");



dotenv.config();

const app = express();

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => {
  console.error('MongoDB Atlas connection error:', err);
  process.exit(1);
});

// Serve static files
app.use(express.static(path.join(__dirname, '../front-end/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/public/signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/public/login.html'));
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/organizers', require('./routes/organizerRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/clubs', require('./routes/ClubRoutes'));
app.use('/api/societies', require('./routes/societyRoutes'));
app.use('/api/faculties', require('./routes/facultyRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use("/api/profile", profileRoute);

app.get('/api/auth/check-session', (req, res) => {
  if (req.session.student) {
    res.json({ success: true, student: req.session.student });
  } else {
    res.json({ success: false, message: 'No session found' });
  }
});

// Serve React in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found!');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
