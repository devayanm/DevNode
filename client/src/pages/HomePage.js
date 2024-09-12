import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Select from "react-select";
import { getAllBlogPosts } from "../api";
import heroImage from "../assets/hero.jpg";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [categories, setCategories] = useState([
    { label: "JavaScript", value: "JavaScript" },
    { label: "React", value: "React" },
    { label: "CSS", value: "CSS" },
  ]);
  const [tags, setTags] = useState([
    { label: "Tutorial", value: "Tutorial" },
    { label: "Web Dev", value: "Web Dev" },
    { label: "Frontend", value: "Frontend" },
  ]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogPosts();
        if (response.data.length === 0) {
          setError("No posts available");
        } else {
          const sortedPosts = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts.slice(0, 6));
        }
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, selectedTag]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

  const handleCategoryCreate = (inputValue) => {
    if (inputValue && !categories.find((cat) => cat.label === inputValue)) {
      const newCategory = { label: inputValue, value: inputValue };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setSelectedCategory(newCategory);
    }
  };

  const handleTagCreate = (inputValue) => {
    if (inputValue && !tags.find((tag) => tag.label === inputValue)) {
      const newTag = { label: inputValue, value: inputValue };
      setTags((prevTags) => [...prevTags, newTag]);
      setSelectedTag(newTag);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        my={4}
        sx={{
          textAlign: "center",
          position: "relative",
          color: "#fff",
          borderRadius: 2,
          overflow: "hidden",
          mb: 6,
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "1000",
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
              mb: 2,
            }}
          >
            Explore Learn Build
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "#fff",
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            Join us on a journey of discovery in the world of development.
          </Typography>
        </Box>
      </Box>
      {/* Search Section */}
      <Box
        my={4}
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search posts..."
          fullWidth
          sx={{ mb: 4, maxWidth: "600px" }}
        />
      </Box>

      {/* Filters Section */}
      <Box
        mb={6}
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Category Filter */}
        <Select
          isClearable
          isSearchable
          value={selectedCategory}
          onChange={handleCategoryChange}
          onCreateOption={handleCategoryCreate}
          options={categories}
          placeholder="Select or type new category..."
          styles={{
            container: (provided) => ({
              ...provided,
              width: isSmallScreen ? "90%" : 300,
            }),
          }}
        />

        {/* Tag Filter */}
        <Select
          isClearable
          isSearchable
          value={selectedTag}
          onChange={handleTagChange}
          onCreateOption={handleTagCreate}
          options={tags}
          placeholder="Select or type new tag..."
          styles={{
            container: (provided) => ({
              ...provided,
              width: isSmallScreen ? "90%" : 300,
            }),
          }}
        />
      </Box>

      {/* Latest Posts Section */}
      <Grid container spacing={4}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderRadius: "12px",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="textSecondary">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      href={`/posts/${post._id}`}
                      sx={{ fontWeight: "bold" }}
                    >
                      Read More &rarr;
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant="contained"
          color="primary"
          href="/blog"
          sx={{ fontWeight: "bold", borderRadius: "12px" }}
        >
          View All Posts
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
