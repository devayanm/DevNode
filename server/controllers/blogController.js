const BlogPost = require('../models/BlogPost');

// Create a new blog post
const createBlogPost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const blogPost = await BlogPost.create({
            title,
            content,
            author: req.user._id,
            tags,
        });
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'username');
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog post
const getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).populate('author', 'username');
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a blog post
const updateBlogPost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Only allow the author to update the blog post
        if (blogPost.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;
        blogPost.tags = tags || blogPost.tags;

        const updatedBlogPost = await blogPost.save();
        res.json(updatedBlogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Only allow the author to delete the blog post
        if (blogPost.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await blogPost.remove();
        res.json({ message: 'Blog post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
};
