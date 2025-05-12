const express = require('express'); 
const mongoose = require('mongoose');
const Symptom = require('./Model/sympModel.js');
const Body = require('./Model/bodyModel.js');
const Recommendation = require('./Model/recomModel.js');
const Result = require('./Model/resultsModel.js');

const app = express();
const PORT = 8000;

app.use(express.json());

// GET all symptoms


app.post('/symptoms', async (req, res) => {
    try {
      // If you are sending multiple symptoms in an array
      const symptoms = await Symptom.insertMany(req.body);
      console.log(symptoms); // Log the inserted symptoms for debugging
      res.status(201).json(symptoms);
    } catch (err) {
      console.error(err); // Log any error for debugging
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/symptoms', async (req, res) => {
    try {
      const symptoms = await Symptom.find();
      res.status(200).json(symptoms);
    } catch (err) {
      console.error(err); // Log any error for debugging
      res.status(400).json({ error: err.message });
    }
  });
  
  
  

// GET all body parts
app.get('/body', async (req, res) => {
    try {
        const bodyParts = await Body.find();
        res.json(bodyParts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all recommendations
app.get('/recommendations', async (req, res) => {
    try {
        const recommendations = await Recommendation.find();
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new result
app.post('/results', async (req, res) => {
    try {
        const { symptoms, bodyParts, recommendations } = req.body;

        const result = new Result({
            symptoms,
            bodyParts,
            recommendations
        });

        await result.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Connect to MongoDB and start server
mongoose.connect('mongodb+srv://Admin:qwdUtbbxfat7Jx1o@database.vopkyp9.mongodb.net/?retryWrites=true&w=majority&appName=Database')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Node is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

