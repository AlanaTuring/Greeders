const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
