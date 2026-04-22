import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar.jsx';
// Footer not used here
// import Footer from '../components/Footer.jsx';
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import '../assets/css/style.css';
import '../assets/css/auth.css';
import '../assets/css/responsive.css';
import authBg from '../assets/images/midnight-auth-bg.png';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await register(
        formData.name,
        formData.email,
        formData.password
      );
      if (res && res.success) {
        navigate(`/verify-email?email=${formData.email}`);
      } else {
        setError(res?.message || 'Registration failed');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error during registration'
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
              Join the <span>Eatzo</span> family.
            </h2>
            <p>
              Savor the exclusive world of gourmet delivery. Join thousands who
              trust us for their midnight cravings.
            </p>
          </div>

          {/* Floating Badges */}
          <div className="floating-glass-badge badge-1">
            <div className="badge-icon">
              <Star color="#fbbf24" fill="#fbbf24" size={24} />
            </div>
            <div className="badge-text">
              <div>Top Tier Quality</div>
              <div>Curated for you</div>
            </div>
          </div>

          <div className="floating-glass-badge badge-2">
            <div className="badge-icon">
              <ShieldCheck color="#22c55e" size={24} />
            </div>
            <div className="badge-text">
              <div>Secure Service</div>
              <div>Safe & Trustworthy</div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="form-container">
            <div className="auth-header-new">
              <h3>Register</h3>
              <p>
                Already joined? <Link to="/login">Login to account</Link>
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
                <label>Full Name</label>
                <div className="input-icon-wrap">
                  <User className="input-icon" size={20} />
                  <input
                    className="input-premium"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

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
                <label>Phone Number</label>
                <div className="input-icon-wrap">
                  <Phone className="input-icon" size={20} />
                  <input
                    className="input-premium"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
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
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              <div className="form-group-premium">
                <label>Confirm Password</label>
                <div className="input-icon-wrap">
                  <Lock className="input-icon" size={20} />
                  <input
                    className="input-premium"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
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
                  'Creating Account...'
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    Join Now <ArrowRight size={20} />
                  </span>
                )}
              </button>

              <div
                style={{
                  marginTop: '30px',
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
                  Account setup takes less than 60 seconds.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;