import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Box component="main" sx={{ m: 8 }}>
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
