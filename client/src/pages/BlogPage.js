import React from 'react';
import { Container, Typography, Box, Grid, Paper, Divider, List, ListItem, ListItemText, Avatar, Button } from '@mui/material';
import BlogPostList from '../components/BlogPost/BlogPostList';
import BlogPostForm from '../components/BlogPost/BlogPostForm';
import { styled } from '@mui/material/styles';

const SidebarTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
}));

const BlogPage = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box my={4} textAlign="center">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Blog Posts
                        </Typography>
                        <Typography variant="h6" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                            Share your thoughts and explore posts from other developers.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box mb={6}>
                        <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Create a New Post
                            </Typography>
                            <BlogPostForm />
                        </Paper>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Recent Posts
                        </Typography>
                        <Grid container spacing={3}>
                            <BlogPostList />
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box mt={4}>
                        <Paper elevation={2} sx={{ padding: 3, marginBottom: 4, borderRadius: '15px', backgroundColor: '#f3f4f6' }}>
                            <SidebarTitle variant="h6" component="h2">
                                Categories
                            </SidebarTitle>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="JavaScript" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="React" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Node.js" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Web Development" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="CSS" />
                                </ListItem>
                            </List>
                        </Paper>

                        <Paper elevation={2} sx={{ padding: 3, marginBottom: 4, borderRadius: '15px', backgroundColor: '#f3f4f6' }}>
                            <SidebarTitle variant="h6" component="h2">
                                Popular Posts
                            </SidebarTitle>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Understanding React Hooks" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="JavaScript ES6 Features" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="CSS Grid vs. Flexbox" />
                                </ListItem>
                            </List>
                        </Paper>

                        <Paper elevation={2} sx={{ padding: 3, borderRadius: '15px', backgroundColor: '#f3f4f6' }}>
                            <SidebarTitle variant="h6" component="h2">
                                About the Author
                            </SidebarTitle>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar alt="Author" src="/path/to/avatar.jpg" sx={{ marginRight: 2, width: 56, height: 56 }} />
                                <Typography variant="body2" color="textSecondary">
                                    Hi! I'm a software developer passionate about sharing knowledge and learning new things. This blog is where I document my journey and insights.
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
