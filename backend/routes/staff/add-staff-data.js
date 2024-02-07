const express = require('express');
const Staff = require('../../models/Staff');
const router = express.Router();

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

module.exports = router;
