const mongoose = require('mongoose');

const userSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  socialMediaHandles: {
    type: Map, // Stores key-value pairs like LinkedIn: profile, Instagram: profile
    of: String,
    required: true,
  },
  images: {
    type: [String], // Array of images in Base64 format
    required: [true, 'At least one image is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserSubmission', userSubmissionSchema);
