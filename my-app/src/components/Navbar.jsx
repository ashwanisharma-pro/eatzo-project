import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/navbar.css';

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';
  const isHome = location.pathname === '/';
  
  // Dynamic class construction
  const navClass = `navbar ${isHome && !scrolled ? 'navbar-transparent' : 'navbar-solid'}`;

  return (
    <nav className={navClass}>
      <div className="container">
        <Link to="/" className="logo-wrap">
          <img src="/images/logo/eatzo-logo.png" alt="Eatzo Logo" />
          <h2>Eatzo</h2>
        </Link>

        <div className="nav-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/restaurants" className={isActive('/restaurants')}>Restaurants</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-link btn-secondary">
            <span className="cart-icon">🛒</span>
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {user ? (
            <div className="user-nav-box">
              <Link to="/orders" className={`orders-nav-link ${isActive('/orders')}`}>
                <span className="nav-icon-v2">📜</span>
                My Orders
              </Link>
              <Link to="/profile" className="profile-link">
                <span className="user-initials">{user.name?.charAt(0).toUpperCase()}</span>
                Profile
              </Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;