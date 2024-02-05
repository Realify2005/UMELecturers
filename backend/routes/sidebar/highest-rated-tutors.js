const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

// Placeholder route handler
router.get('/', async (req, res) => {
  try {
    const highestRatedTutors = await Staff.find({ type: "tutor" }).sort({ rating: -1 }).limit(3);
    console.log(highestRatedTutors);
    res.status(200).json(highestRatedTutors);
  } catch (error) {
    console.log('Error fetching top 3 highest rated staffs: ', error);
    res.status(500).json({ error: 'Error getting staff data' });
  }
});

module.exports = router;
