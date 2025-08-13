import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export default function ServiceTracking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/bookings/tracking/${bookingId}`);
        setTrackingData(response.data.trackingData);
      } catch (err) {
        setError('Failed to fetch tracking data');
        console.error('Error fetching tracking data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Track Your Service</h1>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">← Back</button>
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
          <div style={{ fontSize: '18px', opacity: 0.9 }}>Estimated Arrival Time</div>
        </div>

        {/* Tracking Steps */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px' }}>Service Progress</h3>

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
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{step.time}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginTop: '25px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Live Location</h3>
          <div style={{
            height: '250px',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {/* Optional: Embed Google Map centered at some coordinates */}
            <iframe
              title="Live Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=City+Center`}
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
