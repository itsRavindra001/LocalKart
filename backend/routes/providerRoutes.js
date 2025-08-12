const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');

// ✅ GET all providers or filter by service
router.get('/', async (req, res) => {
  try {
    const { service } = req.query; // Example: ?service=AC%20Repair
    let query = { role: 'provider' }; // Assuming you have a 'role' field to separate providers from clients

    if (service) {
      query.serviceType = service; // Match exact service type
      // OR case-insensitive match:
      // query.serviceType = new RegExp(`^${service}$`, 'i');
    }

    const providers = await User.find(query).select('_id username serviceType');
    res.json(providers);
  } catch (err) {
    console.error('Error fetching providers:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET bookings for a provider by username
router.get('/bookings/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const provider = await User.findOne({ username });
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const bookings = await Booking.find({ providerId })
  .populate('clientId', 'name email phone address') // ✅ matches your schema
  .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching provider bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
