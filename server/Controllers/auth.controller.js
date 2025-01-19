const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const createResponse = require('../config/response');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, username, phoneNumber, email, password, roles } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json(createResponse(false, 400, 'User already exists'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username,
      phoneNumber,
      email,
      password: hashedPassword,
      roles: roles
    });

    const savedUser = await newUser.save();

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(createResponse(true, 201, 'User registered successfully', userWithoutPassword));
  } catch (error) {
    res.status(500).json(createResponse(false, 500, error.message));
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(createResponse(false, 404, 'User not found'));
    }

    // Ensure the user has the 'admin' role
    if (!user.roles.includes('admin')) {
      return res.status(403).json(createResponse(false, 403, 'Access denied: Admins only'));
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(createResponse(false, 401, 'Invalid credentials'));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json(createResponse(true, 200, 'Login successful', { ...userWithoutPassword, token }));
  } catch (error) {
    res.status(500).json(createResponse(false, 500, error.message));
  }
};

module.exports = { signup, login };