const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Allow sending cookies (if needed)
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRoutes);        // Login/Signup/Profile
app.use('/api/bookings', bookingRoutes); // Public booking submission route

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });
