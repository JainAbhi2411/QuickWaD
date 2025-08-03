
import React from 'react';

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

export default function ExploreAllServices({ categoryId, onServiceSelect, onBackToHome }) {
  const category = serviceCategories.find(cat => cat.id === parseInt(categoryId));

  if (!category) {
    return (
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Category not found</h1>
        <button onClick={onBackToHome} className="btn btn-primary">
          ← Back to Home
        </button>
      </section>
    );
  }

  return (
    <section style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <button 
            onClick={onBackToHome}
            style={{
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ← Back to Home
          </button>
          <div style={{
            background: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Home / Services / {category.name}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>{category.icon}</div>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '15px', 
            color: '#1f2937',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            All {category.name} Services
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto 30px auto',
            lineHeight: '1.6'
          }}>
            Explore our complete range of {category.name.toLowerCase()} services with detailed features and professional quality
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            background: 'white',
            padding: '15px 30px',
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#6366f1', fontWeight: '600' }}>
              📊 {category.serviceCount} Services Available
            </span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              ⭐ 4.8+ Average Rating
            </span>
            <span style={{ color: '#f59e0b', fontWeight: '600' }}>
              🚀 Same Day Service
            </span>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '30px',
          marginBottom: '50px'
        }}>
          {category.services.map(service => (
            <div 
              key={service.id} 
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                border: '1px solid #f1f5f9',
                transform: 'scale(1)'
              }}
              onClick={() => onServiceSelect(service)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03) translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
              }}
            >
              {/* Service Image Header */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '56px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}></div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {service.image}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#059669',
                  zIndex: 3
                }}>
                  ⭐ {service.rating}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6366f1',
                  zIndex: 3
                }}>
                  {service.duration}
                </div>
              </div>

              {/* Service Content */}
              <div style={{ padding: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    fontSize: '24px', 
                    fontWeight: '700', 
                    marginBottom: '12px', 
                    color: '#1f2937',
                    lineHeight: '1.3'
                  }}>
                    {service.name}
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {service.description}
                  </p>
                </div>

                {/* Price & Duration */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '25px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#059669' }}>
                      ${service.price}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                      Starting price
                    </div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
                  }}>
                    Book Now
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '700', 
                    marginBottom: '15px', 
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ✨ What's Included:
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {service.features.map((feature, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        fontSize: '14px',
                        padding: '8px 0'
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: 'white',
                          flexShrink: 0,
                          fontWeight: '700'
                        }}>
                          ✓
                        </div>
                        <span style={{ 
                          color: '#374151', 
                          fontWeight: '500',
                          lineHeight: '1.4'
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>
            Need Help Choosing?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '25px', opacity: 0.9 }}>
            Our experts are here to help you find the perfect service for your needs
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: 'white',
              color: '#6366f1',
              border: 'none',
              borderRadius: '12px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📞 Call Expert
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              💬 Chat Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
