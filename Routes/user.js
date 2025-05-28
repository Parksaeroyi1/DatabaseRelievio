const express = require('express');
const router = express.Router();
const User = require('../Model/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /users/email/:email/planner - Get planner data for a user by email
router.get('/email/:email/planner', async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email }, 'planner'); // only return planner field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ planner: user.planner });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name, email: user.email, planner: user.planner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { email, name, planner } = req.body;

  try {
    // Check if email already exists

    // Create new user (triggers password hash via schema pre-save)
    const newUser = new User({
      email,
      name,
      planner
    });

    await newUser.save();

    // You can return the new user or just a success message
    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PATCH /users/email/:email/planner - Add planner item to user by email
router.patch('/email/:email/planner', async (req, res) => {
  const email = req.params.email;
  const { stretches, massage } = req.body;

  if (!stretches && !massage) {
    return res.status(400).json({ message: 'At least one of stretchs or massage is required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          planner: { stretches, massage }
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Planner item added', planner: updatedUser.planner });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.patch('/email/:email/planner/:id', async (req, res) => {
  const { email, id } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email, 'planner._id': id },
      {
        $set: {
          'planner.$.done': true
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User or planner item not found' });
    }

    res.json({
      message: 'Planner item updated',
      planner: updatedUser.planner
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



module.exports = router;


