import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Snackbar,
  Link,
  InputAdornment,
  Tooltip,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({ email, password });
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError("Invalid email or password");
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

    // Simple password strength check
    if (value.length < 6) {
      setPasswordStrength("weak");
    } else if (value.length < 10) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem("token", token);
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
        <FormTitle variant="h4">Login</FormTitle>
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
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            helperText="Enter your registered email address"
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
            autoComplete="current-password"
            helperText="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={showPassword ? "Hide Password" : "Show Password"}>
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <PasswordStrengthMeter
            variant="determinate"
            value={passwordStrength === "weak" ? 33 : passwordStrength === "medium" ? 66 : 100}
            strength={passwordStrength}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember Me"
          />
          <FormButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
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
                Login with Google
              </FormButton>
            )}
          />
        </form>
        <LinkContainer>
          <Link href="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
          <Link href="/forgot-password" variant="body2" sx={{ mt: 1 }}>
            Forgot your password?
          </Link>
        </LinkContainer>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Login successful"
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

export default Login;