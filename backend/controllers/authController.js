const Booking = require('../models/Booking');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ───────────── Signup ─────────────
exports.signup = async (req, res) => {
  try {
    const { name, username, email, dob, password, role } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      dob,
      password: hashedPassword,
      role: role === 'provider' ? 'provider' : 'client', // Only 'provider' or 'client' allowed here
    });

    await user.save();

    // Remove password from response
    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({ message: 'User created successfully', user: safeUser });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(400).json({ error: err.message });
  }
};

// ───────────── Login ─────────────
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token with role included
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Prepare safe user object for response
    const safeUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json({ message: 'Login successful', user: safeUser, token });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Middleware helper to extract user from JWT token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.cookies.token;
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id and role
    next();
  } catch (err) {
    console.error('❌ Token verification error:', err);
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

// ───────────── Submit Booking ─────────────
exports.submitBooking = async (req, res) => {
  try {
    // User id comes from the authenticateToken middleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }

    const newBooking = new Booking({
      ...req.body,
      userId, // Attach user ID from token
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
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ Profile fetch error:', err);
    res.status(500).json({ error: 'Profile fetch error' });
  }
};

// ───────────── Get All Bookings ─────────────
exports.getBookings = async (req, res) => {
  try {
    // Optional: you can limit bookings based on user role or user ID
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    console.error('❌ Get bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
