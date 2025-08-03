
import React, { useState } from 'react';

export default function ServiceDetails({ service, onBookNow, onAddToCart }) {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  if (!service) return null;

  const addons = [
    { id: 1, name: 'Extra Deep Clean', price: 20, description: 'Additional thorough cleaning' },
    { id: 2, name: 'Same Day Service', price: 15, description: 'Get service within 4 hours' },
    { id: 3, name: 'Weekend Slot', price: 10, description: 'Book for weekend convenience' },
    { id: 4, name: 'Eco-Friendly Products', price: 8, description: 'Use only eco-friendly supplies' }
  ];

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const totalPrice = (service.price + selectedAddons.reduce((sum, addon) => sum + addon.price, 0)) * quantity;

  return (
    <section style={{ padding: '40px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
          
          {/* Service Details */}
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
                {service.name}
              </h1>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
                {service.description}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div className="service-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-text">({service.rating}) • 2,500+ bookings</span>
                </div>
                <div style={{ color: '#059669', fontWeight: '600' }}>
                  ✓ Verified Professional
                </div>
              </div>
            </div>

            {/* Service Highlights */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>What's Included</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}>✓</span>
                  <span>Professional tools & equipment</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}>✓</span>
                  <span>Insured service</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}>✓</span>
                  <span>30-day service guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}>✓</span>
                  <span>Free consultation</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Add-ons (Optional)</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {addons.map(addon => (
                  <div 
                    key={addon.id}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '15px',
                      border: selectedAddons.find(a => a.id === addon.id) ? '2px solid #6366f1' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedAddons.find(a => a.id === addon.id) ? '#f8faff' : 'white'
                    }}
                    onClick={() => toggleAddon(addon)}
                  >
                    <div>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{addon.name}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>{addon.description}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '600', color: '#059669' }}>+${addon.price}</span>
                      <input 
                        type="checkbox" 
                        checked={selectedAddons.find(a => a.id === addon.id) ? true : false}
                        onChange={() => toggleAddon(addon)}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Recent Reviews</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { name: 'Sarah M.', rating: 5, comment: 'Excellent service! Very professional and thorough.', date: '2 days ago' },
                  { name: 'John D.', rating: 5, comment: 'Great value for money. Will definitely book again.', date: '1 week ago' },
                  { name: 'Emily R.', rating: 4, comment: 'Good service, arrived on time and did a great job.', date: '2 weeks ago' }
                ].map((review, index) => (
                  <div key={index} style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <strong>{review.name}</strong>
                        <span style={{ marginLeft: '10px', color: '#fbbf24' }}>
                          {'⭐'.repeat(review.rating)}
                        </span>
                      </div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{review.date}</span>
                    </div>
                    <p style={{ color: '#374151' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div style={{ 
            position: 'sticky', 
            top: '100px',
            background: 'white', 
            padding: '30px', 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '5px' }}>
                ${service.price}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Duration: {service.duration}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Quantity</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '1px solid #e5e7eb', 
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <span style={{ 
                  padding: '8px 16px', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '1px solid #e5e7eb', 
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {selectedAddons.length > 0 && (
              <div style={{ marginBottom: '20px', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ fontWeight: '500', marginBottom: '10px' }}>Selected Add-ons:</div>
                {selectedAddons.map(addon => (
                  <div key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '14px' }}>{addon.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>${addon.price}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
              paddingTop: '15px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>Total:</span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>
                ${totalPrice}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              <button 
                className="btn btn-primary"
                onClick={onBookNow}
                style={{ width: '100%', padding: '15px', fontSize: '16px', fontWeight: '600' }}
              >
                Book Now
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onAddToCart({...service, addons: selectedAddons, quantity, totalPrice})}
                style={{ width: '100%', padding: '12px' }}
              >
                Add to Cart
              </button>
            </div>

            <div style={{ marginTop: '15px', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
              <div>✓ Instant booking confirmation</div>
              <div>✓ Cancel up to 2 hours before</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
