const UserSubmission = require('../models/usersubmission.model');

// Fetch All Submissions (Admin Dashboard)
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await UserSubmission.find();

    res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully',
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllSubmissions };