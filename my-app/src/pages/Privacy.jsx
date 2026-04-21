import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Privacy = () => (
  <>
    <Navbar />
    <main className="container section-gap">
      <h1>Privacy Policy</h1>
      <div className="card" style={{padding: '30px', marginTop: '20px'}}>
        <p>At Eatzo, we value your privacy. We only collect necessary data like your name, email, and address to process your orders and provide a personalized experience.</p>
        <p>We do not share your private information with third parties except for the restaurant preparing your order and the delivery team.</p>
      </div>
    </main>
    <Footer />
  </>
);

export default Privacy;
