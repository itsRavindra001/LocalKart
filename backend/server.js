// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const providerRoutes = require("./routes/providerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ✅ make sure file exists

const User = require("./models/User");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// CORS Setup (local + Vercel)
// ===============================
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://local-kart-wnw7.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ===============================
// Root Route
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 LocalKart backend is running");
});

// ===============================
// Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes); // ✅ admin APIs

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// ===============================
// Create default admin
// ===============================
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        username: "admin",
        email: "admin@localkart.com",
        dob: "1990-01-01",
        password: hashedPassword,
        role: "admin"
      });
      console.log("✅ Default admin created: username=admin / password=admin123");
    } else {
      console.log("ℹ️ Admin account already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err.message);
  }
};

// ===============================
// MongoDB Connection & Server Start
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await createDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
