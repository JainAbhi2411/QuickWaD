
import React, { useState } from 'react';

export default function Header({ 
  isLoggedIn, 
  user, 
  onLogin, 
  onLogout, 
  onPageChange, 
  cart, 
  onSearch 
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
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
                <button 
                  className="nav-link"
                  onClick={() => onPageChange('profile')}
                >
                  {user?.name || 'Profile'}
                </button>
                <button className="cart-icon" onClick={() => onPageChange('cart')}>
                  🛒
                  {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
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
                <button className="nav-link primary">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login to ServicePro</h2>
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
          </div>
        </div>
      )}
    </>
  );
}
