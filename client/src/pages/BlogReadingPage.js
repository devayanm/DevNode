import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogPostById } from "../api";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Avatar,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { styled } from "@mui/system";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  textAlign: "center",
}));

const AuthorInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const ContentSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  lineHeight: 1.8,
  fontSize: "1.1rem",
}));

const RelatedPostsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const CommentSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const BlogReadingPage = () => {
  const { postId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const { blogPost, otherBlogs } = await getBlogPostById(postId);
        setBlogPost(blogPost);
        setOtherBlogs(otherBlogs);
      } catch (err) {
        setError("Error fetching blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const defaultAuthor = {
    name: "Unknown Author",
    avatar: "",
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this blog post: ${blogPost.title}`;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          text + " " + url
        )}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          blogPost.title
        )}&body=${encodeURIComponent(text + " " + url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <Container>
      {blogPost && (
        <Box>
          <HeroSection>
            <Typography variant="h2" component="h1">
              {blogPost.title}
            </Typography>
          </HeroSection>

          <AuthorInfo>
            <Avatar
              src={blogPost.author?.avatar || defaultAuthor.avatar}
              alt={blogPost.author?.name || defaultAuthor.name}
              sx={{ mr: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              <strong>{blogPost.author?.name || defaultAuthor.name}</strong> -{" "}
              {formatDistanceToNow(new Date(blogPost.createdAt), {
                addSuffix: true,
              })}
            </Typography>
          </AuthorInfo>

          <Divider sx={{ my: 4 }} />

          <ContentSection>
            <div>{parse(DOMPurify.sanitize(blogPost.content))}</div>
          </ContentSection>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <IconButton color="warning">
                <BookmarkIcon />
              </IconButton>
              <IconButton color="secondary">
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="success">
                <NotificationsIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              onClick={() => setShareDialogOpen(true)}
            >
              Share
            </Button>
          </Box>

          <Dialog
            open={shareDialogOpen}
            onClose={() => setShareDialogOpen(false)}
          >
            <DialogTitle>Share this post</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <IconButton onClick={() => handleShare("whatsapp")}>
                  <WhatsAppIcon color="success" />
                </IconButton>
                <IconButton onClick={() => handleShare("email")}>
                  <EmailIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleShare("facebook")}>
                  <FacebookIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleShare("instagram")}>
                  <InstagramIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => handleShare("copy")}>
                  <LinkIcon />
                </IconButton>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShareDialogOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Divider sx={{ my: 4 }} />

          <RelatedPostsSection>
            <Typography variant="h6" gutterBottom>
              Other Blogs by
              <AuthorInfo>
                <Avatar
                  src={blogPost.author?.avatar || defaultAuthor.avatar}
                  alt={blogPost.author?.name || defaultAuthor.name}
                  sx={{ mr: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  <strong>{blogPost.author?.name || defaultAuthor.name}</strong>
                </Typography>
              </AuthorInfo>
            </Typography>
            <Grid container spacing={2}>
              {otherBlogs.length ? (
                otherBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog._id}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {blog.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {blog.content
                            ? parse(
                                DOMPurify.sanitize(
                                  blog.content.substring(0, 100) + "..."
                                )
                              )
                            : "No content available"}
                        </Typography>
                        <Button
                          size="small"
                          color="primary"
                          href={`/posts/${blog._id}`}
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography>No other blogs available</Typography>
              )}
            </Grid>
          </RelatedPostsSection>

          <Divider sx={{ my: 4 }} />

          <CommentSection>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>A</Avatar>
                <Box>
                  <Typography variant="body2">
                    <strong>Anonymous</strong> - 2 hours ago
                  </Typography>
                  <Typography variant="body2">
                    This is an example comment.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CommentSection>
        </Box>
      )}
    </Container>
  );
};

export default BlogReadingPage;
