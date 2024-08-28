const BlogPost = require("../models/BlogPost");

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

const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate("author", "username");
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate("author");
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const author = blogPost.author;
    const otherBlogs = await BlogPost.find({ author: author._id }).select(
      "title _id"
    );

    res.json({ blogPost, otherBlogs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateBlogPost = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
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

const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await blogPost.remove();
    res.json({ message: "Blog post removed" });
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
