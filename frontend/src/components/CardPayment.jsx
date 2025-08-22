import React from 'react';
import { useBooking } from '../context/bookingContext';

export default function CardPayment() {
  const { paymentDetails, setPaymentDetails } = useBooking();

  return (
    <div style={{ display: 'grid', gap: '15px' }}>
      <input
        type="text"
        value={paymentDetails.cardNumber}
        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
        placeholder="Card Number"
        style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e5e7eb' }}
      />
      <div style={{ display: 'flex', gap: '15px' }}>
        <input
          type="text"
          value={paymentDetails.expiryDate}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
          placeholder="MM/YY"
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #e5e7eb' }}
        />
        <input
          type="text"
          value={paymentDetails.cvv}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
          placeholder="CVV"
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #e5e7eb' }}
        />
      </div>
      <input
        type="text"
        value={paymentDetails.cardName}
        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
        placeholder="Cardholder Name"
        style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e5e7eb' }}
      />
    </div>
  );
}
