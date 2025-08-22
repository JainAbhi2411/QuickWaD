import React, { useState } from 'react';
import { useBooking } from '../context/bookingContext';

// Helper function to validate UPI ID
const validateUPI = (upiId) => {
  const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
  return regex.test(upiId);
};

export default function UPIPayment() {
  const { paymentDetails, setPaymentDetails } = useBooking();
  const [upiIdError, setUpiIdError] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upiId'); // Track whether it's UPI ID or QR code
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false); // Whether QR code is generated
  const [timer, setTimer] = useState(0); // Timer for QR code payment

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
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle UPI Payment Processing
  const handlePayment = () => {
    if (selectedPaymentMethod === 'upiId' && !validateUPI(paymentDetails.upiId)) {
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
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${paymentDetails.upiId}&size=150x150`}
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
    </div>
  );
}
