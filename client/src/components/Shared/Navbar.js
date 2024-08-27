import React from "react";
import { AppBar, Toolbar, Typography, Box, Link, IconButton } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" component="div">
            DevNode
          </Typography>
        </Box>
        <Box>
          <Link href="/latest" underline="none" color="inherit" sx={{ mx: 2 }}>
            Latest
          </Link>
          <Link href="/posts" underline="none" color="inherit" sx={{ mx: 2 }}>
            Posts
          </Link>
        </Box>
        <Box>
          <IconButton color="inherit" href="/login">
            <Typography variant="body2" sx={{ mx: 1 }}>
              Sign In
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
