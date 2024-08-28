import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  IconButton,
  Button,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { getUserProfile, logout } from "../../api";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUserProfile(); 
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography href="/" variant="h6" component="div">
            DevNode
          </Typography>
        </Box>
        <Box>
          <Link href="/" underline="none" color="inherit" sx={{ mx: 2 }}>
            Latest
          </Link>
          <Link href="/blog" underline="none" color="inherit" sx={{ mx: 2 }}>
            Posts
          </Link>
        </Box>
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
