const mongoose = require("mongoose");

const providerApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  city: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProviderApplication", providerApplicationSchema);
