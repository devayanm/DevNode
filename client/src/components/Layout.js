import React from 'react';
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
