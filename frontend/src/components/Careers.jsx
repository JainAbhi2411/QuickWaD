import React, { useState } from 'react';

const openPositions = [
  {
    title: 'Frontend Developer (React)',
    location: 'Remote / Bengaluru',
    type: 'Full-time',
    experience: '2+ years',
    applyEmail: 'hr@servicepro.com'
  },
  {
    title: 'Backend Developer (Node.js)',
    location: 'Remote / Hyderabad',
    type: 'Full-time',
    experience: '3+ years',
    applyEmail: 'hr@servicepro.com'
  },
  {
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Part-time',
    experience: '1+ year',
    applyEmail: 'hr@servicepro.com'
  },
];

export default function Careers() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    experience: '',
    location: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('careerApplications')) || [];
    localStorage.setItem('careerApplications', JSON.stringify([...existing, formData]));

    // Optional API call
    try {
      await fetch('https://your-api.com/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.warn('Backend not reachable:', error);
    }

    setSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      profession: '',
      experience: '',
      location: '',
    });
  };

  return (
    <section style={{ padding: '60px 20px', background: '#f3f4f6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '700', color: '#1f2937' }}>Careers at ServicePro</h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Explore opportunities to grow with us in tech and on-ground service roles.
          </p>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="Career team"
            style={{
              width: '100%',
              maxWidth: '700px',
              margin: '40px auto',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        {/* Open Tech Positions */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
            🚀 Open Tech Positions
          </h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {openPositions.map((job, idx) => (
              <div
                key={idx}
                style={{
                  padding: '20px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  borderLeft: '4px solid #6366f1'
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>{job.title}</h3>
                <p style={{ margin: '8px 0', color: '#6b7280' }}>
                  📍 {job.location} &nbsp; | &nbsp; 💼 {job.type} &nbsp; | &nbsp; 🕒 {job.experience}
                </p>
                <p style={{ marginTop: '10px' }}>
                  <strong>Apply:</strong>{' '}
                  <a href={`mailto:${job.applyEmail}`} style={{ color: '#6366f1' }}>
                    {job.applyEmail}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Join Form */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '30px', textAlign: 'center' }}>
            Join as a Service Professional
          </h2>

          {submitted ? (
            <div style={{ color: '#10b981', fontSize: '18px', textAlign: 'center' }}>
              ✅ Thank you! We’ll get in touch with you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="profession"
                placeholder="Profession (e.g., Electrician, Cleaner)"
                value={formData.profession}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="location"
                placeholder="Preferred City/Location"
                value={formData.location}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <button
                type="submit"
                style={{
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// Input Style
const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  outline: 'none'
};
