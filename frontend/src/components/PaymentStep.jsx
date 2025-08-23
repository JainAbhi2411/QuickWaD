import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/bookingContext';
import CardPayment from './CardPayment';
import UPIPayment from './UPIPayment';
import CashAfterService from './CashAfterService';

export default function PaymentStep() {
  const { bookingDetails, setBookingDetails, paymentDetails, setPaymentDetails, service } = useBooking();
  const storedBookingData = JSON.parse(localStorage.getItem('bookingData'));
  const { serviceId, totalPrice, addons, quantity } = storedBookingData || {};

  const [paymentMethod, setPaymentMethod] = useState(bookingDetails.paymentMethod || 'card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentErrors, setPaymentErrors] = useState({});

  // Helper function to validate the payment details
  const validatePaymentDetails = () => {
    let errors = {};

    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 19) {
        errors.cardNumber = 'Card number must be 16 digits.';
      }
      if (!paymentDetails.expiryDate || paymentDetails.expiryDate.length !== 5) {
        errors.expiryDate = 'Please enter a valid expiry date (MM/YY).';
      }
      if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
        errors.cvv = 'Please enter a valid CVV.';
      }
      if (!paymentDetails.cardName) {
        errors.cardName = 'Cardholder name is required.';
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId || !validateUPI(paymentDetails.upiId)) {
        errors.upiId = 'Please enter a valid UPI ID.';
      }
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate UPI ID format
  const validateUPI = (upiId) => {
    const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(upiId);
  };

  const handlePaymentSubmit = async () => {
    if (!validatePaymentDetails()) {
      return;
    }

    setIsProcessing(true);
    setPaymentErrors({});  // Reset any existing errors

    try {
      // Here you would process the payment based on the selected method
      if (paymentMethod === 'card') {
        // Call your API to process the card payment
        console.log('Processing card payment...');
      } else if (paymentMethod === 'upi') {
        // Call your API to process UPI payment
        console.log('Processing UPI payment...');
      } else if (paymentMethod === 'cas') {
        // Handle cash payment after service
        console.log('Cash payment selected...');
      }

      // Simulate a successful payment confirmation after processing
      setTimeout(() => {
        setIsProcessing(false);
        alert('Payment successful!');
        // Proceed to confirmation step
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      console.error('Payment error:', error);
      alert('There was an issue processing your payment.');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Payment Information
      </h2>

      {/* Order Summary */}
      <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '15px', fontWeight: '600' }}>Order Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>{service.name}</span>
          <span>${service.price}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Service Date</span>
          <span>{bookingDetails.date} at {bookingDetails.time}</span>
        </div>

        {/* Addons List */}
        {addons && addons.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4 style={{ fontWeight: '600' }}>Addons:</h4>
            {addons.map((addon, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{addon.name}</span>
                <span>${addon.price}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '18px' }}>
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '15px', fontWeight: '500' }}>Payment Method</label>
        <div style={{ display: 'flex', gap: '15px' }}>
          {['card', 'upi', 'cas'].map((method) => (
            <button
              key={method}
              onClick={() => {
                setBookingDetails({ ...bookingDetails, paymentMethod: method });
                setPaymentMethod(method);
              }}
              style={{
                padding: '15px 20px',
                border: paymentMethod === method ? '2px solid #6366f1' : '1px solid #e5e7eb',
                background: paymentMethod === method ? '#f8faff' : 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: '500',
              }}
            >
              {method === 'card' ? '💳 Card' : method === 'upi' ? '📱 UPI' : '💵 Cash After Service'}
            </button>
          ))}
        </div>
      </div>

      {/* Render the Payment Method Components */}
      {paymentMethod === 'card' && <CardPayment paymentErrors={paymentErrors} />}
      {paymentMethod === 'upi' && <UPIPayment paymentErrors={paymentErrors} />}
      {paymentMethod === 'cas' && <CashAfterService paymentErrors={paymentErrors} />}

      {/* Submit Payment */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={handlePaymentSubmit}
          disabled={isProcessing}
          style={{
            padding: '15px 30px',
            backgroundColor: isProcessing ? '#d1d5db' : '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>

      {/* Display Error Messages */}
      {Object.keys(paymentErrors).length > 0 && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          {Object.values(paymentErrors).map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}
