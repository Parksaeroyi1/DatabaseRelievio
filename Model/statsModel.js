const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  dailyStreak: { 
    type: Number, 
    default: 0 
  }, 
  weeklyCount: { 
    type: Number, 
    default: 0 
  }, 
  lastActivityDate: { 
    type: Date, 
    default: null 
  }, 
  totalCompleted: { 
    type: Number, 
    default: 0 
  }, 
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
