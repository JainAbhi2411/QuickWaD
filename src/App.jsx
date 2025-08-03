
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCategories from "./components/ServiceCategories";
import ServiceDetails from "./components/ServiceDetails";
import BookingFlow from "./components/BookingFlow";
import ProfilePage from "./components/ProfilePage";
import OrderHistory from "./components/OrderHistory";
import SearchResults from "./components/SearchResults";
import CartPage from "./components/CartPage";
import ServiceTracking from "./components/ServiceTracking";
import Reviews from "./components/Reviews";
import PremiumFeatures from "./components/PremiumFeatures";
import OnlineServices from "./components/OnlineServices";
import HowItWorks from "./components/HowItWorks";
import ClientReviews from "./components/ClientReviews";
import TrustedSection from "./components/TrustedSection";
import Footer from "./components/Footer";
import ExploreAllServices from "./components/ExploreAllServices";

// Home Page Component
function HomePage({ selectedService, setSelectedService, exploreCategory, setExploreCategory }) {
  const navigate = useNavigate();

  return (
    <>
      <Hero onSearch={(query) => navigate(`/search?q=${query}`)} />
      <OnlineServices
        onServiceSelect={(service) => {
          setSelectedService(service);
          navigate("/service-details");
        }}
      />
      <ServiceCategories
        onServiceSelect={(service) => {
          setSelectedService(service);
          navigate("/service-details");
        }}
        onExploreAll={(category) => {
          setExploreCategory(category);
          navigate("/explore-all");
        }}
      />
      <HowItWorks />
      <PremiumFeatures
        onServiceSelect={(service) => {
          setSelectedService(service);
          navigate("/service-details");
        }}
      />
      <ClientReviews />
      <TrustedSection />
    </>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Service Reminder",
      message: "Your house cleaning is scheduled for tomorrow at 2 PM",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Booking Confirmed",
      message: "Your plumbing repair service has been confirmed",
      time: "1 day ago",
      read: false,
    },
  ]);
  const [exploreCategory, setExploreCategory] = useState(null);

  useEffect(() => {
    // Simulate user login check
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const addToCart = (service) => {
    setCart([...cart, { ...service, id: Date.now() }]);
    // Add success notification
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "Added to Cart",
        message: `${service.name} has been added to your cart`,
        time: "Just now",
        read: false,
      },
    ]);
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
      setBookingStep(1);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          cart={cart}
          notifications={notifications}
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  exploreCategory={exploreCategory}
                  setExploreCategory={setExploreCategory}
                />
              } 
            />
            <Route 
              path="/service-details" 
              element={
                <ServiceDetails
                  service={selectedService}
                  onBookNow={() => window.location.href = "/booking"}
                  onAddToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/booking" 
              element={
                <BookingFlow
                  service={selectedService}
                  cart={cart}
                  currentStep={bookingStep}
                  onStepChange={setBookingStep}
                  user={user}
                />
              } 
            />
            <Route 
              path="/profile" 
              element={<ProfilePage user={user} onUpdateUser={setUser} />} 
            />
            <Route 
              path="/orders" 
              element={<OrderHistory user={user} />} 
            />
            <Route 
              path="/search" 
              element={
                <SearchResults
                  query={searchQuery}
                  onServiceSelect={(service) => {
                    setSelectedService(service);
                    window.location.href = "/service-details";
                  }}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage
                  cart={cart}
                  onUpdateCart={updateCart}
                  onRemoveFromCart={removeFromCart}
                  onClearCart={clearCart}
                  onProceedToCheckout={() => {
                    handleProceedToCheckout();
                    window.location.href = "/booking";
                  }}
                />
              } 
            />
            <Route 
              path="/tracking" 
              element={
                <ServiceTracking
                  bookingId="SP001"
                  onClose={() => window.location.href = "/orders"}
                />
              } 
            />
            <Route 
              path="/reviews" 
              element={
                <Reviews
                  serviceId={selectedService?.id}
                  onClose={() => window.location.href = "/service-details"}
                />
              } 
            />
            <Route 
              path="/premium" 
              element={
                <PremiumFeatures
                  onServiceSelect={(service) => {
                    setSelectedService(service);
                    window.location.href = "/service-details";
                  }}
                />
              } 
            />
            <Route 
              path="/explore-all" 
              element={
                <ExploreAllServices
                  categoryId={exploreCategory?.id}
                  onServiceSelect={(service) => {
                    setSelectedService(service);
                    window.location.href = "/service-details";
                  }}
                  onBackToHome={() => window.location.href = "/"}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
