const Booking = require('../models/Booking');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* ───────────── Signup ───────────── */
exports.signup = async (req, res) => {
  try {
    const { name, username, email, dob, password, role, serviceType } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already taken' });
    }

    if (role === 'provider' && !serviceType) {
      return res.status(400).json({ error: 'Service type is required for providers' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      dob,
      password: hashedPassword,
      role: role === 'provider' ? 'provider' : 'client',
      serviceType: role === 'provider' ? serviceType : undefined
    });

    await user.save();

    const { password: _, ...safeUser } = user.toObject();
    res.status(201).json({ message: 'User created successfully', user: safeUser });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(400).json({ error: err.message });
  }
};

/* ───────────── Login ───────────── */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role, serviceType: user.serviceType },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const safeUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      serviceType: user.serviceType || null
    };

    res.json({ message: 'Login successful', user: safeUser, token });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/* ───────────── Middleware ───────────── */
exports.authenticateToken = (req, res, next) => {
  const rawAuth = req.headers['authorization'] || req.cookies.token;
  const token = rawAuth && rawAuth.startsWith('Bearer ')
    ? rawAuth.split(' ')[1]
    : rawAuth;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id || decoded._id || decoded.userId || null,
      role: decoded.role || null,
      serviceType: decoded.serviceType || null
    };

    if (!req.user.id) {
      console.warn('⚠️ Token verified but missing user ID:', decoded);
    }

    next();
  } catch (err) {
    console.error('❌ Token verification error:', err);
    return res.status(401).json({ error: 'Token is not valid or expired' });
  }
};

/* ───────────── Submit Booking ───────────── */
exports.submitBooking = async (req, res) => {
  try {
    console.log('📥 Booking request body:', req.body);
    console.log('👤 Authenticated user:', req.user);

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }

    const { service, date, address } = req.body;
    if (!service || !date || !address) {
      return res.status(400).json({ error: 'Missing required fields (service, date, address)' });
    }

    // Find the provider offering this service
    const provider = await User.findOne({ role: 'provider', serviceType: service });
    if (!provider) {
      return res.status(404).json({ error: 'No provider found for this service' });
    }

    const newBooking = new Booking({
      service,
      date,
      address,
      clientId: userId,         // store as clientId (consistent naming)
      providerId: provider._id
    });

    await newBooking.save();
    console.log('✅ Booking saved with ID:', newBooking._id);

    res.status(201).json({ message: 'Booking saved', booking: newBooking });
  } catch (err) {
    console.error('❌ Booking save error:', err);
    res.status(500).json({ error: err.message || 'Failed to save booking' });
  }
};

/* ───────────── Get Profile ───────────── */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('❌ Profile fetch error:', err);
    res.status(500).json({ error: 'Profile fetch error' });
  }
};

/* ───────────── Get All Bookings (Admin) ───────────── */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('clientId', 'name email')
      .populate('providerId', 'name email serviceType');

    res.json(bookings);
  } catch (err) {
    console.error('❌ Get bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

/* ───────────── Get Provider's Bookings ───────────── */
exports.getProviderBookings = async (req, res) => {
  try {
    const { username } = req.params;

    const provider = await User.findOne({ username, role: 'provider' });
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const bookings = await Booking.find({ providerId: provider._id })
      .populate('clientId', 'name email phone address')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('❌ Error fetching provider bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
