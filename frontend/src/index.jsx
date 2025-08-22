import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookingProvider } from './context/bookingContext';  // Import the BookingProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookingProvider>  {/* Wrap App with BookingProvider */}
      <App />
    </BookingProvider>
  </React.StrictMode>
);
