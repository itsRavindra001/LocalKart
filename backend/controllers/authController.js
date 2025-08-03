const Booking = require('../models/Booking');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ───────────── Signup ─────────────
exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ───────────── Login ─────────────
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔐 Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ───────────── Submit Booking ─────────────
exports.submitBooking = async (req, res) => {
  try {
    const userId = req.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }

    const newBooking = new Booking({
      ...req.body,
      userId, // ✅ Attach user ID from token
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking saved', booking: newBooking });
  } catch (err) {
    console.error('❌ Booking save error:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
};

// ───────────── Get Profile ─────────────
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id || req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Profile fetch error' });
  }
};

// ───────────── Get All Bookings ─────────────
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
