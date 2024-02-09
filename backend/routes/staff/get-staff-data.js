const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

// Placeholder route handler
router.get('/highest-rated-lecturers', async (req, res) => {
  try {
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

    res.status(200).json(highestRatedLecturers);
  } catch (error) {
    console.log('Error fetching top 3 highest rated lecturer: ', error);
    res.status(500).json({ error: 'Error getting lecturer data' });
  }
});


router.get('/highest-rated-tutors', async (req, res) => {
  try {
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
    const staffData = await Staff.find({ nameHyphened: staffNameHyphened });

    if (!staffData || staffData.length === 0) {
      return res.status(404).json({error: "notFound"});
    }

    res.status(200).json(staffData);

  } catch (error) {
    console.error('Error fetching staff data: ', error);
    res.status(500).json({ error: "Error getting staff data "});
  }
})

router.post("/search-staff", async(req, res) => {
  try {
    const searchTerm = req.body.searchTerm.toLowerCase();
    const searchResults = await Staff.aggregate([
      {
        $match: { name: { $regex: searchTerm, $options: "i" } }
      },
      {
        $group: {
          _id: "$name",
          name: { $first: "$name" },
          nameHyphened: { $first: "$nameHyphened" }
        }
      }
    ]);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching staff: ', error);
    res.status(500).json({ error: "Error searching staff "});
  }
})

router.get("/find-by-comment/:commentId", async(req, res) => {
  try {
    const commentId = req.params.commentId;
    const staffData = await Staff.findById(commentId);

    if (!staffData) {
      res.status(404).json({ error: "notFound" })
    }

    res.status(200).json(staffData);
  } catch (error) {
    console.error('Error finding staff by comment Id: ', error);
    res.status(500).json({ error: 'An unexpected error has occured' });
  }
})

router.get("/staff-statistics", async(req, res) => {
  try {
    const staffStatistics = await Staff.aggregate([
      { 
        $match: { rating: { $exists: true } }
      },
      {
        $group: {
          _id: '$name', 
          nameHyphened: { $first: '$nameHyphened' },
          course: {$first: '$course'},
          averageRating: { $avg: "$rating" },
          count: { $sum: 1}
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          nameHyphened: 1,
          averageRating: 1,
          course: 1,
          count: 1
        }
      }
    ]);

    res.status(200).json(staffStatistics);
  } catch (error) {
    console.log('Error fetching staff statistics: ', error);
    res.status(500).json({ error: 'Error getting tutor data' });
  }
})

router.get("/full-statistics", async(req, res) => {
  try {
    const fullStatistics = await Staff.find({});

    res.status(200).json(fullStatistics);
  } catch (error) {
    console.log('Error fetching full statistics ', error);
    res.status(500).json({ error: 'Error getting full statistics' });
  }
})

module.exports = router;
