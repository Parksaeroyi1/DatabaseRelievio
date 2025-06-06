const express = require('express');
const router = express.Router();
const Stats = require('../Models/statsModel');
const verifyToken = require('../middleware/auth'); // fix destructure

// 🟢 Public Route - No Auth
router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const stats = await Stats.findOne({ email });

    if (!stats) {
      return res.status(404).json({ message: 'Stats not found' });
    }

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

// 🔒 Protected Routes
router.use(verifyToken);

// Attach user info
router.use(async (req, res, next) => {
  try {
    const stats = await Stats.findById(req.userId);
    if (!stats) {
      return res.status(404).json({ message: 'Stats not found for user' });
    }
    req.user = stats;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error in user middleware' });
  }
});

// GET /stats
router.get('/', async (req, res) => {
  res.json(req.user); // Reuse loaded stats
});

// PUT /stats/:userId
router.put('/:userId', async (req, res) => {
  if (req.userId !== req.params.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const updatedStats = await Stats.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedStats);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stats' });
  }
});

module.exports = router;
