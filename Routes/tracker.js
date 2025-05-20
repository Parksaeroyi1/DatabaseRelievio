const express = require('express');
const router = express.Router();
const Tracker = require('../Models/trackerModel');

// GET all tracker entries for a user (add auth middleware for real use)
router.get('/:userId', async (req, res) => {
  try {
    const trackers = await Tracker.find({ user: req.params.userId });
    res.json(trackers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new tracker entry
router.post('/', async (req, res) => {
  try {
    const tracker = new Tracker(req.body);
    await tracker.save();
    res.status(201).json(tracker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
