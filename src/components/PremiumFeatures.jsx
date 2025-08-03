
import React, { useState, useRef } from 'react';

const premiumServices = [
  {
    id: 1,
    name: 'Interior Designing',
    icon: '🏡',
    image: '🖼️',
    description: 'Transform your space with professional interior design services',
    price: 'Starting from $500',
    duration: '2-4 weeks',
    rating: 4.9,
    features: [
      'Space planning & layout design',
      '3D visualization & mockups',
      'Color scheme consultation',
      'Furniture & decor selection',
      'Project management',
      'Installation supervision'
    ],
    workflow: [
      { step: 1, title: 'Initial Consultation', description: 'Discuss your vision, budget, and requirements', duration: '1-2 hours' },
      { step: 2, title: 'Space Assessment', description: 'Professional site visit and measurements', duration: '2-3 hours' },
      { step: 3, title: 'Design Concept', description: '3D renders and mood boards creation', duration: '3-5 days' },
      { step: 4, title: 'Client Approval', description: 'Review and refine design proposals', duration: '1-2 days' },
      { step: 5, title: 'Implementation', description: 'Procurement and installation phase', duration: '1-3 weeks' },
      { step: 6, title: 'Final Walkthrough', description: 'Quality check and handover', duration: '1 day' }
    ],
    portfolio: [
      { title: 'Modern Living Room', image: '🛋️', client: 'Sarah M.' },
      { title: 'Luxury Bedroom', image: '🛏️', client: 'John D.' },
      { title: 'Contemporary Kitchen', image: '🍽️', client: 'Emily R.' }
    ]
  },
  {
    id: 2,
    name: 'Wedding Event Management',
    icon: '💒',
    image: '💐',
    description: 'Complete wedding planning and execution services',
    price: 'Starting from $2000',
    duration: '6-12 months',
    rating: 4.8,
    features: [
      'Venue selection & booking',
      'Vendor coordination',
      'Timeline management',
      'Decor & theme design',
      'Guest management',
      'Day-of coordination'
    ],
    workflow: [
      { step: 1, title: 'Dream Session', description: 'Understand your wedding vision and style', duration: '2 hours' },
      { step: 2, title: 'Budget Planning', description: 'Create detailed budget breakdown', duration: '1 week' },
      { step: 3, title: 'Venue & Vendors', description: 'Source and book venue, caterers, photographers', duration: '2-4 weeks' },
      { step: 4, title: 'Design & Decor', description: 'Theme development and decor planning', duration: '2-3 weeks' },
      { step: 5, title: 'Guest Management', description: 'Invitations, RSVPs, and seating arrangements', duration: '4-6 weeks' },
      { step: 6, title: 'Final Preparations', description: 'Timeline creation and rehearsal coordination', duration: '1-2 weeks' },
      { step: 7, title: 'Wedding Day', description: 'Full day coordination and execution', duration: '12-16 hours' }
    ],
    portfolio: [
      { title: 'Beach Wedding', image: '🏖️', client: 'Alex & Jamie' },
      { title: 'Garden Ceremony', image: '🌸', client: 'Mike & Lisa' },
      { title: 'Luxury Reception', image: '✨', client: 'David & Emma' }
    ]
  },
  {
    id: 3,
    name: 'Personal Chef Services',
    icon: '👨‍🍳',
    image: '🍽️',
    description: 'Private chef services for special occasions and daily meals',
    price: 'Starting from $150/meal',
    duration: 'Flexible',
    rating: 4.9,
    features: [
      'Menu customization',
      'Fresh ingredient sourcing',
      'Professional cooking',
      'Table service',
      'Dietary accommodations',
      'Kitchen cleanup'
    ],
    workflow: [
      { step: 1, title: 'Consultation Call', description: 'Discuss dietary preferences and occasion details', duration: '30 minutes' },
      { step: 2, title: 'Menu Planning', description: 'Custom menu creation and approval', duration: '1-2 days' },
      { step: 3, title: 'Ingredient Sourcing', description: 'Fresh, high-quality ingredient procurement', duration: '1 day' },
      { step: 4, title: 'Meal Preparation', description: 'Professional cooking at your location', duration: '2-4 hours' },
      { step: 5, title: 'Service & Presentation', description: 'Elegant plating and table service', duration: '1-2 hours' },
      { step: 6, title: 'Cleanup', description: 'Complete kitchen and dining area cleanup', duration: '1 hour' }
    ],
    portfolio: [
      { title: 'Anniversary Dinner', image: '🥂', client: 'Robert & Maria' },
      { title: 'Birthday Celebration', image: '🎂', client: 'Jennifer K.' },
      { title: 'Corporate Event', image: '🍾', client: 'Tech Solutions Inc.' }
    ]
  },
  {
    id: 4,
    name: 'Personal Training & Wellness',
    icon: '💪',
    image: '🏋️',
    description: 'Personalized fitness and wellness coaching at your home',
    price: 'Starting from $80/session',
    duration: '1-2 hours',
    rating: 4.7,
    features: [
      'Personalized workout plans',
      'Nutrition guidance',
      'Progress tracking',
      'Flexible scheduling',
      'Equipment provided',
      'Wellness coaching'
    ],
    workflow: [
      { step: 1, title: 'Fitness Assessment', description: 'Evaluate current fitness level and goals', duration: '1 hour' },
      { step: 2, title: 'Program Design', description: 'Create customized workout and nutrition plan', duration: '2-3 days' },
      { step: 3, title: 'Training Sessions', description: 'Regular guided workout sessions', duration: '1-2 hours each' },
      { step: 4, title: 'Progress Monitoring', description: 'Track improvements and adjust plans', duration: 'Ongoing' },
      { step: 5, title: 'Nutrition Support', description: 'Meal planning and dietary guidance', duration: 'Weekly check-ins' },
      { step: 6, title: 'Goal Achievement', description: 'Celebrate milestones and set new targets', duration: 'Monthly review' }
    ],
    portfolio: [
      { title: 'Weight Loss Journey', image: '⚖️', client: 'Amanda T.' },
      { title: 'Strength Building', image: '🏆', client: 'Marcus L.' },
      { title: 'Senior Fitness', image: '🧘', client: 'Eleanor W.' }
    ]
  }
];

export default function PremiumFeatures({ onServiceSelect }) {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 380; // Width of each card + gap
    const scrollAmount = cardWidth * 1.5;
    const newScrollLeft = direction === 'left' 
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (selectedService) {
    return (
      <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Back Button */}
          <button 
            onClick={() => setSelectedService(null)}
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px 20px',
              marginBottom: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Back to Premium Services
          </button>

          {/* Service Header */}
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '40px',
            marginBottom: '30px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px' }}>{selectedService.icon}</div>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
                  {selectedService.name}
                </h1>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '15px' }}>
                  {selectedService.description}
                </p>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                    {selectedService.price}
                  </span>
                  <span style={{ color: '#6b7280' }}>Duration: {selectedService.duration}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#fbbf24' }}>⭐</span>
                    <span style={{ fontWeight: '600' }}>{selectedService.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #e5e7eb'
            }}>
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'workflow', label: 'Process' },
                { id: 'portfolio', label: 'Portfolio' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? '#6366f1' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#6b7280',
                    border: 'none',
                    padding: '15px 25px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ padding: '40px' }}>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
                    What's Included
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {selectedService.features.map((feature, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        padding: '15px',
                        background: '#f8fafc',
                        borderRadius: '8px'
                      }}>
                        <span style={{ color: '#059669', fontSize: '18px' }}>✓</span>
                        <span style={{ fontWeight: '500' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflow Tab */}
              {activeTab === 'workflow' && (
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
                    Our Process
                  </h3>
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {selectedService.workflow.map((step, index) => (
                      <div key={step.step} style={{ 
                        display: 'flex',
                        gap: '20px',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          background: '#6366f1',
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600',
                          flexShrink: 0
                        }}>
                          {step.step}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                            {step.title}
                          </h4>
                          <p style={{ color: '#6b7280', marginBottom: '8px' }}>
                            {step.description}
                          </p>
                          <span style={{ 
                            fontSize: '14px', 
                            color: '#059669', 
                            background: '#dcfce7', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            fontWeight: '500'
                          }}>
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
                    Recent Projects
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                    {selectedService.portfolio.map((project, index) => (
                      <div key={index} style={{ 
                        background: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease'
                      }}>
                        <div style={{ 
                          height: '200px',
                          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px'
                        }}>
                          {project.image}
                        </div>
                        <div style={{ padding: '20px' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                            {project.title}
                          </h4>
                          <p style={{ color: '#6b7280', fontSize: '14px' }}>
                            Client: {project.client}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div style={{ 
              padding: '20px 40px',
              borderTop: '1px solid #e5e7eb',
              background: '#f8fafc'
            }}>
              <button 
                onClick={() => onServiceSelect(selectedService)}
                style={{
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px 30px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#5855eb'}
                onMouseOut={(e) => e.target.style.background = '#6366f1'}
              >
                Get Started - {selectedService.price}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '15px' 
          }}>
            Premium Services
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.9)', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Luxury services with end-to-end management and professional execution
          </p>
        </div>

        {/* Premium Services with Arrow Navigation */}
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

          {/* Scrollable Services Container */}
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
              key={service.id}
              onClick={() => setSelectedService(service)}
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
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                  {service.icon}
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  color: '#1f2937'
                }}>
                  {service.name}
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
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
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>
                  Key Features:
                </div>
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

              <button style={{
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
              }}>
                View Details & Book
              </button>
            </div>
          ))}
          </div>
        </div>

        {/* Bottom CTA */}
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
