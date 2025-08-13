import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // To make HTTP requests
const apiUrl = import.meta.env.VITE_API_URL;



export default function BookOurExperts() {
  const [expertServices, setExpertServices] = useState([]); // State to hold expert services data
  const [loading, setLoading] = useState(true); // Loading state for the API request
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  // Fetch expert services data from the backend
  useEffect(() => {
    const fetchExpertServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/expert-services`, { withCredentials: true }); // Adjust the API URL as per your backend
        setExpertServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expert services:', error);
        setLoading(false);
      }
    };

    fetchExpertServices();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320; // Width of each card + gap
    const scrollAmount = cardWidth * 1.5;
    const newScrollLeft = direction === 'left'
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleExpertClick = (expertId) => {
    navigate(`/expert/${expertId}`);
  };

  if (loading) {
    return <div>Loading expert services...</div>;
  }

  return (
    <section className="book-our-experts">
      <div className="categories-container">
        <h2 className="section-title">
          Book Our Experts
        </h2>
        <p className="section-subtitle">
          Choose from our skilled experts for your next project or event
        </p>

        {/* Scrollable Experts Container */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.9,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              fontSize: '18px',
              color: '#1f2937',
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.9';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ←
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.9,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              fontSize: '18px',
              color: '#1f2937',
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.9';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            →
          </button>

          {/* Scrollable Experts Cards */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '25px',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              paddingBottom: '20px',
              maskImage: 'linear-gradient(to right, transparent, white 40px, white calc(100% - 40px), transparent)',
            }}
          >
            {expertServices.map(expert => (
              <div
                key={expert._id}
                className="expert-card"
                onClick={() => handleExpertClick(expert._id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>{expert.icon}</div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
                  {expert.name}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5', marginBottom: '15px' }}>
                  {expert.description}
                </p>
                <div
                  style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {expert.serviceCount} services available
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
