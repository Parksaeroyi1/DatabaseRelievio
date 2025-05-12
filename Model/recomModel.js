const mongoose = require('mongoose');

const recommendationsSchema = new mongoose.Schema({
  
  title: { 

  type: String, 
  required: true },
  
  description: String

});

const Recommendations = mongoose.model('recommendations', recommendationsSchema);
module.exports = Recommendations;
