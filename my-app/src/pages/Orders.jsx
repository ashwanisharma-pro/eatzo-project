import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import api from '../utils/api';
import '../assets/css/style.css';
import '../assets/css/orders.css';
import '../assets/css/responsive.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/myorders');
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'preparing':
        return 'status-preparing';
      case 'out for delivery':
        return 'status-out';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="orders-page-v2">
      <Navbar />
      <main className="container section-gap animate-fade-in">
        <div className="section-header" style={{marginBottom: '50px', textAlign: 'center'}}>
          <h1 style={{fontSize: '3.2rem', fontWeight: '900', color: 'var(--secondary-dark)'}}>My Orders</h1>
          <p style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>Manage your past and current cravings</p>
        </div>

        <div className="orders-container">
          {loading ? (
            <div className="no-orders glass-card" style={{padding: '80px 40px'}}>
              <div className="loader" style={{margin: '0 auto 30px', width: '50px', height: '50px'}}></div>
              <h3>Preparing your history...</h3>
            </div>
          ) : orders.length === 0 ? (
            <div className="no-orders glass-card">
              <div className="no-orders-icon">🛍️</div>
              <h3>Your bag is empty!</h3>
              <p>You haven't placed any orders yet. Let's find something delicious to change that.</p>
              <Link to="/restaurants" className="btn btn-primary-alt" style={{padding: '18px 50px', fontSize: '1.1rem'}}>Browse Restaurants</Link>
            </div>
          ) : (
            orders.map((order, index) => (
              <div key={order._id} className="order-card animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
                <div className="order-header">
                  <div className="order-main-info">
                    <h3>Order #{order._id.substring(0, 8).toUpperCase()}</h3>
                    <p>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className={`status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-items">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <div className="order-item-info">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">Quantity: {item.quantity}</span>
                      </div>
                      <span className="order-item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-summary-total">
                    <span className="order-total-label">Grand Total</span>
                    <span className="order-total-amount">₹{order.totalPrice}</span>
                  </div>
                  <div className="order-actions-v2" style={{display: 'flex', gap: '15px'}}>
                    {order.status !== 'Cancelled' && (
                      <Link to={`/order-tracking/${order._id}`} className="btn-primary-alt" style={{padding: '12px 30px', fontSize: '1rem', textDecoration: 'none', borderRadius: '10px', fontWeight: '700'}}>
                        Track Order
                      </Link>
                    )}
                    <button className="btn-secondary" style={{padding: '12px 25px', borderRadius: '10px', fontWeight: '700', fontSize: '0.95rem'}} onClick={() => alert('For any assistance, please write to us at support@eatzo.com. We are here to help you 24x7!')}>Help</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
