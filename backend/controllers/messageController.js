const Message = require('../models/Message');
const { formatResponse } = require('../utils/helpers');

// @desc    Submit a message
// @route   POST /api/messages
// @access  Public
const submitMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const newMessage = await Message.create({ name, email, message });
    formatResponse(res, 201, true, 'Message submitted successfully', newMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitMessage };
