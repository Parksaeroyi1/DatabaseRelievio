const express = require('express');
const router = express.Router();
const Recommendation = require('../Model/recomModel.js');

// GET all recommendations
router.get('/', async (req, res) => {
  try {
    const recoms = await Recommendation.find();
    res.json(recoms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new recommendation
router.post('/', async (req, res) => {
  try {
    const recom = new Recommendation(req.body);
    await recom.save();
    res.status(201).json(recom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
