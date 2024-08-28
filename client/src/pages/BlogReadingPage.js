import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../api';
import { Container, Typography, Box, CircularProgress, Alert, Avatar, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const BlogReadingPage = () => {
    const { postId } = useParams(); 
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [otherBlogs, setOtherBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const { blogPost, otherBlogs } = await getBlogPostById(postId);
                setBlogPost(blogPost);
                setOtherBlogs(otherBlogs);
            } catch (err) {
                setError('Error fetching blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [postId]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    const defaultAuthor = {
        name: 'Unknown Author',
        avatar: '',
    };

    return (
        <Container>
            {blogPost && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        {blogPost.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                            src={blogPost.author?.avatar || defaultAuthor.avatar}
                            alt={blogPost.author?.name || defaultAuthor.name} 
                            sx={{ mr: 2 }} 
                        />
                        <Typography variant="body2" color="text.secondary">
                            <strong>{blogPost.author?.name || defaultAuthor.name}</strong> - {formatDistanceToNow(new Date(blogPost.createdAt), { addSuffix: true })}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <ReactQuill
                            value={blogPost.content}
                            readOnly
                            theme="snow"
                            style={{ height: 'auto', overflow: 'hidden' }}
                        />
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Other Blogs by {blogPost.author?.name || defaultAuthor.name}
                        </Typography>
                        {otherBlogs.length ? (
                            otherBlogs.map((blog) => (
                                <Chip
                                    key={blog._id} // Assuming blog IDs are unique and using _id from the schema
                                    label={blog.title}
                                    clickable
                                    component="a"
                                    href={`/blogs/${blog._id}`}
                                    sx={{ mr: 1, mb: 1 }}
                                />
                            ))
                        ) : (
                            <Typography>No other blogs available</Typography>
                        )}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default BlogReadingPage;
