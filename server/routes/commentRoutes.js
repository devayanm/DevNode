const express = require('express');
const { addComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true });

router.route('/')
    .post(protect, addComment);

router.route('/:commentId')
    .delete(protect, deleteComment);

module.exports = router;
