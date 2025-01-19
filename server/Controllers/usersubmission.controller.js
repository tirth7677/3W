const UserSubmission = require('../models/usersubmission.model');

// Create User Submission
const createSubmission = async (req, res) => {
  try {
    const { name, socialMediaHandles } = req.body;

    // Validate file uploads
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    // Convert uploaded files to Base64
    const images = req.files.map((file) => file.buffer.toString('base64'));

    // Create a new submission
    const newSubmission = new UserSubmission({
      name,
      socialMediaHandles: JSON.parse(socialMediaHandles), // Parse JSON from request
      images,
    });

    await newSubmission.save();

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      data: newSubmission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSubmission };
