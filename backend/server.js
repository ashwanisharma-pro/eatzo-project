require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const foodRoutes = require('./routes/foodRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const importData = require('./seeder');

const app = express();

// Connect to database and seed
connectDB().then(() => {
  importData();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static folder for optional uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🍽️ Eatzo API is running...');
});

// Health check route - visit /api/health to verify DB connection
app.get('/api/health', (req, res) => {
  const dbState = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const dbStatus = mongoose.connection.readyState;
  res.json({
    status: 'OK',
    server: 'running',
    database: dbState[dbStatus] || 'Unknown',
    dbHost: mongoose.connection.host || 'N/A',
    dbName: mongoose.connection.name || 'N/A',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
