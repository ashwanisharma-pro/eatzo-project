const express = require('express');
const router = express.Router();
const { getRestaurants, getRestaurantById, createRestaurant } = require('../controllers/restaurantController');

// In a real app, createRestaurant would be protected with an Admin middleware
router.route('/').get(getRestaurants).post(createRestaurant);
router.route('/:id').get(getRestaurantById);

module.exports = router;
