
import React, { useState, useRef } from 'react';

const serviceCategories = [
  {
    id: 1,
    name: 'Home Cleaning',
    icon: '🏠',
    description: 'Professional home cleaning services',
    serviceCount: 12,
    services: [
      { id: 101, name: 'Deep House Cleaning', price: 120, rating: 4.8, duration: '3-4 hours', description: 'Complete deep cleaning of your entire home', image: '🏡', features: ['All rooms cleaned', 'Kitchen appliances', 'Bathroom sanitization', 'Floor mopping & vacuuming'] },
      { id: 102, name: 'Regular House Cleaning', price: 80, rating: 4.7, duration: '2-3 hours', description: 'Weekly/bi-weekly house cleaning', image: '🧹', features: ['Dusting & wiping', 'Floor cleaning', 'Trash removal', 'Basic organization'] },
      { id: 103, name: 'Kitchen Deep Clean', price: 60, rating: 4.9, duration: '2 hours', description: 'Thorough kitchen cleaning including appliances', image: '🍳', features: ['Oven & microwave cleaning', 'Cabinet wiping', 'Sink & faucet polish', 'Countertop sanitization'] },
      { id: 104, name: 'Bathroom Deep Clean', price: 45, rating: 4.8, duration: '1.5 hours', description: 'Complete bathroom sanitization', image: '🚿', features: ['Toilet deep clean', 'Shower & tub scrubbing', 'Mirror & fixture polish', 'Floor disinfection'] },
      { id: 105, name: 'Carpet Cleaning', price: 80, rating: 4.6, duration: '2 hours', description: 'Professional carpet steam cleaning', image: '🟫', features: ['Steam cleaning', 'Stain removal', 'Deodorization', 'Fast drying technique'] },
      { id: 106, name: 'Window Cleaning', price: 40, rating: 4.7, duration: '1 hour', description: 'Interior and exterior window cleaning', image: '🪟', features: ['Streak-free cleaning', 'Frame wiping', 'Sill cleaning', 'Safety assured'] },
      { id: 107, name: 'Sofa & Upholstery Cleaning', price: 70, rating: 4.8, duration: '2 hours', description: 'Professional furniture cleaning', image: '🛋️', features: ['Fabric-specific cleaning', 'Stain treatment', 'Odor removal', 'Quick drying'] },
      { id: 108, name: 'Post-Construction Cleaning', price: 150, rating: 4.9, duration: '4-5 hours', description: 'Complete cleanup after renovation', image: '🏗️', features: ['Dust removal', 'Paint splatter cleanup', 'Debris clearing', 'Deep sanitization'] }
    ]
  },
  {
    id: 2,
    name: 'Home Repairs',
    icon: '🔧',
    description: 'Expert repair and maintenance services',
    serviceCount: 15,
    services: [
      { id: 201, name: 'Plumbing Repair', price: 90, rating: 4.8, duration: '1-2 hours', description: 'Fix leaks, unclog drains, repair fixtures', image: '🔧', features: ['Leak detection & repair', 'Drain unclogging', 'Fixture installation', 'Emergency service'] },
      { id: 202, name: 'Electrical Work', price: 100, rating: 4.9, duration: '1-3 hours', description: 'Wiring, switches, outlet installation', image: '⚡', features: ['Safety certified', 'Switch installation', 'Outlet repair', 'Wiring solutions'] },
      { id: 203, name: 'AC Service & Repair', price: 120, rating: 4.7, duration: '2-3 hours', description: 'AC maintenance and repair services', image: '❄️', features: ['Filter replacement', 'Gas refilling', 'Coil cleaning', 'Temperature calibration'] },
      { id: 204, name: 'Appliance Repair', price: 85, rating: 4.6, duration: '1-2 hours', description: 'Repair washing machines, refrigerators, etc.', image: '🔌', features: ['Multi-brand service', 'Genuine parts', 'Warranty included', 'Home visit'] },
      { id: 205, name: 'Painting Services', price: 200, rating: 4.8, duration: '4-6 hours', description: 'Interior and exterior painting', image: '🎨', features: ['Premium paints', 'Surface preparation', 'Clean finish', 'Color consultation'] },
      { id: 206, name: 'Furniture Assembly', price: 50, rating: 4.7, duration: '1-2 hours', description: 'Assembly of furniture and fixtures', image: '🪑', features: ['Expert assembly', 'Tool provided', 'Cleanup included', 'Installation support'] },
      { id: 207, name: 'Tile & Flooring Repair', price: 80, rating: 4.8, duration: '2-3 hours', description: 'Tile replacement and flooring solutions', image: '🟫', features: ['Tile matching', 'Grout repair', 'Floor leveling', 'Quality materials'] },
      { id: 208, name: 'Door & Window Repair', price: 75, rating: 4.7, duration: '1-2 hours', description: 'Fix doors, windows, and locks', image: '🚪', features: ['Lock repair', 'Hinge adjustment', 'Weather sealing', 'Security upgrade'] }
    ]
  },
  {
    id: 3,
    name: 'Beauty & Wellness',
    icon: '💆‍♀️',
    description: 'Professional beauty and wellness services',
    serviceCount: 18,
    services: [
      { id: 301, name: 'Hair Cut & Styling', price: 45, rating: 4.9, duration: '1 hour', description: 'Professional haircut and styling at home', image: '✂️', features: ['Expert stylists', 'Latest trends', 'Hair wash included', 'Style consultation'] },
      { id: 302, name: 'Facial Treatment', price: 80, rating: 4.8, duration: '1.5 hours', description: 'Relaxing facial treatment at your doorstep', image: '💆‍♀️', features: ['Deep cleansing', 'Anti-aging treatment', 'Natural products', 'Skin analysis'] },
      { id: 303, name: 'Massage Therapy', price: 100, rating: 4.9, duration: '1 hour', description: 'Therapeutic full body massage', image: '💆‍♂️', features: ['Swedish massage', 'Deep tissue', 'Aromatherapy oils', 'Stress relief'] },
      { id: 304, name: 'Manicure & Pedicure', price: 55, rating: 4.7, duration: '1.5 hours', description: 'Professional nail care services', image: '💅', features: ['Nail shaping', 'Cuticle care', 'Polish application', 'Hand & foot massage'] },
      { id: 305, name: 'Makeup Services', price: 75, rating: 4.8, duration: '1 hour', description: 'Professional makeup for events', image: '💄', features: ['Event makeup', 'High-quality products', 'Long-lasting', 'Touch-up kit'] },
      { id: 306, name: 'Eyebrow Threading', price: 25, rating: 4.6, duration: '30 minutes', description: 'Precise eyebrow shaping', image: '🎯', features: ['Precise shaping', 'Pain-free technique', 'Perfect arch', 'Quick service'] },
      { id: 307, name: 'Hair Spa Treatment', price: 90, rating: 4.8, duration: '2 hours', description: 'Complete hair rejuvenation therapy', image: '🧴', features: ['Hair mask', 'Scalp massage', 'Protein treatment', 'Hair strengthening'] },
      { id: 308, name: 'Bridal Makeup', price: 150, rating: 4.9, duration: '2-3 hours', description: 'Complete bridal beauty package', image: '👰', features: ['Trial session', 'HD makeup', 'Hair styling', 'Accessories setup'] }
    ]
  },
  {
    id: 4,
    name: 'Appliance Services',
    icon: '📱',
    description: 'Device repair and maintenance',
    serviceCount: 10,
    services: [
      { id: 401, name: 'Phone Screen Repair', price: 80, rating: 4.7, duration: '1 hour', description: 'Screen replacement for all phone models', image: '📱', features: ['All brands supported', 'Original quality screen', 'Data protection', 'Warranty included'] },
      { id: 402, name: 'Laptop Repair', price: 120, rating: 4.8, duration: '2-3 hours', description: 'Hardware and software laptop repairs', image: '💻', features: ['Hardware diagnosis', 'Software troubleshooting', 'Data recovery', 'Performance optimization'] },
      { id: 403, name: 'TV Wall Mounting', price: 60, rating: 4.9, duration: '1 hour', description: 'Professional TV mounting service', image: '📺', features: ['Wall type assessment', 'Cable management', 'Secure mounting', 'Angle adjustment'] },
      { id: 404, name: 'Microwave Repair', price: 70, rating: 4.6, duration: '1 hour', description: 'Microwave troubleshooting and repair', image: '📡', features: ['Common issues fixed', 'Safety testing', 'Genuine parts', 'Quick turnaround'] },
      { id: 405, name: 'Washing Machine Service', price: 90, rating: 4.7, duration: '1-2 hours', description: 'Washing machine repair and maintenance', image: '🧺', features: ['All brands serviced', 'Drum cleaning', 'Filter replacement', 'Performance check'] },
      { id: 406, name: 'Refrigerator Repair', price: 110, rating: 4.8, duration: '1-2 hours', description: 'Complete refrigerator maintenance', image: '🧊', features: ['Cooling system repair', 'Thermostat calibration', 'Gas refilling', 'Energy efficiency'] }
    ]
  },
  {
    id: 5,
    name: 'Pest Control',
    icon: '🐛',
    description: 'Professional pest control solutions',
    serviceCount: 8,
    services: [
      { id: 501, name: 'General Pest Control', price: 100, rating: 4.8, duration: '2 hours', description: 'Complete pest control treatment', image: '🏠', features: ['Safe chemicals', 'All pest types', 'Long-lasting effect', 'Follow-up service'] },
      { id: 502, name: 'Termite Treatment', price: 150, rating: 4.9, duration: '3 hours', description: 'Professional termite elimination', image: '🐜', features: ['Pre & post construction', 'Chemical barrier', 'Wood protection', '5-year warranty'] },
      { id: 503, name: 'Cockroach Control', price: 80, rating: 4.7, duration: '1.5 hours', description: 'Targeted cockroach elimination', image: '🪳', features: ['Gel treatment', 'Kitchen-safe methods', 'Breeding control', 'Prevention tips'] },
      { id: 504, name: 'Bed Bug Treatment', price: 120, rating: 4.6, duration: '2-3 hours', description: 'Complete bed bug removal', image: '🛏️', features: ['Heat treatment', 'Mattress protection', 'Multiple sessions', 'Effective elimination'] },
      { id: 505, name: 'Mosquito Control', price: 60, rating: 4.7, duration: '1 hour', description: 'Indoor and outdoor mosquito control', image: '🦟', features: ['Fogging treatment', 'Breeding source elimination', 'Safe for family', 'Seasonal packages'] }
    ]
  },
  {
    id: 6,
    name: 'Home Security',
    icon: '🔒',
    description: 'Security system installation and maintenance',
    serviceCount: 6,
    services: [
      { id: 601, name: 'CCTV Installation', price: 200, rating: 4.9, duration: '3-4 hours', description: 'Professional security camera setup', image: '📹', features: ['HD cameras', 'Night vision', 'Mobile app access', 'Cloud storage'] },
      { id: 602, name: 'Smart Lock Installation', price: 120, rating: 4.8, duration: '1 hour', description: 'Smart door lock installation', image: '🔐', features: ['Biometric access', 'Mobile control', 'Multiple users', 'Emergency backup'] },
      { id: 603, name: 'Alarm System Setup', price: 180, rating: 4.7, duration: '2-3 hours', description: 'Home security alarm installation', image: '🚨', features: ['Motion sensors', '24/7 monitoring', 'Mobile alerts', 'Professional monitoring'] },
      { id: 604, name: 'Intercom System', price: 150, rating: 4.8, duration: '2 hours', description: 'Video intercom installation', image: '📞', features: ['Video calling', 'Door unlock', 'Visitor recording', 'Multi-unit support'] }
    ]
  }
];

export default function ServiceCategories({ onServiceSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const scrollContainerRef = useRef(null);

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

  if (selectedCategory && showAllServices) {
    return (
      <section className="service-categories" style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
        <div className="categories-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setShowAllServices(false);
                setSelectedCategory(null);
              }}
            >
              ← Back to Categories
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => setShowAllServices(false)}
              style={{ background: 'white', border: '1px solid #e5e7eb' }}
            >
              ← Back to {selectedCategory.name}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '15px', color: '#1f2937' }}>
              All {selectedCategory.name} Services
            </h1>
            <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Explore our complete range of {selectedCategory.name.toLowerCase()} services with detailed features and professional quality
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '30px',
            marginBottom: '50px'
          }}>
            {selectedCategory.services.map(service => (
              <div 
                key={service.id} 
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  transform: 'scale(1)'
                }}
                onClick={() => onServiceSelect(service)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Service Image Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  position: 'relative'
                }}>
                  {service.image}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#059669'
                  }}>
                    ⭐ {service.rating}
                  </div>
                </div>

                {/* Service Content */}
                <div style={{ padding: '25px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      marginBottom: '8px', 
                      color: '#1f2937',
                      lineHeight: '1.3'
                    }}>
                      {service.name}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      lineHeight: '1.5',
                      marginBottom: '15px'
                    }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Price & Duration */}
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
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>
                        ${service.price}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Duration: {service.duration}
                      </div>
                    </div>
                    <div style={{
                      background: '#059669',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Book Now
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
                      What's Included:
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {service.features.map((feature, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
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
                            fontSize: '10px',
                            color: 'white',
                            flexShrink: 0
                          }}>
                            ✓
                          </div>
                          <span style={{ color: '#374151', fontWeight: '500' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (selectedCategory) {
    return (
      <section className="service-categories">
        <div className="categories-container">
          <button 
            className="btn btn-secondary" 
            style={{ marginBottom: '30px' }}
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">{selectedCategory.name}</h2>
            <p className="section-subtitle">{selectedCategory.description}</p>
            
            <button
              onClick={() => setShowAllServices(true)}
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
              🔍 Explore All {selectedCategory.serviceCount} Services with Features
            </button>
          </div>
          
          <div className="services-grid">
            {selectedCategory.services.slice(0, 6).map(service => (
              <div key={service.id} className="service-card" onClick={() => onServiceSelect(service)}>
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
        <h2 className="section-title">Our Services</h2>
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
            {serviceCategories.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                onClick={() => setSelectedCategory(category)}
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
                  {category.serviceCount} services available
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
