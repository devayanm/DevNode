const Post = require('../models/Post');
const User = require('../models/User');
const redisClient = require('../services/redisClient');


// Create a new post
const createPost = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      tags,
    });

    // Add post to the user's profile
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};


// Get all posts with caching
const getPosts = async (req, res) => {
  try {
    // Check if posts are cached
    const cachedPosts = await redisClient.get('posts');
    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    // If not cached, fetch from database
    const posts = await Post.find().populate('author', 'username profileImage').sort({ createdAt: -1 });

    // Cache the posts
    await redisClient.setEx('posts', 3600, JSON.stringify(posts)); // Cache for 1 hour

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


// Get a single post by ID
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username profileImage');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Ensure the logged-in user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Ensure the logged-in user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.remove();

    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
