const Restaurant = require('../models/Restaurant');
const { formatResponse } = require('../utils/helpers');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({});
    formatResponse(res, 200, true, 'Restaurants fetched successfully', restaurants);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }
    formatResponse(res, 200, true, 'Restaurant fetched successfully', restaurant);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = async (req, res, next) => {
  try {
    const { name, description, address, image } = req.body;

    const restaurant = await Restaurant.create({
      name,
      description,
      address,
      image,
    });

    formatResponse(res, 201, true, 'Restaurant created successfully', restaurant);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
};
