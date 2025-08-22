import React from 'react';
import { useBooking } from '../context/bookingContext';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationStep() {
  const { confirmedBooking } = useBooking();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ marginBottom: '15px', fontSize: '28px', fontWeight: '600', color: '#059669' }}>
        Booking Confirmed!
      </h2>
      <p style={{ marginBottom: '30px', fontSize: '18px', color: '#6b7280' }}>
        Your service has been booked successfully. A professional will arrive at your location.
      </p>

      <div style={{
        background: '#f0f9ff',
        border: '1px solid #0369a1',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        textAlign: 'left'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#0369a1' }}>Booking Details</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          <div><strong>Service:</strong> {confirmedBooking.serviceName}</div>
          <div><strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}</div>
          <div><strong>Address:</strong> {confirmedBooking.address}</div>
          <div><strong>Phone:</strong> {confirmedBooking.phone}</div>
          <div><strong>Amount to Paid:</strong> ${confirmedBooking.totalPrice}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button onClick={() => navigate(`/tracking/${confirmedBooking.id}`)} className="btn btn-primary" style={{ padding: '12px 24px' }}>Track Service</button>
        <button className="btn btn-secondary" style={{ padding: '12px 24px' }}>View Receipt</button>
      </div>
    </div>
  );
}
