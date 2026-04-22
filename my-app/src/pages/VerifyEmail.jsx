import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// AuthContext not used here, so remove:
// import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar.jsx';
import { CheckCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import axios from 'axios';
import '../assets/css/auth.css';
import authBg from '../assets/images/midnight-auth-bg.png';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/verify-otp',
        { email, otp }
      );
      if (res.data.success) {
        setSuccess(true);
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Verification failed. Try again.'
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
        <div className="auth-brand-side">
          <img
            src={authBg}
            alt="Verification"
            className="brand-bg-image"
          />
          <div className="brand-overlay"></div>
          <div className="brand-content">
            <h2>
              One last <span>step.</span>
            </h2>
            <p>
              We&apos;ve sent a 6-digit security code to <strong>{email}</strong>.
              Enter it below to unlock your Eatzo experience.
            </p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="form-container">
            <div className="auth-header-new">
              <h3>Verify Email</h3>
              <p>Check your inbox for the OTP code.</p>
            </div>

            {error && (
              <div className="auth-error-box-premium">
                <ShieldCheck color="#ef4444" size={20} />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <CheckCircle
                  color="#22c55e"
                  size={80}
                  style={{ marginBottom: '20px' }}
                />
                <h4
                  style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    marginBottom: '10px',
                  }}
                >
                  Verification Successful!
                </h4>
                <p style={{ color: '#94a3b8' }}>
                  Redirecting you to the home page...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form-main">
                <div className="form-group-premium">
                  <label>6-Digit Code</label>
                  <div className="input-icon-wrap">
                    <ShieldCheck className="input-icon" size={20} />
                    <input
                      className="input-premium"
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ''))
                      }
                      placeholder="000000"
                      style={{
                        letterSpacing: '8px',
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        paddingLeft: '16px',
                      }}
                      required
                    />
                  </div>
                  {error && (
                    <p
                      style={{
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        marginTop: '10px',
                      }}
                    >
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-auth-full"
                  disabled={loading}
                >
                  {loading ? (
                    'Verifying...'
                  ) : (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                      }}
                    >
                      Verify Account <ArrowRight size={20} />
                    </span>
                  )}
                </button>

                <div
                  style={{
                    marginTop: '40px',
                    textAlign: 'center',
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      alert('OTP Resent! (Simulated)')
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#06b6d4',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      margin: '0 auto',
                    }}
                  >
                    <RefreshCw size={16} /> Resend Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;