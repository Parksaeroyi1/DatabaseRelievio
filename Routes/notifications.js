const express = require('express');
const router = express.Router();
const Notification = require('../Models/notificationModel');
const User = require('../Models/userModel');
const { verifyToken } = require('../middleware/auth');
const { sendNotification } = require('../utils/notificationService');

// Middleware to verify token and extract user ID
router.use(verifyToken);
// Middleware to check if user exists
router.use(async (req, res, next) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
});
// Middleware to check if notification settings exist

router.use(async (req, res, next) => {
    

})






GET /:userId - get notification settings
PUT /:userId - update notification settings