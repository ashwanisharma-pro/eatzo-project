import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar.jsx';
// Footer not used, so remove this import
// import Footer from '../components/Footer.jsx';
import { Mail, Lock, ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import '../assets/css/style.css';
import '../assets/css/auth.css';
import '../assets/css/responsive.css';
import authBg from '../assets/images/midnight-auth-bg.png';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(formData.email, formData.password);
      if (res && res.success) {
        navigate('/');
      } else {
        setError(res?.message || 'Invalid email or password');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Please try again.'
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
            alt="Midnight Culinary"
            className="brand-bg-image"
          />
          <div className="brand-overlay"></div>

          <div className="brand-content">
            <h2>
              Welcome back to <span>Eatzo.</span>
            </h2>
            <p>
              Experience the finest flavors delivered with premium
              precision. Your midnight cravings meet their match.
            </p>
          </div>

          {/* Floating Badges */}
          <div className="floating-glass-badge badge-1">
            <div className="badge-icon">
              <Star color="#fbbf24" fill="#fbbf24" size={24} />
            </div>
            <div className="badge-text">
              <div>4.8/5 Rating</div>
              <div>From 10k+ foodies</div>
            </div>
          </div>

          <div className="floating-glass-badge badge-2">
            <div className="badge-icon">
              <Clock color="#22c55e" size={24} />
            </div>
            <div className="badge-text">
              <div>~25m Delivery</div>
              <div>Hot & fresh arrival</div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="form-container">
            <div className="auth-header-new">
              <h3>Login</h3>
              <p>
                Don't have an account?{' '}
                <Link to="/register">Register now</Link>
              </p>
            </div>

            {error && (
              <div className="auth-error-box-premium">
                <ShieldCheck color="#ef4444" size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form-main">
              <div className="form-group-premium">
                <label>Email Address</label>
                <div className="input-icon-wrap">
                  <Mail className="input-icon" size={20} />
                  <input
                    className="input-premium"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group-premium">
                <label>Password</label>
                <div className="input-icon-wrap">
                  <Lock className="input-icon" size={20} />
                  <input
                    className="input-premium"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  textAlign: 'right',
                  marginBottom: '30px',
                }}
              >
                <Link
                  to="/forgot-password"
                  style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn-auth-full"
                disabled={loading}
              >
                {loading ? (
                  'Authenticating...'
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    Login <ArrowRight size={20} />
                  </span>
                )}
              </button>

              <div
                style={{
                  marginTop: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <ShieldCheck color="#22c55e" size={20} />
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                  }}
                >
                  Secure and encrypted authentication.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;