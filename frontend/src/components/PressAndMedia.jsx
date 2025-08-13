import React from 'react';

const pressMentions = [
  {
    title: "ServicePro Revolutionizes Home Services",
    excerpt: "With over 100K users in its first year, ServicePro is redefining the future of on-demand home services in India.",
    image: "https://images.unsplash.com/photo-1581092160613-5e7b6b8c3fdc",
    link: "https://example.com/article1"
  },
  {
    title: "Top 10 Startups to Watch in 2025",
    excerpt: "ServicePro stands out with its AI-powered service matching and verified professionals.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    link: "https://example.com/article2"
  },
  {
    title: "Empowering Blue-Collar Workforce through Tech",
    excerpt: "ServicePro has onboarded over 3,000 verified partners, enabling livelihood through tech access and training.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    link: "https://example.com/article3"
  },
];

const mediaLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/e/e3/NDTV_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/5/57/YourStory_Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/b/bc/Times_Now_Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Business_Insider_Logo.svg",
];

export default function PressAndMedia() {
  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '700', color: '#1f2937' }}>Press & Media</h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Read what the media is saying about ServicePro and our journey of impact.
          </p>
        </div>

        {/* Featured Articles */}
        <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '60px' }}>
          {pressMentions.map((item, idx) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              style={{
                background: '#f9fafb',
                borderRadius: '12px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
              }}
            >
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>{item.excerpt}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Media Logos */}
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#374151', marginBottom: '20px', textAlign: 'center' }}>Featured In</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
          {mediaLogos.map((logo, idx) => (
            <img key={idx} src={logo} alt="Media Logo" style={{ height: '50px', objectFit: 'contain' }} />
          ))}
        </div>

        {/* Contact & Downloads */}
        <div style={{
          background: '#f3f4f6',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>
            Press Inquiries & Brand Assets
          </h3>
          <p style={{ fontSize: '15px', color: '#4b5563', marginBottom: '20px' }}>
            For interviews, quotes, or brand resources, contact us at <strong>media@servicepro.in</strong>
          </p>
          <button style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '15px',
            cursor: 'pointer'
          }}>
            📦 Download Media Kit
          </button>
        </div>
      </div>
    </section>
  );
}
