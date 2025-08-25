import React, { useState } from 'react';

export default function PartnerWithUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    serviceType: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for applying to be a service partner!");
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      serviceType: '',
      message: ''
    });
  };

  return (
    <section style={{ backgroundColor: '#f9fafb', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '700', color: '#111827' }}>
            Partner With QuickWad
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563', marginTop: '10px' }}>
            Join our network of professionals and grow your career by serving thousands of customers across the country.
          </p>
        </div>

        {/* Benefits Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          {[
            {
              icon: '💼',
              title: 'Grow Your Income',
              desc: 'Access a large customer base and maximize your earning potential.'
            },
            {
              icon: '⏱️',
              title: 'Flexible Hours',
              desc: 'Work on your own schedule with complete freedom.'
            },
            {
              icon: '📲',
              title: 'Job Alerts',
              desc: 'Get real-time service requests directly to your device.'
            },
            {
              icon: '🤝',
              title: 'Trusted Platform',
              desc: 'Be a part of a reliable brand with a growing community.'
            }
          ].map((benefit, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{benefit.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{benefit.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Image + Form Layout */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 45%' }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/07/09/07/10/cleaner-5384885_1280.jpg"
              alt="Service Partner"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </div>

          <div style={{
            flex: '1 1 50%',
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>
              Apply Now
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                required
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Service Type (e.g., Electrician, Cleaner)"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                style={inputStyle}
              />
              <textarea
                placeholder="Why do you want to join us?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <button
                type="submit"
                style={{
                  background: '#6366f1',
                  color: 'white',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  padding: '12px',
  fontSize: '15px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  width: '100%',
  boxSizing: 'border-box'
};
