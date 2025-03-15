const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/organizers", require("./routes/organizerRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/clubs", require("./routes/ClubRoutes"));
app.use("/api/societies", require("./routes/societyRoutes"));  // New route for societies
app.use("/api/faculties", require("./routes/facultyRoutes"));  // New route for faculties

// Add the upload route for logos here
app.use("/api", require("./routes/logosRoutes")); // This line connects the upload route
// Serve static files from the "logos" folder
app.use("/logos", express.static(path.join(__dirname, "logos")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

