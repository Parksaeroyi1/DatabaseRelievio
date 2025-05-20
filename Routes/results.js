const express = require('express');
const router = express.Router();
const Result = require('../Model/resultsModel');

router.post('/', async (req, res) => {
  try {
    const { symptoms, bodyParts, recommendations } = req.body;
    const result = new Result({ symptoms, bodyParts, recommendations });
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const results = await Result.find()
      .populate('symptoms')
      .populate('body')
      .populate('recommendations');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
