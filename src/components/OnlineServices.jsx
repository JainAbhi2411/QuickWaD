
import React from 'react';

const onlineServices = [
  {
    id: 1,
    name: 'Online Consultation',
    icon: '💻',
    price: 25,
    duration: '30 min',
    rating: 4.9,
    description: 'Expert advice and consultation via video call',
    features: ['Video Call', 'Screen Sharing', 'Digital Reports']
  },
  {
    id: 2,
    name: 'Virtual Interior Design',
    icon: '🏡',
    price: 150,
    duration: '2 hours',
    rating: 4.8,
    description: 'Design your space virtually with 3D visualization',
    features: ['3D Mockups', 'Color Schemes', 'Furniture Plans']
  },
  {
    id: 3,
    name: 'Online Tutoring',
    icon: '📚',
    price: 40,
    duration: '1 hour',
    rating: 4.9,
    description: 'Professional tutoring sessions online',
    features: ['Live Sessions', 'Study Materials', 'Progress Tracking']
  },
  {
    id: 4,
    name: 'Digital Marketing',
    icon: '📱',
    price: 200,
    duration: '1 week',
    rating: 4.7,
    description: 'Boost your business with digital marketing strategies',
    features: ['SEO Optimization', 'Social Media', 'Analytics']
  },
  {
    id: 5,
    name: 'Online Fitness Training',
    icon: '💪',
    price: 60,
    duration: '45 min',
    rating: 4.8,
    description: 'Personal fitness training sessions via video',
    features: ['Custom Workouts', 'Nutrition Plans', 'Progress Tracking']
  },
  {
    id: 6,
    name: 'Web Development',
    icon: '💻',
    price: 500,
    duration: '1-2 weeks',
    rating: 4.9,
    description: 'Professional website development services',
    features: ['Responsive Design', 'SEO Ready', 'Mobile Optimized']
  },
  {
    id: 7,
    name: 'Online Language Classes',
    icon: '🗣️',
    price: 35,
    duration: '1 hour',
    rating: 4.8,
    description: 'Learn new languages with native speakers',
    features: ['Native Speakers', 'Interactive Lessons', 'Cultural Context']
  },
  {
    id: 8,
    name: 'Graphic Design',
    icon: '🎨',
    price: 120,
    duration: '2-3 days',
    rating: 4.9,
    description: 'Professional graphic design for your brand',
    features: ['Logo Design', 'Brand Identity', 'Print Materials']
  }
];

export default function OnlineServices({ onServiceSelect }) {
  return (
    <section style={{ 
      padding: '60px 20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '15px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Online Services
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.9)', 
            maxWidth: '500px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Professional services delivered digitally to your doorstep
          </p>
        </div>

        {/* Scrollable Services Container */}
        <div style={{ 
          position: 'relative',
          marginLeft: '-20px',
          marginRight: '-20px'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            scrollBehavior: 'smooth',
            '::-webkit-scrollbar': {
              height: '8px'
            },
            '::-webkit-scrollbar-track': {
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px'
            },
            '::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '10px'
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255,255,255,0.5)'
            }
          }}>
            {onlineServices.map(service => (
              <div 
                key={service.id}
                onClick={() => onServiceSelect(service)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '25px',
                  minWidth: '280px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(0)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
              >
                {/* Service Icon */}
                <div style={{ 
                  textAlign: 'center', 
                  marginBottom: '20px' 
                }}>
                  <div style={{ 
                    fontSize: '40px', 
                    marginBottom: '15px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}>
                    {service.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#1f2937',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {service.name}
                  </h3>
                </div>

                {/* Service Description */}
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: '15px',
                  height: '40px',
                  overflow: 'hidden'
                }}>
                  {service.description}
                </p>

                {/* Service Features */}
                <div style={{ marginBottom: '20px' }}>
                  {service.features.slice(0, 2).map((feature, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '5px',
                      fontSize: '12px'
                    }}>
                      <span style={{ color: '#059669', fontSize: '12px' }}>✓</span>
                      <span style={{ color: '#6b7280' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Rating */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#059669',
                      lineHeight: '1'
                    }}>
                      ${service.price}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6b7280' 
                    }}>
                      {service.duration}
                    </div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}>
                    <span style={{ color: '#fbbf24', fontSize: '14px' }}>⭐</span>
                    <span style={{ 
                      fontWeight: '600', 
                      color: '#1f2937',
                      fontSize: '14px'
                    }}>
                      {service.rating}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <button style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Book Online
                </button>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            marginTop: '30px'
          }}>
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>Swipe to explore more</span>
              <span style={{ fontSize: '16px' }}>→</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '50px',
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '10px' 
          }}>
            Need Custom Online Service?
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: 'rgba(255, 255, 255, 0.8)', 
            marginBottom: '20px' 
          }}>
            We can create personalized digital solutions for your specific needs
          </p>
          <button style={{
            background: 'white',
            color: '#6366f1',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Request Custom Service
          </button>
        </div>
      </div>
    </section>
  );
}
