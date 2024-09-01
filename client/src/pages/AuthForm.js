import React, { useState } from 'react';
import { Container, Paper, Box, Tabs, Tab } from '@mui/material';
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
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderForm = () => {
    switch (currentTab) {
      case 0:
        return <Login />;
      case 1:
        return <Signup />;
      case 2:
        return <ForgotPassword />;
      default:
        return <Login />;
    }
  };

  return (
    <AuthContainer>
      <FormPaper>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="authentication tabs"
          centered
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
          <Tab label="Forgot Password" />
        </Tabs>
        <Box>{renderForm()}</Box>
      </FormPaper>
    </AuthContainer>
  );
};

export default AuthForm;
