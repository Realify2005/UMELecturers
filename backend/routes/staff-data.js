const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// GET staff data

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

// ADD staff data

router.post('/', async (req, res) => {
  console.log(req.body);
  const { type, name, nameHyphened, rating, course, year, review, reviewer } = req.body;
  
  try {
      // Check if user has already commented
      const existingComment = await Staff.findOne({ nameHyphened, reviewer });
      if (existingComment) {
          return res.status(400).json({ result: "Unauthorized", message: 'You have already commented on this staff. Please edit or delete your original comment' })
      }

      // Create new staff data
      const currentDate = new Date();
      const newStaff = new Staff({ type, name, nameHyphened, rating, course, year, review, reviewer, createdAt: currentDate });
      await newStaff.save();

      // Respond with success
      return res.status(201).json({ result: "Successful", message: 'Staff added successfully.', staff: newStaff });
  } catch (error) {
      console.error('Add staff failed:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// EDIT staff data

router.delete('/delete-comment', async (req, res) => {
  try {
      const {commentId, username} = req.body;

      const comment = await Staff.findById(commentId);
      if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
      }

      if ((comment.reviewer !== username) && (username !== 'admin')) {
          return res.status(403).json({ error: 'Unauthorized to delete' });
      }

      await Staff.findByIdAndDelete(commentId);
      res.status(200).json({ message: 'Comment Deleted Successfully' });
  } catch (error) {
      console.error('Error deleting comment: ', error);
      res.status(500).json({ error: 'Internal Server Error' })
  }
}) 

router.post('/edit-comment/:commentId', async (req, res) => {
  try {
      const commentId = req.params.commentId;
      const newStaffData = req.body;

      const staffData = await Staff.findById(commentId);

      if (!staffData) {
          return res.status(404).json({ error: 'No staff with that comment Id' });
      }

      staffData.set(newStaffData);

      await staffData.save();

      res.status(200).json({ message: 'Successfully edited staff comment' });
  } catch (error) {
      console.error('Error updating staff data: ', error);
      res.status(500).json({ error: 'An unexpected error has occured while editing staff data' });
  }
})

module.exports = router;
