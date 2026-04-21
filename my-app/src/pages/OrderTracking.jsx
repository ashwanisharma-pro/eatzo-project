import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import api from '../utils/api';
import '../assets/css/style.css';
import '../assets/css/tracking.css';
import '../assets/css/responsive.css';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        if (res.data.success) {
          setOrder(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch order', err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchOrder();
  }, [id]);

  const getStatusIndex = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = order ? getStatusIndex(order.status) : 1;

  const steps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully.',
      icon: '✅',
      time: order ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
    },
    {
      id: 2,
      title: 'Preparing',
      description: 'The restaurant is preparing your food.',
      icon: '👨‍🍳',
      time: ''
    },
    {
      id: 3,
      title: 'Out for Delivery',
      description: 'Your order is on the way.',
      icon: '🚴',
      time: ''
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Your order has reached your location.',
      icon: '🏠',
      time: ''
    }
  ];

  if (loading) return (
    <div className="tracking-page">
      <Navbar />
      <main className="container section-gap">
        <div className="skeleton" style={{height: '60px', width: '300px', margin: '0 auto 40px'}}></div>
        <div className="skeleton" style={{height: '400px', maxWidth: '800px', margin: '0 auto', borderRadius: '24px'}}></div>
      </main>
      <Footer />
    </div>
  );

  if (!order) return (
    <div className="tracking-page">
      <Navbar />
      <main className="container section-gap text-center">
        <div className="glass-card animate-fade-in" style={{padding: '60px', maxWidth: '600px', margin: '0 auto'}}>
          <h2 style={{color: 'var(--secondary)'}}>Order Not Found</h2>
          <p style={{margin: '20px 0'}}>We couldn't find the order tracking details for this ID.</p>
          <Link to="/orders" className="btn btn-secondary">Back to My Orders</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="tracking-page">
      <Navbar />
      <main className="container section-gap">
        <div className="tracking-header animate-fade-in">
          <h1>Track Your Order</h1>
          <p>See live status of your delivery</p>
        </div>

        <div className="tracking-box glass-card animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="order-meta">
            <div className="order-info-pill">
               <span className="order-number">Order #{order._id.substring(0, 8).toUpperCase()}</span>
               <span className="order-status-badge">{order.status}</span>
            </div>
          </div>

          <div className="tracking-steps-container">
            <div className="tracking-line">
               <div className="tracking-line-progress" style={{height: `${(currentStep - 1) * 33.33}%`}}></div>
            </div>
            <div className="tracking-steps">
              {steps.map((step) => (
                <div key={step.id} className={`track-step ${step.id <= currentStep ? 'active' : ''} ${step.id === currentStep ? 'current' : ''}`}>
                  <div className="step-icon-box">
                    <span className="step-num">{step.id <= currentStep && step.id !== currentStep ? '✓' : step.icon}</span>
                  </div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    {step.id <= currentStep && <small className="step-time">{step.time || 'In Progress'}</small>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.status !== 'Cancelled' && (
            <div className="delivery-partner-card animate-fade-in" style={{background: 'var(--bg-glass)', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px'}}>
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150" alt="Delivery Partner" style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary)'}} />
                <div style={{flex: 1}}>
                  <h4 style={{margin: '0 0 5px 0', color: 'var(--secondary)'}}>Ramesh Kumar 🟢</h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)'}}>Your Delivery Partner &nbsp;•&nbsp; ⭐ 4.8 (2.5k+ deliveries)</p>
                </div>
                <button className="btn-primary" style={{padding: '10px 20px', borderRadius: '50px'}} onClick={() => alert('Calling Ramesh on +91-9876543210...')}>Call</button>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', background: 'rgba(0,180,216,0.05)', padding: '15px', borderRadius: '10px', fontSize: '0.9rem'}}>
                <div>
                  <small style={{display: 'block', color: 'var(--text-muted)', marginBottom: '3px'}}>Vehicle Details</small>
                  <strong>UP-14 AB 1234 (Honda Activa)</strong>
                </div>
                <div style={{textAlign: 'right'}}>
                  <small style={{display: 'block', color: 'var(--text-muted)', marginBottom: '3px'}}>Delivery PIN</small>
                  <strong style={{letterSpacing: '2px', fontSize: '1.2rem', color: 'var(--secondary-dark)'}}>8421</strong>
                </div>
              </div>
            </div>
          )}

          <div className="order-summary-box marquee-style">
             <h3>Order Summary</h3>
             <div className="summary-items">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <span>{item.name} × {item.quantity}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
             </div>
             <div className="summary-footer">
                <span>Total Amount</span>
                <strong className="total-price">₹{order.totalPrice}</strong>
             </div>
          </div>

          <div className="tracking-info-footer animate-fade-in" style={{animationDelay: '0.6s'}}>
             <div className="support-box">
                <p>Need help with your order?</p>
                <button onClick={(e) => { e.preventDefault(); alert("Eatzo Support Team\nEmail: support@eatzo.com\nPhone: 1800-EATZO-HELP\n\nWe will get back to you shortly!"); }} className="btn btn-secondary">Contact Support</button>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
