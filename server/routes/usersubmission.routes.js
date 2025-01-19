const express = require('express');
const multer = require('multer');
const { createSubmission } = require('../Controllers/usersubmission.controller');

// Initialize Router
const router = express.Router();

// Configure Multer for file uploads (in memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// Route for creating a new user submission
router.post('/submit', upload.array('images', 10), createSubmission); // Allow up to 10 images

module.exports = router;