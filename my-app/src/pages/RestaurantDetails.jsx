import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FoodCard from '../components/FoodCard.jsx';
import api from '../utils/api';
import '../assets/css/style.css';
import '../assets/css/restaurant-details.css';
import '../assets/css/responsive.css';

const restaurantSample = [
  {
    id: 1,
    name: 'Dominos',
    image: '/images/logo/restaurants/dominos.jpg',
    cuisine: 'Pizza, Fast Food',
    rating: 4.3,
    deliveryTime: '25 mins',
    costForTwo: '₹500',
  },
  {
    id: 2,
    name: 'KFC',
    image: '/images/logo/restaurants/kfc.jpg',
    cuisine: 'Chicken, Burger',
    rating: 4.2,
    deliveryTime: '30 mins',
    costForTwo: '₹500',
  },
];

const menuSample = [
  {
    id: 101,
    name: 'Margherita Pizza',
    description: 'Classic cheese pizza with fresh basil and tomatoes.',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbad8040bb?auto=format&fit=crop&w=800',
    isVeg: true,
    isBestseller: true,
    rating: 4.8,
    category: 'Recommended',
  },
  {
    id: 102,
    name: 'Peppy Paneer',
    description: 'Paneer, capsicum, and spicy red pepper on a thin crust.',
    price: 459,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800',
    isVeg: true,
    isBestseller: false,
    rating: 4.6,
    category: 'Pizzas',
  },
  {
    id: 103,
    name: 'Spicy Chicken Pizza',
    description: 'Tender chicken with spicy jalapeños and mozzarella.',
    price: 549,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800',
    isVeg: false,
    isBestseller: true,
    rating: 4.9,
    category: 'Pizzas',
  },
  {
    id: 104,
    name: 'Garlic Breadsticks',
    description: 'Freshly baked bread with garlic and buttery herbs.',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800',
    isVeg: true,
    isBestseller: true,
    rating: 4.7,
    category: 'Sides',
  },
  {
    id: 105,
    name: 'Coke (500ml)',
    description: 'Classic Coca-Cola refreshing cold drink.',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800',
    isVeg: true,
    isBestseller: false,
    rating: 4.5,
    category: 'Beverages',
  },
];

const RestaurantDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/restaurants/${id}`);
        if (res.data.success) {
          const resData = res.data.data;
          setRestaurant(resData);
          setMenuItems(
            resData.menu && resData.menu.length > 0
              ? resData.menu
              : menuSample
          );
        } else {
          setRestaurant(restaurantSample[0]);
          setMenuItems(menuSample);
        }
      } catch (err) {
        setRestaurant(restaurantSample[0]);
        setMenuItems(menuSample);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchRestaurantData();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item, restaurant?.name || 'Restaurant');
  };

  if (loading) {
    return (
      <div className="loading-fullscreen">
        <div className="loader-emerald"></div>
      </div>
    );
  }

  const categories = [
    'All',
    ...new Set(menuItems.map((item) => item.category || 'General')),
  ];
  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="res-details-page-v2">
      <Navbar />
      <main>
        <section className="res-hero-glass">
          <div className="container res-hero-content">
            <div className="res-hero-img-box">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800';
                }}
              />
            </div>
            <div className="res-hero-info">
              <div className="res-trust-tag">
                <span className="tag-icon">⭐</span> Top Rated Restaurant
              </div>
              <h1>{restaurant.name}</h1>
              <p className="res-sub">{restaurant.cuisine}</p>

              <div className="res-stats-premium">
                <div className="res-stat-pill">
                  <span className="pill-val">{restaurant.rating}</span>
                  <small>STARS</small>
                </div>
                <div className="res-stat-pill">
                  <span className="pill-val">{restaurant.deliveryTime}</span>
                  <small>MINS</small>
                </div>
                <div className="res-stat-pill">
                  <span className="pill-val">{restaurant.costForTwo}</span>
                  <small>FOR TWO</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="menu-explorer section-gap">
          <div className="container">
            <div className="menu-nav-sticky">
              <div className="menu-nav-links">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`menu-nav-item ${
                      activeCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="menu-content-grid">
              <div className="menu-section-header">
                <h2>{activeCategory === 'All' ? 'Our Menu' : activeCategory}</h2>
                <p>{filteredItems.length} items available in this section</p>
              </div>

              <div className="food-items-grid">
                {filteredItems.map((item, index) => (
                  <FoodCard
                    key={item.id || index}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetails;