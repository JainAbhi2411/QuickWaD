const mongoose = require('mongoose');

// Define the schema for the booking model
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceDetails: {
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    default: ''
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'upi', 'cas'] // Added Cash After Service option
  },
  paymentDetails: {
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
    cardName: { type: String },
    upiId: { type: String },  // Store UPI ID for UPI payment
    transactionId: { type: String },  // Optional: for tracking payment transaction (for UPI)
    cashPaymentConfirmed: { type: Boolean, default: false } // Flag to indicate cash payment status
  },
  status: {
    type: String,
    default: 'pending', // Default status is pending until confirmed
    enum: ['pending','in_progress', 'started','confirmed', 'cancelled','completed'] 
  },
  paymentStatus: {
    type: String,
    default: 'pending', // Track payment status separately
    enum: ['pending', 'completed', 'failed', 'in_progress']
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Create the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
