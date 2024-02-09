const express = require('express');
const router = express.Router();
const Staff = require('../../models/Staff');

router.get('/:courseCode', async (req, res) => {
    try {
        const courseCode = req.params.courseCode;

        const data = await Staff.aggregate([
            { 
              $match: {course: courseCode, rating: { $exists: true } }
            },
            {
              $group: {
                _id: { name: '$name', type: '$type'},
                name: { $first: '$name' },
                nameHyphened: { $first: '$nameHyphened' },
                type: {$first: '$type'},
                averageRating: { $avg: "$rating" },
                count: { $sum: 1 }
              }
            }
        ]);

        const lecturers = data.filter(staff => staff.type === 'lecturer');
        const tutors = data.filter(staff => staff.type === 'tutor');

        res.status(200).json({ lecturers, tutors });
    } catch (error) {
        console.error('Error fetching course data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
