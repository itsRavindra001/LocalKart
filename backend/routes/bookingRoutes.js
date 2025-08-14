// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../controllers/authController");
const Booking = require("../models/Booking");
const User = require("../models/User");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Price list for services (in INR)
const servicePrices = {
  plumbing: 250,
  electrician: 300,
  salon: 400,
  "ac-repair": 500,
  cleaning: 350,
  painting: 450,
  carpentry: 300,
  tutors: 200,
  tailors: 150
};

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * 📌 Get current authenticated user's info
 */
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("name email username role phone");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Fetch user info error:", err);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

/**
 * 📌 Create Razorpay payment order
 */
router.post("/create-order", authenticateToken, async (req, res) => {
  try {
    const { service } = req.body;

    // Validate service
    if (!service || !servicePrices[service]) {
      return res.status(400).json({ error: "Invalid or missing service" });
    }

    const amountInPaise = servicePrices[service] * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        service,
        userId: req.user.id
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error("❌ Create order error:", err);
    res.status(500).json({ error: err.message || "Failed to create payment order" });
  }
});

/**
 * 📌 Verify payment and save booking
 */
router.post("/verify-payment", authenticateToken, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      providerId,
      service,
      date,
      address,
      phone
    } = req.body;

    // ✅ Validate booking fields before doing anything
    if (!providerId || !service || !date || !address || !phone) {
      return res.status(400).json({ error: "Missing required booking details" });
    }

    if (!servicePrices[service]) {
      return res.status(400).json({ error: "Invalid service" });
    }

    // ✅ Validate payment signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // ✅ Verify order amount matches our price list
    const order = await razorpay.orders.fetch(razorpay_order_id);
    if (order.amount !== servicePrices[service] * 100) {
      return res.status(400).json({ error: "Amount mismatch" });
    }

    // ✅ Fetch user details for name/email (Booking schema requires these)
    const user = await User.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Create booking
    const booking = new Booking({
      userId: req.user.id,
      providerId,
      service,
      date,
      address,
      phone,
      name: user.name,
      email: user.email,
      amountPaid: servicePrices[service],
      paymentStatus: "completed",
      paymentDetails: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature
      }
    });

    await booking.save();

    res.json({ 
      success: true,
      booking,
      message: "Payment verified and booking created"
    });

  } catch (err) {
    console.error("❌ Payment verification error:", err);
    res.status(500).json({ error: err.message || "Payment verification failed" });
  }
});

/**
 * 📌 Get bookings for a provider
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

    if (req.user?.id !== provider._id.toString()) {
      return res.status(403).json({ error: "Forbidden: Not your bookings" });
    }

    const bookings = await Booking.find({ providerId: provider._id })
      .populate("userId", "name email phone")
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Fetch provider bookings error:", err);
    res.status(500).json({ error: "Failed to fetch provider bookings" });
  }
});

/**
 * 📌 Get bookings for a client
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
      .populate("providerId", "name serviceType")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Fetch client bookings error:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/**
 * 📌 Update booking status
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
