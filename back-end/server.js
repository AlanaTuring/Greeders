require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// Import Routes
const eventRoutes = require('./routes/eventRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const studentRoutes = require('./routes/studentRoutes');
const clubRoutes = require('./routes/ClubRoutes');
const profileRoute = require("./routes/profile");
const authRoutes = require('./routes/auth');
const societyRoutes = require('./routes/societyRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const bookmarkRoutes = require('./routes/bookmarks');


const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL, // Frontend URL
  credentials: true
}));

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API Routes
app.use('/api/events', eventRoutes); // Events route
app.use('/api/organizers', organizerRoutes); // Organizer routes
app.use('/api/students', studentRoutes);
app.use('/api/clubs', clubRoutes); // Club routes
app.use('/api/profile', profileRoute); // Profile routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/societies', societyRoutes); // Societies routes
app.use('/api/faculties', facultyRoutes); // Faculties routes
app.use('/api/bookmarks', bookmarkRoutes); // ✅ ADD THIS LINE

// // Serve React in production (if applicable)
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../front-end/build'))); // Static files from build
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../front-end/build/index.html')); // Catch-all route for React
//   });
// } else {
//   // Serve static files in development (if applicable)
//   app.use(express.static(path.join(__dirname, '../front-end/public')));
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
//   });
//   app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, '../front-end/public/signup.html'));
//   });
//   app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../front-end/public/login.html'));
//   });
// }

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
