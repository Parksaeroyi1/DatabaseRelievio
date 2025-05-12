const mongoose = require('mongoose');

const symptomsSchema = mongoose.Schema({

    name: {
         
        type: String, 
        required: true, 
        unique: true 
    },


});

const Symptoms = mongoose.model('symptoms', symptomsSchema);
module.exports = Symptoms;