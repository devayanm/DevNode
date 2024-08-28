import React, { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import ForgotPassword from '../components/Auth/ForgotPassword';

const AuthContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '400px',
  width: '100%',
  boxShadow: theme.shadows[3],
}));

const AuthForm = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <Login onSwitchForm={setCurrentForm} />;
      case 'signup':
        return <Signup onSwitchForm={setCurrentForm} />;
      case 'forgotPassword':
        return <ForgotPassword onSwitchForm={setCurrentForm} />;
      default:
        return <Login onSwitchForm={setCurrentForm} />;
    }
  };

  return (
    <AuthContainer>
      <FormPaper>
        <Box>{renderForm()}</Box>
      </FormPaper>
    </AuthContainer>
  );
};

export default AuthForm;
