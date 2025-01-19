const express = require('express');
const { getAllSubmissions } = require('../Controllers/dashboard.controller');
const { validateToken, authorizeAdmin } = require('../middlewares/auth.middleware');

// Initialize Router
const router = express.Router();

// Admin Dashboard Route
router.get('/submissions', validateToken, authorizeAdmin, getAllSubmissions);

module.exports = router;