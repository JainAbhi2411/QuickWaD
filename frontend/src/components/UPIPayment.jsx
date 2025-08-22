import React from 'react';
import { useBooking } from '../context/bookingContext';

export default function UPIPayment() {
  const { paymentDetails, setPaymentDetails } = useBooking();

  return (
    <div style={{ display: 'grid', gap: '15px' }}>
      <input
        type="text"
        value={paymentDetails.upiId}
        onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
        placeholder="UPI ID"
        style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e5e7eb' }}
      />
    </div>
  );
}
