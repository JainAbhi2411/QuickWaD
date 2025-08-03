import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCategories from './components/ServiceCategories';
import ServiceDetails from './components/ServiceDetails';
import BookingFlow from './components/BookingFlow';
import ProfilePage from './components/ProfilePage';
import OrderHistory from './components/OrderHistory';
import SearchResults from './components/SearchResults';
import CartPage from './components/CartPage';
import ServiceTracking from './components/ServiceTracking';
import Reviews from './components/Reviews';
import PremiumFeatures from './components/PremiumFeatures';
import OnlineServices from './components/OnlineServices';
import HowItWorks from './components/HowItWorks';
import ClientReviews from './components/ClientReviews';
import TrustedSection from './components/TrustedSection';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Service Reminder',
      message: 'Your house cleaning is scheduled for tomorrow at 2 PM',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your plumbing repair service has been confirmed',
      time: '1 day ago',
      read: false
    }
  ]);
  const [exploreCategory, setExploreCategory] = useState(null);

  useEffect(() => {
    // Simulate user login check
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
    // Add success notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      title: 'Added to Cart',
      message: `${service.name} has been added to your cart`,
      time: 'Just now',
      read: false
    }]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateCart = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index] = { ...updatedCart[index], quantity };
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      setSelectedService(cart[0]); // Use first item as primary service
      setCurrentPage('booking');
      setBookingStep(1);
    }
  };

  const renderPage = () => {
    const handleServiceSelect = (service) => {
      setSelectedService(service);
      setCurrentPage('service-details');
    };

    const handleSearch = (query) => {
      setSearchQuery(query);
      setCurrentPage('search');
    };

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onSearch={setSearchQuery} />
            <OnlineServices onServiceSelect={(service) => {
              setSelectedService(service);
              setCurrentPage('service-details');
            }} />
            <ServiceCategories 
              onServiceSelect={(service) => {
                setSelectedService(service);
                setCurrentPage('service-details');
              }}
              onExploreAll={(category) => {
                setExploreCategory(category);
                setCurrentPage('explore-all');
              }}
            />
            <HowItWorks />
            <PremiumFeatures 
              onServiceSelect={(service) => {
                setSelectedService(service);
                setCurrentPage('service-details');
              }}
            />
            <ClientReviews />
            <TrustedSection />
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
      case 'cart':
        return (
          <CartPage
            cart={cart}
            onUpdateCart={updateCart}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onProceedToCheckout={handleProceedToCheckout}
          />
        );
      case 'tracking':
        return (
          <ServiceTracking
            bookingId="SP001"
            onClose={() => setCurrentPage('orders')}
          />
        );
      case 'reviews':
        return (
          <Reviews
            serviceId={selectedService?.id}
            onClose={() => setCurrentPage('service-details')}
          />
        );
      case 'premium':
        return (
          <PremiumFeatures 
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
            <OnlineServices onServiceSelect={(service) => {
              setSelectedService(service);
              setCurrentPage('service-details');
            }} />
            <ServiceCategories 
              onServiceSelect={(service) => {
                setSelectedService(service);
                setCurrentPage('service-details');
              }}
              onExploreAll={(category) => {
                setExploreCategory(category);
                setCurrentPage('explore-all');
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
        notifications={notifications}
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