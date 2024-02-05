const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

// Placeholder route handler
router.get('/', async (req, res) => {
  try {
    const mostRatedLecturers = await Staff.aggregate([
      {
        $match: {
          type: 'lecturer'
        }
      },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      }
    ]);

    res.status(200).json(mostRatedLecturers)
  } catch (error) {
    console.error('Error fetching most rated lecturers: ', error);
    res.status(500).json({ error: 'Error getting most rated lecturers data '});
  }
});

module.exports = router;
