import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    address: '',
    phone: '',
    instructions: '',
    paymentMethod: 'card',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [user, setUser] = useState(null);
  const [service, setService] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const steps = [
    { id: 1, title: 'Schedule', description: 'Choose date and time' },
    { id: 2, title: 'Details', description: 'Address and instructions' },
    { id: 3, title: 'Payment', description: 'Payment information' },
    { id: 4, title: 'Confirmation', description: 'Booking confirmed' }
  ];

  

  return (
    <BookingContext.Provider
      value={{
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
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
