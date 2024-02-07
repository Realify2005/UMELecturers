const express = require('express');
const Staff = require('../../models/Staff');
const router = express.Router();

router.get('/total-comments/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const totalComments = await Staff.countDocuments({ reviewer: username });
        res.status(200).json({ totalComments });
    } catch (error) {
        console.error('Error finding total comments: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/all-comments/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const allComments = await Staff.find({ reviewer: username }, 'name nameHyphened');
        res.status(200).json({ allComments });
    } catch (error) {
        console.error('Error fetching all comments: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;