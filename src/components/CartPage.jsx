
import React, { useState } from 'react';

export default function CartPage({ cart, onUpdateCart, onRemoveFromCart, onClearCart, onProceedToCheckout }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode === 'FIRST10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode === 'SAVE20') {
      setDiscount(20);
    } else {
      alert('Invalid promo code');
    }
  };

  if (cart.length === 0) {
    return (
      <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>
            Your cart is empty
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '18px' }}>
            Add some services to get started
          </p>
          <button className="btn btn-primary" style={{ padding: '15px 30px' }}>
            Browse Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px' }}>
          Shopping Cart ({cart.length} items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>
          
          {/* Cart Items */}
          <div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        {item.name}
                      </h3>
                      <p style={{ color: '#6b7280', marginBottom: '12px' }}>
                        {item.description}
                      </p>
                      
                      {item.addons && item.addons.length > 0 && (
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                            Add-ons:
                          </div>
                          {item.addons.map(addon => (
                            <div key={addon.id} style={{ 
                              fontSize: '14px', 
                              color: '#6b7280',
                              marginBottom: '2px'
                            }}>
                              • {addon.name} (+${addon.price})
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>Qty:</span>
                          <button 
                            onClick={() => onUpdateCart(index, Math.max(1, (item.quantity || 1) - 1))}
                            style={{ 
                              width: '30px', 
                              height: '30px', 
                              border: '1px solid #e5e7eb',
                              background: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ 
                            padding: '6px 12px', 
                            background: '#f9fafb',
                            borderRadius: '6px',
                            minWidth: '40px',
                            textAlign: 'center'
                          }}>
                            {item.quantity || 1}
                          </span>
                          <button 
                            onClick={() => onUpdateCart(index, (item.quantity || 1) + 1)}
                            style={{ 
                              width: '30px', 
                              height: '30px', 
                              border: '1px solid #e5e7eb',
                              background: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemoveFromCart(index)}
                          style={{ 
                            color: '#ef4444',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#059669' }}>
                        ${item.totalPrice || item.price}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Duration: {item.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onClearCart}
              style={{ 
                marginTop: '20px',
                color: '#ef4444',
                background: 'none',
                border: '1px solid #ef4444',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                Order Summary
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#059669' }}>
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ 
                  borderTop: '1px solid #e5e7eb', 
                  paddingTop: '10px',
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  fontWeight: '700'
                }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="btn btn-secondary"
                    style={{ padding: '10px 15px' }}
                  >
                    Apply
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
                  Try: FIRST10 or SAVE20
                </div>
              </div>

              <button 
                onClick={onProceedToCheckout}
                className="btn btn-primary"
                style={{ width: '100%', padding: '15px', fontSize: '16px', fontWeight: '600' }}
              >
                Proceed to Checkout
              </button>

              <div style={{ marginTop: '15px', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
                <div>✓ Secure checkout</div>
                <div>✓ 30-day service guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
