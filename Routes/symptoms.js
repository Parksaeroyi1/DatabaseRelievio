const express = require('express');
const router = express.Router();
const Symptom = require('../Model/sympModel.js');

router.get('/', async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
