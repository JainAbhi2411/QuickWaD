const express = require('express');
const router = express.Router();
const { createBooking, confirmBooking, getUserBookings , changeBookingStatus,getTrackingData ,handlePayment } = require('../controllers/bookingController');

// Route for creating a new booking
router.post('/create', createBooking);

// Route for confirming a booking
router.get('/confirm/:bookingId', confirmBooking);

// Route for getting bookings of a specific user
router.get('/user/:userId', getUserBookings);
router.patch('/update/:id', changeBookingStatus);
router.get('/tracking/:id', getTrackingData);
router.post('/api/payment', handlePayment);

module.exports = router;
