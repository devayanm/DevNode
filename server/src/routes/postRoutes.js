const express = require('express');
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost); // Create a new post
router.get('/', getPosts); // Get all posts
router.get('/:id', getPost); // Get a single post by ID
router.put('/:id', protect, updatePost); // Update a post by ID
router.delete('/:id', protect, deletePost); // Delete a post by ID

module.exports = router;
