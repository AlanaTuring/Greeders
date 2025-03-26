require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes'); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('Failed to connect to MongoDB:', err));

// API Routes
app.use('/api/events', eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
