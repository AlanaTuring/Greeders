require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes'); // Adjust this import if necessary
const organizerRoutes = require('./routes/organizerRoutes'); // Add this for organizer routes if necessary
const clubRoutes = require('./routes/ClubRoutes'); // Add this import for club routes

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration - Make sure to allow the frontend port (5173)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/organizers', organizerRoutes); // Add this line for the organizer routes if needed
app.use('/api/clubs', clubRoutes); // Add this line to link the clubRoutes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
