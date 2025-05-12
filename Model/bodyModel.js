const mongoose = require('mongoose');

const bodySchema = mongoose.Schema({

    name: { 
        
        type: String, 
        required: true, 
        unique: true 
    }

});

const Body = mongoose.model('body', bodySchema);
module.exports = Body;
