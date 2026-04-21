const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { generateToken, formatResponse } = require('../utils/helpers');
const { AUTH } = require('../constants/messages');
const sendEmail = require('../utils/sendEmail');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please include all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error(AUTH.USER_EXISTS); // "Email already exists"
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Create user (unverified)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpire,
      isVerified: false
    });

    if (user) {
      // Send OTP Email
      await sendEmail({
        type: 'otp',
        email: user.email,
        subject: '🔐 Verify Your Eatzo Account',
        userName: user.name,
        otp: otp,
      });

      formatResponse(res, 201, true, 'Verification email sent. Please check your inbox.', {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.isVerified) {
      return formatResponse(res, 200, true, 'User already verified');
    }

    // Check OTP
    if (user.otp !== otp || (user.otpExpire && user.otpExpire < Date.now())) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }

    // Update user to verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    formatResponse(res, 200, true, 'Email verified successfully!', {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Check if verified
      if (!user.isVerified) {
        res.status(401);
        throw new Error(AUTH.VERIFY_FIRST); // "Please verify your email first"
      }

      formatResponse(res, 200, true, AUTH.LOGIN_SUCCESS, {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error(AUTH.INVALID_CREDENTIALS);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password - Send Recovery Email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('Email not found. Please register first.');
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash and set resetToken to user schema
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set Token expire (1 hour)
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

    await user.save();

    // Create Reset URL
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a put request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        type: 'forgot',
        email: user.email,
        subject: '🔐 Reset Your Eatzo Password',
        userName: user.name,
        resetUrl: resetUrl,
      });

      formatResponse(res, 200, true, 'Recovery email sent. Please check your inbox.');
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500);
      throw new Error('Email could not be sent');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error('Invalid or expired recovery token');
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    formatResponse(res, 200, true, 'Password reset successful! You can now log in.');
  } catch (error) {
    next(error);
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    };
    formatResponse(res, 200, true, 'User details fetched', user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOTP,
  forgotPassword,
  resetPassword,
  getMe,
};
