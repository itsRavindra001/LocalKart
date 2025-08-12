// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  }, // Client making the booking
  
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Provider ID is required'] 
  }, // Provider receiving the booking

  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },

  email: { 
    type: String, 
    required: [true, 'Email is required'] 
  },

  phone: { 
    type: String, 
    required: [true, 'Phone is required'] 
  },

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
    required: [true, 'Address is required'] 
  },

  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
