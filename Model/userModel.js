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

  profilePicture: {

    type: String,

  },

  planner: [
    {
      stretches: { type: String },
      massage: { type: String },
      done: { type: Boolean, default: false },
    }
  ],
  


});

const User = mongoose.model('user', userSchema);
module.exports = User;