const Order = require('../models/Order');
const { formatResponse } = require('../utils/helpers');
const { ORDER } = require('../constants/messages');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const registerOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      orderItems,
      userId: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Trigger Premium Order Confirmation Email
    await sendEmail({
      type: 'order',
      email: req.user.email,
      subject: `✅ Eatzo Order Confirmed! #${String(createdOrder._id).substring(0,8).toUpperCase()}`,
      userName: req.user.name,
      orderId: createdOrder._id,
      orderItems: createdOrder.orderItems,
      totalPrice: createdOrder.totalPrice,
      message: `Your order has been placed! Total: ₹${createdOrder.totalPrice}`,
    });

    formatResponse(res, 201, true, ORDER.PLACED, createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    formatResponse(res, 200, true, 'Orders fetched', orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    formatResponse(res, 200, true, 'Order fetched', order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerOrder,
  getMyOrders,
  getOrderById,
};
