const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Validate Token Middleware
const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Unauthorized: Invalid token',
          });
        }
        req.user = decoded; // Attach decoded user data to the request object
        next();
      });
    } else {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized: Token is missing',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Authorization Middleware for Admin Role
const authorizeAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.roles && req.user.roles.includes('admin')) {
      next(); // User is authorized
    } else {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Forbidden: User does not have the required admin role',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = { validateToken, authorizeAdmin };