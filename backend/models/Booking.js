const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  address: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Add this
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
