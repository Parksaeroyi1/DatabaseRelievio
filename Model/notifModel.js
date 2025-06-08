const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    daysOfWeek: {
        type: [Number],
        default: [1, 2, 3, 4, 5] 
    }
    }, { timestamps: true });


