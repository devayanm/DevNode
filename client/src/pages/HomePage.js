import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { getAllBlogPosts } from "../api";
import heroImage from "../assets/hero.jpg";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogPosts();
        if (response.data.length === 0) {
          setError("No posts available");
        } else {
          setPosts(response.data);
        }
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/blog"
            sx={{ borderRadius: "12px", fontWeight: "bold" }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, mb: 6 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                borderBottom: "3px solid #1976d2",
                display: "inline-block",
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Categories
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Button
                  href="/category/javascript"
                  sx={{ color: "#1976d2", textTransform: "capitalize" }}
                >
                  JavaScript
                </Button>
              </li>
              <li>
                <Button
                  href="/category/react"
                  sx={{ color: "#1976d2", textTransform: "capitalize" }}
                >
                  React
                </Button>
              </li>
              <li>
                <Button
                  href="/category/css"
                  sx={{ color: "#1976d2", textTransform: "capitalize" }}
                >
                  CSS
                </Button>
              </li>
              {/* Add more categories */}
            </ul>

            <Typography
              variant="h5"
              gutterBottom
              sx={{
                borderBottom: "3px solid #1976d2",
                display: "inline-block",
                mt: 4,
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                href="/tag/tutorial"
                sx={{ borderRadius: "12px" }}
              >
                Tutorial
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="/tag/webdev"
                sx={{ borderRadius: "12px" }}
              >
                Web Dev
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="/tag/frontend"
                sx={{ borderRadius: "12px" }}
              >
                Frontend
              </Button>
              {/* Add more tags */}
            </Box>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Posts Section */}
          <Box mb={6}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                borderBottom: "3px solid #1976d2",
                display: "inline-block",
                mb: 4,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Latest Posts
            </Typography>
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
              <Grid container spacing={4}>
                {posts.map((post) => (
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
                      <CardMedia
                        component="img"
                        sx={{
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        image={
                          post.image || "https://via.placeholder.com/400x200"
                        }
                        alt={post.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paragraph
                        >
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
                ))}
              </Grid>
            )}
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                href="/blog"
                sx={{ fontWeight: "bold", borderRadius: "12px" }}
              >
                View All Posts
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
