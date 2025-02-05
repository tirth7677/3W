const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const userSubmissionRoutes = require('./routes/usersubmission.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Use Auth Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/submissions', userSubmissionRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Enhanced Health Check Route
app.get('/', (req, res) => {
    const healthDetails = {
        status: 'Server is up and running!',
        uptime: `${process.uptime().toFixed(2)} seconds`,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    };
    res.status(200).json(healthDetails);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});