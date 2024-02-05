// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
    
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
      });
  }
  else {
    res.status(403).json({ message: 'Bearer Header missing' });
  }
};

// Protected route to retrieve user data
router.get('/', verifyToken, (req, res) => {
  // If authenticated, send back user data
  res.status(200).json({ user: req.user });
});

// Export the router
module.exports = router;
