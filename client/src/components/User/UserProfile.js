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
  CardActions,
  CardContent,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PhotoCamera, Delete as DeleteIcon, Edit } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  uploadImage,
  getAllBlogPosts,
  deleteBlogPost,
} from "../../api";

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
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const BlogActions = styled(CardActions)(({ theme }) => ({
  justifyContent: "flex-end",
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flex: 1,
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        setBio(response.data.bio);
        setAvatar(response.data.avatar);

        // Fetch blogs authored by the user
        const allBlogsResponse = await getAllBlogPosts();
        const userBlogs = allBlogsResponse.data.filter(
          (blog) => blog.author._id === response.data._id
        );
        setBlogs(userBlogs);
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

  const handleCancel = () => {
    setEditing(false);
    setBio(user.bio);
    setAvatar(user.avatar);
    setAvatarFile(null);
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

  const handleEditBlog = (postId) => {
    navigate(`/posts/update/${postId}`);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlogPost(blogId);
      setSnackbarMessage("Blog post deleted successfully!");
      setSnackbarSeverity("success");
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog post:", error);
      setSnackbarMessage("Failed to delete blog post.");
      setSnackbarSeverity("error");
    } finally {
      setDeleteDialogOpen(false);
      setSnackbarOpen(true);
    }
  };

  const openDeleteDialog = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
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
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={uploading}
              sx={{ mr: 2 }}
            >
              {uploading ? <CircularProgress size={24} /> : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
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
                <DeleteIcon />
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
              <CardContentStyled>
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Date:</strong>{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Author:</strong> {blog.author.name}
                </Typography>
              </CardContentStyled>
              <Box>
                <BlogActions>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditBlog(blog._id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => openDeleteDialog(blog)}
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </BlogActions>
              </Box>
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
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this blog post? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button
            onClick={() => {
              if (blogToDelete) {
                handleDeleteBlog(blogToDelete._id);
              }
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  );
};

export default UserProfile;
