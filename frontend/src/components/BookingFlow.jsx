import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useBooking } from '../context/bookingContext'; // Import the context
import ScheduleStep from './ScheduleStep';
import DetailsStep from './DetailsStep';
import PaymentStep from './PaymentStep';
import ConfirmationStep from './ConfirmationStep';

const apiUrl = import.meta.env.VITE_API_URL;

export default function BookingFlow() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    currentStep,
    setCurrentStep,
    bookingDetails,
    setBookingDetails,
    paymentDetails,
    setPaymentDetails,
    user,
    setUser,
    service,
    setService,
    confirmedBooking,
    setConfirmedBooking,
    steps
  } = useBooking();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('Please log in to proceed with the booking.');
      navigate('/');
    } else {
      setUser(userData);
      setBookingDetails({ ...bookingDetails, address: userData.address, phone: userData.phone });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        let matched = null;
        if (location.pathname.includes('/online-services/')) {
          const response = await axios.get(`${apiUrl}/api/online-services/${id}`, { withCredentials: true });
          matched = response.data;
        } else if (location.pathname.includes('/premium-services/')) {
          const response = await axios.get(`${apiUrl}/api/premium-services/${id}`, { withCredentials: true });
          matched = response.data;
        } else if (location.pathname.includes('/service/')) {
          const response = await axios.get(`${apiUrl}/api/service-categories/services/${id}`, { withCredentials: true });
          matched = response.data;
        }
        setService(matched);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };
    fetchServiceData();
  }, [id, location.pathname]);

  const storedBookingData = JSON.parse(localStorage.getItem("bookingData")); 
  const { serviceId, totalPrice, addons, quantity } = storedBookingData || {};

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleBookingConfirm = async () => {
    const bookingData = {
      userId: user.id,
      serviceName: service.name,
      date: bookingDetails.date,
      time: bookingDetails.time,
      address: bookingDetails.address,
      phone: bookingDetails.phone,
      instructions: bookingDetails.instructions,
      paymentMethod: bookingDetails.paymentMethod,
      paymentDetails: paymentDetails.cardName,
      totalPrice: totalPrice // Assuming price is from the service data
    };

    try {
      const response = await axios.post(`${apiUrl}/api/bookings/create`, bookingData, { withCredentials: true });
      const userConfirmed = window.confirm('Do you want to confirm the booking?');

      if (userConfirmed) {
        const bookingId = response.data.booking._id;
        const confirmedResponse = await axios.get(`${apiUrl}/api/bookings/confirm/${bookingId}`, { withCredentials: true });
        setConfirmedBooking(confirmedResponse.data.booking);
        setCurrentStep(4);
      } else {
        navigate("/orders");
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error confirming your booking.');
    }
  };

  if (!service) {
    return (
      <div style={{ padding: '40px 20px', minHeight: '80vh', textAlign: 'center' }}>
        <h2>Loading service details...</h2>
      </div>
    );
  }

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Progress Steps */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: currentStep >= step.id ? '#6366f1' : '#e5e7eb',
                      color: currentStep >= step.id ? 'white' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                      marginBottom: '8px',
                    }}
                  >
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{step.title}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      background: currentStep > step.id ? '#6366f1' : '#e5e7eb',
                      margin: '0 10px',
                      marginTop: '-20px',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          {currentStep === 1 && <ScheduleStep />}
          {currentStep === 2 && <DetailsStep />}
          {currentStep === 3 && <PaymentStep />}
          {currentStep === 4 && <ConfirmationStep />}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
              <button
                className="btn btn-secondary"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                style={{
                  padding: '12px 24px',
                  opacity: currentStep === 1 ? 0.5 : 1,
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
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
