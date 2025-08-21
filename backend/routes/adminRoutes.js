const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking"); // optional for revenue

const router = express.Router();

/**
 * ✅ Dashboard stats + recent users
 */
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeProviders = await User.countDocuments({
      role: "provider",
      status: "active",
    });
    const pendingApprovals = await User.countDocuments({
      role: "provider",
      status: "pending",
    });

    // Optional revenue calculation
    let totalRevenue = 0;
    try {
      const revenueAgg = await Booking.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
      totalRevenue = revenueAgg[0]?.total || 0;
    } catch (err) {
      console.warn("⚠️ Booking model not available, skipping revenue...");
    }

    // Recent 10 users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name email role status createdAt");

    res.json({
      stats: {
        totalUsers,
        activeProviders,
        pendingApprovals,
        totalRevenue,
      },
      recentUsers,
    });
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Approve provider (set active)
 */
router.patch("/users/:id/approve", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true }
    ).select("name email role status createdAt");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Suspend user
 */
router.patch("/users/:id/suspend", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "suspended" },
      { new: true }
    ).select("name email role status createdAt");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Activate user (set active again)
 */
router.patch("/users/:id/activate", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true }
    ).select("name email role status createdAt");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Set provider back to pending
 */
router.patch("/users/:id/pending", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "pending" },
      { new: true }
    ).select("name email role status createdAt");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
