
import React, { useState } from 'react';

export default function OrderHistory({ user }) {
  const [filter, setFilter] = useState('all');

  const orders = [
    { 
      id: 'SP001', 
      service: 'Deep House Cleaning', 
      date: '2024-01-15', 
      status: 'Completed', 
      amount: 120,
      professional: 'Sarah Johnson',
      rating: 5,
      address: '123 Main St, City'
    },
    { 
      id: 'SP002', 
      service: 'Plumbing Repair', 
      date: '2024-01-10', 
      status: 'Completed', 
      amount: 90,
      professional: 'Mike Wilson',
      rating: 4,
      address: '123 Main St, City'
    },
    { 
      id: 'SP003', 
      service: 'AC Service & Repair', 
      date: '2024-01-05', 
      status: 'Cancelled', 
      amount: 120,
      professional: 'David Brown',
      rating: null,
      address: '123 Main St, City'
    },
    { 
      id: 'SP004', 
      service: 'Facial Treatment', 
      date: '2024-01-03', 
      status: 'Completed', 
      amount: 80,
      professional: 'Emily Davis',
      rating: 5,
      address: '123 Main St, City'
    },
    { 
      id: 'SP005', 
      service: 'Kitchen Deep Clean', 
      date: '2024-01-01', 
      status: 'In Progress', 
      amount: 60,
      professional: 'John Smith',
      rating: null,
      address: '123 Main St, City'
    }
  ];

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status.toLowerCase() === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#059669';
      case 'In Progress': return '#f59e0b';
      case 'Cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
            { key: 'in progress', label: 'In Progress' },
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

        {/* Orders List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredOrders.map(order => (
            <div key={order.id} style={{ 
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
                      {order.service}
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
                      <div style={{ fontWeight: '500' }}>{order.id}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Date</div>
                      <div style={{ fontWeight: '500' }}>{order.date}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Professional</div>
                      <div style={{ fontWeight: '500' }}>{order.professional}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Address</div>
                      <div style={{ fontWeight: '500' }}>{order.address}</div>
                    </div>
                  </div>

                  {order.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Your Rating:</span>
                      <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(order.rating)}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {order.status === 'Completed' && (
                      <>
                        <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                          View Receipt
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
                    {order.status === 'In Progress' && (
                      <>
                        <button className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                          Track Professional
                        </button>
                        <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                          Contact Professional
                        </button>
                      </>
                    )}
                    {order.status === 'Cancelled' && (
                      <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                        Book Again
                      </button>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                    ${order.amount}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Total Amount
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
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
      </div>
    </section>
  );
}
