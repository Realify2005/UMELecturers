const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

// Placeholder route handler
router.get('/highest-rated-lecturers', async (req, res) => {
  try {
    // Fetch tutors with their respective ratings
    const highestRatedLecturers = await Staff.aggregate([
      { 
        $match: { type: "lecturer", rating: { $exists: true } }
      },
      {
        $group: {
          _id: "$name",
          name: { $first: "$name" },
          averageRating: { $avg: "$rating" }
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      {
        $limit: 3
      }
    ]);

    // console.log('Top 3 Lecturers by Average Rating:', highestRatedLecturers);

    res.status(200).json(highestRatedLecturers);
  } catch (error) {
    console.log('Error fetching top 3 highest rated lecturer: ', error);
    res.status(500).json({ error: 'Error getting lecturer data' });
  }
});


router.get('/highest-rated-tutors', async (req, res) => {
  try {
    // Fetch tutors with their respective ratings
    const highestRatedTutors = await Staff.aggregate([
      { 
        $match: { type: "tutor", rating: { $exists: true } }
      },
      {
        $group: {
          _id: "$name",
          name: { $first: "$name" },
          averageRating: { $avg: "$rating" }
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      {
        $limit: 3
      }
    ]);

    // console.log('Top 3 Tutors by Average Rating:', highestRatedTutors);

    res.status(200).json(highestRatedTutors);
  } catch (error) {
    console.log('Error fetching top 3 highest rated tutors: ', error);
    res.status(500).json({ error: 'Error getting tutor data' });
  }
});


router.get('/most-rated-lecturers', async (req, res) => {
  try {
    const mostRatedLecturers = await Staff.aggregate([
      {
        $match: { type: "lecturer", rating: { $exists: true } }
      },
      {
        $group: {
          _id: '$name',
          name: { $first: '$name' },
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

router.get('/most-rated-tutors', async (req, res) => {
  try {
    const mostRatedTutors = await Staff.aggregate([
      {
        $match: { type: "tutor", rating: { $exists: true } }
      },
      {
        $group: {
          _id: '$name',
          name: { $first: '$name' },
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

    res.status(200).json(mostRatedTutors)
  } catch (error) {
    console.error('Error fetching most rated tutors: ', error);
    res.status(500).json({ error: 'Error getting most rated tutors data '});
  }
});

router.post('/staff-page', async (req, res) => {
  try {
    const staffNameHyphened = req.body.staffNameHyphened;
    console.log(req.body);
    const staffData = await Staff.find({ nameHyphened: staffNameHyphened });
    console.log("finding staffname", staffNameHyphened);

    if (!staffData || staffData.length === 0) {
      return res.status(404).json({error: "notFound"});
    }

    res.status(200).json(staffData);

  } catch (error) {
    console.error('Error fetching staff data: ', error);
    res.status(500).json({ error: "Error getting staff data "});
  }
})

module.exports = router;
