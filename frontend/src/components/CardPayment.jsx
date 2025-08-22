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

// Helper function to format card number input as "#### #### #### ####"
const formatCardNumber = (cardNumber) => {
  return cardNumber.replace(/\s?/g, '').replace(/(.{4})/g, '$1 ').trim();
};

export default function CardPayment() {
  const { paymentDetails, setPaymentDetails } = useBooking();

  const [cardType, setCardType] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCountry: '',
  });

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value.replace(/\s/g, ''); // Remove spaces for validation
    setPaymentDetails({ ...paymentDetails, cardNumber });

    // Format the card number with spaces for easier reading
    const formattedCardNumber = formatCardNumber(cardNumber);
    setPaymentDetails({ ...paymentDetails, cardNumber: formattedCardNumber });

    // Detect card type based on the number
    setCardType(getCardType(cardNumber));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};

    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 19) {
      formErrors.cardNumber = 'Card number is required and should be 16 digits.';
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
    if (!paymentDetails.billingAddress) {
      formErrors.billingAddress = 'Billing address is required.';
    }
    if (!paymentDetails.billingCountry) {
      formErrors.billingCountry = 'Please select a billing country.';
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
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>Billing Information</h2>

      {/* Billing Country */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="billingCountry" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Billing Country</label>
        <select
          id="billingCountry"
          value={paymentDetails.billingCountry}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, billingCountry: e.target.value })}
          style={{
            padding: '12px',
            fontSize: '16px',
            width: '100%',
            borderRadius: '8px',
            border: errors.billingCountry ? '2px solid red' : '2px solid #e5e7eb',
            fontWeight: '600',
          }}
        >
          <option value="">Select a country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          {/* Add more countries as needed */}
        </select>
        {errors.billingCountry && <div style={{ color: 'red', fontSize: '12px' }}>{errors.billingCountry}</div>}
      </div>

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
            letterSpacing: '1px',
          }}
        />
        {/* Card Type Icon */}
        {cardType && (
          <img
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Visa_Logo.svg/500px-Visa_Logo.svg.png`} // Visa example (Replace with actual dynamic URLs)
            alt={`${cardType} logo`}
            style={{
              width: '40px',
              marginLeft: '10px',
              objectFit: 'contain',
              borderRadius: '5px',
              transition: 'transform 0.3s',
            }}
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
              letterSpacing: '1px',
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
              letterSpacing: '1px',
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
          letterSpacing: '1px',
        }}
      />
      {errors.cardName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.cardName}</div>}

      {/* Billing Address */}
      <textarea
        value={paymentDetails.billingAddress}
        onChange={(e) => setPaymentDetails({ ...paymentDetails, billingAddress: e.target.value })}
        placeholder="Billing Address"
        style={{
          padding: '15px',
          fontSize: '16px',
          width: '100%',
          height: '100px',
          borderRadius: '8px',
          border: errors.billingAddress ? '2px solid red' : '2px solid #e5e7eb',
          fontWeight: '600',
          letterSpacing: '1px',
        }}
      />
      {errors.billingAddress && <div style={{ color: 'red', fontSize: '12px' }}>{errors.billingAddress}</div>}

      {/* Accepted Cards */}
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
        <p style={{ fontWeight: '600' }}>We accept the following cards:</p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvw10q8UEI9-Pd4QJ5getpNSCZiuvzP0fMw&s" alt="Visa" style={{ width: '50px' }} />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaYFc0LxnBekf6fVV7eehPXk7qLTBPLM922w&s" alt="MasterCard" style={{ width: '50px' }} />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJvoiJDpokzyIlgKZtfm3fpr2zv2kdW6hBg&s" alt="American Express" style={{ width: '50px' }} />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslI5EhEGQeZ15bfFh7Esho6L9BqRev8s9EQ&s" alt="Discover" style={{ width: '50px' }} />
        </div>
      </div>

      {/* Submit Payment */}
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
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
      >
        Pay Now
      </button>
    </div>
  );
}
