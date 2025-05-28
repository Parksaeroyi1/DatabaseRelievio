const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  result: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Result', 
    required: true 
  },
  scheduledDate: { 
    type: Date, 
    required: true 
  }, // When user wants to do the stretch
  completedDate: { 
    type: Date, 
    default: null 
  }, // When user actually completed it
  isCompleted: { 
    type: Boolean, 
    default: false 
  }, // Whether it's done or not
  createdAt: { 
    type: Date, 
    default: Date.now 
  } // When this tracker entry was created
});

const Tracker = mongoose.model('Tracker', trackerSchema);
module.exports = Tracker;