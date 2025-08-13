import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  console.log(cart);

  const updateCartItemQuantity = (index, newQty) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQty;
    updatedCart[index].totalPrice = (updatedCart[index].price + (updatedCart[index].addons?.reduce((a, b) => a + b.price, 0) || 0)) * newQty;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeCartItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleApplyPromo = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
    if (promoCode === 'FIRST10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode === 'SAVE20') {
      setDiscount(20);
    } else {
      alert('Invalid promo code');
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    clearCart(); // Optional: clear after order
    navigate('/'); // or navigate('/checkout')
  };

  const subtotal = cart.reduce((sum, item) => {
  const itemPrice = Number(item.totalPrice || item.price) || 0;
  return sum + itemPrice;
}, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

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
          <button className="btn btn-primary" style={{ padding: '15px 30px' }} onClick={() => navigate('/')}>
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

                      {item.addons?.length > 0 && (
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                            Add-ons:
                          </div>
                          {item.addons.map(addon => (
                            <div key={addon.id} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '2px' }}>
                              • {addon.name} (+${addon.price})
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>Qty:</span>
                          <button onClick={() => updateCartItemQuantity(index, Math.max(1, (item.quantity || 1) - 1))}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button onClick={() => updateCartItemQuantity(index, (item.quantity || 1) + 1)}>+</button>
                        </div>
                        <button onClick={() => removeCartItem(index)} style={{ color: '#ef4444', background: 'none', border: 'none' }}>
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
            <button onClick={clearCart} style={{ marginTop: '20px', color: '#ef4444' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo */}
              <div>
                <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Promo code" />
                <button onClick={handleApplyPromo}>Apply</button>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Try: FIRST10 or SAVE20</div>
              </div>

              <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
