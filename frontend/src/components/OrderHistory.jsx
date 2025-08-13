import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


export default function OrderHistory() {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      alert('Please log in to view your order history.');
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/bookings/user/${user.id}`, { withCredentials: true });
        console.log(response.data.bookings);
        setOrders(response.data.bookings);
      } catch (err) {
        setError('Failed to fetch order history');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };  

    fetchOrders();
  }, []);

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status.toLowerCase() === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#059669';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#dc2626';
      case 'completed': return '#2563eb';
      default: return '#6b7280';
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`${apiUrl}/api/bookings/update/${orderId}`, { status: newStatus }, { withCredentials: true });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch (err) {
      alert('Failed to update the booking status');
      console.error('Error updating booking status:', err);
    }
  };
  const handleTrackService = (orderId) => {
    navigate(`/tracking/${orderId}`);
  };

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: 'none',
            border: 'none',
            color: '#6366f1',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1f2937' }}>
          Order History
        </h1>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '15px'
        }}>
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'completed', label: 'Completed' },
            { key: 'pending', label: 'Pending' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: filter === tab.key ? '#6366f1' : 'transparent',
                color: filter === tab.key ? 'white' : '#6b7280',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading and Error Handling */}
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
        {error && <div style={{ textAlign: 'center', padding: '20px', color: '#dc2626' }}>{error}</div>}

        {/* Orders List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredOrders.length === 0 && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
                No Orders Found
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '30px' }}>
                You don't have any {filter === 'all' ? '' : filter} orders yet.
              </p>
              <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
                Book a Service
              </button>
            </div>
          )}

          {filteredOrders.map(order => (
            <div key={order._id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'start' }}>

                {/* Order Details */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
                      {order.serviceName}
                    </h3>
                    <span style={{
                      color: getStatusColor(order.status),
                      background: `${getStatusColor(order.status)}15`,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Order ID</div>
                      <div style={{ fontWeight: '500' }}>{order._id}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Service Name</div>
                      <div style={{ fontWeight: '500' }}>{order.serviceName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Service Price</div>
                      <div style={{ fontWeight: '500' }}>${order.totalPrice}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Service Time</div>
                      <div style={{ fontWeight: '500' }}>{order.time}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Service Duration</div>
                      <div style={{ fontWeight: '500' }}>{order.serviceDetails.duration}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Date</div>
                    <div style={{ fontWeight: '500' }}>{new Date(order.date).toLocaleDateString()}</div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Address</div>
                    <div style={{ fontWeight: '500' }}>{order.address}</div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Additional Instructions</div>
                    <div style={{ fontWeight: '500' }}>{order.instructions}</div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Payment Method</div>
                    <div style={{ fontWeight: '500' }}>{order.paymentMethod}</div>
                  </div>

                  {/* Addons */}
                  {order.addons && order.addons.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
                        Addons
                      </h4>
                      {order.addons.map((addon, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>{addon.name}</div>
                          <div style={{ fontWeight: '500' }}>${addon.price}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {order.status === 'confirmed' && (
                      <>
                        <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}
                        onClick={() => handleTrackService(order._id)}
                        >
                          Track Service
                        </button>
                        <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                          Book Again
                        </button>
                        {!order.rating && (
                          <button className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                            Rate Service
                          </button>
                        )}
                      </>
                    )}
                    {order.status === 'pending' && (
                      <>
                        <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}
                      onClick={() => handleOrderStatusChange(order._id, 'confirmed')}
                      
                      
                    >
                      Confirm
                    </button>
                    <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}
                      onClick={() => handleOrderStatusChange(order._id, 'cancelled')}
                      
                    >
                      Cancel
                    </button>
                      </>
                    )}
                    {order.status === 'cancelled' && (
                      <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                        Book Again
                      </button>
                    )}
                    {order.status === 'completed' && (
                      <>
                      <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}
                      onClick={() => navigate('/')}>
                        Book Again
                      </button>
                      <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                        Receipt
                      </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                    ${order.totalPrice}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Total Amount
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}