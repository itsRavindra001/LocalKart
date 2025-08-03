const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authController.getProfile);
router.get('/bookings', authController.getBookings);

module.exports = router;
