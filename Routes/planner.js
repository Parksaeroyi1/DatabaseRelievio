const express = require('express');
const router = express.Router();
const Result = require('../Models/resultModel');

// POST to get filtered results based on symptoms/body parts
router.post('/filter', async (req, res) => {
  try {
    const { symptoms, bodyParts } = req.body;

    // Example: find results matching symptoms and body parts
    const results = await Result.find({
      symptoms: { $in: symptoms },
      body: { $in: bodyParts }
    }).populate('recommendations symptoms body');

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
