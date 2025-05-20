const express = require('express');
const router = express.Router();
const Body = require('../Model/bodyModel');

router.get('/', async (req, res) => {
  try {
    const bodyParts = await Body.find();
    res.status(200).json(bodyParts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
