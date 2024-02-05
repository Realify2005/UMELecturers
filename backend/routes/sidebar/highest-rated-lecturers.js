const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

// Placeholder route handler
router.get('/', async (req, res) => {
  try {
    const highestRatedLecturers = await Staff.find({ type: "lecturer" }).sort({ rating: -1 }).limit(3);
    console.log(highestRatedLecturers);
    res.status(200).json(highestRatedLecturers);
  } catch (error) {
    console.log('Error fetching top 3 highest rated staffs: ', error);
    res.status(500).json({ error: 'Error getting staff data' });
  }
});

module.exports = router;
