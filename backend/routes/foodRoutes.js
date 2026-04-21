const express = require('express');
const router = express.Router();
const { getAllFoods, getFoodsByRestaurant, addFood } = require('../controllers/foodController');

router.route('/').get(getAllFoods).post(addFood);
router.route('/:restaurantId').get(getFoodsByRestaurant);

module.exports = router;
