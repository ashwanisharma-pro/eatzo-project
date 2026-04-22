import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const About = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="info-hero">
          <div className="container">
            <h1>About Eatzo</h1>
            <p>Fast, fresh, and reliable food delivery experience for everyone.</p>
          </div>
        </section>

        <section className="container section-gap">
          <div className="info-block card">
            <h2>Who We Are</h2>
            <p>
              Eatzo is a modern food ordering platform designed to connect users with
              their favorite restaurants in a simple and fast way. Our goal is to make
              online food ordering smooth, attractive, and user friendly.
            </p>
          </div>

          <div className="info-grid">
            <div className="info-card card">
              <h3>Our Mission</h3>
              <p>
                To deliver delicious meals with speed, trust, and convenience while
                helping users discover top restaurants around them.
              </p>
            </div>

            <div className="info-card card">
              <h3>Our Vision</h3>
              <p>
                To become a reliable digital food companion for students, families,
                and working professionals across cities.
              </p>
            </div>

            <div className="info-card card">
              <h3>Our Promise</h3>
              <p>
                Easy ordering, secure payments, better restaurant discovery, and a
                delightful user experience on every page.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;