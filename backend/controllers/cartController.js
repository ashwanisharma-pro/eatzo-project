const Cart = require('../models/Cart');
const Food = require('../models/Food');
const { formatResponse } = require('../utils/helpers');
const { CART } = require('../constants/messages');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.foodId');
    if (!cart) {
      return formatResponse(res, 200, true, 'Cart is empty', { items: [], totalAmount: 0 });
    }
    formatResponse(res, 200, true, 'Cart fetched successfully', cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { foodId, quantity } = req.body;

    // Find the food item to get its price
    const food = await Food.findById(foodId);
    if (!food) {
      res.status(404);
      throw new Error('Food item not found');
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      // Check if food already in cart
      const itemIndex = cart.items.findIndex(p => p.foodId.toString() === foodId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ foodId, quantity });
      }

      // We will calculate total on client or populate, but let's keep a rough total here
      cart.totalAmount += food.price * quantity;
      await cart.save();
      formatResponse(res, 200, true, CART.UPDATED, cart);
    } else {
      // Create new cart
      const newCart = await Cart.create({
        userId: req.user._id,
        items: [{ foodId, quantity }],
        totalAmount: food.price * quantity,
      });
      formatResponse(res, 201, true, CART.ADDED, newCart);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    formatResponse(res, 200, true, CART.CLEARED, null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  clearCart,
};
