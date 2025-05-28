const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// Import routes
const symptomsRouter = require('./Routes/symptoms.js');
const bodyRouter = require('./Routes/body.js');
const recommendationsRouter = require('./Routes/recommendations.js');
const resultsRouter = require('./Routes/results.js');
const userRouter = require('./Routes/user.js');
const authRouter = require('./Routes/auth.js');

const app = express();
const PORT = 8000;

app.use(cors()); // allow CORS for frontend requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
  });

// Use routes with prefixes
app.use('/api/symptoms', symptomsRouter);
app.use('/api/body', bodyRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/results', resultsRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


// Connect to MongoDB and start server
mongoose.connect('mongodb+srv://Admin:qwdUtbbxfat7Jx1o@database.vopkyp9.mongodb.net/relievio?retryWrites=true&w=majority&appName=Database')

.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Node is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

