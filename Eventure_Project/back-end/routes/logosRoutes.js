const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "logos/"); // Folder where the uploaded logos will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adding a timestamp to ensure uniqueness
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Route to handle uploading logos
router.post("/upload-logo", upload.single("logo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a logo file." });
  }
  // Return the URL of the uploaded file
  res.status(200).json({ message: "Logo uploaded successfully", logoUrl: `/logos/${req.file.filename}` });
});

module.exports = router;
