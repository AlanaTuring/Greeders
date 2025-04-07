const express = require('express');
const router = express.Router();
const Society = require('../models/Society');
const Event = require('../models/Event');
const Organizer = require('../models/Organizer');

// ✅ Create a new society
router.post('/', async (req, res) => {
  try {
    const society = new Society(req.body);
    const savedSociety = await society.save();
    res.status(201).json(savedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all societies
router.get('/', async (req, res) => {
  try {
    const societies = await Society.find().populate('events').populate('organizers');
    res.status(200).json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a specific society by ID
router.get('/:id', async (req, res) => {
  try {
    const society = await Society.findById(req.params.id)
      .populate('events')
      .populate('organizers');

    if (!society) return res.status(404).json({ message: 'Society not found' });

    res.status(200).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add an existing event to a society
router.post('/:id/add-event', async (req, res) => {
  try {
    const { eventId } = req.body;
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ message: 'Society not found' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (society.events.includes(eventId)) {
      return res.status(400).json({ message: 'Event already added to this society' });
    }

    society.events.push(eventId);
    await society.save();
    res.status(201).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add an existing organizer to a society
router.post('/:id/add-organizer', async (req, res) => {
  try {
    const { organizerId } = req.body;
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ message: 'Society not found' });

    const organizer = await Organizer.findById(organizerId);
    if (!organizer) return res.status(404).json({ message: 'Organizer not found' });

    if (society.organizers.includes(organizerId)) {
      return res.status(400).json({ message: 'Organizer already added to this society' });
    }

    society.organizers.push(organizerId);
    await society.save();
    res.status(201).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a specific society
router.put('/:id', async (req, res) => {
  try {
    const updatedSociety = await Society.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSociety) return res.status(404).json({ message: 'Society not found' });

    res.status(200).json(updatedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
