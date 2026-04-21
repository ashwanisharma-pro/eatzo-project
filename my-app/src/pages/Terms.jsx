import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Terms = () => (
  <>
    <Navbar />
    <main className="container section-gap">
      <h1>Terms of Use</h1>
      <div className="card" style={{padding: '30px', marginTop: '20px'}}>
        <p>By using Eatzo, you agree to provide accurate information for order delivery.</p>
        <p>Orders can only be cancelled within 5 minutes of placement. Payments are processed securely via our trusted partners.</p>
      </div>
    </main>
    <Footer />
  </>
);

export default Terms;
