const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },       // ✅ Added
    address: { type: String },     // ✅ Added
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['client', 'provider', 'admin'],
      required: true,
    },
    serviceType: {
      type: String,
      enum: [
        'AC Repair',
        'Electrician',
        'Plumbing',
        'Salon at Home',
        'House Cleaning',
        'Painting',
        'Carpentry',
        'Groceries',
        'Tutors',
        'Tailors',
      ],
      required: function () {
        return this.role === 'provider';
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
