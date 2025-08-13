
import React, { useState, useRef ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // To make HTTP requests
const apiUrl = import.meta.env.VITE_API_URL;


export default function OnlineServices() {
  const navigate = useNavigate();
  const [onlineServices, setOnlineServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showExploreButton, setShowExploreButton] = useState(false); 

   // Fetch online services from the backend API
  useEffect(() => {
    const fetchOnlineServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/online-services`); // Fetch data from backend
        setOnlineServices(response.data); // Set the data to state
      } catch (err) {
        console.error('Error fetching online services:', err);
      }
    };

    fetchOnlineServices();
  }, []);

  //console.log("online" , onlineServices);

  const cardWidth = 320; // Width of each card + gap
  const visibleCards = Math.floor(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3.5);
  const maxIndex = Math.max(0, onlineServices.length - Math.floor(visibleCards));

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = cardWidth * Math.floor(visibleCards);
    const newScrollLeft = direction === 'left' 
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Update current index
    const newIndex = Math.round(newScrollLeft / cardWidth);
    setCurrentIndex(Math.min(maxIndex, Math.max(0, newIndex)));
  };

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'Popular': return '#ef4444';
      case 'Premium': return '#8b5cf6';
      case 'Business': return '#059669';
      case 'Tech': return '#3b82f6';
      case 'Creative': return '#f59e0b';
      default: return '#6b7280';
    }
  };

   // Function to handle when scroll position changes
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if the user has reached the last visible index
      const scrollPosition = container.scrollLeft + container.clientWidth;
      const totalWidth = container.scrollWidth;

      if (scrollPosition >= totalWidth - 100) {
        setShowExploreButton(true); // Show "Explore More" button
      } else {
        setShowExploreButton(false); // Hide button if not at the end
      }
    }
  };
   // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  const handleServiceClick = (id) => {
    navigate(`/online-services/${id}`);
  };
  const handleExploreMore = () => {
    navigate('/explore-online-services');
  };
  const totalIndicators = Math.ceil(onlineServices.length / Math.floor(visibleCards));


  return (
    <section 
      style={{ 
        padding: '80px 20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        animation: 'backgroundMove 30s infinite linear'
      }} />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Enhanced Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.15)',
            padding: '8px 20px',
            borderRadius: '25px',
            marginBottom: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <span style={{ fontSize: '16px' }}>🌐</span>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Digital Services</span>
          </div>
          
          <h2 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: '800', 
            color: 'white', 
            marginBottom: '15px',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            lineHeight: '1.2'
          }}>
            Professional Online Services
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.9)', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Get expert services delivered digitally - convenient, efficient, and available 24/7
          </p>
        </div>

        {/* Services Container with Arrow Navigation */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentIndex > 0 ? 'pointer' : 'not-allowed',
              opacity: currentIndex > 0 ? (isHovered ? 1 : 0.8) : 0.3,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              fontSize: '18px',
              color: '#1f2937'
            }}
            disabled={currentIndex === 0}
          >
            ←
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentIndex < maxIndex ? 'pointer' : 'not-allowed',
              opacity: currentIndex < maxIndex ? (isHovered ? 1 : 0.8) : 0.3,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              fontSize: '18px',
              color: '#1f2937'
            }}
            disabled={currentIndex >= maxIndex}
          >
            →
          </button>

          {/* Scrollable Services Container */}
          <div 
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '25px',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              paddingBottom: '20px',
              maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
            }}
          >
            {onlineServices.slice(0, 7).map(service => (
              <div 
                key={service._id}
                onClick={() => handleServiceClick(service._id)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '30px',
                  minWidth: '300px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(0) scale(1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                }}
              >
                {/* Badge */}
                {service.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: getBadgeColor(service.badge),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {service.badge}
                  </div>
                )}

                {/* Service Icon & Header */}
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ 
                    fontSize: '48px', 
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: '3px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '17px'
                    }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>{service.icon}</span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#1f2937',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {service.name}
                  </h3>
                  
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '0'
                  }}>
                    {service.description}
                  </p>
                </div>

                {/* Service Features */}
                <div style={{ marginBottom: '25px' }}>
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      marginBottom: '8px',
                      fontSize: '13px'
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        background: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px'
                      }}>
                        ✓
                      </div>
                      <span style={{ color: '#374151', fontWeight: '500' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Rating Section */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '20px',
                  padding: '15px',
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '800', 
                      color: '#059669',
                      lineHeight: '1'
                    }}>
                      ${service.price}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      {service.duration}
                    </div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <span style={{ color: '#fbbf24', fontSize: '16px' }}>⭐</span>
                    <span style={{ 
                      fontWeight: '700', 
                      color: '#1f2937',
                      fontSize: '14px'
                    }}>
                      {service.rating}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  width: '100%',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  Book Online Service
                </button>
              </div>
            ))}
          </div>
          {/* Explore More Button (visible when scrolled to the last index) */}
        {showExploreButton && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={handleExploreMore}
              style={{
                background: '#6366f1',
                color: 'white',
                border: 'none',
                padding: '14px 30px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
            >
              Explore More Services
            </button>
          </div>
        )}

          {/* Progress Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '40px'
          }}>
            {Array.from({ length: totalIndicators }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    container.scrollTo({
                      left: index * cardWidth * Math.floor(visibleCards),
                      behavior: 'smooth'
                    });
                    setCurrentIndex(index);
                  }
                }}
                style={{
                  width: currentIndex === index ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: currentIndex === index 
                    ? 'white' 
                    : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '60px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: 'white', 
              marginBottom: '12px' 
            }}>
              Need a Custom Online Solution?
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '25px',
              maxWidth: '500px',
              margin: '0 auto 25px'
            }}>
              We create personalized digital services tailored to your specific business needs
            </p>
            <button style={{
              background: 'white',
              color: '#6366f1',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 30px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              Request Custom Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
