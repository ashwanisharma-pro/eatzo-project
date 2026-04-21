import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import FoodCard from '../components/FoodCard.jsx';
import api from '../utils/api';

// Direct Asset Imports for perfect resolution
import heroBowl1 from '../assets/images/hero/bowl-1.png';
import heroBowl2 from '../assets/images/hero/bowl-2.png';
import heroRecord from '../assets/images/hero/record.png';

import '../assets/css/style.css';
import '../assets/css/home.css';
import '../assets/css/responsive.css';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resRes = await api.get('/restaurants');
        if (resRes.data.success) setTopRestaurants(resRes.data.data.slice(0, 4));

        const foodRes = await api.get('/foods');
        if (foodRes.data.success) setFeaturedFoods(foodRes.data.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch', err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Small delay for smooth transition
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/restaurants');
    }
  };

  const categories = [
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burger', icon: '🍔' },
    { name: 'Biryani', icon: '🍛' },
    { name: 'Momos', icon: '🥟' },
    { name: 'Chinese', icon: '🍜' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'South Indian', icon: '🥙' },
    { name: 'Beverages', icon: '🥤' }
  ];

  const handleAddToCart = (item) => {
    addToCart(item, 'Restaurant');
    // We could use a toast here for better UX
  };

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <section className="hero-split">
          <div className="container hero-split-container animate-fade-in">
            <div className="hero-left-content">
              <div className="hero-trust-badge">
                <div className="trust-avatars">
                  <img src="https://i.pravatar.cc/100?u=1" alt="User 1" />
                  <img src="https://i.pravatar.cc/100?u=2" alt="User 2" />
                  <img src="https://i.pravatar.cc/100?u=3" alt="User 3" />
                  <div className="avatar-more">+4k</div>
                </div>
                <span>Trusted by 50,000+ happy foodies</span>
              </div>
              
              <span className="hero-badge">NEW ON EATZO!</span>
              <h1>DELICIOUS FOOD<br />DELIVERED TO YOUR<br /><span className="text-highlight-v2">DOORSTEP!</span></h1>
              <p>
                Order from your favorite restaurants and enjoy fast delivery,
                exciting offers, and a smooth experience with Eatzo.
              </p>
              
              <div className="hero-stats-row">
                 <div className="stat-item">
                   <span className="stat-icon">🚚</span>
                   <div className="stat-info">
                     <strong>22 mins</strong>
                     <small>Avg Delivery</small>
                   </div>
                 </div>
                 <div className="stat-item">
                   <span className="stat-icon">⭐</span>
                   <div className="stat-info">
                     <strong>4.8/5</strong>
                     <small>App Rating</small>
                   </div>
                 </div>
                 <div className="stat-item coupon-item">
                   <span className="stat-icon">🎁</span>
                   <div className="stat-info">
                     <strong>EATZO50</strong>
                     <small>50% OFF CODE</small>
                   </div>
                 </div>
              </div>

              <div className="hero-actions">
                <button onClick={() => navigate('/restaurants')} className="btn btn-primary-alt">ORDER NOW</button>
                <div className="hero-search-v2">
                   <input 
                     type="text" 
                     placeholder="What's your craving?" 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <button onClick={handleSearch} className="btn-search-icon">🔍</button>
                </div>
              </div>
            </div>

            <div className="hero-right-imagery">
              <div className="food-asset-wrapper animate-float">
                <img src={heroBowl1} alt="Delicious Bowl 1" className="hero-product bowl-1" />
                <img src={heroBowl2} alt="Delicious Bowl 2" className="hero-product bowl-2" />
                <div className="record-asset-wrapper animate-slow-rotate">
                  <img src={heroRecord} alt="Eatzo Record" className="hero-record-main" />
                  <span className="record-label-text">EATZO DROPPED</span>
                </div>
                <div className="hero-circle-accent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="banner-slider container">
          <div className="banner-track">
            <div className="banner-item animate-fade-in" style={{animationDelay: '0.5s'}}>
               <img src="/images/logo/banners/banner1.jpg" alt="Special Offer 1" />
            </div>
            <div className="banner-item animate-fade-in" style={{animationDelay: '0.6s'}}>
               <img src="/images/logo/banners/banner2.jpg" alt="Special Offer 2" />
            </div>
            <div className="banner-item animate-fade-in" style={{animationDelay: '0.7s'}}>
               <img src="/images/logo/banners/banner3.jpg" alt="Special Offer 3" />
            </div>
          </div>
        </section>

        <section className="categories section-gap container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>Choose your favorite cravings</p>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card animate-fade-in" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                <div className="cat-icon-wrapper">
                  <span className="cat-icon">{category.icon}</span>
                </div>
                <span className="cat-name">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="top-restaurants section-gap container">
          <div className="section-header">
            <div>
              <h2>Top Restaurants</h2>
              <p>Handpicked favorites for you</p>
            </div>
            <Link to="/restaurants" className="btn btn-secondary">View All</Link>
          </div>

          <div className="restaurant-grid">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="card skeleton-card" style={{height: '320px'}}>
                  <div className="skeleton" style={{height: '180px', width: '100%'}}></div>
                  <div style={{padding: '20px'}}>
                    <div className="skeleton" style={{height: '24px', width: '70%', marginBottom: '12px'}}></div>
                    <div className="skeleton" style={{height: '16px', width: '40%'}}></div>
                  </div>
                </div>
              ))
            ) : (
              topRestaurants.map((restaurant, index) => (
                <div key={restaurant._id || restaurant.id} className="animate-fade-in" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="featured-foods section-gap container">
          <div className="section-header">
            <div>
              <h2>Featured Dishes</h2>
              <p>Trending meals on Eatzo</p>
            </div>
          </div>

          <div className="food-items-grid">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="card skeleton-card" style={{height: '380px'}}>
                  <div className="skeleton" style={{height: '200px', width: '100%'}}></div>
                  <div style={{padding: '20px'}}>
                    <div className="skeleton" style={{height: '20px', width: '80%', marginBottom: '10px'}}></div>
                    <div className="skeleton" style={{height: '15px', width: '50%', marginBottom: '20px'}}></div>
                    <div className="skeleton" style={{height: '40px', width: '100%', borderRadius: '20px'}}></div>
                  </div>
                </div>
              ))
            ) : (
              featuredFoods.map((food, index) => (
                <div key={food._id || food.id} className="animate-fade-in" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
                  <FoodCard item={food} onAddToCart={handleAddToCart} />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="why-eatzo section-gap container">
          <div className="section-header">
            <h2>Why Choose Eatzo?</h2>
          </div>

          <div className="why-grid">
            {[
              { title: 'Fast Delivery', desc: 'Hot and fresh food delivered quickly.', icon: '⚡', color: 'var(--primary)' },
              { title: 'Best Restaurants', desc: 'Top rated brands and local favorites.', icon: '🏆', color: 'var(--secondary)' },
              { title: 'Secure Payments', desc: 'Easy and safe checkout experience.', icon: '🛡️', color: 'var(--primary)' },
              { title: 'Exciting Offers', desc: 'Save more with discounts and deals.', icon: '🎁', color: 'var(--secondary)' }
            ].map((item, index) => (
              <div key={index} className="why-card glass-card animate-fade-in" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                <div className="why-icon" style={{ color: item.color }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
