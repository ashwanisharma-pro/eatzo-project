import React from 'react';

const FoodCard = ({ item, onAddToCart }) => {
  return (
    <div className="food-item-card glass-card animate-fade-in shadow-hover">
      <div className="food-img-wrapper">
        <img 
          src={item.image} 
          alt={item.name} 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500'; }}
        />
        <div className="food-badges-overlay">
          {item.isBestseller && <span className="badge-yellow">Bestseller</span>}
          <div className={`is-veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      
      <div className="food-item-info">
        <div className="food-card-header">
           <h4>{item.name}</h4>
           {item.rating && <div className="food-item-rating">⭐ {item.rating}</div>}
        </div>
        <p className="food-desc-short">{item.description}</p>
        
        <div className="food-item-footer">
          <div className="price-stack">
            <span className="price-tag">₹{item.price}</span>
            {item.oldPrice && <span className="old-price">₹{item.oldPrice}</span>}
          </div>
          <button
            className="btn btn-add-glass"
            onClick={() => onAddToCart(item)}
          >
            ADD +
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
