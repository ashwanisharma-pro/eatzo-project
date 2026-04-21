module.exports = {
  SUCCESS: 'Success',
  ERROR: 'An error occurred',
  UNAUTHORIZED: 'Not authorized',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation Error',
  AUTH: {
    REGISTER_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'User logged in successfully',
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'Email already exists',
    VERIFY_FIRST: 'Please verify your email first'
  },
  CART: {
    ADDED: 'Item added to cart',
    UPDATED: 'Cart updated',
    otpExpire: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  ORDER: {
    PLACED: 'Order placed successfully',
    UPDATED: 'Order status updated'
  }
};
