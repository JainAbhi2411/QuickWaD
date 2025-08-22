import React from 'react';
import { useBooking } from '../context/bookingContext';

export default function PaymentStep() {
  const { bookingDetails, setBookingDetails, paymentDetails, setPaymentDetails, service } = useBooking();
  
  const storedBookingData = JSON.parse(localStorage.getItem("bookingData")); 
  const { serviceId, totalPrice, addons, quantity } = storedBookingData || {};

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Payment Information
      </h2>

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

        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: '600',
          fontSize: '18px'
        }}>
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '15px', fontWeight: '500' }}>Payment Method</label>
        <div style={{ display: 'flex', gap: '15px' }}>
          {['card', 'upi', 'wallet'].map(method => (
            <button
              key={method}
              onClick={() => setBookingDetails({ ...bookingDetails, paymentMethod: method })}
              style={{
                padding: '15px 20px',
                border: bookingDetails.paymentMethod === method ? '2px solid #6366f1' : '1px solid #e5e7eb',
                background: bookingDetails.paymentMethod === method ? '#f8faff' : 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}
            >
              {method === 'card' ? '💳 Card' : method === 'upi' ? '📱 UPI' : '💰 Wallet'}
            </button>
          ))}
        </div>
      </div>

      {/* Card Details */}
      {bookingDetails.paymentMethod === 'card' && (
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
      )}
    </div>
  );
}
