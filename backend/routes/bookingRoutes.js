const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authMiddleware');
const authController = require('../controllers/authController'); // ✅ updated path

// Protected route to submit a booking
router.post('/', authenticate, authController.submitBooking);

module.exports = router;
