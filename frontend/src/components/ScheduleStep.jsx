import React from 'react';
import { useBooking } from '../context/bookingContext';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM'
];

export default function ScheduleStep() {
  const { bookingDetails, setBookingDetails } = useBooking();

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Schedule Your Service
      </h2>
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select Date</label>
        <input
          type="date"
          value={bookingDetails.date}
          onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '15px', fontWeight: '500' }}>Select Time Slot</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => setBookingDetails({ ...bookingDetails, time })}
              style={{
                padding: '12px',
                border: bookingDetails.time === time ? '2px solid #6366f1' : '1px solid #e5e7eb',
                background: bookingDetails.time === time ? '#f8faff' : 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
