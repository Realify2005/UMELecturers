const express = require('express');
const Staff = require('../../models/Staff');
const router = express.Router();

router.delete('/delete-comment', async (req, res) => {
    try {
        const {commentId, username} = req.body;

        const comment = await Staff.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.reviewer !== username) {
            return res.status(403).json({ error: 'Unauthorized to delete' });
        }

        await Staff.findByIdAndDelete(commentId);
        res.status(200).json({ message: 'Comment Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting comment: ', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}) 

module.exports = router;