import React, { useState, useEffect } from 'react';
import { getAllBlogPosts } from '../../api'; 
import {
    CircularProgress,
    Typography,
    Alert,
    Card,
    CardContent,
    CardHeader,
    CardActionArea,
    Avatar,
    Divider,
    Box
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[6],
    }
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

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
        <Box>
            {posts.length === 0 ? (
                <Typography variant="h6" align="center">No posts available</Typography>
            ) : (
                posts.map(post => (
                    <StyledCard key={post._id} variant="outlined">
                        <CardActionArea href={`/posts/${post._id}`} component="a">
                            <StyledCardHeader
                                avatar={<Avatar src={post.author?.avatar} alt={post.author?.name} />}
                                title={post.title}
                                subheader={new Date(post.createdAt).toLocaleDateString()}
                            />
                            <StyledCardContent>
                                <StyledTypography variant="body2" color="textSecondary">
                                    {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
                                </StyledTypography>
                                <Divider />
                                <Box mt={1} display="flex" justifyContent="flex-end">
                                    <Typography variant="body2" color="primary">Read more</Typography>
                                </Box>
                            </StyledCardContent>
                        </CardActionArea>
                    </StyledCard>
                ))
            )}
        </Box>
    );
};

export default BlogPostList;
