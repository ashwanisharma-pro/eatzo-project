import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
// Footer not used here
// import Footer from '../components/Footer.jsx';
import { Mail, ArrowRight, ShieldCheck, UserCheck, Star, Clock } from 'lucide-react';
import '../assets/css/style.css';
import '../assets/css/auth.css';
import '../assets/css/responsive.css';
import authBg from '../assets/images/midnight-auth-bg.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email }
      );
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error sending recovery request'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-v3">
      <Navbar />
      <div className="auth-ambient-v3"></div>

      <div className="auth-split-wrapper">
        {/* Visual Brand Side */}
        <div className="auth-brand-side">
          <img
            src={authBg}
            alt="Account Security"
            className="brand-bg-image"
          />
          <div className="brand-overlay"></div>

          <div className="brand-content">
            <h2>
              Account <span>Recovery.</span>
            </h2>
            <p>
              Don't worry, it happens to the best of us. Let's get you back to your
              culinary journey at Eatzo.
            </p>
          </div>

          {/* Floating Badges */}
          <div className="floating-glass-badge badge-1">
            <div className="badge-icon">
              <ShieldCheck color="#22c55e" size={24} />
            </div>
            <div className="badge-text">
              <div>Secure Recovery</div>
              <div>Privacy focused</div>
            </div>
          </div>

          <div className="floating-glass-badge badge-2">
            <div className="badge-icon">
              <Star color="#fbbf24" fill="#fbbf24" size={24} />
            </div>
            <div className="badge-text">
              <div>Top Tier Support</div>
              <div>Always here for you</div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="form-container">
            <div className="auth-header-new">
              <h3>Forgot Password</h3>
              <p>
                Remembered it? <Link to="/login">Back to Login</Link>
              </p>
            </div>

            {error && (
              <div className="auth-error-box-premium">
                <ShieldCheck color="#ef4444" size={20} />
                <span>{error}</span>
              </div>
            )}

            {!submitted ? (
              <>
                <p
                  style={{
                    color: '#94a3b8',
                    marginBottom: '30px',
                    fontSize: '1rem',
                  }}
                >
                  Enter your registered email and we'll send a secure link to reset
                  your password.
                </p>
                <form onSubmit={handleSubmit} className="auth-form-main">
                  <div className="form-group-premium">
                    <label>Email Address</label>
                    <div className="input-icon-wrap">
                      <Mail className="input-icon" size={20} />
                      <input
                        className="input-premium"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-auth-full"
                    disabled={loading}
                  >
                    {loading ? (
                      'Sending Request...'
                    ) : (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                        }}
                      >
                        Send Reset Link <ArrowRight size={20} />
                      </span>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <UserCheck color="#22c55e" size={40} />
                </div>
                <h4
                  style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    marginBottom: '16px',
                  }}
                >
                  Check Your Inbox
                </h4>
                <p
                  style={{
                    color: '#94a3b8',
                    lineHeight: '1.6',
                  }}
                >
                  We have sent a secure password reset link to: <br />
                  <strong style={{ color: '#fff' }}>{email}</strong>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-auth-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginTop: '30px',
                  }}
                >
                  Try another email
                </button>
              </div>
            )}

            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Clock color="#06b6d4" size={20} />
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                }}
              >
                Response time typically under 2 minutes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;