import React from 'react';
import { useBooking } from '../context/bookingContext';

export default function DetailsStep() {
  const { bookingDetails, setBookingDetails } = useBooking();

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Service Details
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Service Address</label>
        <textarea
          value={bookingDetails.address}
          onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
          placeholder="Enter your complete address..."
          style={{
            width: '100%',
            height: '80px',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            resize: 'vertical'
          }}
          
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contact Phone</label>
        <input
          type="tel"
          value={bookingDetails.phone}
          onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
          placeholder="Your phone number"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Special Instructions (Optional)
        </label>
        <textarea
          value={bookingDetails.instructions}
          onChange={(e) => setBookingDetails({ ...bookingDetails, instructions: e.target.value })}
          placeholder="Any special instructions or requirements..."
          style={{
            width: '100%',
            height: '100px',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            resize: 'vertical'
          }}
        />
      </div>
    </div>
  );
}
