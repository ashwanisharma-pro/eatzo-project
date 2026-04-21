import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import api from '../utils/api';
import '../assets/css/style.css';
import '../assets/css/checkout.css';
import '../assets/css/responsive.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    phoneNumber: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'COD'
  });

  // Redirect if guest
  useEffect(() => {
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert('Your cart is empty');

    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          foodId: item._id || item.id // Ensure we have a valid ID
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: total
      };

      const res = await api.post('/orders', orderData);
      if (res.data.success) {
        alert('Order placed successfully! A confirmation receipt has been sent to your registered email.');
        clearCart();
        navigate('/orders');
      } else {
        alert(res.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order failed', error);
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartTotal;
  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + deliveryFee + taxes;

  return (
    <div>
      <Navbar />
      <main className="container section-gap">
        <div className="page-title">
          <h1>Checkout</h1>
          <p>Fill your delivery and payment details</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Credit / Debit Card</option>
              </select>
            </div>

            <button type="submit" className="btn place-order-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item._id || item.id} className="checkout-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>From {item.restaurant}</p>
                  </div>
                  <div>
                    <span>{item.quantity}x ₹{item.price}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                </div>
              ))}
            </div>
            <hr />
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
              <span>Total Payable</span>
              <strong>₹{total}</strong>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
