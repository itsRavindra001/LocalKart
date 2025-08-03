const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Add this line
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'provider'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
