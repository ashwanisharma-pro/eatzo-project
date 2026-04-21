import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import api from '../utils/api';
import contactBg from '../assets/images/bg/contact-bg.png';
import '../assets/css/style.css';
import '../assets/css/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/messages', formData);
      if (res.data.success) {
        alert("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Failed to send message', err);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="contact-section" style={{backgroundImage: `url(${contactBg})`}}>
          <div className="container contact-container">
            <div className="contact-glass-card animate-fade-in">
              <div className="contact-info">
                <h1>Contact Us</h1>
                <p className="subtitle">
                  We'd love to hear from you. Whether it's about an order, 
                  a restaurant partnership, or just to say hi!
                </p>
                
                <div className="contact-details">
                  <div className="detail-item">
                    <h3>Support</h3>
                    <p>support@eatzo.com</p>
                  </div>
                  <div className="detail-item">
                    <h3>Phone</h3>
                    <p>+91 98765 43210</p>
                  </div>
                  <div className="detail-item">
                    <h3>Headquarters</h3>
                    <p>Alwar, Rajasthan, India</p>
                  </div>
                </div>
              </div>

              <div className="contact-form-box">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="form-group-glass">
                    <label htmlFor="contactName">Full Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="form-group-glass">
                    <label htmlFor="contactEmail">Email Address</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="form-group-glass">
                    <label htmlFor="contactMessage">Tell us something</label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-send">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
