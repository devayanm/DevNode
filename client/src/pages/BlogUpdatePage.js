import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogPostById, updateBlogPost } from "../api";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import Quill's styles

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    height: "150px",
    padding: theme.spacing(1),
  },
}));

const BlogUpdatePage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const { blogPost } = await getBlogPostById(postId);
        setBlogPost(blogPost);
        setFormValues({ title: blogPost.title, content: blogPost.content });
      } catch (err) {
        setError("Error fetching blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleContentChange = (value) => {
    setFormValues({ ...formValues, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlogPost(postId, formValues);
      navigate(`/posts/${postId}`);
    } catch (err) {
      setError("Error updating blog post");
    }
  };

  const handleCancel = () => {
    navigate(`/posts/${postId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <HeroSection>
        <Typography variant="h2" component="h1">
          Update Your Blog
        </Typography>
      </HeroSection>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formValues.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <ReactQuill
          value={formValues.content}
          onChange={handleContentChange}
          theme="snow"
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }, { header: 3 }],
              [{ font: [] }, { size: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ align: [] }],
              ["link", "image", "video"],
              ["clean"],
              ["emoji"],
            ],
          }}
          style={{ marginTop: 16 }}
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Update Post
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Container>
  );
};

export default BlogUpdatePage;
