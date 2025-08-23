import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/bookingContext';
import axios from 'axios';

export default function CashAfterService() {
  const { paymentDetails, setPaymentStatus } = useBooking();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [serviceStatus, setServiceStatus] = useState('pending');
  const [paymentReminder, setPaymentReminder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Simulate service status update (in a real-world app, this would be dynamic)
    const timer = setInterval(() => {
      setServiceStatus('completed');
    }, 5000); // Simulating service completion after 5 seconds

    return () => clearInterval(timer); // Clean up the interval
  }, []);

  const handleConfirmPayment = async () => {
    setIsConfirmed(true);
    setPaymentReminder('You will be reminded to pay after the service is completed.');
    
    // Mark the payment status as pending initially
    setPaymentStatus('pending');

    // Simulate sending payment request to the backend
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/payment', {
        paymentMethod: 'cash', // Specify payment method as cash
        paymentDetails: {
          ...paymentDetails, // Send the payment details (e.g., address, phone, etc.)
        },
        totalPrice: 500, // Assuming static price for now, replace with dynamic amount
      });

      if (response.data.paymentStatus === 'confirmed') {
        setPaymentStatus('confirmed'); // Payment status is confirmed once the service is completed
        alert('Payment confirmed. Thank you for your payment!');
      } else {
        setPaymentStatus('failed');
        alert('Payment confirmation failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      setPaymentStatus('failed');
      alert('There was an issue with payment processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Pay After Service</h2>
      
      <p style={{ fontSize: '16px', color: '#333', marginBottom: '15px' }}>
        Pay in cash after the service is completed. You will pay the amount directly to the service provider upon completion.
      </p>

      {/* Service Status */}
      <div style={{ marginBottom: '15px' }}>
        <strong>Service Status:</strong> <span style={{ color: serviceStatus === 'completed' ? 'green' : 'orange' }}>
          {serviceStatus === 'completed' ? 'Service Completed' : 'Service Pending'}
        </span>
      </div>

      {/* Confirmation Button */}
      {!isConfirmed ? (
        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          style={{
            padding: '12px 20px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isProcessing ? 'Processing...' : 'Confirm Cash Payment'}
        </button>
      ) : (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#d1fad1', color: '#2d7a2f', borderRadius: '8px', fontWeight: '600' }}>
          Payment Confirmation: You have confirmed to pay in cash. A reminder will be sent after service completion.
        </div>
      )}

      {/* Payment Reminder */}
      {paymentReminder && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffeb3b', color: '#5c5c5c', borderRadius: '8px', fontWeight: '600' }}>
          {paymentReminder}
        </div>
      )}

      {/* Terms and Conditions */}
      <div style={{ marginTop: '25px', fontSize: '14px', color: '#555' }}>
        <p><strong>Terms and Conditions:</strong></p>
        <ul>
          <li>You are expected to make the full payment to the service provider once the service is completed.</li>
          <li>The payment must be in cash. No digital payment methods are allowed for this option.</li>
          <li>If the service is canceled or postponed, the cash payment will not be required until the service is rescheduled and completed.</li>
        </ul>
      </div>
    </div>
  );
}
