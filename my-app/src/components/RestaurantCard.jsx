import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id || restaurant.id}`} className="card restaurant-card">
      <div className="card-image">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800'; }}
        />
        {restaurant.isBestseller && <div className="sticker-bestseller">BESTSELLER</div>}
        {restaurant.hasFreeDelivery && <div className="sticker-free">FREE DELIVERY</div>}
        <div className="card-badge">{restaurant.rating} ⭐</div>
      </div>
      <div className="card-content">
        <h3>{restaurant.name}</h3>
        <p className="cuisine-text">{restaurant.cuisine}</p>
        <div className="card-meta">
          <span className="delivery-time">⚡ {restaurant.deliveryTime || '30 mins'}</span>
          <span className="price-for-two">💳 {restaurant.costForTwo || '₹400 for two'}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
