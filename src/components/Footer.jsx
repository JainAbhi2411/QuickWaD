
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ServicePro</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Your trusted partner for all home services. Professional, reliable, and convenient.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ fontSize: '24px', cursor: 'pointer' }}>📘</span>
              <span style={{ fontSize: '24px', cursor: 'pointer' }}>🐦</span>
              <span style={{ fontSize: '24px', cursor: 'pointer' }}>📷</span>
              <span style={{ fontSize: '24px', cursor: 'pointer' }}>💼</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Home Cleaning</a></li>
              <li><a href="#">Home Repairs</a></li>
              <li><a href="#">Beauty & Wellness</a></li>
              <li><a href="#">Appliance Services</a></li>
              <li><a href="#">Pest Control</a></li>
              <li><a href="#">Home Security</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Investor Relations</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Report Issue</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div style={{ color: '#d1d5db' }}>
              <div style={{ marginBottom: '10px' }}>
                📞 1-800-SERVICEPRO
              </div>
              <div style={{ marginBottom: '10px' }}>
                ✉️ support@servicepro.com
              </div>
              <div style={{ marginBottom: '20px' }}>
                📍 Available in 50+ cities
              </div>
              <div>
                <strong>24/7 Customer Support</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              © 2024 ServicePro. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span>🏆 Best Service App 2024</span>
              <span>⭐ 4.8/5 Rating</span>
              <span>✅ ISO Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
