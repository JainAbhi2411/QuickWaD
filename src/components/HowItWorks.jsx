
import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Choose Your Service',
      description: 'Browse through our wide range of services and select what you need',
      icon: '🔍',
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Select Date & Time',
      description: 'Pick a convenient time slot that works best for your schedule',
      icon: '📅',
      color: '#059669'
    },
    {
      id: 3,
      title: 'Confirm Your Booking',
      description: 'Review your order details and confirm your booking with secure payment',
      icon: '✅',
      color: '#dc2626'
    },
    {
      id: 4,
      title: 'Get Service Done',
      description: 'Our verified professional arrives at your doorstep and completes the job',
      icon: '🏠',
      color: '#7c3aed'
    }
  ];

  return (
    <section style={{ padding: '80px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '15px' 
          }}>
            How It Works
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Get your home services done in just 4 simple steps. It's that easy!
          </p>
        </div>

        {/* Steps */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '40px',
          marginBottom: '60px'
        }}>
          {steps.map((step, index) => (
            <div key={step.id} style={{ 
              textAlign: 'center',
              position: 'relative'
            }}>
              
              {/* Step Number & Icon */}
              <div style={{ 
                position: 'relative',
                marginBottom: '25px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  color: 'white',
                  boxShadow: `0 10px 30px ${step.color}40`,
                  position: 'relative',
                  zIndex: 2
                }}>
                  {step.icon}
                </div>
                
                {/* Step Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: 'calc(50% - 65px)',
                  width: '30px',
                  height: '30px',
                  background: '#1f2937',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                  zIndex: 3
                }}>
                  {step.id}
                </div>
              </div>

              {/* Content */}
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                marginBottom: '15px',
                color: '#1f2937'
              }}>
                {step.title}
              </h3>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '16px',
                lineHeight: '1.6',
                maxWidth: '280px',
                margin: '0 auto'
              }}>
                {step.description}
              </p>

              {/* Connecting Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  right: '-20px',
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #e5e7eb, transparent)',
                  zIndex: 1,
                  display: window.innerWidth > 768 ? 'block' : 'none'
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '0',
                    top: '-3px',
                    width: '0',
                    height: '0',
                    borderLeft: '8px solid #e5e7eb',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent'
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '15px',
            color: '#1f2937'
          }}>
            Ready to Get Started?
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280', 
            marginBottom: '25px' 
          }}>
            Join thousands of satisfied customers who trust us with their home services
          </p>
          <button style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}>
            Book Your First Service
          </button>
        </div>
      </div>
    </section>
  );
}
