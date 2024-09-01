const Comment = require('../models/Comment');

// Add a comment to a blog post
const addComment = async (req, res) => {
    const { content } = req.body;
    try {
        const comment = await Comment.create({
            blogPostId: req.params.id,
            author: req.user._id,
            content,
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Only allow the author to delete the comment
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await comment.remove();
        res.json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addComment, deleteComment };
