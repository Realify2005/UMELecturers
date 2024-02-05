const express = require('express');
const Staff = require('../../models/Staff');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    const { type, name, rating, course, year, review } = req.body;
    
    try {
        // Create new staff
        const newStaff = new Staff({ type, name, rating, course, year, review });
        await newStaff.save();

        // Respond with success
        return res.status(201).json({ message: 'Staff added successfully.', staff: newStaff });
    } catch (error) {
        console.error('Add staff failed:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
