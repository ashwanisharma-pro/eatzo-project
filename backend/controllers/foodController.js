const Food = require('../models/Food');
const { formatResponse } = require('../utils/helpers');

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getAllFoods = async (req, res, next) => {
  try {
    const foods = await Food.find({});
    formatResponse(res, 200, true, 'Foods fetched successfully', foods);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all foods for a specific restaurant
// @route   GET /api/foods/:restaurantId
// @access  Public
const getFoodsByRestaurant = async (req, res, next) => {
  try {
    const foods = await Food.find({ restaurantId: req.params.restaurantId });
    formatResponse(res, 200, true, 'Foods fetched successfully', foods);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new food item
// @route   POST /api/foods
// @access  Private/Admin
const addFood = async (req, res, next) => {
  try {
    const { restaurantId, name, description, price, image, category } = req.body;

    const food = await Food.create({
      restaurantId,
      name,
      description,
      price,
      image,
      category,
    });

    formatResponse(res, 201, true, 'Food item added successfully', food);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFoods,
  getFoodsByRestaurant,
  addFood,
};
