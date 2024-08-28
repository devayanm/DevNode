import React, { useState, useEffect } from 'react';
import { getAllBlogPosts } from '../../api'; 
import { CircularProgress, Typography, Alert, Card, CardContent, CardHeader } from '@mui/material';

const BlogPostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllBlogPosts();
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error fetching posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            {posts.length === 0 ? (
                <Typography variant="h6">No posts available</Typography>
            ) : (
                posts.map(post => (
                    <Card href={`/posts/${post._id}`} key={post._id} variant="outlined" style={{ marginBottom: '16px' }}>
                        <CardHeader title={post.title} subheader={new Date(post.createdAt).toLocaleDateString()} />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">
                                {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default BlogPostList;
