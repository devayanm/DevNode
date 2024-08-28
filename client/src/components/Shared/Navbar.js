import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Button,
  IconButton,
} from "@mui/material";
import { Home as HomeIcon, Menu as MenuIcon } from "@mui/icons-material";
import { getUserProfile, logout } from "../../api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": { color: "#1976d2" },
            }}
            onClick={handleLogoClick}
          >
            DevNode
          </Typography>
        </Box>
        <Box>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ mx: 1, fontWeight: "bold", "&:hover": { color: "#1976d2" } }}
          >
            Latest
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/blog")}
            sx={{ mx: 1, fontWeight: "bold", "&:hover": { color: "#1976d2" } }}
          >
            Posts
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/profile")}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#d32f2f" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/signup")}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                LogIn
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
