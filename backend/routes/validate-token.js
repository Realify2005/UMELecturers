// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');

// Create an Express router
const router = express.Router();

// POST route for token validation
router.post('/', (req, res) => {
    // Extract token from request body
    const { token } = req.body;

    try {
        // Verify the token using the secret key used during token generation
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                // Token verification failed
                console.error('Token verification failed:', err);
                return res.status(401).json({ valid: false, message: 'Token verification failed' });
            } else {
                // Token is valid, check if it's expired
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp <= currentTime) {
                    // Token is expired
                    return res.status(401).json({ valid: false, message: 'Token expired' });
                } else {
                    // Token is valid and not expired
                    return res.status(200).json({ valid: true, message: 'Token is valid' });
                }
            }
        });
    } catch (error) {
        console.error('Token validation failed:', error);
        return res.status(500).json({ valid: false, message: 'Internal server error' });
    }
});

module.exports = router;
