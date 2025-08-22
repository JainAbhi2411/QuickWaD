import React, { useState } from 'react';
import { useBooking } from '../context/bookingContext';

// Card Type Detection using regex for simplicity
const getCardType = (cardNumber) => {
  const cardTypes = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  for (let [type, regex] of Object.entries(cardTypes)) {
    if (regex.test(cardNumber)) {
      return type;
    }
  }
  return null;
};

export default function CardPayment() {
  const { paymentDetails, setPaymentDetails } = useBooking();

  const [cardType, setCardType] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value.replace(/\s/g, ''); // Remove spaces
    setPaymentDetails({ ...paymentDetails, cardNumber });

    // Detect card type based on the number
    setCardType(getCardType(cardNumber));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};

    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 13) {
      formErrors.cardNumber = 'Card number is required and should be at least 13 digits.';
    }
    if (!paymentDetails.expiryDate || paymentDetails.expiryDate.length !== 5) {
      formErrors.expiryDate = 'Please enter a valid expiry date (MM/YY).';
    }
    if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
      formErrors.cvv = 'Please enter a valid CVV.';
    }
    if (!paymentDetails.cardName) {
      formErrors.cardName = 'Cardholder name is required.';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Proceed with payment (mocked)
      alert('Payment processing...');
    }
  };

  return (
    <div style={{ display: 'grid', gap: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Payment Information</h2>

      {/* Card Number */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={paymentDetails.cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Card Number"
          maxLength="19"
          style={{
            padding: '15px',
            fontSize: '16px',
            width: '100%',
            borderRadius: '8px',
            border: errors.cardNumber ? '2px solid red' : '2px solid #e5e7eb',
            marginBottom: '20px',
            fontWeight: '600',
          }}
        />
        {/* Card Type Icon */}
        {cardType && (
          <img
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Visa_Logo.svg/500px-Visa_Logo.svg.png`} // Visa example
            alt={`${cardType} logo`}
            style={{ width: '40px', marginLeft: '10px' }}
          />
        )}
      </div>
      {errors.cardNumber && <div style={{ color: 'red', fontSize: '12px' }}>{errors.cardNumber}</div>}

      {/* Expiry Date and CVV */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={paymentDetails.expiryDate}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
            placeholder="MM/YY"
            maxLength="5"
            style={{
              padding: '15px',
              fontSize: '16px',
              width: '100%',
              borderRadius: '8px',
              border: errors.expiryDate ? '2px solid red' : '2px solid #e5e7eb',
              fontWeight: '600',
            }}
          />
          {errors.expiryDate && <div style={{ color: 'red', fontSize: '12px' }}>{errors.expiryDate}</div>}
        </div>

        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={paymentDetails.cvv}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
            placeholder="CVV"
            maxLength="4"
            style={{
              padding: '15px',
              fontSize: '16px',
              width: '100%',
              borderRadius: '8px',
              border: errors.cvv ? '2px solid red' : '2px solid #e5e7eb',
              fontWeight: '600',
            }}
          />
          {errors.cvv && <div style={{ color: 'red', fontSize: '12px' }}>{errors.cvv}</div>}
        </div>
      </div>

      {/* Cardholder Name */}
      <input
        type="text"
        value={paymentDetails.cardName}
        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
        placeholder="Cardholder Name"
        style={{
          padding: '15px',
          fontSize: '16px',
          width: '100%',
          borderRadius: '8px',
          border: errors.cardName ? '2px solid red' : '2px solid #e5e7eb',
          fontWeight: '600',
        }}
      />
      {errors.cardName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.cardName}</div>}

      {/* Card Details Helper Text */}
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#6b7280' }}>
        <p>By entering your card details, you agree to our Terms & Conditions and Privacy Policy.</p>
      </div>

      {/* Payment Button */}
      <button
        onClick={handleSubmit}
        style={{
          padding: '15px 30px',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
