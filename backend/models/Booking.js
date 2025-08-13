// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // Client making the booking
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },

    // Provider receiving the booking
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Provider ID is required']
    },

    // Client details
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required']
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      required: [true, 'Email is required']
    },

    phone: {
      type: String,
      match: [/^\d{10,15}$/, 'Please enter a valid phone number'],
      required: [true, 'Phone is required']
    },

    // Booking details
    service: {
      type: String,
      required: [true, 'Service is required']
    },

    date: {
      type: Date,
      required: [true, 'Date is required']
    },

    address: {
      type: String,
      trim: true,
      required: [true, 'Address is required']
    },

    price: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

// 🚫 Prevent booking in the past
bookingSchema.pre('validate', function (next) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (this.date && this.date < today) {
    return next(new Error('Booking date cannot be in the past'));
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
