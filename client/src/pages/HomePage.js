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
  Paper
} from "@mui/material";
import { getAllBlogPosts } from "../api";

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
        <Box
          sx={{
            backgroundImage: "url(hero-image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              Explore <span style={{ color: "#1976d2" }}>Learn</span> Build
            </Typography>
            <Typography variant="h5" component="p" sx={{ mt: 2, mb: 4 }}>
              Join us on a journey of discovery in the world of development.
            </Typography>
            <Button variant="contained" color="primary" size="large" href="/blog">
              Get Started
            </Button>
          </Box>
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
              }}
            >
              Categories
            </Typography>
            <ul>
              <li>
                <Button href="/category/javascript" sx={{ color: "#1976d2" }}>
                  JavaScript
                </Button>
              </li>
              <li>
                <Button href="/category/react" sx={{ color: "#1976d2" }}>
                  React
                </Button>
              </li>
              <li>
                <Button href="/category/css" sx={{ color: "#1976d2" }}>
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
              }}
            >
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button variant="outlined" size="small" href="/tag/tutorial">
                Tutorial
              </Button>
              <Button variant="outlined" size="small" href="/tag/webdev">
                Web Dev
              </Button>
              <Button variant="outlined" size="small" href="/tag/frontend">
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
                marginBottom: 4,
              }}
            >
              Posts
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Grid container spacing={4}>
                {posts.map((post) => (
                  <Grid item xs={12} sm={6} key={post._id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {post.excerpt}
                        </Typography>
                        <Button size="small" color="primary" href={`/posts/${post._id}`}>
                          Learn More &rarr;
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button variant="outlined" color="primary" href="/blog">
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
