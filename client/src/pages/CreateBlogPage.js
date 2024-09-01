import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  Title,
  FormatQuote,
  InsertLink,
  Image,
  VideoLibrary,
  Brightness4,
  Brightness7,
  Save,
} from "@mui/icons-material";
import { createBlogPost } from "../api";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "quill-better-table/dist/quill-better-table.css";
import BetterTable from "quill-better-table";

Quill.register("modules/betterTable", BetterTable);

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
}));

const EditorContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.__quill) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }, { header: 3 }],
            [{ font: [] }, { size: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
            ["emoji"],
          ],
          betterTable: true,
        },
        placeholder: "Compose your blog content...",
        readOnly: false,
      });
      editorRef.current.__quill = quill;
      quill.on("text-change", () => {
        saveContent();
      });
    }

    const autosaveInterval = setInterval(() => {
      if (isEditing) {
        saveDraft();
      }
    }, 5000);

    return () => clearInterval(autosaveInterval);
  }, [isEditing]);

  const saveContent = () => {
    if (editorRef.current) {
      const quill = editorRef.current.__quill;
      setContent(quill.root.innerHTML);
    }
  };

  const saveDraft = () => {
    if (title && content) {
      localStorage.setItem("draftTitle", title);
      localStorage.setItem("draftContent", content);
      localStorage.setItem("draftCategory", category);
      localStorage.setItem("draftTags", JSON.stringify(tags));
      alert("Draft saved locally.");
    }
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content || !category) {
      alert("Title, content, and category are required.");
      return;
    }

    const blogData = {
      title,
      content,
      category,
      tags,
    };

    try {
      const response = await createBlogPost(blogData);
      if (response.status === 201) {
        alert("Blog post created successfully!");
        setTitle("");
        setCategory("");
        setTags([]);
        setContent("");
        localStorage.removeItem("draftTitle");
        localStorage.removeItem("draftContent");
        localStorage.removeItem("draftCategory");
        localStorage.removeItem("draftTags");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post. Please try again.");
    }
  };

  const handleBeforeUnload = (event) => {
    if (isEditing) {
      const confirmationMessage =
        "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isEditing]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Container component="main" maxWidth="lg">
      <FormContainer>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Create a New Blog Post
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Tooltip title="Toggle Dark Mode">
              <IconButton onClick={toggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <Tooltip title={isSaving ? "Saving..." : "Save Draft"}>
              <IconButton
                color="secondary"
                onClick={saveDraft}
                disabled={isSaving}
              >
                <Save />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Blog Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsEditing(true);
            }}
            style={{ fontSize: "1.2rem" }}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setIsEditing(true);
              }}
              label="Category"
              style={{ fontSize: "1rem" }}
            >
              {[
                "Technology",
                "Lifestyle",
                "Education",
                "Health",
                "Finance",
              ].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={tags}
              onChange={(e) => {
                handleTagsChange(e);
                setIsEditing(true);
              }}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ margin: "2px" }} />
                  ))}
                </Box>
              )}
              style={{ fontSize: "1rem" }}
            >
              {["JavaScript", "React", "CSS", "Web Development"].map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <EditorContainer>
            <div id="editor" ref={editorRef}></div>
          </EditorContainer>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(false)}
            >
              Publish
            </Button>
          </Box>
        </form>
      </FormContainer>
    </Container>
  );
};

export default CreateBlogPage;
