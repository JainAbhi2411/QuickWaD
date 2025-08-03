
import React, { useState, useEffect } from 'react';

export default function ServiceTracking({ bookingId, onClose }) {
  const [trackingData, setTrackingData] = useState({
    status: 'confirmed',
    professional: {
      name: 'Sarah Johnson',
      rating: 4.9,
      phone: '+1234567890',
      image: '👩‍💼'
    },
    estimatedArrival: '2:30 PM',
    location: 'En route to your location',
    steps: [
      { id: 1, title: 'Booking Confirmed', completed: true, time: '12:30 PM' },
      { id: 2, title: 'Professional Assigned', completed: true, time: '12:45 PM' },
      { id: 3, title: 'Professional En Route', completed: true, time: '2:15 PM' },
      { id: 4, title: 'Service Started', completed: false, time: '' },
      { id: 5, title: 'Service Completed', completed: false, time: '' }
    ]
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        estimatedArrival: new Date(Date.now() + Math.random() * 300000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Track Your Service</h1>
          <button onClick={onClose} className="btn btn-secondary">← Back</button>
        </div>

        {/* Professional Info */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '48px' }}>{trackingData.professional.image}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                {trackingData.professional.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: '#fbbf24' }}>⭐ {trackingData.professional.rating}</span>
                <span style={{ color: '#6b7280' }}>• Professional</span>
              </div>
              <div style={{ color: '#6b7280' }}>{trackingData.location}</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-secondary"
                style={{ padding: '10px 15px' }}
                onClick={() => window.open(`tel:${trackingData.professional.phone}`)}
              >
                📞 Call
              </button>
              <button className="btn btn-primary" style={{ padding: '10px 15px' }}>
                💬 Chat
              </button>
            </div>
          </div>
        </div>

        {/* ETA Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
          borderRadius: '16px', 
          padding: '25px',
          marginBottom: '25px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
            {trackingData.estimatedArrival}
          </div>
          <div style={{ fontSize: '18px', opacity: 0.9 }}>
            Estimated Arrival Time
          </div>
        </div>

        {/* Tracking Steps */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '25px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px' }}>
            Service Progress
          </h3>
          
          <div style={{ position: 'relative' }}>
            {/* Progress Line */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '20px',
              bottom: '20px',
              width: '2px',
              background: '#e5e7eb'
            }} />
            
            {trackingData.steps.map((step, index) => (
              <div key={step.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: index < trackingData.steps.length - 1 ? '30px' : '0',
                position: 'relative'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: step.completed ? '#059669' : '#e5e7eb',
                  color: step.completed ? 'white' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  zIndex: 1,
                  marginRight: '20px'
                }}>
                  {step.completed ? '✓' : step.id}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: step.completed ? '#1f2937' : '#6b7280',
                    marginBottom: '4px'
                  }}>
                    {step.title}
                  </div>
                  {step.time && (
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      {step.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Map Placeholder */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '25px',
          marginTop: '25px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>
            Live Location
          </h3>
          <div style={{ 
            background: '#f3f4f6', 
            height: '200px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            🗺️ Interactive Map Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}
