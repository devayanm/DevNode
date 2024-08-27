const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
