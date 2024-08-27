import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Button, Grid, Card, CardContent,
    CardMedia, Box, CircularProgress, Alert, Divider, Link, AppBar, Toolbar, IconButton
} from '@mui/material';
import axios from 'axios';

const HomePage = () => {
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/posts?limit=3')
            .then(response => {
                setFeaturedPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching featured posts');
                setLoading(false);
            });

        axios.get('/api/posts?limit=6&recent=true')
            .then(response => setRecentPosts(response.data))
            .catch(error => console.error('Error fetching recent posts:', error));
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box my={4} sx={{ textAlign: 'center', position: 'relative', color: '#333', borderRadius: 2, overflow: 'hidden' }}>
                    <Box
                        sx={{
                            backgroundImage: 'url(hero-image.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: 300,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
                            Explore <span style={{ color: '#1976d2' }}>Learn</span> Build
                        </Typography>
                    </Box>
                </Box>

                {/* Featured Section */}
                <Box my={6}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: '3px solid #1976d2', display: 'inline-block', marginBottom: 4 }}>
                        Featured Posts
                    </Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : featuredPosts.length === 0 ? (
                        <Typography variant="body1">No featured posts available.</Typography>
                    ) : (
                        <Grid container spacing={4}>
                            {featuredPosts.map(post => (
                                <Grid item xs={12} sm={6} md={4} key={post._id}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                                        <CardMedia
                                            component="img"
                                            height="160"
                                            image={post.image || 'default-image.jpg'}
                                            alt={post.title}
                                        />
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
                </Box>

                {/* Recent Posts Section */}
                <Box my={6}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: '3px solid #1976d2', display: 'inline-block', marginBottom: 4 }}>
                        Recent Posts
                    </Typography>
                    <Grid container spacing={3}>
                        {recentPosts.map(post => (
                            <Grid item xs={12} sm={6} md={4} key={post._id}>
                                <Card sx={{ boxShadow: 2 }}>
                                    <CardContent sx={{ padding: 2 }}>
                                        <Typography variant="h6" component="h3" gutterBottom>
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
                </Box>
            </Container>
        </>
    );
};

export default HomePage;
