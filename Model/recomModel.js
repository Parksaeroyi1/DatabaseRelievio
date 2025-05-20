const mongoose = require('mongoose');

const recommendationsSchema = new mongoose.Schema({
  
  name: {
         
    type: String, 
    required: true, 
    unique: true 
  },
  videoUrl: {                
    type: String,
    required: false         
  }

});

const Recommendations = mongoose.model('recommendations', recommendationsSchema);
module.exports = Recommendations;
