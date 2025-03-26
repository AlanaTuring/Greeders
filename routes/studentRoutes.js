const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      favorites: [],
      createdAt: Date.now()
    });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate('favorites');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('favorites');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/favorites", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const eventId = req.body.eventId;
    if (!student.favorites.includes(eventId)) {
      student.favorites.push(eventId);
      await student.save();
      res.status(200).json(student);
    } else {
      res.status(400).json({ message: "Event already in favorites" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id/favorites/:eventId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const eventId = req.params.eventId;
    const index = student.favorites.indexOf(eventId);

    if (index > -1) {
      student.favorites.splice(index, 1);
      await student.save();
      res.status(200).json(student);
    } else {
      res.status(400).json({ message: "Event not found in favorites" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;