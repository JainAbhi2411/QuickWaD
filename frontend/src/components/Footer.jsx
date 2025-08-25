
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const footerLinks = [
  { label: 'About Us', path: '/about-us' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Careers', path: '/careers' },
  { label: 'Press & Media', path: '/press-media' },
  { label: 'Partner With Us', path: '/partner-with-us' },
  { label: 'Success Stories', path: '/success-story' }
];


export default function Footer() {
  
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      marginTop: '80px'
    }}>
      {/* Newsletter Section */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            marginBottom: '15px',
            color: 'white'
          }}>
            Stay Updated with QuickWaD
          </h2>
          <p style={{ 
            fontSize: '18px', 
            marginBottom: '30px', 
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Get the latest updates on new services, exclusive offers, and home care tips delivered to your inbox
          </p>
          <div style={{
            display: 'flex',
            gap: '15px',
            maxWidth: '500px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: '1',
                minWidth: '280px',
                padding: '15px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '50px',
                outline: 'none',
                background: 'rgba(255,255,255,0.95)',
                color: '#1f2937'
              }}
            />
            <button style={{
              background: '#1f2937',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}>
              Subscribe Now 📧
            </button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginTop: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
              ✅ Weekly service tips
            </div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
              🎁 Exclusive discounts
            </div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
              🚀 New service alerts
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ padding: '60px 20px 40px 20px' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '20px' 
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                padding: '10px',
                fontSize: '24px'
              }}>
                🏠
              </div>
              <h3 style={{ 
                fontSize: '28px', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                QuickWaD
              </h3>
            </div>
            <p style={{ 
              color: '#d1d5db', 
              marginBottom: '25px', 
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              Your trusted partner for all home services. We connect you with verified professionals who deliver quality, reliability, and convenience right to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              {['📘', '🐦', '📷', '💼', '📱'].map((icon, index) => (
                <div key={index} style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  {icon}
                </div>
              ))}
            </div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '15px',
              color: '#10b981'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '5px' }}>🏆 Award Winning Service</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Best Home Services App 2024</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white'
            }}>
              Our Services
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { name: 'Home Cleaning', icon: '🏠' },
                { name: 'Home Repairs', icon: '🔧' },
                { name: 'Beauty & Wellness', icon: '💆‍♀️' },
                { name: 'Appliance Services', icon: '📱' },
                { name: 'Pest Control', icon: '🐛' },
                { name: 'Home Security', icon: '🔒' }
              ].map((service, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link to={`/search?q=${encodeURIComponent(service.name)}`}style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    padding: '8px 0'
                  }}>
                    <span style={{ fontSize: '16px' }}>{service.icon}</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white'
            }}>
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
          {footerLinks.map((item, index) => (
            <li key={index} style={{ marginBottom: '12px' }}>
              <Link to={item.path} style={{
                color: '#d1d5db',
                textDecoration: 'none',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                display: 'block',
                padding: '5px 0'
              }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white'
            }}>
              Support & Contact
            </h3>
            
            {/* Contact Info */}
            <div style={{ marginBottom: '25px' }}>
              {[
                { icon: '📞', text: '1-800-QuickWaD', label: 'Call Us' },
                { icon: '✉️', text: 'support@QuickWaD.com', label: 'Email Us' },
                { icon: '💬', text: 'Live Chat 24/7', label: 'Chat Support' },
                { icon: '📍', text: 'Available in 50+ cities', label: 'Coverage' }
              ].map((contact, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '15px',
                  padding: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span style={{ fontSize: '18px' }}>{contact.icon}</span>
                  <div>
                    <div style={{ color: '#d1d5db', fontSize: '14px', fontWeight: '600' }}>
                      {contact.text}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                      {contact.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#f3f4f6' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Help Center', 'Safety Guidelines', 'Terms of Service', 'Privacy Policy'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <a href="#" style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '30px 20px',
        background: 'rgba(0,0,0,0.3)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}>
          <div style={{ color: '#d1d5db', fontSize: '14px' }}>
            © 2024 QuickWad. All rights reserved. | Built with ❤️ for better homes
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '25px', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '8px 15px',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <span>🏆</span>
              <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
                Best Service App 2024
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '8px 15px',
              borderRadius: '20px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <span>⭐</span>
              <span style={{ color: '#f59e0b', fontSize: '14px', fontWeight: '600' }}>
                4.8/5 Rating
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '8px 15px',
              borderRadius: '20px',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}>
              <span>✅</span>
              <span style={{ color: '#6366f1', fontSize: '14px', fontWeight: '600' }}>
                ISO Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
