import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Lock, ArrowRight, ShieldCheck, CheckCircle, Star } from 'lucide-react';
import '../assets/css/style.css';
import '../assets/css/auth.css';
import '../assets/css/responsive.css';
import authBg from '../assets/images/midnight-auth-bg.png';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );
      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to reset password. Link may be expired.'
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
          <img src={authBg} alt="Reset Security" className="brand-bg-image" />
          <div className="brand-overlay"></div>

          <div className="brand-content">
            <h2>
              Secure <span>Reset.</span>
            </h2>
            <p>
              Choose a strong password to protect your account and get back to
              exploring the best flavors in town.
            </p>
          </div>

          <div className="floating-glass-badge badge-1">
            <div className="badge-icon">
              <ShieldCheck color="#22c55e" size={24} />
            </div>
            <div className="badge-text">
              <div>Encrypted Data</div>
              <div>End-to-end security</div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="form-container">
            {!success ? (
              <>
                <div className="auth-header-new">
                  <h3>Set New Password</h3>
                  <p>Almost there! Create your permanent credentials.</p>
                </div>

                {error && (
                  <div className="auth-error-box-premium">
                    <ShieldCheck color="#ef4444" size={20} />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form-main">
                  <div className="form-group-premium">
                    <label>New Password</label>
                    <div className="input-icon-wrap">
                      <Lock className="input-icon" size={20} />
                      <input
                        className="input-premium"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength="6"
                      />
                    </div>
                  </div>

                  <div className="form-group-premium">
                    <label>Confirm New Password</label>
                    <div className="input-icon-wrap">
                      <Lock className="input-icon" size={20} />
                      <input
                        className="input-premium"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
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
                      'Updating Password...'
                    ) : (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                        }}
                      >
                        Reset Password <ArrowRight size={20} />
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
                  <CheckCircle color="#22c55e" size={40} />
                </div>
                <h4
                  style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    marginBottom: '16px',
                  }}
                >
                  Password Reset!
                </h4>
                <p
                  style={{
                    color: '#94a3b8',
                    lineHeight: '1.6',
                    marginBottom: '30px',
                  }}
                >
                  Your password has been successfully updated. You can now log in
                  with your new credentials.
                </p>
                <Link
                  to="/login"
                  className="btn-auth-full"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Go to Login
                </Link>
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
              <Star color="#fbbf24" size={20} />
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                }}
              >
                We recommend using at least 12 characters with numbers and
                symbols.
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;