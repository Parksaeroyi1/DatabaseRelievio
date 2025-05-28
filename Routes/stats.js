const express = require('express');
const router = express.Router();
const Stats = require('../Models/statsModel');
const { verifyToken } = require('../middleware/auth');

// Verify token and extract user ID
router.use(verifyToken);

// Check if user stats exist
router.use(async (req, res, next) => {
    const userId = req.userId;
    try {
        const stats = await Stats.findById(userId);
        if (!stats) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = stats;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET /stats/:userId - Return the stats for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    // Optional: Ensure the user is accessing only their own data
    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const stats = await Stats.findById(userId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

// PUT /stats/:userId - Update the stats
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;

    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const updatedStats = await Stats.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        res.json(updatedStats);
    } catch (error) {
        res.status(500).json({ message: 'Error updating stats' });
    }
});

module.exports = router;


