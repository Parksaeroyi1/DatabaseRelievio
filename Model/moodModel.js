const mongoose = require('mongoose');

const moodsSchema = mongoose.Schema({

    name: {
         
        type: String, 
        required: true, 
        unique: true 
    },
    


});

const Moods = mongoose.model('moods', moodsSchema);
module.exports = Moods;