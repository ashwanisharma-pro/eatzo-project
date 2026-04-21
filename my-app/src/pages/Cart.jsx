import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../assets/css/style.css';
import '../assets/css/cart.css';
import '../assets/css/responsive.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);

  const subtotal = cartTotal;
  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const taxes = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + deliveryFee + taxes;

  return (
    <div>
      <Navbar />
      <main className="container section-gap">
        <div className="page-title">
          <h1>Your Cart</h1>
          <p>Review your selected items before checkout</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart glass-card">
                <div style={{fontSize: '5rem', marginBottom: '20px'}}>🛒</div>
                <h3>Your cart is empty</h3>
                <p style={{fontSize: '1.1rem', marginBottom: '30px', opacity: 0.8}}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/restaurants" className="btn" style={{padding: '14px 40px', fontWeight: '600'}}>Explore Restaurants</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id || item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>From {item.restaurant}</p>
                    <div className="item-price">₹{item.price}</div>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">₹{item.price * item.quantity}</div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id || item.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h3>Bill Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="summary-row">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link to="/checkout" className="btn checkout-btn">Proceed to Checkout</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
