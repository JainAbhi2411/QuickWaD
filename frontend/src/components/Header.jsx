import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

const Modal = ({ type, formData, setFormData, handleSubmit, setShowModal, modalTitle, toggleModal }) => {
  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{modalTitle}</h2>
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">{type === 'signup' ? 'Sign Up' : 'Login'}</button>
          </div>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          <button
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
            onClick={() => {
              setShowModal(false);
              toggleModal();
            }}
          >
            {type === 'signup' ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', phone: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedNotifs = JSON.parse(localStorage.getItem('notifications')) || [];

    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }

    setCart(storedCart);
    setNotifications(storedNotifs);
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${apiUrl}/api/auth/login`,
      {
        email: loginForm.email,
        password: loginForm.password,
      },
      { withCredentials: true } // important for cookies
    );

    const { success, user } = response.data;
    if (success) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Login failed', error);
    alert('Login failed. Please check your credentials.');
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

 const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${apiUrl}/api/auth/signup`,
      {
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password,
      },
      { withCredentials: true }
    );

    const { success, user } = response.data;
    if (success) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      setShowSignupModal(false);
      setSignupForm({ name: '', email: '', password: '', phone: '' });
    } else {
      alert('Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Signup failed', error);
    alert('Signup failed. Please try again.');
  }
};

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#6366f1' }}>🏠</span> QuickWaD
          </Link>

          {/* Search */}
          <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
              <div className="input-group">
                <span className="input-icon">📍</span>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="location-input"
                />
              </div>
              <div className="input-group">
                <span className="input-icon">🔎</span>
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <button type="submit" className="search-btn">Search</button>
            </form>
          </div>

          {/* Navigation */}
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <button className="nav-link" onClick={() => navigate('/orders')}>My Orders</button>

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                  <button
                    className="nav-link"
                    onClick={() => setShowNotifications(!showNotifications)}
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
                <button className="cart-icon" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
                  🛒
                  {cart.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      background: '#10b981',
                      color: 'white',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown">
                  <button className="dropbtn" title="Profile">👤</button>
                  <div className="dropdown-content">
                    <button className="dropdown-item" onClick={() => navigate('/profile')}>👤 Profile</button>
                    <button className="dropdown-item" onClick={() => navigate('/orders')}>📋 My Orders</button>
                    <button className="dropdown-item" onClick={handleLogout}>🔓 Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="nav-link" onClick={() => setShowLoginModal(true)}>Login</button>
                <button className="nav-link primary" onClick={() => setShowSignupModal(true)}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && <Modal type="login" formData={loginForm} setFormData={setLoginForm} handleSubmit={handleLogin} setShowModal={setShowLoginModal} modalTitle="Welcome Back!" toggleModal={() => setShowSignupModal(true)} />}
      
      {/* Signup Modal */}
      {showSignupModal && <Modal type="signup" formData={signupForm} setFormData={setSignupForm} handleSubmit={handleSignup} setShowModal={setShowSignupModal} modalTitle="Join QuickWad" toggleModal={() => setShowLoginModal(true)} />}
    </>
  );
}
