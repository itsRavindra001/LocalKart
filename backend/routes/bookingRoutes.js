// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../controllers/authController");
const Booking = require("../models/Booking");
const User = require("../models/User");
const mongoose = require("mongoose");

/**
 * 📌 Get current authenticated user's info
 */
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("name email username role");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Fetch user info error:", err);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

/**
 * 📌 Get bookings for a provider (by ObjectId OR username)
 *    Example calls:
 *    - GET /api/bookings/provider/689b0d21ef05f52889a83f94  (ObjectId)
 *    - GET /api/bookings/provider/my-provider-username      (username)
 */
router.get("/provider/:idOrUsername", authenticateToken, async (req, res) => {
  try {
    const { idOrUsername } = req.params;

    let provider;
    if (mongoose.Types.ObjectId.isValid(idOrUsername)) {
      provider = await User.findOne({ _id: idOrUsername, role: "provider" });
    } else {
      provider = await User.findOne({ username: idOrUsername, role: "provider" });
    }

    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    // Ensure logged-in user is the provider
    if (req.user?.id !== provider._id.toString()) {
      return res.status(403).json({ error: "Forbidden: Not your bookings" });
    }

    const bookings = await Booking.find({ providerId: provider._id })
      .populate("userId", "name email phone address")
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Fetch provider bookings error:", err);
    res.status(500).json({ error: "Failed to fetch provider bookings" });
  }
});

/**
 * 📌 Get bookings for a client by username
 */
router.get("/client/:username", authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;
    const client = await User.findOne({ username });
    if (!client) return res.status(404).json({ error: "User not found" });

    if (req.user?.id !== client._id.toString()) {
      return res.status(403).json({ error: "Forbidden: Not your bookings" });
    }

    const bookings = await Booking.find({ userId: client._id })
      .populate("providerId", "name email serviceType");

    res.json(bookings);
  } catch (err) {
    console.error("❌ Fetch client bookings error:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/**
 * 📌 Submit booking
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { providerId, service, date, address, phone, price } = req.body;
    if (!providerId || !service || !date || !address || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const provider = await User.findById(providerId);
    if (!provider || provider.role !== "provider") {
      return res.status(404).json({ error: "Provider not found or invalid role" });
    }

    const client = await User.findById(userId);
    if (!client) return res.status(404).json({ error: "Client not found" });

    const booking = new Booking({
      userId,
      providerId,
      name: client.name,
      email: client.email,
      phone,
      service,
      date,
      address,
      price: price || 0,
    });

    await booking.save();
    res.status(201).json({ message: "Booking saved", booking });
  } catch (err) {
    console.error("❌ Booking save error:", err);
    res.status(500).json({ error: err.message || "Failed to save booking" });
  }
});

/**
 * 📌 Update booking status (provider only)
 */
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // Only provider who owns the booking can update
    if (booking.providerId.toString() !== req.user?.id) {
      return res.status(403).json({ error: "Forbidden: Cannot update this booking" });
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error("❌ Update booking status error:", err);
    res.status(500).json({ error: err.message || "Failed to update booking status" });
  }
});

module.exports = router;
