import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import api from '../utils/api';
import '../assets/css/style.css';
import '../assets/css/restaurants.css';
import '../assets/css/responsive.css';

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get('/restaurants');
        if (res.data.success) {
          // Provide default missing fields for mock compatibility in UI (optional)
          const mapped = res.data.data.map(r => ({
            ...r,
            cuisine: r.description || 'General',
            deliveryTime: '30 mins',
            costForTwo: '₹400'
          }));
          setRestaurants(mapped);
        }
      } catch (error) {
        console.error('Failed to fetch restaurants', error);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = !cuisineFilter || restaurant.cuisine.includes(cuisineFilter);
    return matchesSearch && matchesCuisine;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortFilter) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'costLowHigh':
        return parseInt(a.costForTwo.replace('₹', '')) - parseInt(b.costForTwo.replace('₹', ''));
      case 'costHighLow':
        return parseInt(b.costForTwo.replace('₹', '')) - parseInt(a.costForTwo.replace('₹', ''));
      default:
        return 0;
    }
  });

  return (
    <div>
      <Navbar />
      <main className="restaurants-page">
        <section className="page-hero small-hero">
          <div className="container">
            <h1>Explore Restaurants</h1>
            <p>Find the best food near you</p>
          </div>
        </section>

        <section className="container section-gap">
          <div className="filter-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search restaurant or cuisine..."
            />
            <select
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
            >
              <option value="">All Cuisines</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Biryani">Biryani</option>
              <option value="Momos">Momos</option>
              <option value="North Indian">North Indian</option>
              <option value="Chinese">Chinese</option>
            </select>

            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="rating">Rating</option>
              <option value="deliveryTime">Delivery Time</option>
              <option value="costLowHigh">Cost: Low to High</option>
              <option value="costHighLow">Cost: High to Low</option>
            </select>
          </div>

          <div className="restaurant-list-grid">
            {sortedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id || restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
