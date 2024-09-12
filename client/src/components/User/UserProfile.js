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
  Grid,
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
  maxWidth: "900px",
  margin: "auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ProfileHeader = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: "120px",
  height: "120px",
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
  },
}));

const BlogCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

const BlogActions = styled(CardActions)(({ theme }) => ({
  justifyContent: "space-between",
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
      <ProfileHeader container spacing={2}>
        <Grid item xs={12} sm={4}>
          <AvatarStyled alt="User Avatar" src={avatar} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
          {editing ? (
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={uploading}
                sx={{ mr: 2 }}
              >
                {uploading ? <CircularProgress size={24} /> : "Save"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Grid>
      </ProfileHeader>

      {editing ? (
        <Box width="100%" mt={3}>
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
        <Box width="100%" mt={3}>
          <Typography variant="body1" gutterBottom>
            <strong>Bio:</strong> {user.bio || "No bio available."}
          </Typography>
        </Box>
      )}

      <Box mt={5} width="100%">
        <Typography variant="h5" gutterBottom>
          My Blog Posts
        </Typography>
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard>
                <CardContentStyled>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published on:{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    Author: {blog.author.name}
                  </Typography>
                </CardContentStyled>
                <BlogActions>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditBlog(blog._id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => openDeleteDialog(blog)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </BlogActions>
              </BlogCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-blog-dialog-title"
      >
        <DialogTitle id="delete-blog-dialog-title">
          Delete Blog Post
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the blog post titled "
            {blogToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteBlog(blogToDelete._id)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  );
};

export default UserProfile;
