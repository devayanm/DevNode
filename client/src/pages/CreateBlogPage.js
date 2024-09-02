import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
  Tooltip,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import {
  Brightness4,
  Brightness7,
  Save,
  Clear,
  Cancel,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createBlogPost } from "../api";
import "quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import Quill from "quill";
import BetterTable from "quill-better-table";
import Autocomplete from "@mui/material/Autocomplete";

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

const EditorContainer = styled(Paper)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    padding: isMobile ? theme.spacing(1) : theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    minHeight: isMobile ? "200px" : "400px",
    width: "100%",
    boxShadow: theme.shadows[3],
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[6],
    },
    "& .ql-editor": {
      fontSize: isMobile ? "0.875rem" : "1rem",
      lineHeight: 1.6,
      minHeight: isMobile ? "150px" : "350px",
    },
  };
});

const steps = ["Basic Information", "Write Content", "Preview & Publish"];

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const existingTags = ["JavaScript", "React", "CSS", "Web Development"];
  const existingCategories = [
    "Technology",
    "Lifestyle",
    "Education",
    "Health",
    "Finance",
  ];

  useEffect(() => {
    let quill;
    if (editorRef.current) {
      quill = new Quill(editorRef.current, {
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
      quill.on("text-change", () => {
        saveContent();
      });
      if (content) {
        quill.root.innerHTML = content;
      }
    }
    return () => {
      if (quill) {
        quill.off("text-change");
        quill = null;
      }
    };
  }, [activeStep]);

  const saveContent = () => {
    if (editorRef.current) {
      const quill = Quill.find(editorRef.current);
      setContent(quill.root.innerHTML);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!title || !category) {
        alert("Title and category are required.");
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClearAll = () => {
    setTitle("");
    setCategory("");
    setTags([]);
    setContent("");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      handleClearAll();
      setActiveStep(0);
    }
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
        handleClearAll();
        navigate(`/blog`);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Container component="main" maxWidth="md">
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
          </Grid>
        </Grid>

        <Stepper activeStep={activeStep} style={{ marginTop: "20px" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {activeStep === 0 && (
            <>
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
                onChange={(e) => setTitle(e.target.value)}
                style={{ fontSize: "1.2rem" }}
              />

              <Autocomplete
                freeSolo
                options={existingCategories}
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Category"
                    style={{ fontSize: "1rem" }}
                  />
                )}
              />

              <Autocomplete
                multiple
                freeSolo
                options={existingTags}
                value={tags}
                onChange={(event, newValue) => {
                  setTags(newValue);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Tags"
                    style={{ fontSize: "1rem" }}
                  />
                )}
              />

              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                flexDirection={isMobile ? "column" : "row"}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                  startIcon={<Cancel />}
                  style={{ marginBottom: isMobile ? "10px" : "0" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleClearAll}
                  startIcon={<Clear />}
                  style={{ marginBottom: isMobile ? "10px" : "0" }}
                >
                  Clear All
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              </Box>
            </>
          )}

          {activeStep === 1 && (
            <>
              <EditorContainer>
                <div
                  id="editor"
                  ref={editorRef}
                  style={{ height: "300px", width: "100%" }}
                ></div>
              </EditorContainer>

              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                flexDirection={isMobile ? "column" : "row"}
              >
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  style={{ marginBottom: isMobile ? "10px" : "0" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              </Box>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography variant="h5" gutterBottom>
                Preview Your Blog Post
              </Typography>
              <Typography variant="h6">Title: {title}</Typography>
              <Typography variant="h6">Category: {category}</Typography>
              <Typography variant="h6">Tags:</Typography>
              <Box>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} style={{ margin: "2px" }} />
                ))}
              </Box>
              <Typography variant="h6" gutterBottom>
                Content:
              </Typography>
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              ></div>

              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                flexDirection={isMobile ? "column" : "row"}
              >
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  style={{ marginBottom: isMobile ? "10px" : "0" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<Save />}
                >
                  Publish
                </Button>
              </Box>
            </>
          )}
        </form>
      </FormContainer>
    </Container>
  );
};

export default CreateBlogPage;
