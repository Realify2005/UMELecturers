// Import necessary modules
const express = require('express');
const router = express.Router();

// Protected route to retrieve user data
router.get('/', (req, res) => {
    // Check if user is authenticated
    console.log(req.session);
    if (req.isAuthenticated()) {
        // If authenticated, send back user data
        res.status(200).json({ user: req.user });
    } else {
        // If not authenticated, send unauthorized status
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Export the router
module.exports = router;
