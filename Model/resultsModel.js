const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'symptoms' }],
    body: [{ type: mongoose.Schema.Types.ObjectId, ref: 'body' }],
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recommendations' }],
    createdAt: { type: Date, default: Date.now }
  });
  
  const Result = mongoose.model('Result', resultSchema);
  module.exports = Result;