const express = require('express');
const router = express.Router();
const Tracker = require('../Models/trackerModel');
const { verifyToken } = require('../middleware/auth');
const User = require('../Models/userModel');
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


})

// Middleware to check if tracker settings exist

router.use(async (req, res, next) => {
    const userId = req.userId;
    const tracker = await Tracker.findById(userId);
    if (!tracker) {
        return res.status(404).json({ message: 'Tracker settings not found' });
    }
    req.tracker = tracker;
    next();
})

// Middleware to check if notification settings exist 

router.use(async (req, res, next) => {
    const userId = req.userId;
    const notification = await Notification.findById(userId);
    if (!notification) {
        return res.status(404).json({ message: 'Notification settings not found' });
    }
    req.notification = notification;
    next();
})

// Middleware to check if user has notifications enabled

router.use(async (req, res, next) => {
    const userId = req.userId;
    const notification = await Notification.findById(userId);
    if (!notification.enabled) {
        return res.status(404).json({ message: 'Notifications are disabled' });
    }
    req.notification = notification;
    next();
})




GET /:userId - get user's tracked items
POST /schedule - add to calendar
PUT /:id/complete - mark as done
DELETE /:id - remove from calendar