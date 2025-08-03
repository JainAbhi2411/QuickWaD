
import React, { useState } from 'react';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Your Home Services, On-Demand',
      subtitle: 'Book trusted professionals for home cleaning, repairs, beauty services and more',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🏠'
    },
    {
      title: 'Professional Beauty Services',
      subtitle: 'Spa-quality treatments in the comfort of your home',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '💆‍♀️'
    },
    {
      title: 'Expert Home Repairs',
      subtitle: 'Skilled technicians for all your maintenance needs',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '🔧'
    }
  ];

  const popularServices = [
    { name: 'House Cleaning', icon: '🏠', searches: '2.5k' },
    { name: 'Plumbing', icon: '🔧', searches: '1.8k' },
    { name: 'Beauty Services', icon: '💅', searches: '3.2k' },
    { name: 'Pest Control', icon: '🐛', searches: '900' },
    { name: 'Appliance Repair', icon: '🔌', searches: '1.1k' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" style={{ 
      background: slides[currentSlide].background,
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        animation: 'float 20s infinite linear'
      }} />

      <div className="hero-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Content */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>
            {slides[currentSlide].icon}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {slides[currentSlide].title}
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 3vw, 20px)',
            marginBottom: '0',
            maxWidth: '600px',
            margin: '0 auto 40px',
            opacity: 0.95
          }}>
            {slides[currentSlide].subtitle}
          </p>
        </div>
        
        {/* Enhanced Search */}
        <form className="hero-search" onSubmit={handleSearch} style={{
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          <input
            type="text"
            placeholder="What service do you need today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '20px 60px 20px 20px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '50px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#6366f1',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '18px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            🔍
          </button>
        </form>

        {/* Popular Services */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            Popular services:
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px', 
            flexWrap: 'wrap' 
          }}>
            {popularServices.map((service, index) => (
              <button
                key={index}
                onClick={() => onSearch(service.name)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '12px 20px',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span>{service.icon}</span>
                <span>{service.name}</span>
                <span style={{ 
                  background: 'rgba(255,255,255,0.3)', 
                  padding: '2px 6px', 
                  borderRadius: '10px',
                  fontSize: '12px'
                }}>
                  {service.searches}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          {[
            { icon: '✅', text: 'Verified Professionals', count: '10,000+' },
            { icon: '🛡️', text: 'Insured Services', count: '100%' },
            { icon: '⭐', text: 'Average Rating', count: '4.8/5' },
            { icon: '🏆', text: 'Happy Customers', count: '50,000+' }
          ].map((item, index) => (
            <div key={index} style={{ 
              background: 'rgba(255,255,255,0.15)', 
              padding: '15px 20px', 
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              minWidth: '120px'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>{item.icon}</div>
              <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.count}</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>{item.text}</div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px',
          marginTop: '20px'
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateX(-100px) translateY(-100px); }
          100% { transform: translateX(100vw) translateY(100vh); }
        }
      `}</style>
    </section>
  );
}
