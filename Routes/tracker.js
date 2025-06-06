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

// In your tracker routes file

router.get('/stats/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Get all tracker items for this user done within the last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
      const stretchesDoneThisWeek = await Tracker.countDocuments({
        userId,
        done: true,
        completedAt: { $gte: oneWeekAgo }
      });
  
      // Calculate streak (number of consecutive days with done stretches)
      // This logic depends on how you store your sessions; simplified example:
      const sessions = await Tracker.find({ userId, done: true }).sort({ completedAt: -1 });
  
      let streak = 0;
      let currentDate = new Date();
      currentDate.setHours(0,0,0,0);
  
      for (let session of sessions) {
        const sessionDate = new Date(session.completedAt);
        sessionDate.setHours(0,0,0,0);
  
        const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24));
  
        if (diffDays === streak) {
          streak += 1;
        } else if (diffDays > streak) {
          break; // streak broken
        }
      }
  
      res.json({ stretchesDoneThisWeek, streak });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error fetching stats' });
    }
  });
  





GET /:userId - get user's tracked items
POST /schedule - add to calendar
PUT /:id/complete - mark as done
DELETE /:id - remove from calendar