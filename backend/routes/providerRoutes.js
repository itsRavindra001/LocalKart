const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const ProviderApplication = require("../models/ProviderApplication");
const bcrypt = require("bcrypt");

/**
 * ✅ GET all approved providers
 * Optionally filter by service type (?service=AC%20Repair)
 */
router.get("/", async (req, res) => {
  try {
    const { service } = req.query;
    let query = { role: "provider" };

    if (service) {
      query.serviceType = new RegExp(`^${service}$`, "i"); // case-insensitive
    }

    const providers = await User.find(query).select(
      "_id username name email serviceType rating experience"
    );

    res.json(providers);
  } catch (err) {
    console.error("Error fetching providers:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ GET bookings for a provider by username
 */
router.get("/bookings/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const provider = await User.findOne({ username, role: "provider" });
    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const bookings = await Booking.find({ providerId: provider._id })
      .populate("clientId", "name email phone address")
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching provider bookings by username:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ GET bookings for a provider by providerId
 */
router.get("/provider/:providerId", async (req, res) => {
  try {
    const { providerId } = req.params;

    const provider = await User.findById(providerId);
    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const bookings = await Booking.find({ providerId })
      .populate("clientId", "name email phone address")
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching provider bookings by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* --------------------------
   PROVIDER APPLICATION FLOW
--------------------------- */

/**
 * ✅ Apply as a provider (User fills form)
 */
router.post("/apply", async (req, res) => {
  try {
    const application = await ProviderApplication.create(req.body);
    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error("Error submitting provider application:", err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * ✅ Admin: Get all provider applications
 */
router.get("/applications", async (req, res) => {
  try {
    const applications = await ProviderApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error("Error fetching provider applications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ Admin: Approve application → Create provider User
 */
router.patch("/applications/:id/approve", async (req, res) => {
  try {
    const app = await ProviderApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ error: "Application not found" });

    app.status = "approved";
    await app.save();

    // create provider account in User collection
    const hashedPassword = await bcrypt.hash("provider123", 10); // default pwd
    const providerUser = await User.create({
      name: app.fullName,
      username: app.email.split("@")[0],
      email: app.email,
      password: hashedPassword,
      role: "provider",
      serviceType: app.service,
      experience: app.experience,
    });

    res.json({ message: "Application approved", provider: providerUser });
  } catch (err) {
    console.error("Error approving provider application:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ Admin: Reject application
 */
router.patch("/applications/:id/reject", async (req, res) => {
  try {
    const app = await ProviderApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ error: "Application not found" });

    app.status = "rejected";
    await app.save();

    res.json({ message: "Application rejected", application: app });
  } catch (err) {
    console.error("Error rejecting provider application:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
