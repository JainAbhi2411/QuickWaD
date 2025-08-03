
import React, { useState } from 'react';

export default function ProfilePage({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    onUpdateUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  const recentOrders = [
    { id: 1, service: 'Deep House Cleaning', date: '2024-01-15', status: 'Completed', amount: 120 },
    { id: 2, service: 'Plumbing Repair', date: '2024-01-10', status: 'Completed', amount: 90 },
    { id: 3, service: 'AC Service', date: '2024-01-05', status: 'Cancelled', amount: 120 },
  ];

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#1f2937' }}>
          My Profile
        </h1>

        <div style={{ display: 'grid', gap: '30px' }}>
          {/* Profile Information */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Personal Information</h2>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Address</label>
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    style={{ 
                      width: '100%', 
                      height: '80px',
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  style={{ justifySelf: 'start', padding: '12px 24px' }}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Name</label>
                  <div style={{ fontSize: '16px', color: '#1f2937' }}>{user?.name || 'Not provided'}</div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Email</label>
                  <div style={{ fontSize: '16px', color: '#1f2937' }}>{user?.email || 'Not provided'}</div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Phone</label>
                  <div style={{ fontSize: '16px', color: '#1f2937' }}>{user?.phone || 'Not provided'}</div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Address</label>
                  <div style={{ fontSize: '16px', color: '#1f2937' }}>{user?.address || 'Not provided'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '25px' }}>Recent Orders</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {recentOrders.map(order => (
                <div key={order.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>{order.service}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{order.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      color: order.status === 'Completed' ? '#059669' : order.status === 'Cancelled' ? '#dc2626' : '#f59e0b',
                      fontWeight: '500',
                      marginBottom: '5px'
                    }}>
                      {order.status}
                    </div>
                    <div style={{ fontWeight: '600' }}>${order.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '25px' }}>Account Settings</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              <button style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '15px 20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                <div>
                  <div style={{ fontWeight: '500' }}>Notification Preferences</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Manage your notification settings</div>
                </div>
                <span>→</span>
              </button>
              
              <button style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '15px 20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                <div>
                  <div style={{ fontWeight: '500' }}>Payment Methods</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Manage saved payment methods</div>
                </div>
                <span>→</span>
              </button>
              
              <button style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '15px 20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                <div>
                  <div style={{ fontWeight: '500' }}>Privacy Settings</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Control your privacy preferences</div>
                </div>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
