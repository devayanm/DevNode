import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';

const Footer = () => {
  return (
    <Box mt={8} py={4} sx={{ backgroundColor: "#f5f5f5", textAlign: "center" }}>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <IconButton href="https://twitter.com" color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://linkedin.com" color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton href="https://instagram.com" color="inherit">
          <InstagramIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 DevNode. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
