import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Snackbar,
  IconButton,
  InputAdornment,
  Tooltip,
  Link,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { signup } from "../../api";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  maxWidth: "400px",
  margin: "auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const LinkContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const PasswordStrengthMeter = styled(LinearProgress)(({ theme, strength }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    backgroundColor:
      strength === "weak"
        ? theme.palette.error.main
        : strength === "medium"
        ? theme.palette.warning.main
        : theme.palette.success.main,
  },
}));

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setPasswordMatchError(false);
    setNameError(false);
    setLoading(true);
    try {
      await signup({ name, email, password });
      setSnackbarMessage("Registration successful");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Account already exists. Please log in.");
      } else {
        setError("Signup error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordStrength("weak");
    } else if (value.length < 10) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem("token", token);
    setSnackbarMessage("Google Sign-In successful");
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/profile");
      window.location.reload();
    }, 2000);
  };

  const handleGoogleFailure = (response) => {
    setError("Google Sign-In was unsuccessful. Try again later.");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <FormContainer>
        <FormTitle variant="h4">Sign Up</FormTitle>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="Enter your full name"
            error={nameError}
          />
          {nameError && (
            <Typography color="error" variant="body2">
              Name cannot be empty or just spaces.
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            helperText="Enter your email address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
            helperText="Password must be at least 6 characters"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <PasswordStrengthMeter
            variant="determinate"
            value={
              passwordStrength === "weak"
                ? 33
                : passwordStrength === "medium"
                ? 66
                : 100
            }
            strength={passwordStrength}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText="Re-enter your password"
            error={passwordMatchError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showConfirmPassword ? "Hide Password" : "Show Password"
                    }
                  >
                    <IconButton
                      edge="end"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label="toggle password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          {passwordMatchError && (
            <Typography color="error" variant="body2">
              The entered passwords do not match.
            </Typography>
          )}
          <FormButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </FormButton>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={(renderProps) => (
              <FormButton
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<GoogleIcon />}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                sx={{ mt: 2 }}
              >
                Sign Up with Google
              </FormButton>
            )}
          />
        </form>
        <LinkContainer>
          <Link href="/login" variant="body2">
            Already have an account? Log In
          </Link>
        </LinkContainer>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        />
      </FormContainer>
    </GoogleOAuthProvider>
  );
};

export default Signup;
