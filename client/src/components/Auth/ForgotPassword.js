import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Alert } from '@mui/material';

const ForgotPassword = ({ onSwitchForm }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/forgot-password', { email });
            setMessage('Password reset link sent to your email.');
        } catch (error) {
            setError('Error sending reset link');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4">Forgot Password</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
                Send Reset Link
            </Button>
            <Button fullWidth onClick={() => onSwitchForm('login')}>
                Back to Login
            </Button>
        </form>
    );
};

export default ForgotPassword;
