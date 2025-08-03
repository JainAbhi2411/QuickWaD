
import React, { useState } from 'react';

export default function Header({ 
  isLoggedIn, 
  user, 
  onLogin, 
  onLogout, 
  onPageChange, 
  cart, 
  onSearch,
  notifications = []
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '' 
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      id: 1,
      name: 'John Doe',
      email: loginForm.email,
      phone: '+1234567890',
      address: '123 Main St, City, State'
    };
    onLogin(userData);
    setShowLoginModal(false);
    setLoginForm({ email: '', password: '' });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const userData = {
      id: 1,
      name: signupForm.name,
      email: signupForm.email,
      phone: signupForm.phone,
      address: ''
    };
    onLogin(userData);
    setShowSignupModal(false);
    setSignupForm({ name: '', email: '', password: '', phone: '' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <a href="#" className="logo" onClick={() => onPageChange('home')}>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#6366f1' }}>🏠</span>
            ServicePro
          </a>

          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          </div>

          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <button 
                  className="nav-link"
                  onClick={() => onPageChange('orders')}
                >
                  My Orders
                </button>
                
                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                  <button 
                    className="nav-link"
                    onClick={() => setShowNotifications(!showNotifications)}
                    style={{ position: 'relative' }}
                  >
                    🔔
                    {notifications.length > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      width: '300px',
                      zIndex: 1000,
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}>
                      <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Notifications</h3>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                          <div key={index} style={{ 
                            padding: '12px 15px', 
                            borderBottom: '1px solid #f3f4f6',
                            fontSize: '14px'
                          }}>
                            <div style={{ fontWeight: '500', marginBottom: '4px' }}>{notif.title}</div>
                            <div style={{ color: '#6b7280' }}>{notif.message}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                              {notif.time}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                          No new notifications
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Cart */}
                <button 
                  className="cart-icon" 
                  onClick={() => onPageChange('cart')}
                  style={{ position: 'relative' }}
                >
                  🛒
                  {cart.length > 0 && (
                    <span className="cart-count">{cart.length}</span>
                  )}
                </button>
                
                <button 
                  className="nav-link"
                  onClick={() => onPageChange('profile')}
                >
                  👤 {user?.name || 'Profile'}
                </button>
                <button className="nav-link" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className="nav-link"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
                <button 
                  className="nav-link primary"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Welcome Back!</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Login to access your account</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
              Don't have an account? 
              <button 
                style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay" onClick={() => setShowSignupModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Join ServicePro</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Create your account today</p>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowSignupModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
              Already have an account? 
              <button 
                style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
