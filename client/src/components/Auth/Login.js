import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Alert, CircularProgress, Box, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  maxWidth: '400px',
  margin: 'auto',
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

const SwitchButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const LoginForm = ({ onSwitchForm }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        const response = await login(values);
        localStorage.setItem('token', response.data.token);
        setOpenSnackbar(true); 
        setTimeout(() => {
          navigate('/'); 
        }, 2000); 
      } catch (error) {
        setErrors({ submit: 'Invalid email or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <FormContainer>
      <FormTitle variant="h4">Login</FormTitle>
      {formik.errors.submit && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{formik.errors.submit}</Alert>}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          autoComplete="current-password"
        />
        <FormButton 
          type="submit" 
          fullWidth 
          variant="contained" 
          color="primary" 
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : 'Login'}
        </FormButton>
      </form>
      <SwitchButton fullWidth onClick={() => onSwitchForm('signup')}>
        Don't have an account? Sign Up
      </SwitchButton>
      <SwitchButton fullWidth onClick={() => onSwitchForm('forgotPassword')}>
        Forgot Password
      </SwitchButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Duration in milliseconds
        onClose={handleCloseSnackbar}
        message="Login successful"
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </FormContainer>
  );
};

export default LoginForm;
