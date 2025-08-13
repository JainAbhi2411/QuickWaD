import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCategories from "./components/ServiceCategories";
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
import AboutUs from "./components/AboutUs";
import Careers from "./components/Careers";
import SuccessStories from "./components/SuccessStories";
import PressAndMedia from './components/PressAndMedia';
import PartnerWithUs from './components/PartnerWithUs';
import ExploreOnlineServices from "./components/ExploreOnlineServices";
import BookOurExperts from "./components/BookOurExperts";
import ExpertDetails from "./components/expert-details";
import ExpertBookingFlow from "./components/expertbookingflow";
import ServiceCategoryDetail from "./components/ServiceCategoryDetail";
import OnlineServiceDetail from "./components/OnlineServiceDetail";
import PremiumServiceDetail from "./components/PremiumServiceDetail";
import ServiceDetails from "./components/ServiceDetails";



// HomePage component
function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Hero/>
      <ServiceCategories/>
      <BookOurExperts/>
      <OnlineServices />
      <HowItWorks />
      <PremiumFeatures />
      <ClientReviews />
      <TrustedSection />
      <AboutUs/>
    </>
  );
}

// AppRoutes for navigation without reload
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/service/:id" element={<ServiceDetails/>}/>
      <Route path="/service/:id" element={<ServiceCategoryDetail/>} />
      <Route path="/online-services/:id" element={<OnlineServiceDetail/>} />
      <Route path="/premium-services/:id" element={<PremiumServiceDetail/>} />
      <Route path="/expert/:id" element={<ExpertDetails/>}/>
      <Route path="/book-expert/:id" element={<ExpertBookingFlow/>} />

      <Route path="/service/:id/booking" element={<BookingFlow />} />
      <Route path="/online-services/:id/booking" element={<BookingFlow />} />
      <Route path="/premium-services/:id/booking" element={<BookingFlow />} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/tracking/:bookingId" element={<ServiceTracking />} />
      <Route path="/reviews" element={<Reviews onClose={() => navigate("/service-details")} />} />

      <Route path="/premium" element={<PremiumFeatures />} />
      <Route path="/category/:categoryId/services" element={<ExploreAllServices />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/client-reviews" element={<ClientReviews />} />
      <Route path="/trusted-section" element={<TrustedSection />} />
      <Route path="/ourservices" element={<ServiceCategories />} />
      <Route path="/About-us" element={<AboutUs/>}/>
      <Route path="/careers" element={<Careers />} />
      <Route path="/success-story" element={<SuccessStories/>}/>
      <Route path="/press-media" element={<PressAndMedia />} />
      <Route path="/partner-with-us" element={<PartnerWithUs />} />
      <Route path="/explore-online-services" element={<ExploreOnlineServices/>} />
    </Routes>
  );
}

// Main App
export default function App() {
  return (
    <Router>
      
      <div className="App">
        <Header    />
        <main className="main-content">
          <AppRoutes/>
        </main>
        <Footer />
      </div>
      
    </Router>
  );
}
