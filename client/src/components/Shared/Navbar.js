import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  PostAdd as PostAddIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { getUserProfile, logout } from "../../api";
import logoImage from "../../assets/devnode-nav.png";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      getUserProfile()
        .then((response) => setUser(response.data))
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        });
    } else {
      setIsAuthenticated(false);
    }
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

  const renderAuthButtons = () => (
    <>
      {isAuthenticated ? (
        <>
          <IconButton color="inherit" onClick={() => navigate("/profile")}>
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton color="inherit" onClick={() => navigate("/signup")}>
            <PersonAddIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate("/login")}>
            <LoginIcon />
          </IconButton>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Mobile View */}
      {isMobile && (
        <>
          {/* Top Bar for Mobile */}
          <AppBar
            position="fixed"
            color="default"
            elevation={2}
            sx={{ top: 0, left: 0, right: 0, zIndex: 1201 }}
          >
            <Box m={1}>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center", cursor: "pointer" }}
                  onClick={handleLogoClick}
                >
                  <img
                    src={logoImage}
                    alt="DevNode Logo"
                    style={{ width: "auto", height: "40px", borderRadius: "25px" }}
                  />
                </Typography>
              </Toolbar>
            </Box>
          </AppBar>

          {/* Bottom Navigation Bar for Mobile */}
          <AppBar
            position="fixed"
            color="default"
            elevation={5}
            sx={{
              bottom: 0,
              left: 0,
              right: 0,
              top: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0 8px",
              borderRadius: "12px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
              <IconButton
                color="inherit"
                onClick={() => navigate("/blog")}
                sx={{ flexGrow: 1 }}
              >
                <ExploreIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => navigate("/create-blog")}
                sx={{ flexGrow: 1 }}
              >
                <PostAddIcon />
              </IconButton>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ flexGrow: 2 }}
              >
                <IconButton
                  color="primary"
                  onClick={() => navigate("/")}
                  sx={{
                    fontSize: "32px",
                    borderRadius: "50%",
                    border: `2px solid ${theme.palette.primary.main}`,
                    p: 1,
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                sx={{ flexGrow: 2, justifyContent: "space-around" }}
              >
                {renderAuthButtons()}
              </Box>
            </Toolbar>
          </AppBar>
        </>
      )}

      {/* Desktop View */}
      {!isMobile && (
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
                <img
                  src={logoImage}
                  alt="DevNode Logo"
                  style={{
                    width: "auto",
                    height: "40px",
                    borderRadius: "25px",
                  }}
                />
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyItems: "center",
              }}
            >
              <Button
                color="inherit"
                onClick={() => navigate("/create-blog")}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#1976d2" },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyItems: "center",
                }}
              >
                <PostAddIcon />
                Create
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/")}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#1976d2" },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyItems: "center",
                }}
              >
                <HomeIcon />
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/blog")}
                sx={{
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": { color: "#1976d2" },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyItems: "center",
                }}
              >
                <ExploreIcon />
                Blogs
              </Button>
            </Box>
            <Box display="flex" alignItems="center">
              {renderAuthButtons()}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
