// routes/most-rated-tutors.js

const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

// Route handler to fetch the most rated tutors
router.get('/', async (req, res) => {
  try {
    const mostRatedTutors = await Staff.aggregate([
      { 
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: 3
      }
    ]);

    res.status(200).json(mostRatedTutors);
  } catch (error) {
    console.error('Error fetching most rated tutors: ', error);
    res.status(500).json({ error: 'Error getting most rated tutors data' });
  }
});

module.exports = router;
