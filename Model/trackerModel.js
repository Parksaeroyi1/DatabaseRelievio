const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  date: { type: Date, default: Date.now },

  result: { type: mongoose.Schema.Types.ObjectId, ref: 'Result' }, // The stretch/massage combo from symptoms + body

  note: { type: String, default: '' }
});

const Tracker = mongoose.model('Tracker', trackerSchema);
module.exports = Tracker;

