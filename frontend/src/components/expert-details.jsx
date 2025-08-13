import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


export default function ExpertDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Fetch expert data from the backend API
  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/expert-services/${id}`, { withCredentials: true });
        setExpert(response.data); // Set the expert data from the API response
      } catch (error) {
        console.error('Error fetching expert data:', error);
        setExpert(null);
      }
    };

    fetchExpert();
  }, [id]);

  

  const totalPrice = (expert?.price + selectedAddons.reduce((sum, addon) => sum + addon.price, 0)) * quantity;

  const handleBookNow = () => {
  const bookingData = {
    serviceId: expert._id,
    totalPrice, // Pass the calculated total price
    addons: selectedAddons,
    quantity
  };

  // Store the data in localStorage
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  navigate(`/book-expert/${expert._id}`);
  
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.find(a => a._id === addon._id)
        ? prev.filter(a => a._id !== addon._id)
        : [...prev, addon]
    );
  };

  if (!expert) return <div style={{ padding: '40px' }}>Expert not found.</div>;

  return (
    <section style={{ padding: '40px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
          
          {/* Service Details */}
          <div>
            <div style={{ marginBottom: '30px' }}>
              <img src={expert.image} alt={`${expert.name}`} style={{ width: '50%', height: 'auto', borderRadius: '12px' }} />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
                {expert.name}
              </h1>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
                {expert.description}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div className="service-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-text">({expert.rating}) • 2,500+ bookings</span>
                </div>
                <div style={{ color: '#059669', fontWeight: '600' }}>
                  ✓ Verified Professional
                </div>
              </div>
            </div>

            {/* Service Highlights */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {expert.features?.map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#059669' }}>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Add-ons (Optional)</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {expert.addons?.map(addon => (
                  <div 
                    key={addon._id}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '15px',
                      border: selectedAddons.find(a => a._id === addon._id) ? '2px solid #6366f1' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedAddons.find(a => a._id === addon._id) ? '#f8faff' : 'white'
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
                        checked={selectedAddons.find(a => a._id === addon._id) ? true : false}
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

          {/* Previous Event Highlights */}
<div style={{ marginTop: '30px' }}>
  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Previous Event Highlights</h3>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
    
    {/* Event Image Card 1 */}
    <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <img 
        src="https://picsum.photos/300/200?random=1" 
        alt="Event 1" 
        style={{ width: '100%', height: 'auto', borderBottom: '2px solid #e5e7eb' }} 
      />
      <div style={{ padding: '15px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>Event Title 1</h4>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>This is a short description of the event. It was a great event with many highlights.</p>
      </div>
    </div>
    
    {/* Event Image Card 2 */}
    <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <img 
        src="https://picsum.photos/300/200?random=2" 
        alt="Event 2" 
        style={{ width: '100%', height: 'auto', borderBottom: '2px solid #e5e7eb' }} 
      />
      <div style={{ padding: '15px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>Event Title 2</h4>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>This event was a huge success with amazing performances and spectacular crowd engagement.</p>
      </div>
    </div>
    
    {/* Event Image Card 3 */}
    <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <img 
        src="https://picsum.photos/300/200?random=3" 
        alt="Event 3" 
        style={{ width: '100%', height: 'auto', borderBottom: '2px solid #e5e7eb' }} 
      />
      <div style={{ padding: '15px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>Event Title 3</h4>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>An unforgettable event with inspiring speeches and a great atmosphere.</p>
      </div>
    </div>

    {/* Event Image Card 4 */}
    <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <img 
        src="https://picsum.photos/300/200?random=4" 
        alt="Event 4" 
        style={{ width: '100%', height: 'auto', borderBottom: '2px solid #e5e7eb' }} 
      />
      <div style={{ padding: '15px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>Event Title 4</h4>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>A wonderful evening filled with music, dance, and heartfelt moments.</p>
      </div>
    </div>

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
                ${expert.price}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Duration: {expert.duration}
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
                  <div key={addon._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
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
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>${totalPrice}</span>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              <button 
                className="btn btn-primary"
                onClick={handleBookNow}
                style={{ width: '100%', padding: '15px', fontSize: '16px', fontWeight: '600' }}
              >
                Book Now
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                    const cartItem = { ...expert, addons: selectedAddons, quantity, totalPrice };
                    
                    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
                    const updatedCart = [...existingCart, cartItem];

                    localStorage.setItem("cart", JSON.stringify(updatedCart));

                    // ⬇ Add notification immediately
                    const newNotif = {
                      title: 'Item Added to Cart',
                      message: `${expert.name} x${quantity} added to cart`,
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    const existingNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
                    localStorage.setItem("notifications", JSON.stringify([newNotif, ...existingNotifs]));
                    
                    navigate('/cart');
                }}
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
