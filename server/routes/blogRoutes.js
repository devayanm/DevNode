const express = require("express");
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getUserBlogs,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getAllBlogPosts).post(protect, createBlogPost);

router
  .route("/:id")
  .get(getBlogPostById)
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

router.route("/user-blogs").get(protect, getUserBlogs);

module.exports = router;
