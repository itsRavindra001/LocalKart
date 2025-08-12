const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/authController');
const Booking = require('../models/Booking');
const User = require('../models/User');

// 📌 Get bookings for a logged-in provider
router.get('/provider/:providerId', authenticateToken, async (req, res) => {
  try {
    const { providerId } = req.params;

    if (req.user?.id !== providerId) {
      return res.status(403).json({ error: 'Forbidden: Not your bookings' });
    }

    const bookings = await Booking.find({ providerId })
      .populate('clientId', 'name email phone address')
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('❌ Fetch provider bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch provider bookings' });
  }
});

// 📌 Submit booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('📥 Incoming booking request:', req.body);
    console.log('👤 Authenticated user:', req.user);

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID from token' });
    }

    const { providerId, service, date, address } = req.body;

    if (!providerId || !service || !date || !address) {
      return res.status(400).json({ error: 'Missing required fields (providerId, service, date, address)' });
    }

    // Ensure provider exists
    const provider = await User.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      return res.status(404).json({ error: 'Provider not found or invalid role' });
    }

    const booking = new Booking({
      service,
      date,
      address,
      providerId,
      clientId: userId
    });

    await booking.save();
    console.log('✅ Booking saved:', booking._id);

    res.status(201).json({ message: 'Booking saved', booking });
  } catch (err) {
    console.error('❌ Booking save error:', err);
    res.status(500).json({ error: err.message || 'Failed to save booking' });
  }
});

// 📌 Get bookings for a specific username
router.get('/:username', authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const bookings = await Booking.find({ clientId: user._id })
      .populate('providerId', 'name email serviceType');

    res.json(bookings);
  } catch (err) {
    console.error('❌ Fetch bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;
