const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({


  email: { 

    type: String, 
    unique: true, 
    required: true },

  name: {
       
      type: String, 
      required: true, 
      unique: true 

  },
  password: { 

    type: String, 
    required: true 
  
  },

  streak: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  expoPushToken: {
    type: String,
    default: null,
  },

  planner: [
    {
      stretches: { type: String },
      massage: { type: String },
      done: { type: Boolean, default: false },
    }
  ],
  default: [], // <- This ensures planner defaults to empty array

});

const User = mongoose.model('user', userSchema);
module.exports = User;