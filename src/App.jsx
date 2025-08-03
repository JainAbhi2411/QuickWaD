
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCategories from './components/ServiceCategories';
import ServiceDetails from './components/ServiceDetails';
import BookingFlow from './components/BookingFlow';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';
import OrderHistory from './components/OrderHistory';
import SearchResults from './components/SearchResults';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
    // Simulate user login check
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const addToCart = (service) => {
    setCart([...cart, { ...service, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onSearch={setSearchQuery} />
            <ServiceCategories 
              onServiceSelect={(service) => {
                setSelectedService(service);
                setCurrentPage('service-details');
              }}
            />
          </>
        );
      case 'service-details':
        return (
          <ServiceDetails 
            service={selectedService}
            onBookNow={() => setCurrentPage('booking')}
            onAddToCart={addToCart}
          />
        );
      case 'booking':
        return (
          <BookingFlow 
            service={selectedService}
            cart={cart}
            currentStep={bookingStep}
            onStepChange={setBookingStep}
            user={user}
          />
        );
      case 'profile':
        return (
          <ProfilePage 
            user={user}
            onUpdateUser={setUser}
          />
        );
      case 'orders':
        return <OrderHistory user={user} />;
      case 'search':
        return (
          <SearchResults 
            query={searchQuery}
            onServiceSelect={(service) => {
              setSelectedService(service);
              setCurrentPage('service-details');
            }}
          />
        );
      default:
        return (
          <>
            <Hero onSearch={setSearchQuery} />
            <ServiceCategories 
              onServiceSelect={(service) => {
                setSelectedService(service);
                setCurrentPage('service-details');
              }}
            />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onPageChange={setCurrentPage}
        cart={cart}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage('search');
        }}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
