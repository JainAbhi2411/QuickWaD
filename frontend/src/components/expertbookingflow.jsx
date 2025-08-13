import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // For fetching data from the backend
const apiUrl = import.meta.env.VITE_API_URL;

export default function ExpertBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [eventType, setEventType] = useState(''); 
  const [guestCount, setGuestCount] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [danceStyle, setDanceStyle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch expert data from backend using Axios
  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/expert-services/${id}`); // Adjust API endpoint accordingly
        setExpert(response.data);
      } catch (error) {
        console.error('Error fetching expert data:', error);
      }
    };

    fetchExpertData();
  }, [id]);

  // Calculate total price based on selected add-ons, quantity, and expert price
  useEffect(() => {
    if (expert) {
      const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
      setTotalPrice((expert.price + addonsTotal) * quantity);
    }
  }, [selectedAddons, quantity, expert]);

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.find(a => a._id === addon._id)
        ? prev.filter(a => a._id !== addon._id)
        : [...prev, addon]
    );
  };

  const handleBookNow = () => {
    if (!eventType || !guestCount || !dateTime || !eventLocation || !customerName || !customerEmail || !customerPhone) {
      alert("Please fill in all the details before booking.");
      return;
    }
    navigate(`/booking-confirmation/${expert._id}`, {
      state: { expert, eventType, guestCount, dateTime, specialRequests, eventLocation, danceStyle, customerName, customerEmail, customerPhone, emergencyContact, foodPreferences, totalPrice, selectedAddons }
    });
  };

  const handleAddToCart = () => {
    const cartItem = { expert, eventType, guestCount, dateTime, specialRequests, eventLocation, danceStyle, customerName, customerEmail, customerPhone, emergencyContact, foodPreferences, totalPrice, selectedAddons, quantity };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));
    alert("Added to cart!");
  };

  if (!expert) return <div>Loading...</div>;

  return (
    <section style={{ padding: '40px 20px', background: '#fafafa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
          
          {/* Expert Details */}
          <div>
            <div style={{ marginBottom: '30px' }}>
              <img src={expert.image} alt={`${expert.name}`} style={{ width: '100%', borderRadius: '12px' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                {expert.name}
              </h1>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
                {expert.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span>{expert.rating} • {expert.bookings} bookings</span>
                <div style={{ color: '#059669', fontWeight: '600' }}>✓ Verified Professional</div>
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
          </div>

          {/* Booking Form */}
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
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>Booking Details</h2>

              {/* Customer Info */}
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Customer Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Customer Phone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter your phone number"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              {/* Event Details */}
              <label style={{ display: 'block', marginTop: '20px', marginBottom: '8px', fontWeight: '500' }}>Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              >
                <option value="">Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="preWedding">Pre-Wedding</option>
                <option value="other">Other</option>
              </select>

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Guest Count</label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="Enter number of guests"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Event Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Event Location</label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Enter event location"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Preferred Dance Style</label>
              <select
                value={danceStyle}
                onChange={(e) => setDanceStyle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              >
                <option value="">Select Dance Style</option>
                <option value="bollywood">Bollywood</option>
                <option value="hiphop">Hip-Hop</option>
                <option value="contemporary">Contemporary</option>
                <option value="classical">Classical</option>
              </select>

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Emergency Contact</label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="Enter emergency contact"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Food Preferences (Optional)</label>
              <textarea
                value={foodPreferences}
                onChange={(e) => setFoodPreferences(e.target.value)}
                placeholder="Mention any food preferences for dancers or guests"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  minHeight: '100px'
                }}
              />

              <label style={{ display: 'block', marginTop: '10px', marginBottom: '8px', fontWeight: '500' }}>Special Requests</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or instructions?"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  minHeight: '100px'
                }}
              />

            </div>

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
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>

              <button 
                onClick={handleBookNow}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
