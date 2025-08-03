
import React, { useState } from 'react';

export default function BookingFlow({ service, cart, currentStep, onStepChange, user }) {
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    address: user?.address || '',
    phone: user?.phone || '',
    instructions: '',
    paymentMethod: 'card'
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const steps = [
    { id: 1, title: 'Schedule', description: 'Choose date and time' },
    { id: 2, title: 'Details', description: 'Address and instructions' },
    { id: 3, title: 'Payment', description: 'Payment information' },
    { id: 4, title: 'Confirmation', description: 'Booking confirmed' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const handleBookingConfirm = () => {
    // Simulate booking confirmation
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    onStepChange(4);
  };

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Progress Steps */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: currentStep >= step.id ? '#6366f1' : '#e5e7eb',
                    color: currentStep >= step.id ? 'white' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{step.title}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: currentStep > step.id ? '#6366f1' : '#e5e7eb',
                    margin: '0 10px',
                    marginTop: '-20px'
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          
          {/* Step 1: Schedule */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
                Schedule Your Service
              </h2>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
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
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: '500' }}>
                  Select Time Slot
                </label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '10px' 
                }}>
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setBookingDetails({...bookingDetails, time})}
                      style={{
                        padding: '12px',
                        border: bookingDetails.time === time ? '2px solid #6366f1' : '1px solid #e5e7eb',
                        background: bookingDetails.time === time ? '#f8faff' : 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div>
              <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
                Service Details
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Service Address
                </label>
                <textarea
                  value={bookingDetails.address}
                  onChange={(e) => setBookingDetails({...bookingDetails, address: e.target.value})}
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
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
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
                  onChange={(e) => setBookingDetails({...bookingDetails, instructions: e.target.value})}
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
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
                Payment Information
              </h2>

              {/* Order Summary */}
              <div style={{ 
                background: '#f9fafb', 
                padding: '20px', 
                borderRadius: '8px', 
                marginBottom: '25px' 
              }}>
                <h3 style={{ marginBottom: '15px', fontWeight: '600' }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>{service?.name}</span>
                  <span>${service?.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Service Date</span>
                  <span>{bookingDetails.date} at {bookingDetails.time}</span>
                </div>
                <div style={{ 
                  borderTop: '1px solid #e5e7eb', 
                  paddingTop: '10px', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontWeight: '600',
                  fontSize: '18px'
                }}>
                  <span>Total</span>
                  <span>${service?.price}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: '500' }}>
                  Payment Method
                </label>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {['card', 'upi', 'wallet'].map(method => (
                    <button
                      key={method}
                      onClick={() => setBookingDetails({...bookingDetails, paymentMethod: method})}
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
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        placeholder="MM/YY"
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
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        placeholder="123"
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardName}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                      placeholder="John Doe"
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
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
                  <div><strong>Service:</strong> {service?.name}</div>
                  <div><strong>Date & Time:</strong> {bookingDetails.date} at {bookingDetails.time}</div>
                  <div><strong>Address:</strong> {bookingDetails.address}</div>
                  <div><strong>Phone:</strong> {bookingDetails.phone}</div>
                  <div><strong>Amount Paid:</strong> ${service?.price}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
                  Track Service
                </button>
                <button className="btn btn-secondary" style={{ padding: '12px 24px' }}>
                  View Receipt
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                className="btn btn-secondary"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                style={{ 
                  padding: '12px 24px',
                  opacity: currentStep === 1 ? 0.5 : 1,
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={currentStep === 3 ? handleBookingConfirm : handleNext}
                style={{ padding: '12px 24px' }}
              >
                {currentStep === 3 ? 'Confirm Booking' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
