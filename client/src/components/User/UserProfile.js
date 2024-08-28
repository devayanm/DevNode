import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button, TextField, Avatar, CircularProgress, Card, CardContent, CardMedia } from '@mui/material';
import { getUserProfile, updateUserProfile, getBlogPostById } from '../../api';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  width: '100%',
  justifyContent: 'space-between',
}));

const BlogCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        setBio(response.data.bio);
        setAvatar(response.data.avatar);

        // Fetch user's blogs
        const blogIds = response.data.blogs || [];
        const blogPromises = blogIds.map(id => getBlogPostById(id));
        const blogResponses = await Promise.all(blogPromises);
        setBlogs(blogResponses.map(res => res.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile({ bio, avatar });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Box>
          <Avatar alt="User Avatar" src={avatar} sx={{ width: 80, height: 80 }} />
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
        </Box>
        {editing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        )}
      </ProfileHeader>
      {editing ? (
        <Box width="100%" maxWidth="600px">
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Avatar URL"
            variant="outlined"
            fullWidth
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            margin="normal"
          />
        </Box>
      ) : (
        <Box width="100%" maxWidth="600px">
          <Typography variant="body1" gutterBottom>
            <strong>Bio:</strong> {bio}
          </Typography>
          <Typography variant="body1">
            <strong>Avatar:</strong> <img src={avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </Typography>
        </Box>
      )}
      <Box width="100%" mt={4}>
        <Typography variant="h5" gutterBottom>
          My Blogs
        </Typography>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id}>
              <CardMedia
                component="img"
                height="140"
                image={blog.coverImage || 'default-cover.jpg'}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.excerpt || 'No excerpt available'}
                </Typography>
              </CardContent>
            </BlogCard>
          ))
        ) : (
          <Typography>No blogs available</Typography>
        )}
      </Box>
    </ProfileContainer>
  );
};

export default UserProfile;
