import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed
const apiUrl = import.meta.env.VITE_API_URL;

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/service-categories/`);
        //console.log("response" , response); // Replace with your API
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
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
      behavior: 'smooth'
    });
  };

  const handleExploreAll = (categoryId) => {
    navigate(`/category/${categoryId}/services`);
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (selectedCategory) {
    return (
      <section className="service-categories">
        <div className="categories-container">
          <button
            className="btn btn-secondary"
            style={{ marginBottom: '30px' }}
            onClick={handleBack}
          >
            ← Back to Categories
          </button>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">{selectedCategory.name}</h2>
            <p className="section-subtitle">{selectedCategory.description}</p>

            <button
              onClick={() => handleExploreAll(selectedCategory._id)}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '30px',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
              }}
            >
              🔍 Explore All {selectedCategory.services.length} Services with Features
            </button>
          </div>

          <div className="services-grid">
            {selectedCategory.services.slice(0, 6).map(service => (
              <div key={service._id} className="service-card" onClick={() => handleServiceClick(service._id)}>
                <div className="service-image">
                  {service.image || selectedCategory.icon}
                </div>
                <div className="service-content">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                  <div className="service-price">${service.price}</div>
                  <div className="service-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">({service.rating}) • {service.duration}</span>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="service-categories">
      <div className="categories-container">
        <h2 className="section-title">Our Services Category</h2>
        <p className="section-subtitle">Choose from our wide range of professional services</p>

        {/* Categories with Arrow Navigation */}
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
              color: '#1f2937'
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
              color: '#1f2937'
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

          {/* Scrollable Categories Container */}
          <div 
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '25px',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              paddingBottom: '20px',
              maskImage: 'linear-gradient(to right, transparent, white 40px, white calc(100% - 40px), transparent)'
            }}
          >
            {categories.map(category => (
              <div
                key={category._id}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '30px',
                  minWidth: '280px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(0) scale(1)',
                  border: '1px solid #f1f5f9',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>{category.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>{category.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>{category.description}</p>
                <div style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {category.services.length} services available
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
