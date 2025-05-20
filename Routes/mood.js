const express = require('express');
const router = express.Router();
const Mood = require('../Model/moodModel');

// GET all moods
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new mood
router.post('/', async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
