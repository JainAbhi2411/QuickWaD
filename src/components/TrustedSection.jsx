
import React from 'react';

export default function TrustedSection() {
  const partners = [
    { name: 'Google', logo: '🔍', description: 'Technology Partner' },
    { name: 'Microsoft', logo: '💻', description: 'Cloud Infrastructure' },
    { name: 'Stripe', logo: '💳', description: 'Payment Processing' },
    { name: 'AWS', logo: '☁️', description: 'Cloud Services' },
    { name: 'Uber', logo: '🚗', description: 'Logistics Partner' },
    { name: 'PayPal', logo: '💰', description: 'Payment Gateway' }
  ];

  const certifications = [
    { name: 'ISO 9001', icon: '🏆', description: 'Quality Management' },
    { name: 'SOC 2', icon: '🔒', description: 'Security Compliance' },
    { name: 'Better Business Bureau', icon: '⭐', description: 'A+ Rating' },
    { name: 'Green Certified', icon: '🌱', description: 'Eco-Friendly Services' }
  ];

  const trustFeatures = [
    {
      icon: '🛡️',
      title: 'Insured & Bonded',
      description: 'All our professionals are fully insured and bonded for your peace of mind',
      color: '#059669'
    },
    {
      icon: '✅',
      title: 'Background Verified',
      description: 'Every service provider undergoes comprehensive background checks',
      color: '#dc2626'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Bank-level encryption ensures your payment information is safe',
      color: '#6366f1'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for any questions or concerns',
      color: '#7c3aed'
    }
  ];

  const awards = [
    { year: '2024', title: 'Best Home Services App', organization: 'Tech Awards' },
    { year: '2023', title: 'Customer Choice Award', organization: 'Service Excellence' },
    { year: '2023', title: 'Fastest Growing Startup', organization: 'Business Today' },
    { year: '2022', title :'Innovation in Services', organization: 'Digital Awards' }
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
            Trusted by Millions
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're proud to be trusted by leading companies, certified by top organizations, and loved by customers worldwide.
          </p>
        </div>

        {/* Trust Features */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px',
          marginBottom: '80px'
        }}>
          {trustFeatures.map((feature, index) => (
            <div key={index} style={{ 
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '16px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                marginBottom: '12px',
                color: feature.color
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            textAlign: 'center',
            marginBottom: '40px',
            color: '#1f2937'
          }}>
            Our Trusted Partners
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '25px',
            alignItems: 'center'
          }}>
            {partners.map((partner, index) => (
              <div key={index} style={{ 
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  {partner.logo}
                </div>
                <div style={{ fontWeight: '600', marginBottom: '5px', color: '#1f2937' }}>
                  {partner.name}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {partner.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            textAlign: 'center',
            marginBottom: '40px',
            color: '#1f2937'
          }}>
            Certifications & Compliance
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '25px'
          }}>
            {certifications.map((cert, index) => (
              <div key={index} style={{ 
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '25px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ 
                  fontSize: '36px',
                  marginBottom: '15px'
                }}>
                  {cert.icon}
                </div>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '8px',
                  color: '#1f2937'
                }}>
                  {cert.name}
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280' 
                }}>
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            textAlign: 'center',
            marginBottom: '40px',
            color: '#1f2937'
          }}>
            Recent Awards & Recognition
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px'
          }}>
            {awards.map((award, index) => (
              <div key={index} style={{ 
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div style={{ 
                  background: '#6366f1',
                  color: 'white',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}>
                  🏆
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                    {award.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {award.organization} • {award.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Trust Statement */}
        <div style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '20px',
          padding: '50px 40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            marginBottom: '15px' 
          }}>
            Your Trust is Our Priority
          </h3>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 30px',
            lineHeight: '1.6'
          }}>
            With industry-leading security, verified professionals, and comprehensive insurance coverage, 
            we ensure every service meets the highest standards of safety and quality.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px',
            flexWrap: 'wrap',
            marginTop: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>100%</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Secure Payments</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>24/7</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Customer Support</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>$1M+</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Insurance Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
