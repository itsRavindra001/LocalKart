const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const Booking = require('../models/Booking');

// ✅ Protected POST route for creating bookings
router.post('/', authenticate, async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      userId: req.user.id, // Comes from token via middleware
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

module.exports = router;
