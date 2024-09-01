import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BlogPostList from "../components/BlogPost/BlogPostList";
import { styled } from "@mui/material/styles";

const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const CreateBlogButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "50%",
  maxWidth: "60px",
  height: "60px",
  boxShadow: theme.shadows[4],
  overflow: "hidden",
  transition: "all 0.3s ease",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 25px",
  "&:hover": {
    borderRadius: "25px",
    maxWidth: "200px",
    backgroundColor: theme.palette.primary.dark,
  },
  "& span": {
    marginLeft: "8px",
    display: "inline-block",
    overflow: "hidden",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover span": {
    opacity: 1,
  },
}));

const BlogPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Box my={4} textAlign="center">
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Blog Posts
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ fontStyle: "italic" }}
            >
              Share your thoughts and explore posts from other developers.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Recent Posts
            </Typography>
            <BlogPostList />
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Box mt={4}>
            {/* Create Blog Button */}
            <Box textAlign="center" mb={4}>
              <CreateBlogButton variant="contained" href="/create-blog">
                <AddIcon sx={{ ml: 1 }} />
                <span>Create Blog</span>
              </CreateBlogButton>
            </Box>

            {/* Sidebar content */}
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                marginBottom: 4,
                borderRadius: "15px",
                backgroundColor: "#f3f4f6",
              }}
            >
              <SidebarTitle variant="h6" component="h2">
                Categories
              </SidebarTitle>
              <List>
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Web Development",
                  "CSS",
                ].map((category) => (
                  <ListItem button key={category}>
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper
              elevation={2}
              sx={{
                padding: 3,
                marginBottom: 4,
                borderRadius: "15px",
                backgroundColor: "#f3f4f6",
              }}
            >
              <SidebarTitle variant="h6" component="h2">
                Popular Posts
              </SidebarTitle>
              <List>
                {[
                  "Understanding React Hooks",
                  "JavaScript ES6 Features",
                  "CSS Grid vs. Flexbox",
                ].map((post) => (
                  <ListItem button key={post}>
                    <ListItemText primary={post} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper
              elevation={2}
              sx={{
                padding: 3,
                borderRadius: "15px",
                backgroundColor: "#f3f4f6",
              }}
            >
              <SidebarTitle variant="h6" component="h2">
                About the Author
              </SidebarTitle>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  alt="Author"
                  src="/path/to/avatar.jpg"
                  sx={{ marginRight: 2, width: 56, height: 56 }}
                />
                <Typography variant="body2" color="textSecondary">
                  Hi! I'm a software developer passionate about sharing
                  knowledge and learning new things. This blog is where I
                  document my journey and insights.
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth>
                Contact Me
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPage;
