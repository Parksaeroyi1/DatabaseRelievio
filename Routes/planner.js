const express = require('express');
const router = express.Router();
const Result = require('../Models/resultModel');

router.post('/filter', async (req, res) => {
  try {
    const { symptoms, bodyParts } = req.body;

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
