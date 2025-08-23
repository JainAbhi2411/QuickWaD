const Booking = require('../models/Bookings');
const User = require('../models/User'); // Assuming the User model is imported correctly
const ExpertService = require('../models/ExpertService');
const OnlineService = require('../models/OnlineService');
const PremiumService = require('../models/PremiumService');
const ServiceCategory = require('../models/serviceCategory');
const Razorpay = require('razorpay');

let paymentStatus = 'pending';

const razorpay = new Razorpay({
  key_id: 'rzp_test_R8sTgDyMaNcZpq',
  key_secret: 'sma0lNFv0n1JbskNRfsH9s3Y',
});

// Mock payment gateway simulation for UPI, Cash, and Card methods
const mockUPIPayment = async (upiId, totalPrice) => {
  if (upiId.includes('@upi')) {
    // Simulate a successful UPI payment for valid UPI IDs
    return { status: 'success', message: `Payment of ₹${totalPrice} to ${upiId} successful!` };
  } else {
    // Simulate a failure for invalid UPI IDs
    return { status: 'failure', message: 'Invalid UPI ID. Payment failed.' };
  }
};

const mockCardPayment = async (cardNumber, totalPrice) => {
  // Simulate a successful card payment for valid card numbers
  const validCardPrefix = '4'; // Let's assume cards starting with '4' are valid (Visa)
  if (cardNumber.startsWith(validCardPrefix)) {
    return { status: 'success', message: `Payment of ₹${totalPrice} via card ${cardNumber} successful!` };
  } else {
    return { status: 'failure', message: 'Invalid card number. Payment failed.' };
  }
};

const mockCashPayment = () => {
  // Simulate a pending cash payment
  return { status: 'pending', message: 'Cash payment pending. To be paid after service completion.' };
};

// API to create payment link and generate QR code for UPI payment
exports.createPaymentLink = async (req, res) => {
  const { totalPrice, customerName, customerEmail, customerPhone } = req.body;

  try {
    // Prepare the Razorpay order options
    const options = {
      amount: totalPrice * 100, // Convert to smallest unit (e.g., paise)
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
      payment_capture: 1,
      description: 'Service Payment',
      method: 'upi', // UPI payment method
    };

    // Create a Razorpay order
    const order = await razorpay.orders.create(options);

    // Generate the UPI QR code for the payment
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=OKEsn0BIWLyqrW&pn=Merchant&mc=123456&tid=${order.id}&tr=${order.receipt}&tn=Service Payment&am=${totalPrice}&cu=INR&size=150x150`;

    // Send back the QR code and order ID
    res.json({
      success: true,
      paymentLink: `upi://pay?pa=OKEsn0BIWLyqrW&pn=Merchant&mc=123456&tid=${order.id}&tr=${order.receipt}&tn=Service Payment&am=${totalPrice}&cu=INR`,
      qrCode,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment link.' });
  }
};


// Create a new route for handling payment requests
exports.handlePayment = async (req, res) => {
  const { paymentMethod, paymentDetails, totalPrice } = req.body;

  try {
    let paymentResponse;

    // Handle UPI payment request
    if (paymentMethod === 'upi') {
      paymentResponse = await mockUPIPayment(paymentDetails.upiId, totalPrice);
    }

    // Handle Card payment request
    if (paymentMethod === 'card') {
      paymentResponse = await mockCardPayment(paymentDetails.cardNumber, totalPrice);
    }

    // Handle Cash payment (no need for external payment gateway, just mark as pending)
    if (paymentMethod === 'cash') {
      paymentResponse = mockCashPayment();
    }

    // Update the booking with payment status based on response
    if (paymentResponse.status === 'success' || paymentResponse.status === 'pending') {
      paymentStatus = 'confirmed';
      // Confirm the payment status if successful
      res.status(200).json({ paymentStatus: 'confirmed', message: paymentResponse.message });
    } else {
      // Mark as failed if the payment is unsuccessful
      res.status(400).json({ paymentStatus: 'failed', message: paymentResponse.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment processing error', error });
  }
};

// Create Booking with UPI, Card, or Cash After Service
exports.createBooking = async (req, res) => {
  const {
    userId,
    serviceName,
    date,
    time,
    address,
    phone,
    instructions,
    paymentMethod,
    paymentDetails,
    totalPrice,
  } = req.body;

  try {
    // 1. Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Fetch the service based on the serviceName
    let service =
      (await OnlineService.findOne({ name: serviceName })) ||
      (await PremiumService.findOne({ name: serviceName })) ||
      (await ExpertService.findOne({ name: serviceName }));

    if (!service) {
      const serviceCategory = await ServiceCategory.findOne({ 'services.name': serviceName });
      if (serviceCategory) {
        service = serviceCategory.services.find((s) => s.name === serviceName);
      }
    }

    if (!service) return res.status(404).json({ message: 'Service not found' });

    // 3. Prepare the service details to be stored in the booking
    const serviceDetails = {
      price: service.price,
      duration: service.duration,
    };

    // 4. Create the booking object without paymentStatus initially
    const newBooking = new Booking({
      user: userId,
      serviceName: service.name,
      serviceDetails: serviceDetails,
      date: new Date(date), // Ensure the date is converted into a Date object
      time,
      address,
      phone,
      instructions,
      paymentMethod,
      paymentDetails,
      totalPrice,
      status: 'pending', // Set default status to pending
      paymentStatus: paymentStatus, // Default to pending if not paid
    });

    // Save the booking to the database (we'll update paymentStatus later based on mock payment)
    await newBooking.save();

    // Return response after booking creation
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Confirm a booking (e.g., after payment is processed or completed)
exports.confirmBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by its ID
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Check the payment status
    if (booking.paymentStatus === 'confirmed') {
      // Update the booking status to confirmed
      booking.status = 'confirmed';
    } else if (booking.paymentMethod === 'cash' && booking.status === 'completed') {
      // If payment is 'cash', mark payment as completed after service completion
      booking.paymentStatus = 'confirmed'; // Mark payment as confirmed after service completion
      booking.status = 'confirmed';
    } else {
      // For failed payments, set status as cancelled
      booking.status = 'cancelled';
    }

    // Save the updated booking
    await booking.save();

    res.status(200).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).populate('user');
    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to change the status of a booking
exports.changeBookingStatus = async (req, res) => {
  const { id } = req.params; // Booking ID from URL parameter
  const { status } = req.body; // New status from the request body

  if (!status || !['confirmed', 'pending', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Find the booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    return res.status(200).json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch tracking data
exports.getTrackingData = async (req, res) => {
  const { id } = req.params; // Booking ID from URL

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Initialize steps dynamically
    const steps = [
      { id: 1, title: 'Booking Confirmed', completed: false, time: '' },
      { id: 2, title: 'Professional Assigned', completed: false, time: '' },
      { id: 3, title: 'Professional En Route', completed: false, time: '' },
      { id: 4, title: 'Service Started', completed: false, time: '' },
      { id: 5, title: 'Service Completed', completed: false, time: '' },
    ];

    // Logic to mark steps as completed based on the booking status and use dynamic times
    switch (booking.status) {
      case 'confirmed':
        steps[0].completed = true;
        steps[1].completed = true;
        break;
      case 'in_progress':
        steps[0].completed = true;
        steps[1].completed = true;
        steps[2].completed = true;
        steps[3].completed = true;
        break;
      case 'started':
        steps[0].completed = true;
        steps[1].completed = true;
        steps[2].completed = true;
        steps[3].completed = true;
        break;
      case 'completed':
        steps[0].completed = true;
        steps[1].completed = true;
        steps[2].completed = true;
        steps[3].completed = true;
        steps[4].completed = true;
        break;
      default:
        break;
    }

    const trackingData = {
      status: booking.status,
      estimatedArrival: new Date(Date.now() + Math.random() * 300000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: 'En route to your location',
      steps: steps,
    };

    return res.status(200).json({ trackingData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
