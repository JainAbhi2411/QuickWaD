import React, { useRef ,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
const apiUrl = import.meta.env.VITE_API_URL;

export default function PremiumFeatures() {
  const [premiumServices, setPremiumServices] = useState([]);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

    // Fetch premium services data on component mount
  useEffect(() => {
    const fetchPremiumServices = async () => {
      try {
        // Make an API request to your backend to fetch premium services
        const response = await axios.get(`${apiUrl}/api/premium-services`, { withCredentials: true });
        setPremiumServices(response.data); // Set the data to state
      } catch (error) {
        console.error('Error fetching premium services', error);
      }
    };

    fetchPremiumServices();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 380;
    const scrollAmount = cardWidth * 1.5;
    const newScrollLeft = direction === 'left'
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleServiceClick = (id) => {
    navigate(`/premium-services/${id}`);
  };

  return (
    <section style={{ padding: '50px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth:'1500px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '700', color: 'white', marginBottom: '15px' }}>
            Premium Services
          </h2>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto' }}>
            Luxury services with end-to-end management and professional execution
          </p>
        </div>

        {/* Arrows */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              borderRadius: '50%',
              width: '55px',
              height: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.9,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              fontSize: '20px',
              color: '#1f2937'
            }}
          >
            ←
          </button>

          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              borderRadius: '50%',
              width: '55px',
              height: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.9,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              fontSize: '20px',
              color: '#1f2937'
            }}
          >
            →
          </button>

          {/* Cards */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '30px',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              paddingBottom: '20px',
              maskImage: 'linear-gradient(to right, transparent, white 50px, white calc(100% - 50px), transparent)'
            }}
          >
            {premiumServices.map(service => (
              <div
                key={service._id}
                onClick={() => handleServiceClick(service._id)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '30px',
                  minWidth: '350px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(0) scale(1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>{service.icon}</div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5', marginBottom: '15px' }}>
                    {service.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    background: '#dcfce7',
                    color: '#166534',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {service.price}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#fbbf24' }}>⭐</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{service.rating}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>Key Features:</div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px'
                      }}>
                        <span style={{ color: '#059669' }}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // avoid triggering the card's click
                    handleServiceClick(service._id);
                  }}
                  style={{
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    width: '100%',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                >
                  View Details & Book
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '15px'
          }}>
            Need a Custom Service?
          </h3>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '25px'
          }}>
            We can create a personalized premium service package just for you
          </p>
          <button style={{
            background: 'white',
            color: '#6366f1',
            border: 'none',
            borderRadius: '8px',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Contact Our Concierge Team
          </button>
        </div>
      </div>
    </section>
  );
}
