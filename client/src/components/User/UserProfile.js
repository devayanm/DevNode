import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
} from "@mui/material";
import {
  getUserProfile,
  updateUserProfile,
  getBlogPostById,
  uploadImage,
} from "../../api";
import { PhotoCamera, Delete } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: "800px",
  margin: "auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  width: "100%",
  justifyContent: "space-between",
}));

const BlogCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        setBio(response.data.bio);
        setAvatar(response.data.avatar);

        // Fetch user's blogs
        const blogIds = response.data.blogs || [];
        const blogPromises = blogIds.map((id) => getBlogPostById(id));
        const blogResponses = await Promise.all(blogPromises);
        setBlogs(blogResponses.map((res) => res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      setUploading(true);
      let avatarUrl = avatar;

      if (avatarFile) {
        const uploadedImage = await uploadImage(avatarFile);
        avatarUrl = uploadedImage.url;
      }

      await updateUserProfile({ bio, avatar: avatarUrl });
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarSeverity("success");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbarMessage("Failed to update profile.");
      setSnackbarSeverity("error");
    } finally {
      setUploading(false);
      setSnackbarOpen(true);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar("");
    setAvatarFile(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Box display="flex" alignItems="center">
          <Avatar
            alt="User Avatar"
            src={avatar}
            sx={{ width: 80, height: 80 }}
          />
          <Box ml={2}>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>
          </Box>
        </Box>
        {editing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={uploading}
          >
            {uploading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditing(true)}
          >
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
          <Box mt={2} display="flex" alignItems="center">
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
            {avatar && (
              <IconButton onClick={handleRemoveAvatar} sx={{ ml: 2 }}>
                <Delete />
              </IconButton>
            )}
          </Box>
          {avatar && (
            <Box mt={2}>
              <img
                src={avatar}
                alt="Avatar Preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box width="100%" maxWidth="600px">
          <Typography variant="body1" gutterBottom>
            <strong>Bio:</strong> {bio}
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
                image={blog.coverImage || "default-cover.jpg"}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.excerpt || "No excerpt available"}
                </Typography>
              </CardContent>
            </BlogCard>
          ))
        ) : (
          <Typography>No blogs available</Typography>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

export default UserProfile;
