const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const User = require('./models/User'); // Import User model
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRoutes);        // Login/Signup/Profile
app.use('/api/bookings', bookingRoutes); // Public booking submission route

// ✅ Function to create default admin if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Super Admin',
        username: 'admin',
        email: 'admin@localkart.com',
        dob: '1990-01-01',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Default admin created: admin / admin123');
    } else {
      console.log('ℹ️ Admin account already exists.');
    }
  } catch (err) {
    console.error('❌ Error creating default admin:', err.message);
  }
};

// ✅ MongoDB Connection & Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await createDefaultAdmin(); // Ensure admin is created before starting server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });
