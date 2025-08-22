import React, { useState } from 'react';
import { useBooking } from '../context/bookingContext';

// Helper function to validate UPI ID
const validateUPI = (upiId) => {
  // Basic UPI ID pattern check (ends with @upi or @okhdfcbank or similar)
  const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
  return regex.test(upiId);
};

export default function UPIPayment() {
  const { paymentDetails, setPaymentDetails } = useBooking();
  const [upiIdError, setUpiIdError] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleUPIChange = (e) => {
    const upiId = e.target.value;
    setPaymentDetails({ ...paymentDetails, upiId });

    // Clear error on valid UPI ID entry
    if (validateUPI(upiId)) {
      setUpiIdError('');
    }
  };

  const handlePayment = () => {
    if (!validateUPI(paymentDetails.upiId)) {
      setUpiIdError('Please enter a valid UPI ID.');
      return;
    }

    // Simulate UPI payment processing
    setIsPaymentProcessing(true);
    setPaymentStatus('Pending');
    
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setPaymentStatus('Success');
    }, 3000); // Simulate 3-second payment processing
  };

  return (
    <div style={{ display: 'grid', gap: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>UPI Payment</h2>

      {/* UPI ID */}
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

      {/* Show UPI QR Code */}
      {paymentDetails.upiId && !upiIdError && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h4 style={{ fontWeight: '600' }}>Scan this QR code with your UPI app</h4>
          {/* You can replace this with a dynamic QR code generator */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${paymentDetails.upiId}&size=150x150`}
            alt="UPI QR Code"
            style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '20px' }}
          />
        </div>
      )}

      {/* Payment Confirmation Button */}
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
    </div>
  );
}
