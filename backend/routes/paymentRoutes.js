// routes/paymentRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @route   POST /api/payment/order
 * @desc    Create a new Razorpay order
 */
router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID, // send public key to frontend
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    return res.status(500).json({ success: false, message: "Error creating order" });
  }
});

/**
 * @route   POST /api/payment/verify
 * @desc    Verify Razorpay payment signature
 */
router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("❌ Payment verification failed:", error);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

module.exports = router;
