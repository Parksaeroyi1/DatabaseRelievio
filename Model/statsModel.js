const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true // Each user has only one stats record
  },
  dailyStreak: { 
    type: Number, 
    default: 0 
  }, // Current consecutive days of activity
  weeklyCount: { 
    type: Number, 
    default: 0 
  }, // Stretches completed this week
  lastActivityDate: { 
    type: Date, 
    default: null 
  }, // Last day user completed a stretch
  totalCompleted: { 
    type: Number, 
    default: 0 
  }, // Total stretches completed ever
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
statsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;