import React, { useState } from 'react';
import { useBooking } from '../context/bookingContext';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Helper function to validate UPI ID
const validateUPI = (upiId) => {
  const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
  return regex.test(upiId);
};

// Simulated QR code generation URL (replace with actual payment gateway)
const generatePaymentQR = (upiId, amount) => {
  return `https://example.com/pay?upiId=${upiId}&amount=${amount}`;
};

const UPIApps = [
  { name: 'Google Pay', icon: 'https://cdn.worldvectorlogo.com/logos/google-pay-1.svg' },
  { name: 'PhonePe', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png' },
  { name: 'Paytm', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH3TZc7923_HIKidB0GCysjUMzAyDYb9LHLg&s' },
];

export default function UPIPayment() {
  const { paymentDetails, setPaymentDetails, setPaymentStatus,paymentStatus } = useBooking();
  const [upiIdError, setUpiIdError] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upiId');
  const storedBookingData = JSON.parse(localStorage.getItem('bookingData'));
  const { serviceId, totalPrice, addons, quantity } = storedBookingData || {};

  // Handle UPI ID change
  const handleUPIChange = (e) => {
    const upiId = e.target.value;
    setPaymentDetails({ ...paymentDetails, upiId });

    // Clear error on valid UPI ID entry
    if (validateUPI(upiId)) {
      setUpiIdError('');
    }
  };

  // Handle QR Code Generation (for scanning)
  const generateQRCode = () => {
    setQrCodeGenerated(true);
    setTimer(30); // 30-second timer for QR code expiration

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setQrCodeGenerated(false); // Reset QR code if time runs out
          setShowTimeoutWarning(true); // Show timeout warning
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle UPI Payment Processing
  const handlePayment = async () => {
    if (selectedPaymentMethod === 'upiId' && !validateUPI(paymentDetails.upiId)) {
      setUpiIdError('Please enter a valid UPI ID.');
      return;
    }

    setIsPaymentProcessing(true);
    setPaymentStatus('Pending');

    try {
      // Send payment details to the backend
      const response = await axios.post(`${apiUrl}/api/bookings/payment`, {
        paymentMethod: 'upi', // Specify payment method
        paymentDetails: {
          upiId: paymentDetails.upiId
        },
        totalPrice: totalPrice, // Send total amount for payment
      },{withCredentials : true});

      // Handle success or failure based on backend response
      if (response.data.paymentStatus === 'confirmed') {
        setPaymentStatus('confirmed'); // Update payment status to confirmed
        alert('Payment successful!');
      } else {
        setPaymentStatus('failed'); // Set status to failed if payment fails
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('There was an issue with payment processing.');
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>UPI Payment</h2>

      {/* Payment Method Toggle */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedPaymentMethod('upiId')}
          style={{
            padding: '15px 25px',
            background: selectedPaymentMethod === 'upiId' ? '#6366f1' : 'white',
            color: selectedPaymentMethod === 'upiId' ? 'white' : '#6366f1',
            borderRadius: '8px',
            border: '2px solid #6366f1',
            fontWeight: '600',
          }}
        >
          Enter UPI ID
        </button>
        <button
          onClick={() => setSelectedPaymentMethod('qrCode')}
          style={{
            padding: '15px 25px',
            background: selectedPaymentMethod === 'qrCode' ? '#6366f1' : 'white',
            color: selectedPaymentMethod === 'qrCode' ? 'white' : '#6366f1',
            borderRadius: '8px',
            border: '2px solid #6366f1',
            fontWeight: '600',
          }}
        >
          Scan QR Code
        </button>
      </div>

      {/* UPI ID Input */}
      {selectedPaymentMethod === 'upiId' && (
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="upiId" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Enter your UPI ID</label>
          <input
            type="text"
            id="upiId"
            value={paymentDetails.upiId}
            onChange={handleUPIChange}
            placeholder="example@upi"
            style={{
              padding: '15px',
              fontSize: '16px',
              width: '100%',
              borderRadius: '8px',
              border: upiIdError ? '2px solid red' : '2px solid #e5e7eb',
              fontWeight: '600',
            }}
          />
          {upiIdError && <div style={{ color: 'red', fontSize: '12px' }}>{upiIdError}</div>}
        </div>
      )}

      {/* QR Code Payment */}
      {selectedPaymentMethod === 'qrCode' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {qrCodeGenerated ? (
            <>
              <h4 style={{ fontWeight: '600' }}>Scan this QR code with your UPI app</h4>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${generatePaymentQR(paymentDetails.upiId, totalAmount)}&size=150x150`}
                alt="UPI QR Code"
                style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '20px' }}
              />
              <div style={{ fontWeight: '600' }}>QR Code expires in {timer} seconds</div>
            </>
          ) : (
            <div>
              <button
                onClick={generateQRCode}
                style={{
                  padding: '15px 25px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Generate QR Code
              </button>
              <p style={{ marginTop: '15px', fontSize: '14px' }}>
                Scan the QR code with your UPI app to complete the payment.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Payment Details Confirmation */}
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontWeight: '600' }}>Payment Details</h3>
        <p><strong>UPI ID:</strong> {paymentDetails.upiId}</p>
        <p><strong>Amount:</strong> ₹{totalAmount}</p>
        <p><strong>Description:</strong> Service Booking Payment</p>
      </div>

      {/* UPI App Logos */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {UPIApps.map((app, index) => (
          <img key={index} src={app.icon} alt={app.name} style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
        ))}
      </div>

      {/* Payment Confirmation */}
      <button
        onClick={handlePayment}
        disabled={isPaymentProcessing}
        style={{
          padding: '15px 30px',
          backgroundColor: isPaymentProcessing ? '#d1d5db' : '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '16px',
          cursor: isPaymentProcessing ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {isPaymentProcessing ? 'Processing...' : 'Confirm Payment'}
      </button>

      {/* Payment Status */}
      {paymentStatus && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: paymentStatus === 'Success' ? '#4caf50' : '#ff9800',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {paymentStatus === 'Success' ? 'Payment Successful!' : 'Payment Pending...'}
        </div>
      )}

      {/* Timeout Warning */}
      {showTimeoutWarning && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ff9800', color: 'white', borderRadius: '8px', fontWeight: '600', textAlign: 'center' }}>
          <p>QR code has expired! Please try again.</p>
        </div>
      )}
    </div>
  );
}
