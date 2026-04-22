import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/images/logo/eatzo-logo.png" alt="Eatzo Logo" />
              <h3>Eatzo</h3>
            </div>
            <p>
              Eatzo makes food ordering easy, fast, and delicious. Explore your
              favorite restaurants and get your meals delivered quickly.
            </p>
            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                📸
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                🐦
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                📘
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                🎥
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/team">Join the Team</Link>
              </li>
              <li>
                <Link to="/franchise">Franchise Partners</Link>
              </li>
              <li>
                <Link to="/blog">Food Blog</Link>
              </li>
              <li>
                <Link to="/impact">Social Impact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Support</Link>
              </li>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/safety">Trust &amp; Safety</Link>
              </li>
              <li>
                <Link to="/restaurants">Partner with Us</Link>
              </li>
              <li>
                <Link to="/login">Account Login</Link>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div className="footer-apps">
            <h4>Get the App</h4>
            <div className="app-badges">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="app-badge"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                />
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="app-badge"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                />
              </a>
            </div>
            <p className="app-cta-text">Available on iOS &amp; Android</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© 2026 Eatzo. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;