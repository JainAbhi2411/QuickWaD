// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const expertServiceRoutes = require('./routes/expertServiceRoutes');
const onlineServiceRoutes = require('./routes/onlineServiceRoutes');
const premiumServiceRoutes = require('./routes/premiumServiceRoutes');
const serviceCategoryRoutes = require('./routes/serviceCategoryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); // Import service routes


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
app.use(cors({
  origin: ['https://quickwad.netlify.app', 'http://localhost:5173'], // Frontend URL (adjust if needed)
  credentials: true, // Allow cookies to be sent
}));

// MongoDB Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', authRoutes);
app.use('/api', expertServiceRoutes);
app.use('/api', onlineServiceRoutes);
app.use('/api', premiumServiceRoutes);
app.use('/api/service-categories', serviceCategoryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', serviceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
