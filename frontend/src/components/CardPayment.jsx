import React, { useState ,useEffect} from 'react';
import { useBooking } from '../context/bookingContext';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Card Type Detection using regex for simplicity
const getCardType = (cardNumber) => {
  const cardTypes = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{14}$/,
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
  const { paymentDetails, setPaymentDetails, setPaymentStatus , paymentStatus } = useBooking(); // Corrected use of context

  const [cardType, setCardType] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCountry: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [useSavedAddress, setUseSavedAddress] = useState(true);  // State to toggle between saved and new address
  const [newAddress, setNewAddress] = useState(''); // State to store the new address

  const storedBookingData = JSON.parse(localStorage.getItem('bookingData'));
  const { serviceId, totalPrice, addons, quantity,address } = storedBookingData || {};

   // Set default billing address to the saved address
  useEffect(() => {
    setPaymentDetails((prevState) => ({
      ...prevState,
      billingAddress: address, // Set the default address
    }));
  }, [address, setPaymentDetails]);

  

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value.replace(/\s/g, ''); // Remove spaces for validation
    setPaymentDetails({ ...paymentDetails, cardNumber });

    // Format the card number with spaces for easier reading
    const formattedCardNumber = formatCardNumber(cardNumber);
    setPaymentDetails({ ...paymentDetails, cardNumber: formattedCardNumber });

    // Detect card type based on the number
    setCardType(getCardType(cardNumber));
  };

  const handleSubmit = async (e) => {
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
      setIsProcessing(true);
      try {
        // Send payment details to the backend for processing (all methods using the same endpoint)
        const response = await axios.post(`${apiUrl}/api/bookings/payment`, {
          paymentMethod: 'card',  // Specify payment method
          paymentDetails,  // Send all payment details
          totalPrice: totalPrice,  // Assuming totalPrice is part of paymentDetails
        },{withCredentials: true});

        console.log(response.data);

        if (response.data.paymentStatus === 'confirmed') {
          // Payment is confirmed, update paymentStatus in the context
          alert('Payment successful!');
          setPaymentStatus('confirmed'); // Update payment status
        } else {
          alert('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('There was an issue with payment processing.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const cardIcons = {
    visa: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvw10q8UEI9-Pd4QJ5getpNSCZiuvzP0fMw&s',
    mastercard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaYFc0LxnBekf6fVV7eehPXk7qLTBPLM922w&s',
    amex: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJvoiJDpokzyIlgKZtfm3fpr2zv2kdW6hBg&s',
    discover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslI5EhEGQeZ15bfFh7Esho6L9BqRev8s9EQ&s',
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
        </select>
        {errors.billingCountry && <div style={{ color: 'red', fontSize: '12px' }}>{errors.billingCountry}</div>}
      </div>
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
        {cardType && (
          <img
            src={cardIcons[cardType]}
            alt={`${cardType} logo`}
            style={{
              width: '40px',
              marginLeft: '10px',
              objectFit: 'contain',
              borderRadius: '5px',
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
            }}
          />
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
            }}
          />
        </div>
      </div>

      {/* Cardholder Name */} <input type="text" value={paymentDetails.cardName} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })} placeholder="Cardholder Name" style={{ padding: '15px', fontSize: '16px', width: '100%', borderRadius: '8px', border: errors.cardName ? '2px solid red' : '2px solid #e5e7eb', fontWeight: '600', letterSpacing: '1px', }} /> {errors.cardName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.cardName}</div>} 
      {/* Billing Address - Saved or New */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="useSavedAddress" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
          Use Saved Address
        </label>
        <input
          type="checkbox"
          id="useSavedAddress"
          checked={useSavedAddress}
          onChange={() => setUseSavedAddress(!useSavedAddress)}
        />
        {useSavedAddress ? (
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="billingAddress" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
              Billing Address
            </label>
            <textarea
              id="billingAddress"
              value={paymentDetails.billingAddress || ''}
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
          </div>
        ) : (
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="newBillingAddress" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
              Enter New Billing Address
            </label>
            <textarea
              id="newBillingAddress"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="New Billing Address"
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
          </div>
        )}
      </div>
      {/* Submit Payment */}
      {paymentStatus !== 'confirmed' && ( // Conditionally render the button
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          style={{
            padding: '15px 30px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
          }}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      )}
    </div>
  );
}
